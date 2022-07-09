import React, {
  useContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
  Table,
} from 'react-bootstrap';
import { AdminAuth } from '@/components';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';
import { Gender, UserIndex } from '@/entities';
import { UserRepository } from '@/repositories';
import { AdminAuthService } from '@/services';
import { FormOptions } from '@/components/organisms';

const UserIndexJSX = () => {
  const router = useRouter();

  const currentAdmin = useContext(AdminContext);
  const [userIndex, setUserIndex] = useState<UserIndex>();
  const currentPage = Number(router.query.page) ?? 1;
  const [keyword, setKeyword] = useState<string>(
    sessionStorage.getItem('userKeyword') ?? ''
  );
  const [placeKeyword, setPlaceKeyword] = useState<string>(
    sessionStorage.getItem('placeKeyword') ?? ''
  );
  const [jobKeyword, setJobKeyword] = useState<string>(
    sessionStorage.getItem('jobKeyword') ?? ''
  );
  const onLogout = () => {
    const authService = new AdminAuthService();
    authService.logout();
    router.push('/admin/login');
  };
  useEffect(() => {
    if (!currentAdmin) return;
    UserRepository.index(currentPage, keyword, placeKeyword, jobKeyword).then(
      setUserIndex
    );
  }, []);

  const onDelete = async (id: number) => {
    if (!confirm('削除しますか？')) return;
    try {
      await UserRepository.delete(id);
      alert('削除しました');
      location.reload();
    } catch {
      alert('エラーが発生しました');
    }
  };
  const onSearch: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await UserRepository.index(
        currentPage,
        keyword,
        placeKeyword,
        jobKeyword
      ).then(setUserIndex);
    } catch {
      alert('失敗したよ');
    }
  };

  const pagination = () => {
    if (!userIndex) return;
    const lastPage = userIndex.lastPage;
    const currentPage = userIndex.currentPage;
    return (
      <div>
        <div className='text-center'>
          {`${userIndex.total}件中　${(currentPage - 1) * 10 + 1}~${
            userIndex.to
          }件表示`}
        </div>
        <div className='d-flex justify-content-center'>
          {[...Array(lastPage)]
            .map((_, i) => i + 1)
            .map((page, index) => {
              if (page === userIndex.currentPage) {
                return (
                  <h5 key={index} className='m-1'>
                    {page}
                  </h5>
                );
              }
              return (
                <h5 key={index} className='m-1'>
                  <a href={`/admin/users?page=${page}`}>{page}</a>
                </h5>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <Container className='w-75'>
      <h1 className='py-2'>ユーザー一覧</h1>
      <Button className='m-3'>
        <a href='/admin/users/create' className='text-white'>
          ユーザー追加
        </a>
      </Button>
      <Button className='bg-danger' onClick={onLogout}>
        ログアウト
      </Button>
      <Form className='m-3' onSubmit={onSearch}>
        <Row>
          <Col md={3}>
            <FormControl
              placeholder='キーワード検索'
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                sessionStorage.setItem('userKeyword', e.target.value);
              }}
            />
          </Col>
          <Col md={4} className='d-flex'>
            <p style={{ whiteSpace: 'nowrap' }} className='m-2'>
              希望勤務地
            </p>
            <Form.Control
              as='select'
              value={placeKeyword || ''}
              onChange={(e) => {
                setPlaceKeyword(e.target.value);
                sessionStorage.setItem('placeKeyword', e.target.value);
              }}
            >
              {FormOptions.PlaceOptions()}
            </Form.Control>
          </Col>
          <Col md={4} className='d-flex'>
            <p style={{ whiteSpace: 'nowrap' }} className='m-2'>
              勤務職種
            </p>
            <Form.Control
              as='select'
              value={jobKeyword || ''}
              onChange={(e) => {
                setJobKeyword(e.target.value);
                sessionStorage.setItem('jobKeyword', e.target.value);
              }}
            >
              {FormOptions.JobTypeOptions()}
            </Form.Control>
          </Col>
          <Col md={2} className='mt-3'>
            <Button
              type='submit'
              style={{
                paddingTop: '0.42rem',
                paddingBottom: '0.42rem',
              }}
            >
              検索
            </Button>
          </Col>
          <Col md={3} className='mt-3'>
            <Button
              className='bg-danger'
              type='submit'
              style={{
                paddingTop: '0.42rem',
                paddingBottom: '0.42rem',
              }}
              onClick={() => {
                setKeyword('');
                setPlaceKeyword('');
                setJobKeyword('');
                sessionStorage.removeItem('userKeyword');
                sessionStorage.removeItem('placeKeyword');
                sessionStorage.removeItem('jobKeyword');
                location.reload();
              }}
            >
              リセット
            </Button>
          </Col>
        </Row>
      </Form>

      <Table striped bordered hover className='m-3'>
        <thead>
          <tr>
            <th>ID</th>
            <th style={{ whiteSpace: 'nowrap' }}>お名前</th>
            <th style={{ whiteSpace: 'nowrap' }}>フリガナ</th>
            <th style={{ whiteSpace: 'nowrap' }}>性別</th>
            <th style={{ whiteSpace: 'nowrap' }}>生年月日</th>
            <th style={{ whiteSpace: 'nowrap' }}>メールアドレス</th>
            <th style={{ whiteSpace: 'nowrap' }}>電話番号</th>
            <th style={{ whiteSpace: 'nowrap' }}>希望勤務地</th>
            <th style={{ whiteSpace: 'nowrap' }}>希望職種</th>
            <th style={{ whiteSpace: 'nowrap' }}>ご質問・要望など</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userIndex?.users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.kana}</td>
                <td>{user.gender == Gender.Male ? '男性' : '女性'}</td>
                <td>{user.birthday.toLocaleString()}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.place}</td>
                <td>{user.jobType}</td>
                <td>{user.body}</td>

                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/admin/users/${user.id}`);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    詳細
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/admin/users/${user.id}/edit`);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                    className='bg-success'
                  >
                    編集
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(user.id);
                    }}
                    style={{ whiteSpace: 'nowrap' }}
                    className='bg-danger'
                  >
                    削除
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {pagination()}
    </Container>
  );
};
const UserIndexPage: FunctionComponent = () => {
  return (
    <AdminAuth>
      <UserIndexJSX />
    </AdminAuth>
  );
};

export default UserIndexPage;
