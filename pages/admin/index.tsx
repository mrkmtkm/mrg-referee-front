import React, {
  useContext,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { AdminAuth } from '@/components';
import { AdminAuthService } from '@/services';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';
import { Tournament } from '@/entities/tournament';
import { AdminRepository } from '@/repositories';
import { TournamentRepository } from '@/repositories/tournament';
import { TournamentAddModal } from '@/components/organisms/tournament_add_modal';

const AdminTopJSX = () => {
  const router = useRouter();
  const onLogout = () => {
    const authService = new AdminAuthService();
    authService.logout();
    router.push('/admin/login');
  };
  const currentAdmin = useContext(AdminContext);

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);
  useEffect(() => {
    if (!currentAdmin) return;

    TournamentRepository.index().then(setTournaments);
  }, []);

  const onDelete = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    try {
      await TournamentRepository.delete(id);
      alert('削除しました');
      location.reload();
    } catch {
      alert('エラーが発生しました');
    }
  };

  return (
    <Container className='w-75'>
      <h1 className='py-4 text-center font-weight-bold'>主催者:大会一覧</h1>
      <div className='justify-content-end d-flex'>
        {currentAdmin?.name + 'でログイン中'}
      </div>
      <div className='justify-content-end d-flex'>
        <Button className='bg-danger my-2' onClick={onLogout}>
          ログアウト
        </Button>
      </div>
      <div className='justify-content-end d-flex'>
        <Button onClick={() => setIsModalActive(true)}>大会の追加</Button>
      </div>
      <Table striped bordered hover className='m-3'>
        <thead>
          <tr>
            <th>大会ID</th>
            <th>大会名</th>
            <th>日付</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tournaments.map((tournament) => {
            return (
              <tr key={tournament.id}>
                <td>{tournament.tournamentId}</td>
                <td>{tournament.name}</td>
                <td>{tournament.date.toLocaleString()}</td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();

                      router.push(
                        `/admin/tournament/${tournament.tournamentId}`
                      );
                    }}
                  >
                    詳細
                  </Button>
                </td>
                <td>
                  <Button
                    className='bg-danger'
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(tournament.id);
                    }}
                  >
                    削除
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {isModalActive && currentAdmin !== null && (
        <TournamentAddModal
          show={show}
          setShow={setShow}
          admin={currentAdmin}
        />
      )}
    </Container>
  );
};

const AdminTop: FunctionComponent = () => {
  return (
    <AdminAuth>
      <AdminTopJSX />
    </AdminAuth>
  );
};

export default AdminTop;
