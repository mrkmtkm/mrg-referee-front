import React, {
    useContext,
    FunctionComponent,
    useEffect,
    useState,
} from 'react';
import { Container, Table } from 'react-bootstrap';
import { AdminAuth } from '@/components';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';
import { Gender, User } from '@/entities';
import { UserRepository } from '@/repositories';

const UserDetailJSX = () => {
    const router = useRouter();
    const id = Number(router.query.id);

    const currentAdmin = useContext(AdminContext);
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!currentAdmin) return;

        UserRepository.get(id).then(setUser);
    }, []);

    return (
        <Container className='w-75'>
            <h1 className='py-2'>ユーザー詳細</h1>

            <Table striped bordered hover className='m-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th style={{whiteSpace:'nowrap'}}>お名前</th>
                        <th style={{whiteSpace:'nowrap'}}>フリガナ</th>
                        <th style={{whiteSpace:'nowrap'}}>性別</th>
                        <th style={{whiteSpace:'nowrap'}}>生年月日</th>
                        <th style={{whiteSpace:'nowrap'}}>メールアドレス</th>
                        <th style={{whiteSpace:'nowrap'}}>電話番号</th>
                        <th style={{whiteSpace:'nowrap'}}>希望勤務地</th>
                        <th style={{whiteSpace:'nowrap'}}>希望職種</th>
                        <th style={{whiteSpace:'nowrap'}}>ご質問・要望など</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={user?.id}>
                        <td>{user?.id}</td>
                        <td>{user?.name}</td>
                        <td>{user?.kana}</td>
                        <td>{user?.gender == Gender.Male ? '男性' : '女性'}</td>
                        <td>{user?.birthday.toLocaleString('ja-JP')}</td>
                        <td>{user?.email}</td>
                        <td>{user?.phone}</td>
                        <td>{user?.place}</td>
                        <td style={{whiteSpace:'nowrap'}}>{user?.jobType}</td>
                        <td>{user?.body}</td>
                    </tr>
                </tbody>
            </Table>
        </Container>
    );
};
const UserDetail: FunctionComponent = () => {
    return (
        <AdminAuth>
            <UserDetailJSX />
        </AdminAuth>
    );
};

export default UserDetail;
