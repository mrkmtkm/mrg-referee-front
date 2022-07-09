import {
    UserFactory,
    UserIndexResponseObject,
    UserResponseObject,
} from '@/factories';
import { getAdminClient } from '@/lib';
import { User, UserIndex } from '@/entities';

export class UserRepository {
    static async index(
        page: number,
        keyword: string,
        placeKeyword: string,
        jobKeyword: string,
    ): Promise<UserIndex> {
        const res = await getAdminClient().get<UserIndexResponseObject>(
            `/api/user?page=${page}&keyword=${keyword}&place_keyword=${placeKeyword}&job_keyword=${jobKeyword}`,
        );
        return UserFactory.createIndexObject(res.data);
    }

    static async get(id: number): Promise<User> {
        const res = await getAdminClient().get<UserResponseObject>(
            `/api/user/${id}`,
        );
        return UserFactory.createFromResponseObject(res.data);
    }
    static async delete(id: number): Promise<void> {
        await getAdminClient().delete(`/api/user/${id}`);
        return;
    }
}
