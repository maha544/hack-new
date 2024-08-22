import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu, Dropdown, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { clearUserData } from '../reduxtoolkit/reducers/userSlice';
const { Header } = Layout;

const HeaderComp = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.user.token);

  const handleLogout = () => {
    dispatch(clearUserData());
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="1">
        <UserOutlined />
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <LogoutOutlined />
        Logout
      </Menu.Item>
      {token && (
        <Menu.Item key="3">
          <span>Token: {token}</span>
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <Header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="logo" style={{ color: 'white', fontSize: '20px', marginRight: '20px' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>MyApp</Link>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/contact">Contact</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        {token ? (
          <Dropdown overlay={userMenu}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          </Dropdown>
        ) : (
          <Button type="primary" icon={<LoginOutlined />} >
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </Header>
  );
};

export default HeaderComp;
