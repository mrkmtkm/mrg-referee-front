import React from 'react';
import { Container } from 'react-bootstrap';

const Top = (): JSX.Element => {
    return (
        <Container>
            <a href='/admin/login'>ログイン</a>
            <a href='/admin/admins'>管理者一覧</a>
            <a href='/admin/users'>ユーザー一覧</a>
        </Container>
    );
};

export default Top;
