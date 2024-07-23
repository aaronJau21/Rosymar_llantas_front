export interface GetTireResult {
  tires: Tire[];
}

export interface Tire {
  id:               number;
  posicion:         number;
  KM_actutal:       string;
  brand_id:         number;
  trucks_id:        number;
  modelo:           string;
  medida:           string;
  R1:               number;
  R2:               number;
  R3:               number;
  estado:           string;
  user_name_insert: string;
  observaciones:    string;
  presion_aire:     string;
  accion:           null | string;
  truck:            Truck;
  brand_tire:       BrandTire;
}

export interface BrandTire {
  id:               number;
  nombre:           string;
  modelo:           string;
  user_name_insert: string;
}

export interface Truck {
  id:               number;
  marca:            string;
  placa:            string;
  cantidad_llantas: number;
  observation:      null;
  user_name_insert: string;
}
