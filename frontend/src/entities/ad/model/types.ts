export type AdCategory = 'auto' | 'real_estate' | 'electronics';

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: 'automatic' | 'manual';
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: 'flat' | 'house' | 'room';
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: 'phone' | 'laptop' | 'misc';
  brand?: string;
  model?: string;
  condition?: 'new' | 'used';
  color?: string;
};

export type AdParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams

export interface Ad {
  id: string,
  category: AdCategory,
  title: string,
  description?: string,
  price: number | null,
  createdAt: string;
  updatedAt: string,
  params?: AdParams
}

export interface ItemGetOut {
  items: Array<Ad & {
    needsRevision: boolean
  }>;
  total: number;
}

export interface ItemsGetOut {
  items: Array<{
    id: string;
    category: AdCategory;
    title: string;
    price: number;
    needsRevision: boolean;
  }>;
  total: number;
}

export interface ItemUpdateIn {
  category: 'auto' | 'real_estate' | 'electronics';
  title: string;
  description?: string;
  price: number;
  params: AutoItemParams | RealEstateItemParams | ElectronicsItemParams;
}


export interface FetchAdsParams {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: string;
  sortColumn?: 'title' | 'createdAt';
  sortDirection?: 'asc' | 'desc';
}