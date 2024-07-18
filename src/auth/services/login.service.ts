import { http } from '../../config/http.config';
import { LoginRequest, LoginResponse } from '../interfaces';

export class LoginService {
  public static async login( loginRequest: LoginRequest ): Promise<LoginResponse> {
    const { data } = await http.post<LoginResponse>( '/auth/login', loginRequest );

    return data;
  }
}