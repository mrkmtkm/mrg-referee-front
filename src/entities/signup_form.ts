import { Gender } from './user';

export class UserSignupForm {
    constructor(
        public name: string,
        public kana: string,
        public gender: Gender | null,
        public birthday: Date,
        public email: string,
        public phone: string,
        public place: string,
        public jobType: string,
        public body: string | undefined,
    ) {}

    update(params: Partial<UserSignupForm>): UserSignupForm {
        return new UserSignupForm(
            params.name == null ? this.name : params.name,
            params.kana == null ? this.kana : params.kana,
            params.gender == null ? this.gender : params.gender,
            params.birthday == null ? this.birthday : params.birthday,
            params.email == null ? this.email : params.email,
            params.phone == null ? this.phone : params.phone,
            params.place == null ? this.place : params.place,
            params.jobType == null ? this.jobType : params.jobType,
            params.body == null ? this.body : params.body,
        );
    }
}
