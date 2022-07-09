/* istanbul ignore file */
import { getAdminClient } from '@/lib';
import { User } from '@/entities';
import { DateTime } from 'luxon';

export class UserService {
    static async update({
        id,
        name,
        kana,
        gender,
        birthday,
        email,
        phone,
        place,
        jobType,
        body,
    }: User): Promise<void> {
        const fd = new FormData();

        fd.append('name', name);
        fd.append('kana', kana);
        fd.append('gender', String(gender));
        fd.append(
            'birthday',
            DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd'),
        );
        fd.append('email', email);
        fd.append('phone', phone);
        fd.append('place', place);
        fd.append('job_type', jobType);
        body ? fd.append('body', body) : fd.append('body', '');

        await getAdminClient().post(`/api/user/${id}`, fd);
    }
}
