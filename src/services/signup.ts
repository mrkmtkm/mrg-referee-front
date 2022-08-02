/* istanbul ignore file */
import { getAdminClient, getUserClient } from '@/lib';
import { UserSignupForm } from '@/entities';
import { DateTime } from 'luxon';

export class SignupService {
  static async adminSignup(name: string, password: string): Promise<void> {
    await getAdminClient().post('/admin/signup', {
      name: name,
      password: password,
    });
  }

  static async userSignup({
    name,
    kana,
    gender,
    birthday,
    email,
    phone,
    place,
    jobType,
    body,
  }: UserSignupForm): Promise<void> {
    const fd = new FormData();
    fd.append('name', name);
    fd.append('kana', kana);
    fd.append('gender', String(gender));
    fd.append('birthday', DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd'));
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('place', place);
    fd.append('job_type', jobType);
    body ? fd.append('body', body) : fd.append('body', '');
    await getUserClient().post('/api/user/signup', fd);
  }
}
