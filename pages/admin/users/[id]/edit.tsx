import { UserEditForm } from '@/components/organisms/user_edit_form';
import { AdminContext } from '@/contexts';
import { User } from '@/entities';
import { UserRepository } from '@/repositories';
import { AdminService, UserService } from '@/services';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';

interface Props {
    userId: number;
}
const UserDetail: NextPage<Props> = ({ userId }) => {
    const router = useRouter();

    const [userEditForm, setUserEditForm] = useState<User>();

    useEffect(() => {
        const currentAdmin = AdminService.me();
        if (!currentAdmin) router.push('/admin/login');
        UserRepository.get(userId).then(setUserEditForm);
    }, []);

    const onSubmit: React.FormEventHandler = async e => {
        e.preventDefault();
        if (!userEditForm) return;
        try {
            await UserService.update(userEditForm);
            alert('更新しました');
            router.push('/admin/users');
        } catch (e) {
            alert('更新に失敗しました');
        }
    };
    return (
        <Container className='w-75'>
            <h1 className=' text-center font-weight-bold m-4'>更新ページ</h1>
            <Form onSubmit={onSubmit}>
                {userEditForm && (
                    <UserEditForm
                        userEditForm={userEditForm}
                        handleChangeForm={setUserEditForm}
                    />
                )}

                <Button type='submit' className='w-50 w-xs-100 mt-4'>
                    更新する
                </Button>
            </Form>
        </Container>
    );
};
UserDetail.getInitialProps = async ctx => {
    const userId = Number(ctx.query.id);
    return { userId };
};

export default UserDetail;
