import { Admin, AdminEditForm } from '@/entities';
import { TournamentEditForm } from '@/entities/tournament';
import { AdminFactory, AdminResponseObject } from '@/factories';
import { getAdminClient } from '@/lib';
import { DateTime } from 'luxon';

/* istanbul ignore file */
export class TournamentService {
  static async store({
    adminName,
    tournamentId,
    name,
    date,
  }: TournamentEditForm): Promise<void> {
    await getAdminClient().post(`/tournament/store`, {
      admin_name: adminName,
      tournament_id: tournamentId,
      name: name,
      date: DateTime.fromJSDate(date).toFormat('yyyy-MM-dd'),
    });
  }
}
