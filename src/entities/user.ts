export enum Gender {
    Male = '0',
    Female = '1',
}

export class User {
    constructor(
        public id: number,
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
}
export class UserIndex {
    constructor(
        public users: User[],
        public currentPage: number,
        public lastPage: number,
        public total: number,
        public to:number
    ) {}
}
