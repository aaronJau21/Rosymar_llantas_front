import { http } from '../../config/http.config';
import { UserRequest, UserResponse } from '../interfaces';
import { UserByIDResponse } from '../interfaces/userGetByIdResponse';
import { UserUpdateRequest } from '../pages/users/EditUser';

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

  public static async getUsertById( id: number, token: string ): Promise<UserByIDResponse> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get<UserByIDResponse>( `/users/${ id }`, { headers } );

    return data;

  }

  public static async editUser( userUpdateRequest: UserUpdateRequest, id: string, token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.put( `/users/${ id }`, userUpdateRequest, { headers } );

    return data;
  }

  public static async deleteUser( id: number, token: string ) {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.delete( `/users/${ id }`, { headers } );

    return data;

  }

  public static async exportUser( token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    const { data } = await http.get( '/users/export/excel', { headers, responseType: 'blob' } );
    const url = window.URL.createObjectURL( new Blob( [ data ] ) );
    const link = document.createElement( 'a' );
    link.href = url;
    link.setAttribute( 'download', 'users.xlsx' ); // or whatever file name you want
    document.body.appendChild( link );
    link.click();
    link.parentNode?.removeChild( link );
    return data;
  }

}