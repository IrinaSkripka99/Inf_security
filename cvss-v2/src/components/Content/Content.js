import React from 'react'
import { Layout, Row, Col, Menu, Icon, Alert } from 'antd';
import { Title } from './style';
import { Group } from '../Group/Group';

const { SubMenu } = Menu;
const { Sider } = Layout;

class Content extends React.Component {
    state = {
        av: 0,
        ac: 0,
        au: 0,
        c: 0,
        i: 0,
        a: 0,
        error: true,
        answer: 0,
        count: 0
    };
    getAnswer = (base, e) => {
        this.setState({ count: this.count++ });
        this.setState({ base: e.target.value });
        console.log(base)
    };
    render() {
        const { av, ac, au, c, i, a, error, answer } = this.state;

        const av_base_values = [0.395, 0.646, 1.0]
        const ac_base_values = [0.35, 0.61, 0.71]
        const au_base_values = [0.45, 0.56, 0.704]
        const c_i_a_base_values = [0.0, 0.275, 0.66]

        const av_base_metrics = ['Локальный (L)', 'Смежная сеть (A)', 'Сетевой (N)']
        const au_base_metrics = ['Высокая (M)', 'Средняя (S)', 'Низкая (N)']
        const ac_base_metrics = ['Множественная(H)', 'Единственная (M)', 'Не требуется (L)']
        const c_i_a_base_metrics = ['Не оказывает (N)', 'Частичное (P)', 'Полное (C)']

        return (

            <Layout.Content style={{ padding: '50px 50px' }}>
                <Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <SubMenu
                            key="sub1"
                            title={
                                <span>
                                    <Icon type="user" />
                                    Метрики
              </span>
                            }
                        >
                            <Menu.Item key="1">Базовые</Menu.Item>
                            <Menu.Item key="2">Временные</Menu.Item>
                            <Menu.Item key="3">Контексные</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        <Title>Калькулятор CVSS V2</Title>
                        <Row style={{ fontSize: '20px' }}>
                            <Col span={12}>
                                <Group name={'Вектор доступа (AV)'} base={av} getAnswer={(e) => this.getAnswer(av)} values={av_base_values} metrics={av_base_metrics} />
                                <Group name={'Сложность доступа (AC)'} base={ac} getAnswer={(e) => this.getAnswer(ac)} values={ac_base_values} metrics={ac_base_metrics} />
                                <Group name={'Аутентификация (Au)'} base={au} getAnswer={(e) => this.getAnswer(au)} values={au_base_values} metrics={au_base_metrics} />
                            </Col>
                            <Col span={12} >
                                <Group name={'Влияние на конфиденциальность (С)'} base={c} getAnswer={(e) => this.getAnswer(c)} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                                <Group name={'Влияние на целостность (I)'} base={i} getAnswer={(e) => this.getAnswer(i)} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                                <Group name={'Влияние на доступность (A)'} base={a} getAnswer={(e) => this.getAnswer(a)} values={c_i_a_base_values} metrics={c_i_a_base_metrics} />
                            </Col>
                        </Row>
                        {error ? <Alert message="You must select the value of each criterion!" type="warning" /> :
                            <Alert message={"Answer is :" + answer} type="success" />
                        }
                    </Content>
                </Layout>
            </Layout.Content >
        );
    }
}
export default Content;