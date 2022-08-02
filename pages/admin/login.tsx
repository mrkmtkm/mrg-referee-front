import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  FormLabel,
  Button,
  Alert,
} from 'react-bootstrap';
import { AdminAuthService, UserAuthService } from '@/services';
import { useRouter } from 'next/router';
import { Link } from '@/components/atoms';

const Login = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const authService = new AdminAuthService();
      await authService.login(name, password);
      router.push('/admin');
    } catch {
      setShowAlert(true);
    }
  };
  return (
    <Container as='section'>
      <Row className='justify-content-center'>
        <Col lg='6'>
          <Card className='border-0'>
            <Card.Body>
              <h1 className='h4 text-center font-weight-bold mb-4'>ログイン</h1>
              {showAlert && (
                <Alert variant='danger' className='text-center'>
                  入力内容に誤りがあります。もう一度入力してください。
                </Alert>
              )}
              <Form onSubmit={onSubmit}>
                <FormGroup className='mb-4'>
                  <FormLabel>名前</FormLabel>
                  <input
                    className='form-control mb-3'
                    type='text'
                    required
                    value={name}
                    placeholder='名前を入力してください'
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className='mb-4'>
                  <FormLabel>パスワード</FormLabel>
                  <input
                    className='form-control mb-3'
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    placeholder='パスワードを入力してください'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <FormGroup controlId='visible-password' className='mb-4'>
                  <Form.Check
                    label='パスワードを表示する'
                    type='checkbox'
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className='d-flex align-items-center'
                  />
                </FormGroup>
                <Button
                  type='submit'
                  variant='primary'
                  className='d-block w-100 font-weight-bold'
                >
                  ログイン
                </Button>
                <div className='border-top pt-5 mt-5 text-center'>
                  <p>
                    登録がお済みでない方は
                    <Link href='/admin/signup' as='/admin/signup'>
                      会員登録
                    </Link>
                  </p>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
