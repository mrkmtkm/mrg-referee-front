import { Admin, AdminEditForm } from '@/entities';
import { ResultForm } from '@/entities/result';
import { TournamentEditForm } from '@/entities/tournament';
import { AdminRepository } from '@/repositories';
import { AdminService } from '@/services';
import { ResultService } from '@/services/result';
import { TournamentService } from '@/services/tournament';
import { DateTime } from 'luxon';
import React, { FunctionComponent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  tournamentId: string;
}

export const ResultAddModal: FunctionComponent<Props> = (props) => {
  const [addForm, setAddForm] = useState<ResultForm>({
    tournamentId: props.tournamentId,
    playerName: '',
    item: '',
    execution: null,
    difficulty: null,
    deduction: null,
  });

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await ResultService.store(addForm);
      alert('選手を追加しました');
      props.setShow(false);
      location.reload();
    } catch {
      alert('失敗しました');
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
        <Modal.Title className='h6 font-weight-bold'>選手の追加</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>選手名</Form.Label>
            <Form.Control
              required
              placeholder='選手名を入力してください。'
              type='text'
              value={addForm.playerName}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  playerName: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>種目</Form.Label>
            <Form.Control
              required
              placeholder='種目を入力してください。'
              type='text'
              value={addForm.item}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  item: e.target.value,
                })
              }
            />
          </Form.Group>

          <div className='text-right'>
            <Button type='submit' className='p-3 pl-4 pr-4'>
              選手を追加する
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
