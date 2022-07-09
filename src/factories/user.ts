import { User, Gender, UserIndex } from '@/entities';

export interface UserResponseObject {
  id: number;
  name: string;
  kana: string;
  gender: Gender | null;
  birthday: string;
  email: string;
  phone: string;
  place: string;
  job_type: string;
  body: string | undefined;
}

export interface UserIndexResponseObject {
  data: UserResponseObject[];
  current_page: number;
  last_page: number;
  total: number;
  to: number;
}

export class UserFactory {
  static createFromResponseObject(res: UserResponseObject): User {
    return new User(
      res.id,
      res.name,
      res.kana,
      res.gender,
      new Date(res.birthday),
      res.email,
      res.phone,
      res.place,
      res.job_type,
      res.body
    );
  }
  static createIndexObject(res: UserIndexResponseObject): UserIndex {
    const users = res.data.map(UserFactory.createFromResponseObject);
    return new UserIndex(
      users,
      res.current_page,
      res.last_page,
      res.total,
      res.to
    );
  }
}
