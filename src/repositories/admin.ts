import { getAdminClient } from '@/lib';
import {
    AdminResponseObject,
    AdminFactory,
    AdminIndexResponseObject,
} from '@/factories';
import { Admin, AdminIndex } from '@/entities';

export class AdminRepository {
    static async index(page: number, keyword: string): Promise<AdminIndex> {
        const res = await getAdminClient().get<AdminIndexResponseObject>(
            `/api/admin?page=${page}&keyword=${keyword}`,
        );

        return AdminFactory.createIndexObject(res.data);
    }
    static async get(id: number): Promise<Admin> {
        const res = await getAdminClient().get<AdminResponseObject>(
            `/api/admin/${id}`,
        );
        return AdminFactory.createFromResponseObject(res.data);
    }

    static async delete(id: number): Promise<void> {
        await getAdminClient().delete(`/api/admin/${id}`);
        return;
    }
}
