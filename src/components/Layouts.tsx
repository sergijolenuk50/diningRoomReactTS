import React, { useState } from 'react';
import {
    HomeFilled,
    InfoCircleFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    ProductFilled,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const AppLayout: React.FC = () => {
    const { pathname } = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout className='AppLayout'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    defaultSelectedKeys={[pathname]}
                    items={[
                        {
                            key: '/',
                            icon: <HomeFilled />,
                            label:  <Link to="/">Home</Link>,
                        },
                        {
                            key: '/Menu',
                            icon: <InfoCircleFilled />,
                            label: <Link to="/Menu">Menu</Link>,
                        },
                        {
                            key: '/about',
                            icon: <ProductFilled />,
                            label:  <Link to="/about">About</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout className='main'>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    className='Content'
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {/* Content */}
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default AppLayout;