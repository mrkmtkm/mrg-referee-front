import { Admin, AdminIndex } from '@/entities';

export interface AdminResponseObject {
  _id: string;
  name: string;
}

export interface AdminIndexResponseObject {
  data: AdminResponseObject[];
  current_page: number;
  last_page: number;
  total: number;
  to: number;
}

export class AdminFactory {
  static createFromResponseObject(res: AdminResponseObject): Admin {
    return new Admin(res._id, res.name);
  }

  static createIndexObject(res: AdminIndexResponseObject): AdminIndex {
    const admins = res.data.map(AdminFactory.createFromResponseObject);
    return new AdminIndex(
      admins,
      res.current_page,
      res.last_page,
      res.total,
      res.to
    );
  }
}
