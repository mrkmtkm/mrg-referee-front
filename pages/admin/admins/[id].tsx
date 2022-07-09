import React, { useContext, useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { AdminAuthService, AdminService } from '@/services';
import { useRouter } from 'next/router';
import { AdminContext } from '@/contexts';
import { Admin } from '@/entities';
import { AdminRepository } from '@/repositories';
import { NextPage } from 'next';

interface Props {
    adminId: number;
}

const AdminDetail: NextPage<Props> = ({ adminId }) => {
    const router = useRouter();

    const [admin, setAdmin] = useState<Admin>();

    useEffect(() => {
        const currentAdmin = AdminService.me();
        if (!currentAdmin) router.push('/admin/login');
        AdminRepository.get(adminId).then(setAdmin);
    }, []);

    return (
        <Container className='w-75'>
            <h1 className='py-2'>管理者詳細</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>お名前</th>
                        <th>作成日時</th>
                        <th>更新日時</th>
                    </tr>
                </thead>
                <tbody>
                    {admin && (
                        <tr>
                            <td>{admin.id}</td>
                            <td>{admin.name}</td>
                            <td>{admin.createdAt.toLocaleString()}</td>
                            <td>{admin.updatedAt.toLocaleString()}</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};
AdminDetail.getInitialProps = async ctx => {
    const adminId = Number(ctx.query.id);
    return { adminId };
};

export default AdminDetail;
