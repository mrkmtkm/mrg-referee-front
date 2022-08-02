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
import io from 'socket.io-client';
import { Result, ResultForm } from '@/entities/result';
import { RefereeModal } from '@/components/organisms/refereeModal';

const socket = io('http://localhost:4000');

const RefereeTop = () => {
  const router = useRouter();
  const onLogout = () => {
    router.push('/referee/login');
  };

  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [tournamentName, setTournamentName] = useState<string>('');
  const [tournamentId, setTournamentId] = useState<string>('');
  const [listData, setListData] = useState<Result[]>([]);
  const [resultForm, setResultForm] = useState<Result>();

  useEffect(() => {
    localStorage.setItem('test', 'test');
    if (!localStorage.getItem('name')) {
      router.push('/referee/login');
    }
    const localName = localStorage.getItem('name');
    localName && setName(localName);

    const localTournament = localStorage.getItem('tournamentName');
    localTournament && setTournamentName(localTournament);

    const localTournamentId = localStorage.getItem('tournamentId');
    localTournamentId && setTournamentId(localTournamentId);
  }, []);

  socket.on(tournamentId, (data) => {
    const result: Result = {
      id: data.id,
      tournamentId: data.tournamentId,
      playerName: data.playerName,
      item: data.item,
      execution: 0,
      difficulty: 0,
      deduction: 0,
    };
    setListData([...listData, result]);
  });

  return (
    <Container className='w-75'>
      <h1 className='py-4 text-center'>審判:大会一覧</h1>
      <div className='justify-content-end d-flex'>{name + 'でログイン中'}</div>
      <div className='justify-content-end d-flex'>
        {tournamentName + 'を採点中'}
      </div>
      <div className='justify-content-end d-flex'>
        <Button className='bg-danger' onClick={onLogout}>
          ログアウト
        </Button>
      </div>
      <Table striped bordered hover className='m-3'>
        <thead>
          <tr>
            <th>選手名</th>
            <th>種目</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listData.map((result) => (
            <tr>
              <th>{result.playerName}</th>
              <th>{result.item}</th>
              <th>
                <Button
                  onClick={() => {
                    setResultForm(result);
                    setShow(true);
                  }}
                >
                  採点する
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>

      {show && resultForm && (
        <RefereeModal
          show={show}
          setShow={setShow}
          result={resultForm}
          name={name}
          listData={listData}
          setListData={setListData}
        />
      )}
    </Container>
  );
};

export default RefereeTop;
