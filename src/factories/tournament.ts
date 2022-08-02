import { Admin, AdminIndex } from '@/entities';
import { Tournament } from '@/entities/tournament';
import { rest } from 'lodash';

export interface TournamentResponseObject {
  _id: string;
  admin_name: string;
  tournament_id: string;
  name: string;
  date: Date;
}

export class TournamentFactory {
  static createIndexResponseObject(
    res: TournamentResponseObject[]
  ): Tournament[] {
    return res.map((data) => {
      return new Tournament(
        data._id,
        data.admin_name,
        data.tournament_id,
        data.name,
        new Date(data.date)
      );
    });
  }

  static createFromResponseObject(res: TournamentResponseObject): Tournament {
    return new Tournament(
      res._id,
      res.admin_name,
      res.tournament_id,
      res.name,
      new Date(res.date)
    );
  }
}
