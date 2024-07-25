export interface TruckResponse {
  camion: Camion;
}

export interface Camion {
  id: number;
  marca: string;
  placa: string;
  cantidad_llantas: number;
  observation: null;
  user_name_insert: string;
}
