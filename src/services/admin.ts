import { Admin, AdminEditForm } from '@/entities';
import { AdminFactory, AdminResponseObject } from '@/factories';
import { getAdminClient } from '@/lib';

/* istanbul ignore file */
export class AdminService {
    static async me(): Promise<Admin> {
        const res = await getAdminClient().get<AdminResponseObject>(
            '/api/admin/me',
        );
        return AdminFactory.createFromResponseObject(res.data);
    }

    static async update({ id, name, password }: AdminEditForm): Promise<void> {
        const fd = new FormData();
        fd.append('name', name);
        fd.append('password', password);
        await getAdminClient().post(`/api/admin/${id}`, fd);
    }
}
