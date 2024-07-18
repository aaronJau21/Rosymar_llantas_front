import { http } from '../../config/http.config';
import { BrandTireResult } from '../interfaces/brandTireResult';

export class TireService {

  public static async createBrandTire( nombre: string, token: string ): Promise<BrandTireResult> {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.post<BrandTireResult>( '/tire/brand/create', { nombre }, { headers } );

    return data;

  }


}