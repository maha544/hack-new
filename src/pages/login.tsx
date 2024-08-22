import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData, setToken } from '../reduxtoolkit/reducers/userSlice';
import { logIn } from '../config/firebaseMethods';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const { email, password } = values;
    try {
      const userCredential = await logIn(email, password);
      const token = await userCredential.user.getIdToken(); 

      dispatch(setUserData({
        email,
        username: '',
        password: ''
      }));
      dispatch(setToken(token));

      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    alert('Please fill out the form correctly.');
  };

  return (
    <div style={{backgroundColor:'#023e8a', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card title="Login" style={{ width: 300 }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
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

          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Login
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <span>Don't have an account? </span>
          <Link to="/signup">Register here</Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
