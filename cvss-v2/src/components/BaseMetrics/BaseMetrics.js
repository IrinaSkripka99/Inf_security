import React from 'react'
import Group from '../Group/Group';
import { Row, Col, Alert, Button } from 'antd';

class BaseMetrics extends React.Component {
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
            au: 'au',
            change_au: false,
            au_value: 0,
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

    // BaseScore = round_to_1_decimal1 (((0,6×Impact) +
    // (0,4×Exploitability)-1,5)×f(Impact)),
    // где Impact = 10,41×(1-(1-C)×(1-I)×(1-A)),
    // Exploitability = 20× AV×AC×Au,

    getAnswer = (base_value) => {
        const arr = base_value.split(' ')
        if (arr[0] === 'av') {
            this.setState({ av_value: arr[1], change_av: true })
        } else if (arr[0] === 'ac') {
            this.setState({ ac_value: arr[1], change_ac: true });
        } else if (arr[0] === 'au') {
            this.setState({ au_value: arr[1], change_au: true });
        } else if (arr[0] === 'c') {
            this.setState({ c_value: arr[1], change_c: true });
        } else if (arr[0] === 'i') {
            this.setState({ i_value: arr[1], change_i: true });
        } else if (arr[0] === 'a') {
            this.setState({ a_value: arr[1], change_a: true });
        }



    };

    setResult() {
        const { change_av, change_a, change_ac, change_au, change_c, change_i } = this.state;
        if (change_av && change_a && change_ac && change_au && change_c && change_i) {

            const av = parseFloat(this.state.av_value)
            const a = parseFloat(this.state.a_value)
            const ac = parseFloat(this.state.ac_value)
            const au = parseFloat(this.state.au_value)
            const c = parseFloat(this.state.c_value)
            const i = parseFloat(this.state.i_value)

            const impact = 10.41 * (1 - (1 - c) * (1 - a) * (1 - i))
            const exploitability = 20 * av * ac * au
            const f = impact === 0 ? 0 : 1.176
            const formula = (((0.6 * impact) + (0.4 * exploitability) - 1.5) * f).toFixed(1);
            const string = c + ' ' + i + ' ' + a + ' ' + f + ' ' + exploitability;
            this.props.getBase(formula, string)
            this.setState({ error: false, answer: formula })
        }

    }

    render() {
        const { base_names } = this.props;
        const { av, ac, au, c, i, a, error, answer } = this.state;

        const av_base_values = [0.395, 0.646, 1.0]
        const ac_base_values = [0.35, 0.61, 0.71]
        const au_base_values = [0.45, 0.56, 0.704]
        const c_i_a_base_values = [0.0, 0.275, 0.66]

        const av_base_metrics = ['Локальный (L)', 'Смежная сеть (A)', 'Сетевой (N)']
        const ac_base_metrics = ['Высокая (M)', 'Средняя (S)', 'Низкая (N)']
        const au_base_metrics = ['Множественная(H)', 'Единственная (M)', 'Не требуется (L)']
        const c_i_a_base_metrics = ['Не оказывает (N)', 'Частичное (P)', 'Полное (C)']

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
                        <Group name={base_names[0]} base={av} getAnswer={this.getAnswer} values={av_base_values} metrics={av_base_metrics} />
                        <Group name={base_names[1]} base={ac} getAnswer={this.getAnswer} values={ac_base_values} metrics={ac_base_metrics} />
                        <Group name={base_names[2]} base={au} getAnswer={this.getAnswer} values={au_base_values} metrics={au_base_metrics} />
                    </Col>
                    <Col span={12} >
                        <Group name={base_names[3]} base={c} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                        <Group name={base_names[4]} base={i} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                        <Group name={base_names[5]} base={a} getAnswer={this.getAnswer} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                    </Col>
                </Row>
            </div>
        )
    }
}
export default BaseMetrics;