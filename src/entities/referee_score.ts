export class RefereeScore {
  constructor(
    public id: string,
    public refereeName: string,
    public difficulty: number,
    public execution: number
  ) {}
}
export type RefereeScoreForm = {
  resultId: string;
  refereeName: string;
  execution: number | null;
  difficulty: number | null;
};
