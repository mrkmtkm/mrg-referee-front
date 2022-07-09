import React, { useContext, FunctionComponent } from 'react';
import { Button, Container } from 'react-bootstrap';
import { AdminAuth } from '@/components';
import { AdminAuthService } from '@/services';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';

const AdminTopJSX = () => {
    const router = useRouter();
    const onLogout = () => {
        const authService = new AdminAuthService();
        authService.logout();
        router.push('/admin/login');
    };
    const currentAdmin = useContext(AdminContext);

    return (
        <Container className='w-75'>
            <h1 className='py-2'>Hello Admin</h1>
            <p>I hope you are having a great day!</p>
            <div>
                <a href='/admin/signup'>Add Admin</a>
            </div>
            <div>
                <a href='/admin/admins'>Admins</a>
            </div>

            <Button onClick={onLogout}>ログアウト</Button>
        </Container>
    );
};

const AdminTop: FunctionComponent = () => {
    return (
        <AdminAuth>
            <AdminTopJSX />
        </AdminAuth>
    );
};

export default AdminTop;
