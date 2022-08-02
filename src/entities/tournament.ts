export class Tournament {
  constructor(
    public id: string,
    public adminName: string,
    public tournamentId: string,
    public name: string,
    public date: Date
  ) {}
}

export class TournamentIndex {
  constructor(public tournaments: Tournament[]) {}
}

export type TournamentEditForm = {
  adminName: string;
  tournamentId: string;
  name: string;
  date: Date;
};
