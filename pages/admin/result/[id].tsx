import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form, Table } from 'react-bootstrap';
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
import { io } from 'socket.io-client';
import { RefereeScore } from '@/entities/referee_score';
import { RefereeScoreRepository } from '@/repositories/referee_score';
import { ResultFactory } from '@/factories/result';
import { ResultService } from '@/services/result';

interface Props {
  resultId: string;
}

const socket = io('http://localhost:4000');

const ResultDetail: NextPage<Props> = ({ resultId }) => {
  const router = useRouter();
  const [result, setResult] = useState<Result>();
  const [listData, setListData] = useState<RefereeScore[]>([]);
  const [count, setCount] = useState(0);
  const [isGetResult, setIsGetResult] = useState(false);
  useEffect(() => {
    const currentAdmin = AdminService.me();
    if (!currentAdmin) router.push('/admin/login');

    ResultRepository.get(resultId).then(setResult);
    setIsGetResult(true);
  }, []);

  useEffect(() => {
    if (result) {
      RefereeScoreRepository.index(resultId).then((data) => {
        setListData(data);
        const difficulty = data.map((d) => d.difficulty);
        const execution = data.map((d) => d.execution);
        const len = data.length;
        let totalDifficulty = difficulty.reduce(
          (sum, element) => sum + element,
          0
        );
        let totalExecution = execution.reduce(
          (sum, element) => sum + element,
          0
        );

        setResult({
          id: result.id,
          tournamentId: result.tournamentId,
          playerName: result.playerName,
          item: result.item,
          execution: totalExecution / len,
          difficulty: totalDifficulty / len,
          deduction: result.deduction,
        });
      });
    }
    setTimeout(function () {
      setCount(count + 1);
    }, 5000);
  }, [count, isGetResult]);

  const pushReferee = () => {
    socket.emit('send_referee', {
      id: result?.id,
      tournamentId: result?.tournamentId,
      playerName: result?.playerName,
      item: result?.item,
    });
    alert('???????????????????????????');
  };
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
    if (!confirm('?????????????????????')) return;
    try {
      await RefereeScoreRepository.delete(id);
      alert('??????????????????');
      location.reload();
    } catch {
      alert('??????????????????????????????');
    }
  };

  const saveScore = async (resultData: Result) => {
    try {
      console.log(resultData);
      await ResultService.update(resultData);
      alert('??????????????????');
      location.reload();
    } catch {
      alert('??????????????????????????????');
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
        ??? ?????????????????????
      </Button>
      <h1 className='py-2 text-center'>????????????</h1>

      <Table striped bordered hover className='text-center my-3'>
        <thead>
          <tr>
            <th>?????????</th>
            <th>??????</th>
            <th>??????</th>
            <th>??????</th>
            <th className='col-2'>??????</th>
            <th>??????</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{result?.playerName}</th>
            <th>{result?.item}</th>
            <th>{result?.difficulty}</th>
            <th>{result?.execution}</th>
            <th>
              <input
                type='number'
                value={result?.deduction}
                onChange={(e) => {
                  if (result) {
                    let value: number | undefined = Number(e.target.value);
                    if (value == 0) {
                      value = undefined;
                    }
                    setResult({
                      id: result.id,
                      tournamentId: result.tournamentId,
                      playerName: result.playerName,
                      item: result.item,
                      execution: result.execution,
                      difficulty: result.difficulty,
                      deduction: value,
                    });
                  }
                }}
              />
            </th>
            <th>
              {result
                ? score(result.difficulty, result.execution, result.deduction)
                : ''}
            </th>
          </tr>
        </tbody>
      </Table>
      <div className='d-flex'>
        <Button
          className='text-center '
          style={{ margin: ' 0 auto' }}
          size='lg'
          onClick={(e) => {
            pushReferee();
          }}
        >
          ????????????????????????
        </Button>
        <Button
          className='text-center bg-success '
          style={{ margin: ' 0 auto' }}
          size='lg'
          onClick={(e) => {
            e.preventDefault();
            if (result) {
              saveScore(result);
            }
          }}
        >
          ?????????????????????
        </Button>
      </div>

      <h1 className='py-3 text-center'>???????????????</h1>
      <Table striped bordered hover className='text-center'>
        <thead>
          <tr>
            <th>?????????</th>
            <th>??????</th>
            <th>??????</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listData.map((score) => (
            <tr key={score.id}>
              <th>{score.refereeName}</th>
              <th>{score.difficulty}</th>
              <th>{score.execution}</th>
              <th>
                <Button
                  className='bg-danger'
                  onClick={() => {
                    onDelete(score.id);
                  }}
                >
                  ??????
                </Button>
              </th>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

ResultDetail.getInitialProps = async (ctx) => {
  const resultId = String(ctx.query.id);
  return { resultId };
};
export default ResultDetail;
