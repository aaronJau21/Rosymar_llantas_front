import { http } from '../../config/http.config';
import { UserRequest, UserResponse } from '../interfaces';

export class UserService {


  public static async getAllUsers( token: string ): Promise<UserResponse> {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get<UserResponse>( '/users', { headers } );

    return data;

  }

  public static async createUser( request: UserRequest, token: string ): Promise<UserResponse[]> {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.post<UserResponse[]>( '/users', request, { headers } );

    return data;

  }

}