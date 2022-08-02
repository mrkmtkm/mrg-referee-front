import { getAdminClient } from '@/lib';
import { Tournament } from '@/entities/tournament';
import {
  TournamentFactory,
  TournamentResponseObject,
} from '@/factories/tournament';

export class TournamentRepository {
  static async index(): Promise<Tournament[]> {
    const res = await getAdminClient().get<TournamentResponseObject[]>(
      `/tournament/index`
    );

    return TournamentFactory.createIndexResponseObject(res.data);
  }
  static async get(id: string): Promise<Tournament> {
    const res = await getAdminClient().get<TournamentResponseObject>(
      `/tournament/detail?id=${id}`
    );
    return TournamentFactory.createFromResponseObject(res.data);
  }
  static async findByTournamentId(id: string): Promise<Tournament> {
    const res = await getAdminClient().get<TournamentResponseObject>(
      `/tournament/find?tournament_id=${id}`
    );
    return TournamentFactory.createFromResponseObject(res.data);
  }

  static async delete(id: string): Promise<void> {
    await getAdminClient().delete(`/tournament/${id}`);
    return;
  }
}
