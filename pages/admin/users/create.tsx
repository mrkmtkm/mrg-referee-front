import { NewSignupForm } from '@/components/organisms';
import { UserSignupForm } from '@/entities';
import { UserSignupFormFactory } from '@/factories/user_signup_form';
import { SignupService } from '@/services';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CreateUser = (): JSX.Element => {
    const router = useRouter();
    const [signupForm, setSignupForm] = useState<UserSignupForm>(
        UserSignupFormFactory.createEmpty(),
    );
    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const updateForm = (params: Partial<UserSignupForm>) => {
        setSignupForm(signupForm.update(params));
    };

    const onSubmit: React.FormEventHandler = async e => {
        e.preventDefault();
        if (!isConfirm) {
            setIsConfirm(true);
            return;
        }
        try {
            await SignupService.userSignup(signupForm);
            router.push('/admin/users/thanks');
        } catch (e) {
            alert('登録に失敗しました');
        }
    };
    return (
        <Container className='w-75'>
            <h1 className=' text-center font-weight-bold m-4'>
                {isConfirm ? '確認画面' : '本登録'}
            </h1>
            <Form onSubmit={onSubmit}>
                <NewSignupForm
                    signupForm={signupForm}
                    handleChangeForm={updateForm}
                    isConfirm={isConfirm}
                />
                {!isConfirm && (
                    <Form.Check
                        type={'checkbox'}
                        label={`確認してください`}
                        required
                        className='text-danger'
                        disabled={isConfirm}
                    />
                )}

                <div className='text-center mb-5'>
                    {isConfirm == false ? (
                        <Button type='submit' className='w-50 w-xs-100 mt-4'>
                            確認画面へ進む
                        </Button>
                    ) : (
                        <Row>
                            <Col>
                                <Button
                                    className='w-50 w-xs-100 mt-4 bg-light text-dark'
                                    onClick={e => {
                                        e.preventDefault();
                                        setIsConfirm(false);
                                    }}
                                >
                                    戻る
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    type='submit'
                                    className='w-50 w-xs-100 mt-4'
                                >
                                    登録する
                                </Button>
                            </Col>
                        </Row>
                    )}
                </div>
            </Form>
        </Container>
    );
};

export default CreateUser;
