import { UserSignupForm } from '@/entities';
import { DateTime } from 'luxon';

export class UserSignupFormFactory {
    static createEmpty(): UserSignupForm {
        return new UserSignupForm(
            '',
            '',
            null,
            new Date('1900-01-01'),
            '',
            '',
            '',
            '',
            '',
        );
    }

    static saveSession({
        name,
        kana,
        gender,
        birthday,
        email,
        phone,
        place,
        jobType,
        body,
    }: UserSignupForm): void {
        sessionStorage.setItem('name', name);
        sessionStorage.setItem('kana', kana);
        sessionStorage.setItem('gender', String(gender));
        sessionStorage.setItem(
            'birthday',
            DateTime.fromJSDate(birthday).toFormat('yyyy-MM-dd'),
        );
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('phone', phone);
        sessionStorage.setItem('place', place);
        sessionStorage.setItem('job_type', jobType);
        body && sessionStorage.setItem('body', body);
    }
}
