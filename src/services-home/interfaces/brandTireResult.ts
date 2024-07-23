export interface BrandTireResult {
  msg: string;
  brand_tire: BrandTire;
}

export interface BrandTireResult2 {
  brand_tires: BrandTire[];
}

export interface BrandTire {
  nombre: string;
  modelo: string;
  id: number;
}

