import { http } from '../../config/http.config';
import { PlacasResult } from '../interfaces';
import { BrandTireResult, BrandTireResult2 } from '../interfaces/brandTireResult';
import { GetTireResult } from '../interfaces/getTireResult';
import { TireRequest } from '../interfaces/tireUpdate';
import { InputsCreateBrandTire } from '../pages/tire/brand/CreateBrandTire';
import { InputsCreateTire } from '../pages/tire/CreateTire';

export class TireService {

  //TODO Brand Tire
  public static async createBrandTire( inputData: InputsCreateBrandTire, token: string ): Promise<BrandTireResult> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    const { data } = await http.post<BrandTireResult>( '/tire/brand/create', inputData, { headers } );
    return data;
  }

  public static async getPlacas( token: string ): Promise<PlacasResult> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    const { data } = await http.get<PlacasResult>( '/placas', { headers } );
    return data;
  }

  public static async getBranTire( token: string ): Promise<BrandTireResult2> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    const { data } = await http.get<BrandTireResult2>( '/tire/brand', { headers } );

    return data;
  }

  //TODO Tire
  public static async createTire( inputsCreateTire: InputsCreateTire, token: string ) {

    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.post( '/tire', inputsCreateTire, { headers } );

    return data;

  }

  public static async getTires( token: string ): Promise<GetTireResult> {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get<GetTireResult>( '/tire', { headers } );

    return data;
  }

  public static async getTireById( id: string, token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.get( `/tire/${ id }`, { headers } );

    return data;

  }

  public static async updateTire( request: TireRequest, id: string, token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };

    const { data } = await http.patch( `/tire/${ id }`, request, { headers } );

    return data;

  }

  public static async exportTire( token: string ) {
    const headers = {
      Authorization: `Bearer ${ token }`
    };
    const { data } = await http.get( '/tire/export/excel', { headers, responseType: 'blob' } );
    const url = window.URL.createObjectURL( new Blob( [ data ] ) );
    const link = document.createElement( 'a' );
    link.href = url;
    link.setAttribute( 'download', 'tire.xlsx' ); // or whatever file name you want
    document.body.appendChild( link );
    link.click();
    link.parentNode?.removeChild( link );
    return data;
  }


}