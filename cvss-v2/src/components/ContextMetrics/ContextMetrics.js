import React from 'react'
import { Row, Col, Alert, Button } from 'antd';
import Group from '../Group/Group';

class ContextMetrics extends React.Component {
    constructor() {
        super();
        this.state = {
            cdp: 'cdp',
            td: 'td',
            cr: 'cr',
            ir: 'ir',
            ar: 'ar',
            cdp_value: 0,
            td_value: 0,
            cr_value: 0,
            ir_value: 0,
            ar_value: 0,
            change_cdp: false,
            change_td: false,
            change_cr: false,
            change_ir: false,
            change_ar: false,
            error: true,
            answer: 0,
            count: 0
        }
        this.setResult = this.setResult.bind(this)
    }

    getAnswer = (base) => {
        const arr = base.split(' ')
        if (arr[0] === 'cdp') {
            this.setState({ cdp_value: arr[1], change_cdp: true })
        } else if (arr[0] === 'td') {
            this.setState({ td_value: arr[1], change_td: true });
        } else if (arr[0] === 'cr') {
            this.setState({ cr_value: arr[1], change_cr: true });
        } else if (arr[0] === 'ir') {
            this.setState({ ir_value: arr[1], change_ir: true });
        } else if (arr[0] === 'ar') {
            this.setState({ ar_value: arr[1], change_ar: true });
        }
    };

    setResult() {
        const { change_cdp, change_td, change_cr, change_ir,
            change_ar, cdp_value, td_value, cr_value, ar_value, ir_value } = this.state;
        if (change_cdp && change_td && change_cr && change_ir && change_ar) {
            const arr = this.props.data_from_base.split(' ')
            const arr2 = this.props.data_from_time.split(' ')

            const c = arr[0]
            const i = arr[1]
            const a = arr[2]
            const f = arr[3]
            const exploitability = arr[4]

            const e = arr2[0]
            const rl = arr2[1]
            const rc = arr2[2]

            const cr = parseFloat(cr_value)
            const ir = parseFloat(ir_value)
            const ar = parseFloat(ar_value)
            const cdp = parseFloat(cdp_value)
            const td = parseFloat(td_value)

            // AdjustedImpact = min(10;10,41×(1-)) 
            const adjustedImpact = Math.min(10, 10.41 * (1 - (1 - c * cr) * (1 - i * ir) * (1 - a * ar)));
            // AdjustedBaseScore = (((0,6×AdjustedImpact)+(0,4×Exploitability)-1,5)×fImpact),
            const adjustedBaseScore = (((0.6 * adjustedImpact) + (0.4 * exploitability) - 1.5) * f)
            // AdjustedTemporal = AdjustedBaseScore×E×RL×RC,
            const adjustedTemporal = adjustedBaseScore * e * rl * rc
            // EnvironmentalScore = round_to_1_decimal ((AdjustedTemporal + (10 - AdjustedTemporal) × CDP)×TD)
            const formula = ((adjustedTemporal + (10 - adjustedTemporal) * cdp) * td).toFixed(1);
            this.setState({ error: false, answer: formula })
        }
    }

    render() {
        const { context_names } = this.props;
        const { cdp, td, cr_ir_ar, error, answer } = this.state;

        const cdp_values = [0.0, 0.0, 0.1, 0.3, 0.4, 0.5]
        const td_values = [1.0, 0.0, 0.25, 0.75, 1.0]
        const cr_ir_ar_values = [1.0, 0.5, 1.0, 1.51]

        const cdp_metrics = ['Не определено (ND)', 'Отсутствует (N)', 'Низкая (L)', 'Средняя (LM)', 'Повышенная (MH)', 'Высокая (H)']
        const td_metrics = ['Не определено (ND)', 'Отсутствует (N)', 'Низкая (L)', 'Средняя (M)', 'Высокая (H)']
        const cr_ir_ar_metrics = ['Не определено (ND)', 'Низкая (L)', 'Средняя (M)', 'Высокая (H)']

        return (
            <div style={{ fontSize: '20px' }}>
                **Прежде найдите оценку временной и базовой метрики,в противном случае ответ неверный.
                <Row>
                    <Col span={20}>
                        {error ? <Alert message="You must select the value of each criterion!" type="warning" /> :
                            <Alert message={"Score is : " + answer} type="success" />
                        }</Col>
                    <Col span={2} />
                    <Col span={2}>
                        <Button type="primary" onClick={this.setResult}>
                            Calculate!</Button>
                    </Col>

                </Row>
                <div style={{ padding: '24px 0' }}>
                    <Group name={context_names[0]} base={cdp} getAnswer={this.getAnswer} values={cdp_values} metrics={cdp_metrics} />
                    <Group name={context_names[1]} base={td} getAnswer={this.getAnswer} values={td_values} metrics={td_metrics} />
                    <Group name={context_names[2]} base={cr_ir_ar} getAnswer={this.getAnswer} values={cr_ir_ar_values} metrics={cr_ir_ar_metrics} />
                    <Group name={context_names[3]} base={cr_ir_ar} getAnswer={this.getAnswer} values={cr_ir_ar_values} metrics={cr_ir_ar_metrics} />
                    <Group name={context_names[4]} base={cr_ir_ar} getAnswer={this.getAnswer} values={cr_ir_ar_values} metrics={cr_ir_ar_metrics} />
                </div>
            </div>
        )
    }
}

export default ContextMetrics;