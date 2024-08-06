export interface TruckResponse {
  camion: Camion;
}

export interface Camion {
  id: number;
  marca: string;
  placa: string;
  dueno: string | null;
  tolerancia_delantera: number | null;
  tolerancia_trasera: number | null;
  observation: string | null;
  user_name_insert: string;
}
