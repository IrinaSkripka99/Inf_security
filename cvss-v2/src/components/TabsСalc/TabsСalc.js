import React from 'react'
import BaseMetrics from '../BaseMetrics/BaseMetrics';
import { Tabs } from 'antd';
import TimeMetrics from '../TimeMetrics/TimeMetrics';
import ContextMetrics from '../ContextMetrics/ContextMetrics';
import BaseMetricsV3 from '../BaseMetricsV3/BaseMetricsV3';
const { TabPane } = Tabs

class TabsCalc extends React.Component {
    constructor() {
        super();
        this.state = { base_score: 0, time_score: 0, data_from_base: [], data_from_time: [] }
        this.getBase = this.getBase.bind(this)
        this.getTime = this.getTime.bind(this)
    }

    getBase(base, arr) {
        this.setState({ base_score: base, data_from_base: arr })
    }
    getTime(base, arr) {
        this.setState({ time_score: base, data_from_time: arr })
    }

    render() {
        console.log(this.state.data_from_base)
        const base_names = ['Вектор доступа (AV)', 'Сложность доступа (AC)', 'Аутентификация (Au)',
            'Влияние на конфиденциальность (С)', 'Влияние на целостность (I)', 'Влияние на доступность (A)']

        const context_names = ['Вероятность нанесения косвенного ущерба (CDP)', 'Плотность целей (TD)',
            'Требования к конфиденциальности', 'Требования к целостности', 'Требования к доступности']

        const time_names = ['Возможость использования (E)', 'Уровень исправления (RL)', 'Степень достоверности источника (RC)']

        const base_names_v3 = ['Вектор атаки(AV)', 'Сложность атаки (AC)', 'Уровень привелегий (PR)', 'Взаимодействие с пользователем (UI)',
            'Влияние на другие коспоненты системы (S)', 'Влияние на конфиденциальность (С)', 'Влияние на целостность (I)', 'Влияние на доступность (A)']

        return (
            <Tabs defaultActiveKey="1" >
                <TabPane tab="Базовые метрики V2" key="1">
                    <BaseMetrics base_names={base_names} getBase={this.getBase} getData={this.getData} />
                </TabPane>
                <TabPane tab="Временные метрики V2" key="2">
                    <TimeMetrics time_names={time_names} base_score={this.state.base_score} getTime={this.getTime} />
                </TabPane>
                <TabPane tab="Контексные метрики V2" key="3">
                    <ContextMetrics context_names={context_names} data_from_base={this.state.data_from_base} data_from_time={this.state.data_from_time} />
                </TabPane>
                <TabPane tab="Базовые метрики V3" key="4">
                    <BaseMetricsV3 base_names_v3={base_names_v3} />
                </TabPane>
            </Tabs>
        )
    }
}

export default TabsCalc;