import { getAdminClient } from '@/lib';
import { Result } from '@/entities/result';
import { ResultFactory, ResultResponseObject } from '@/factories/result';
import { RefereeScore } from '@/entities/referee_score';
import {
  RefereeScoreFactory,
  RefereeScoreResponseObject,
} from '@/factories/referee_score';

export class RefereeScoreRepository {
  static async index(resultId: string): Promise<RefereeScore[]> {
    const res = await getAdminClient().get<RefereeScoreResponseObject[]>(
      `/referee_score/index?id=${resultId}`
    );

    return RefereeScoreFactory.createIndexResponseObject(res.data);
  }

  static async delete(id: string): Promise<void> {
    await getAdminClient().delete(`/referee_score/${id}`);
    return;
  }
}
