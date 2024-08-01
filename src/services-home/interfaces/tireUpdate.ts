export interface TireRequest {
  posicion: number;
  KM_actutal: string;
  brand_id: number;
  trucks_id: number;
  modelo: string;
  medida: string;
  R1: number;
  R2: number;
  R3: number;
  estado: string;
  observaciones: string | null;
  presion_aire: number | null;
  accion: string;
}
