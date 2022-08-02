import { Admin, AdminIndex } from '@/entities';
import { Result } from '@/entities/result';
import { Tournament } from '@/entities/tournament';
import { rest } from 'lodash';

export interface ResultResponseObject {
  _id: string;
  tournament_id: string;
  player_name: string;
  item: string;
  execution: number;
  difficulty: number;
  deduction: number;
}

export class ResultFactory {
  static createIndexResponseObject(res: ResultResponseObject[]): Result[] {
    return res.map((data) => {
      return new Result(
        data._id,
        data.tournament_id,
        data.player_name,
        data.item,
        data.execution,
        data.difficulty,
        data.deduction
      );
    });
  }

  static createFromResponseObject(data: ResultResponseObject): Result {
    return new Result(
      data._id,
      data.tournament_id,
      data.player_name,
      data.item,
      data.execution,
      data.difficulty,
      data.deduction
    );
  }
}
