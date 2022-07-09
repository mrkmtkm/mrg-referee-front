import { Admin, AdminEditForm } from '@/entities';
import { AdminRepository } from '@/repositories';
import { AdminService } from '@/services';
import React, { FunctionComponent, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

interface Props {
    show: boolean;
    setShow: React.Dispatch<React.SetStateAction<boolean>>;
    admin: Admin;
}

export const AdminEditModal: FunctionComponent<Props> = props => {
    const [updateForm, setUpdateForm] = useState<AdminEditForm>({
        id: props.admin.id,
        name: props.admin.name,
        password: '',
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const onSubmit: React.FormEventHandler = async e => {
        e.preventDefault();
        try {
            await AdminService.update(updateForm);
            alert('更新が完了しました');
            props.setShow(false);
            location.reload();
        } catch {
            alert('更新に失敗しました');
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
                    管理者情報更新
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={onSubmit}>
                    <Form.Group>
                        <Form.Label>お名前</Form.Label>
                        <Form.Control
                            required
                            placeholder='名前を入力してください。'
                            type='text'
                            value={updateForm.name}
                            onChange={e =>
                                setUpdateForm({
                                    ...updateForm,
                                    name: e.target.value,
                                })
                            }
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>パスワード</Form.Label>
                        <Form.Control
                            placeholder='パスワードを入力してください。'
                            type={showPassword ? 'text' : 'password'}
                            value={updateForm.password}
                            onChange={e => {
                                setUpdateForm({
                                    ...updateForm,
                                    password: e.target.value,
                                });
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            label='パスワードを表示する'
                            checked={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </Form.Group>
                    <div className='text-right'>
                        <Button type='submit' className='p-3 pl-4 pr-4'>
                            更新する
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
