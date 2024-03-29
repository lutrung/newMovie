import { TeamOutlined, VideoCameraOutlined } from '@ant-design/icons';
import CameraOutlinedIcon from '@mui/icons-material/CameraOutlined';
import { Breadcrumb, Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route } from "react-router-dom";
import Swal from 'sweetalert2';
import logo from '../Assets/Images/logo.png';
const { Header, Content, Sider } = Layout;
export default function AdminTemplates(props) {
    const userSignIn = useSelector(state => state.UserManagerReducer.userSignIn)
    const [state, setState] = useState({ collapsed: false });
    const onCollapse = (collapsed) => {
        setState({ collapsed });
    };
    let { Component, ...resParams } = props;
    return (
        <Route
            {...resParams}
            render={(props) => {
                return (localStorage.getItem("USER_SIGNIN") && userSignIn.maLoaiNguoiDung === 'QuanTri') ? <Layout style={{ minHeight: "100vh" }}>
                    <Sider
                        collapsible
                        collapsed={state.collapsed}
                        onCollapse={onCollapse}
                    >
                        <div className="logo" />
                        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                            <div className="pt-5 pb-5 text-center">
                                <NavLink to='/'>
                                    <img
                                        src={logo} alt='logo'
                                        style={{ borderRadius: "50%", height: '50px', width: '50px' }}
                                    />
                                </NavLink>
                                {!state.collapsed ? (
                                    <div className="text-warning mt-3 font-weight-bold">
                                        ADMIN
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                            <Menu.Item key="3" color='red' icon={<VideoCameraOutlined />}>
                                <NavLink to='/admin/quanlyphim'>Quản lý phim</NavLink>
                            </Menu.Item>
                            <Menu.Item key="6" icon={<TeamOutlined />} >
                                <NavLink to='/admin/quanlynguoidung'>Quản lý người dùng</NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Header
                            className="site-layout-background"
                            style={{ padding: 0, textAlign: 'center', color: '#fff', fontSize: 20 }}
                        >Lư Trung <CameraOutlinedIcon /> Cinema </Header>
                        <Content style={{ margin: "0 16px" }}>
                            <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
                            <div
                                className="site-layout-background"
                                style={{ padding: 24, minHeight: 360 }}
                            >
                                <Component {...props} />
                            </div>
                        </Content>
                        {/* <Footer style={{ textAlign: "center", padding: '15px 50px' }}>
                            Lư Trung Cinema
                        </Footer> */}
                    </Layout>
                </Layout> : props.history.push('/')
            }}
        />
    )
}
