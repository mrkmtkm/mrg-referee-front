export class Result {
  constructor(
    public id: string,
    public tournamentId: string,
    public playerName: string,
    public item: string,
    public execution: number,
    public difficulty: number,
    public deduction: number | undefined
  ) {}
}

export class ResultIndex {
  constructor(public tournaments: Result[]) {}
}

export type ResultForm = {
  tournamentId: string;
  playerName: string;
  item: string;
  execution: number | null;
  difficulty: number | null;
  deduction: number | null;
};
