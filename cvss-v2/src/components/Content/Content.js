import React from 'react'
import { Layout } from 'antd';
import { Title } from './style';
import TabsCalc from '../TabsСalc/TabsСalc';

class Content extends React.Component {
   
    render() {
        return (
            <Layout.Content style={{ padding: '0 50px' }}>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Title>Калькулятор CVSS </Title>
                    <TabsCalc/>
                </div>
            </Layout.Content >
        );
    }
}
export default Content;