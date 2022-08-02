import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { AdminAuthService, AdminService } from '@/services';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';
import { Admin } from '@/entities';
import { AdminRepository } from '@/repositories';
import { NextPage } from 'next';
import { TournamentRepository } from '@/repositories/tournament';
import { Tournament } from '@/entities/tournament';
import { Result } from '@/entities/result';
import { ResultRepository } from '@/repositories/result';
import { ResultAddModal } from '@/components/organisms/result_add_modal';

interface Props {
  tournamentId: string;
}

const TournamentDetail: NextPage<Props> = ({ tournamentId }) => {
  const router = useRouter();

  const [tournament, setTournament] = useState<Tournament>();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(true);

  const [results, setResults] = useState<Result[]>([]);
  useEffect(() => {
    const currentAdmin = AdminService.me();
    if (!currentAdmin) router.push('/admin/login');
    TournamentRepository.get(tournamentId).then(setTournament);
    ResultRepository.index(tournamentId).then(setResults);
  }, []);

  const score = (
    difficulty: number | null,
    execution: number | null,
    deduction: number | undefined
  ) => {
    if (!difficulty || !execution) {
      return '';
    }
    if (!deduction) {
      return Math.round((difficulty + execution) * 100) / 100;
    }
    return Math.round((difficulty + execution - deduction) * 100) / 100;
  };

  const onDelete = async (id: string) => {
    if (!confirm('削除しますか？')) return;
    try {
      await ResultRepository.delete(id);
      alert('削除しました');
      location.reload();
    } catch {
      alert('エラーが発生しました');
    }
  };

  return (
    <Container className='w-75'>
      <Button
        className='bg-dark  my-3 font-weight-bold border-0'
        onClick={(e) => {
          e.preventDefault();
          window.history.back();
        }}
      >
        ← 大会一覧に戻る
      </Button>
      <h1 className='py-4 text-center font-weight-bold'>{tournament?.name}</h1>
      <div className='text-center'>
        {tournament?.date.toLocaleString()}に開催
      </div>
      <div className='justify-content-end d-flex my-2'>
        <Button onClick={() => setIsModalActive(true)}>選手の追加</Button>
      </div>

      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>選手名</th>
            <th>種目</th>
            <th>構成</th>
            <th>実施</th>
            <th>減点</th>
            <th>合計</th>
            <th className='col-2'></th>
            <th className='col-1'></th>
          </tr>
        </thead>
        <tbody>
          {results.map((result) => {
            return (
              <tr key={result.id}>
                <th>{result.playerName}</th>
                <th>{result.item}</th>
                <th>{result.difficulty}</th>
                <th>{result.execution}</th>
                <th>{result.deduction}</th>
                <th>
                  {score(result.difficulty, result.execution, result.deduction)}
                </th>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(`/admin/result/${result.id}`);
                    }}
                  >
                    採点詳細
                  </Button>
                </td>
                <td>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(result.id);
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
      {isModalActive && (
        <ResultAddModal
          show={show}
          setShow={setShow}
          tournamentId={tournamentId}
        />
      )}
    </Container>
  );
};

TournamentDetail.getInitialProps = async (ctx) => {
  const tournamentId = String(ctx.query.id);
  return { tournamentId };
};

export default TournamentDetail;
