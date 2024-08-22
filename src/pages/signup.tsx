import React from 'react';
import { useDispatch } from 'react-redux';
import { setUserData, setToken } from '../reduxtoolkit/reducers/userSlice';
import { Form, Input, Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../config/firebaseMethods';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { username, email, password } = values;

    try {
      await signUp(email, password);
      const token = 'user-token'; 
      dispatch(setUserData({ username, email, password }));
      dispatch(setToken(token));
      navigate('/home');
    } catch (err) {
      console.error('Sign up error:', err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{backgroundColor:'#023e8a', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Sign Up" style={{ width: 300 }}>
        <Form
          name="signup"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default SignUpPage;
