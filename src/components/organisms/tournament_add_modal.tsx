import { Admin, AdminEditForm } from '@/entities';
import { TournamentEditForm } from '@/entities/tournament';
import { AdminRepository } from '@/repositories';
import { AdminService } from '@/services';
import { TournamentService } from '@/services/tournament';
import { DateTime } from 'luxon';
import React, { FunctionComponent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  admin: Admin;
}

export const TournamentAddModal: FunctionComponent<Props> = (props) => {
  const [addForm, setAddForm] = useState<TournamentEditForm>({
    adminName: props.admin.name,
    tournamentId: '',
    name: '',
    date: new Date(),
  });

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await TournamentService.store(addForm);
      alert('大会を追加しました');
      props.setShow(false);
      location.reload();
    } catch {
      alert('大会の追加に失敗しました');
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
        <Modal.Title className='h6 font-weight-bold'>大会の追加</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>大会名</Form.Label>
            <Form.Control
              required
              placeholder='大会名を入力してください。'
              type='text'
              value={addForm.name}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>大会ID</Form.Label>
            <Form.Control
              required
              placeholder='大会IDを入力してください。'
              type='text'
              value={addForm.tournamentId}
              onChange={(e) =>
                setAddForm({
                  ...addForm,
                  tournamentId: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>日付</Form.Label>
            <Form.Control
              placeholder='日付を入力してください。'
              type={'date'}
              value={DateTime.fromJSDate(addForm.date).toFormat('yyyy-MM-dd')}
              onChange={(e) => {
                setAddForm({
                  ...addForm,
                  date: new Date(e.target.value),
                });
              }}
            />
          </Form.Group>

          <div className='text-right'>
            <Button type='submit' className='p-3 pl-4 pr-4'>
              大会を追加する
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
