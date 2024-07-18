import { http } from '../../config/http.config';
import { TruckRequest, TrucksResponse } from '../interfaces';
import { CreateTrucksResponse } from '../interfaces/createTrucksResponse';

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

}