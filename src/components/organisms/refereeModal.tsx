import { Admin, AdminEditForm } from '@/entities';
import { RefereeScoreForm } from '@/entities/referee_score';
import { Result, ResultForm } from '@/entities/result';
import { TournamentEditForm } from '@/entities/tournament';
import { AdminRepository } from '@/repositories';
import { AdminService } from '@/services';
import { TournamentService } from '@/services/tournament';
import { result } from 'lodash';
import { DateTime } from 'luxon';
import React, { FunctionComponent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { io, Socket } from 'socket.io-client';

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  result: Result;
  name: string;
  listData: Result[];
  setListData: React.Dispatch<React.SetStateAction<Result[]>>;
}
const socket = io('http://localhost:4000');
export const RefereeModal: FunctionComponent<Props> = (props) => {
  const [refereeForm, setRefereeForm] = useState<RefereeScoreForm>({
    resultId: props.result.id,
    refereeName: props.name,
    execution: null,
    difficulty: null,
  });

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      socket.emit('send_admin', {
        resultId: refereeForm.resultId,
        refereeName: props.name,
        difficulty: refereeForm.difficulty,
        execution: refereeForm.execution,
      });
      const filterData = props.listData.filter((data) => data !== props.result);
      props.setListData(filterData);
      alert('採点結果を送信しました');
      props.setShow(false);
    } catch {
      alert('送信に失敗しました');
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.setShow(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title className='h6 font-weight-bold'>
          {props.result.playerName}の採点
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>構成</Form.Label>
            <Form.Control
              placeholder='構成の点数を入力してください。'
              type='number'
              max={10}
              value={refereeForm.difficulty ?? ''}
              onChange={(e) => {
                if (Number(e.target.value) == 0) {
                  return setRefereeForm({
                    ...refereeForm,
                    difficulty: null,
                  });
                }
                return setRefereeForm({
                  ...refereeForm,
                  difficulty: Number(e.target.value),
                });
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>実施</Form.Label>
            <Form.Control
              placeholder='実施の点数を入力してください。'
              max={10}
              type='number'
              value={refereeForm.execution ?? ''}
              onChange={(e) => {
                if (Number(e.target.value) == 0) {
                  return setRefereeForm({
                    ...refereeForm,
                    execution: null,
                  });
                }
                return setRefereeForm({
                  ...refereeForm,
                  execution: Number(e.target.value),
                });
              }}
            />
          </Form.Group>

          <div className='text-right'>
            <Button type='submit' className='p-3 pl-4 pr-4'>
              点数を送信する
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
