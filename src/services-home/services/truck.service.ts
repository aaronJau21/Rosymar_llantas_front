import { http } from '../../config/http.config';
import { TruckRequest, TrucksResponse } from '../interfaces';
import { CreateTrucksResponse } from '../interfaces/createTrucksResponse';
import { TruckResponse } from '../interfaces/TruckResponse';

export class TruckService {

  public static async getAllTrucks( token: string ): Promise<TrucksResponse> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get<TrucksResponse>( '/trucks', { headers } );

    return data;

  }

  public static async createTruck( request: TruckRequest, token: string ): Promise<CreateTrucksResponse> {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.post<CreateTrucksResponse>( '/trucks', request, { headers } );

    return data;

  }

  public static async getTruckById( id: string, token: string ): Promise<TruckResponse> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get<TruckResponse>( `/trucks/${ id }`, { headers } );

    return data;
  }

  public static async updateTruck( request: TruckRequest, id: string, token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };


    const { data } = await http.patch( `/trucks/${ id }`, request, { headers } );

    return data;
  }

  public static async deleteTruck( id: number, token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };


    const { data } = await http.delete( `/trucks/${ id }`, { headers } );

    return data;
  }

}