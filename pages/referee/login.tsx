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
import { TournamentRepository } from '@/repositories/tournament';

const RefereeLogin = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [tournamentId, setTournamentId] = useState('');

  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const tournament = await TournamentRepository.findByTournamentId(
        tournamentId
      );
      localStorage.setItem('name', name);
      localStorage.setItem('tournamentName', tournament.name);
      localStorage.setItem('tournamentId', tournamentId);

      router.push('/referee');
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
              <h1 className='h4 text-center font-weight-bold mb-4'>
                審判ログイン
              </h1>
              {showAlert && (
                <Alert variant='danger' className='text-center'>
                  大会IDが間違っています。もう一度入力してください。
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
                  <FormLabel>大会ID</FormLabel>
                  <input
                    className='form-control mb-3'
                    type={'text'}
                    required
                    value={tournamentId}
                    placeholder='大会IDを入力してください'
                    onChange={(e) => setTournamentId(e.target.value)}
                  />
                </FormGroup>

                <Button
                  type='submit'
                  variant='primary'
                  className='d-block w-100 font-weight-bold'
                >
                  ログイン
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RefereeLogin;
