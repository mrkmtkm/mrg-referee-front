import { getAdminClient } from '@/lib';
import { Result } from '@/entities/result';
import { ResultFactory, ResultResponseObject } from '@/factories/result';

export class ResultRepository {
  static async index(tournamentId: string): Promise<Result[]> {
    const res = await getAdminClient().get<ResultResponseObject[]>(
      `/result/index?id=${tournamentId}`
    );

    return ResultFactory.createIndexResponseObject(res.data);
  }
  static async get(id: string): Promise<Result> {
    const res = await getAdminClient().get<ResultResponseObject>(
      `/result/detail?id=${id}`
    );
    return ResultFactory.createFromResponseObject(res.data);
  }

  static async delete(id: string): Promise<void> {
    await getAdminClient().delete(`/result/${id}`);
    return;
  }
}
