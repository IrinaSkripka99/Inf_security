import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import Content from './components/Content/Content';
const { Header, Footer } = Layout;

export default function App() {
    return (
        <Layout className="layout" style={{ height: '-webkit-fill-available' }}>
            <Header>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                >
                </Menu>
            </Header>
            <Content/>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
}