/* istanbul ignore file */
import { getUserClient } from '@/lib';

interface LoginRequest {
    name: string;
    password: string;
}

interface LoginResponse {
    admin_access_token: string;
}

export class UserAuthService {
    async login(name: string, password: string): Promise<void> {
        const res = await getUserClient().post<LoginRequest, LoginResponse>(
            'api/admin/login',
            {
                name,
                password,
            },
        );
        const token = res.data.admin_access_token;
        localStorage.setItem('admin_access_token', token);
    }

    logout(): void {
        localStorage.removeItem('admin_access_token');
    }
}
