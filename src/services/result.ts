import { Admin, AdminEditForm } from '@/entities';
import { Result, ResultForm } from '@/entities/result';
import { TournamentEditForm } from '@/entities/tournament';
import { AdminFactory, AdminResponseObject } from '@/factories';
import { getAdminClient } from '@/lib';
import { DateTime } from 'luxon';

/* istanbul ignore file */
export class ResultService {
  static async store({
    tournamentId,
    playerName,
    item,
  }: ResultForm): Promise<void> {
    await getAdminClient().post(`/result/store`, {
      tournament_id: tournamentId,
      player_name: playerName,
      item: item,
    });
  }

  static async update(result: Result): Promise<void> {
    await getAdminClient().post(`/result/update`, {
      id: result.id,
      tournament_id: result.tournamentId,
      player_name: result.playerName,
      item: result.item,
      execution: result.execution,
      difficulty: result.difficulty,
      deduction: result.deduction,
    });
  }
}
