export interface PropertyFeatures {
  id: number;
  serviceArea: boolean;
  bedroomClosets: boolean;
  kitchenCabinets: boolean;
  furnished: boolean;
  airConditioning: boolean;
  barbecueGrill: boolean;
  balcony: boolean;
  gym: boolean;
  swimmingPool: boolean;
  serviceRoom: boolean;
  propertyId: number;
}

export interface CondoFeatures {
  id: number;
  gatedCommunity: boolean;
  elevator: boolean;
  security24h: boolean;
  concierge: boolean;
  petsAllowed: boolean;
  gym: boolean;
  swimmingPool: boolean;
  partyHall: boolean;
  propertyId: number;
}

export interface Realtor {
  id: number;
  name: string;
  email: string;
  number: string;
  createdAt: string;
  updatedAt: string;
}

export interface Property {
  map(
    arg0: (property: Property) => {
      actions: import('react').JSX.Element;
      id: number;
      title: string;
      featured: boolean;
      modality: string;
      price: number;
      condon_price: number;
      iptu: number;
      images: string[];
      ad_image_cover: number;
      description: string;
      Property_type: string;
      Property_subtype: string;
      financeable: boolean;
      bedroom: number;
      bathroom: number;
      total_area: number;
      useful_area: number;
      parking_spaces: number;
      videotour_url: string;
      realtorId: number;
      property_features: PropertyFeatures;
      condo_features: CondoFeatures;
      Realtor: Realtor;
    }
  ): unknown;
  id: number;
  title: string;
  featured: boolean;
  modality: string;
  price: number;
  condon_price: number;
  iptu: number;
  images: string[];
  ad_image_cover: number;
  description: string;
  Property_type: string;
  Property_subtype: string;
  financeable: boolean;
  bedroom: number;
  bathroom: number;
  total_area: number;
  useful_area: number;
  parking_spaces: number;
  videotour_url: string;
  realtorId: number;
  property_features: PropertyFeatures;
  condo_features: CondoFeatures;
  Realtor: Realtor;
  views: number;
  createdAt: string;
  address: {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    estado: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    regiao: string;
    siafi: string;
    uf: string;
    unidade: string;
  };
}
