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
import { Admin, AdminIndex } from '@/entities';
import { AdminRepository } from '@/repositories';
import { AdminEditModal } from '@/components/organisms';
import { AdminAuthService } from '@/services';

const AdminIndexJSX = () => {
  const router = useRouter();

  const currentAdmin = useContext(AdminContext);
  const [adminIndex, setAdminIndex] = useState<AdminIndex>();
  const currentPage = Number(router.query.page) ?? 1;

  const [keyword, setKeyword] = useState<string>(
    sessionStorage.getItem('adminKeyword') ?? ''
  );

  const [show, setShow] = useState<boolean>(false);
  const [modalAdmin, setModalAdmin] = useState<Admin>();
  const onLogout = () => {
    const authService = new AdminAuthService();
    authService.logout();
    router.push('/admin/login');
  };

  useEffect(() => {
    if (!currentAdmin) return;

    AdminRepository.index(currentPage, keyword).then(setAdminIndex);
  }, []);

  const onDelete = async (id: number) => {
    if (currentAdmin?.id !== id) {
      return alert('自分以外削除できません');
    }
    if (!confirm('削除しますか？')) return;
    try {
      await AdminRepository.delete(id);
      alert('削除しました');
      location.reload();
    } catch {
      alert('エラーが発生しました');
    }
  };
  const onSearch: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await AdminRepository.index(currentPage, keyword).then(setAdminIndex);
    } catch {
      alert('失敗したよ');
    }
  };

  const pagination = () => {
    if (!adminIndex) return;
    const lastPage = adminIndex.lastPage;
    const currentPage = adminIndex.currentPage;

    return (
      <div>
        <div className='text-center'>
          {`${adminIndex.total}件中　${(currentPage - 1) * 10 + 1}~${
            adminIndex.to
          }件表示`}
        </div>
        <div className='d-flex justify-content-center'>
          {[...Array(lastPage)]
            .map((_, i) => i + 1)
            .map((page, index) => {
              if (page === adminIndex.currentPage) {
                return (
                  <h5 key={index} className='m-1'>
                    {page}
                  </h5>
                );
              }
              return (
                <h5 key={index} className='m-1'>
                  <a href={`/admin/admins?page=${page}`}>{page}</a>
                </h5>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <Container className='w-75'>
      <h1 className='py-2'>管理者一覧</h1>
      <Button className='m-3'>
        <a href='/admin/signup' className='text-white'>
          管理者追加
        </a>
      </Button>
      <Button className='bg-danger' onClick={onLogout}>
        ログアウト
      </Button>
      <Form className='m-3' onSubmit={onSearch}>
        <Row>
          <Col md={6}>
            <FormControl
              placeholder='キーワード検索'
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                sessionStorage.setItem('adminKeyword', e.target.value);
              }}
            />
          </Col>
          <Col md={2}>
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
          <Col md={2}>
            <Button
              className='bg-danger'
              type='submit'
              style={{
                paddingTop: '0.42rem',
                paddingBottom: '0.42rem',
              }}
              onClick={() => {
                setKeyword('');
                sessionStorage.removeItem('adminKeyword');
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
            <th>お名前</th>
            <th>作成日時</th>
            <th>更新日時</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {adminIndex?.admins.map((admin) => {
            return (
              <tr key={admin.id}>
                <td>{admin.id}</td>
                <td>{admin.name}</td>
                <td>{admin.createdAt.toLocaleString()}</td>
                <td>{admin.updatedAt.toLocaleString()}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/admin/admins/${admin.id}`);
                    }}
                  >
                    詳細
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentAdmin?.id !== admin.id) {
                        return alert('自分以外編集できません');
                      }
                      setModalAdmin(admin);
                      setShow(true);
                    }}
                    className='bg-success'
                  >
                    編集
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(admin.id);
                    }}
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

      {modalAdmin && (
        <AdminEditModal show={show} setShow={setShow} admin={modalAdmin} />
      )}
    </Container>
  );
};
const AdminIndexPage: FunctionComponent = () => {
  return (
    <AdminAuth>
      <AdminIndexJSX />
    </AdminAuth>
  );
};

export default AdminIndexPage;
