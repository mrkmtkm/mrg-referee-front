import { Admin, AdminIndex } from '@/entities';
import { RefereeScore } from '@/entities/referee_score';
import { Result } from '@/entities/result';
import { Tournament } from '@/entities/tournament';
import { rest } from 'lodash';

export interface RefereeScoreResponseObject {
  _id: string;
  referee_name: string;
  difficulty: number;
  execution: number;
}

export class RefereeScoreFactory {
  static createIndexResponseObject(
    res: RefereeScoreResponseObject[]
  ): RefereeScore[] {
    return res.map((data) => {
      return new RefereeScore(
        data._id,
        data.referee_name,
        data.difficulty,
        data.execution
      );
    });
  }
}
