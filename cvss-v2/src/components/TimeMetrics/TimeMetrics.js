import React from 'react'

import { Row, Col, Alert, Button } from 'antd';
import Group from '../Group/Group';

class TimeMetrics extends React.Component {
    constructor() {
        super();
        this.state = {
            e: 'e',
            e_value: 0,
            rl_value: 0,
            rc_value: 0,
            rl: 'rl',
            rc: 'rc',
            change_e: false,
            change_rl: false,
            change_rc: false,
            error: true,
            answer: 0,
            count: 0
        }
        this.setResult = this.setResult.bind(this)
    }

    // TemporalScore = round_to_1_decimal (BaseScore×E×RL×RC). 
    getAnswer = (base) => {
        const arr = base.split(' ')
        if (arr[0] === 'e') {
            this.setState({ e_value: arr[1], change_e: true })
        } else if (arr[0] === 'rl') {
            this.setState({ rl_value: arr[1], change_rl: true });
        } else if (arr[0] === 'rc') {
            this.setState({ rc_value: arr[1], change_rc: true });
        }


    };

    setResult() {
        const { change_e, change_rl, change_rc, e_value, rl_value, rc_value } = this.state;
        if (change_e && change_rl && change_rc) {

            const e = parseFloat(e_value)
            const rl = parseFloat(rl_value)
            const rc = parseFloat(rc_value)

            const formula = (this.props.base_score * e * rl * rc).toFixed(1);
            this.setState({ error: false, answer: formula })
            this.props.getTime(formula, e + ' ' + rl + ' ' + rc)
        }
    }

    render() {
        const { time_names } = this.props;
        const { e, rl, rc, error, answer } = this.state;

        const e_values = [1.0, 0.85, 0.7, 0.95, 1.0]
        const rl_values = [1.0, 0.87, 0.9, 0.95, 1.0]
        const rc_values = [1.0, 0.9, 0.95, 1.0]

        const e_metrics = ['Не определено (ND)', 'Теоретически (U)', 'Есть концепция (POC)', 'Есть сценарий (F)', 'Высокая (H)']
        const rl_metrics = ['Не определено (ND) ', 'Официальное (OF) ', 'Временное (TF)', 'Рекомендации (W)', 'Недоступно (U)']
        const rc_metrics = ['Не определено (ND)', 'Не подтверждена (UC)', 'Не доказана (UR)', 'Подтверждена (C)']

        return (
            <div style={{ fontSize: '20px' }}>
                **Прежде найдите оценку базовой метрики,в противном случае ответ неверный.
                <Row >
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
                    <Group name={time_names[0]} base={e} getAnswer={(e) => this.getAnswer(e)} values={e_values} metrics={e_metrics} />
                    <Group name={time_names[1]} base={rl} getAnswer={(rl) => this.getAnswer(rl)} values={rl_values} metrics={rl_metrics} />
                    <Group name={time_names[2]} base={rc} getAnswer={(rc) => this.getAnswer(rc)} values={rc_values} metrics={rc_metrics} />

                </div>
            </div>
        )
    }
}

export default TimeMetrics;