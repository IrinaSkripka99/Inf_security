import React from 'react'
import Group from '../Group/Group';
import { Row, Col, Alert, Button } from 'antd';

class BaseMetricsV3 extends React.Component {
    constructor() {
        super();
        this.state = {
            count: 0,
            av: 'av',
            av_value: '',
            change_av: false,
            ac: 'ac',
            change_ac: false,
            ac_value: 0,
            pr: 'pr',
            change_pr: false,
            pr_value: 0,
            ui: 'ui',
            change_ui: false,
            ui_value: 0,
            s: 's',
            change_s: false,
            s_value: 0,
            c: 'c',
            change_c: false,
            c_value: 0,
            i: 'i',
            change_i: false,
            i_value: 0,
            a: 'a',
            change_a: false,
            a_value: 0,
            error: true,
            answer: 0
        }
        this.setResult = this.setResult.bind(this)
    }

    getAnswer = (base_value) => {
        const arr = base_value.split(' ')
        if (arr[0] === 'av') {
            this.setState({ av_value: arr[1], change_av: true })
        } else if (arr[0] === 'ac') {
            this.setState({ ac_value: arr[1], change_ac: true });
        } else if (arr[0] === 'pr') {
            this.setState({ pr_value: arr[1], change_pr: true });
        } else if (arr[0] === 'ui') {
            this.setState({ ui_value: arr[1], change_ui: true });
        } else if (arr[0] === 's') {
            this.setState({ s_value: arr[1], change_s: true });
        } else if (arr[0] === 'c') {
            this.setState({ c_value: arr[1], change_c: true });
        } else if (arr[0] === 'i') {
            this.setState({ i_value: arr[1], change_i: true });
        } else if (arr[0] === 'a') {
            this.setState({ a_value: arr[1], change_a: true });
        }



    };

    setResult() {
        const { change_av, change_a, change_ac, change_pr, change_ui, change_s, change_c, change_i } = this.state;
        if (change_av && change_a && change_ac && change_pr && change_c && change_i && change_ui && change_s) {

            const av = parseFloat(this.state.av_value)
            const a = parseFloat(this.state.a_value)
            const ac = parseFloat(this.state.ac_value)
            let pr = parseFloat(this.state.pr_value)
            const c = parseFloat(this.state.c_value)
            const i = parseFloat(this.state.i_value)
            const ui = parseFloat(this.state.ui_value)
            const s = parseFloat(this.state.s_value)
            if (s === 1) {
                if (pr === 0.62) {
                    pr = 0.68
                }
                if (pr === 0.27) {
                    pr = 0.50
                }
                console.log(pr)
            }

            // If (Impact <= 0) Then (BaseScore =0) else 
            // If (S=0) Then (BaseScore = Round up 2(min ((Impact +
            // Exploitability); 10)))
            // If (S=1) Then (BaseScore = Round up (min (1,08 × (Impact +
            // Exploitability); 10))), 



            let impact = 0;
            let exploitability = 8.22 * av * ac * pr * ui
            let baseScore = 0;
            let impactBase = 1 - ((1 - c) * (1 - i) * (1 - a))

            if (s === 0) {
                impact = 6.42 * impactBase
            } else if (s === 1) {
                impact = 7.52 * (impactBase - 0.029) - 3.25 * Math.pow(impactBase - 0.02, 15)
            }

            if (impact <= 0) {
                baseScore = 0
            } else {
                if (s === 0) {
                    baseScore = (Math.min(impact + exploitability, 10)).toFixed(1)
                } else if (s === 1) {
                    baseScore = (Math.min(1.08 * (impact + exploitability), 10)).toFixed(1)
                }
            }
            this.setState({ error: false, answer: baseScore })
        }

    }

    render() {
        const { base_names_v3 } = this.props;
        const { av, ac, pr, ui, s, c, i, a, error, answer } = this.state;

        const av_base_values = [0.85, 0.62, 0.55, 0.2]
        const ac_base_values = [0.77, 0.44]
        const pr_base_values = [0.85, 0.62, 0.27]
        const ui_base_values = [0.85, 0.62]
        const s_base_values = [0, 1]
        const c_i_a_base_values = [0.0, 0.22, 0.56]

        const av_base_metrics = ['Сетевой (N)', 'Смежная сеть (A)', 'Локальный (L)', 'Физический (P)']
        const ac_base_metrics = ['Низкая (L)', 'Высокая (H)']
        const pr_base_metrics = ['Не требуется (N)', 'Низкий (L)', 'Высокий (H)',]
        const ui_base_metrics = ['Не требуется (N)', 'Требуется (R)']
        const s_base_metrics = ['Не оказывает (U)', 'Оказывает (C)']
        const c_i_a_base_metrics = ['Не оказывает (N)', 'Низкое (L)', 'Высокое (H)']

        return (
            <div>
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

                <Row style={{ fontSize: '20px', padding: '24px 0' }}>
                    <Col span={12}>
                        <Group name={base_names_v3[0]} base={av} getAnswer={this.getAnswer} values={av_base_values} metrics={av_base_metrics} />
                        <Group name={base_names_v3[1]} base={ac} getAnswer={this.getAnswer} values={ac_base_values} metrics={ac_base_metrics} />
                        <Group name={base_names_v3[2]} base={pr} getAnswer={this.getAnswer} values={pr_base_values} metrics={pr_base_metrics} />
                        <Group name={base_names_v3[3]} base={ui} getAnswer={this.getAnswer} values={ui_base_values} metrics={ui_base_metrics} />
                    </Col>
                    <Col span={12} >
                        <Group name={base_names_v3[4]} base={s} getAnswer={this.getAnswer} values={s_base_values} metrics={s_base_metrics} />
                        <Group name={base_names_v3[5]} base={c} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                        <Group name={base_names_v3[6]} base={i} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                        <Group name={base_names_v3[7]} base={a} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default BaseMetricsV3;