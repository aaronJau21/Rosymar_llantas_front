import { http } from '../../config/http.config';

export class LogoutService {
  public static async logoutSesion( token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    return await http.get( '/auth/logout', { headers } );
  }
}