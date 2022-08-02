export class Admin {
  constructor(public id: string, public name: string) {}
}

export class AdminIndex {
  constructor(
    public admins: Admin[],
    public currentPage: number,
    public lastPage: number,
    public total: number,
    public to: number
  ) {}
}

export type AdminEditForm = {
  id: number;
  name: string;
  password: string;
};
