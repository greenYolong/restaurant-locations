export interface RestaurantPayload {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  cuisine_type: string;
  phone_number: string | null;
}

export interface Restaurant extends RestaurantPayload {
  id: number;
  created_at?: string;
  updated_at?: string;
}

export type RestaurantField =
  | 'name'
  | 'address'
  | 'latitude'
  | 'longitude'
  | 'cuisine_type'
  | 'phone_number';

export interface RestaurantFormState {
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  cuisine_type: string;
  phone_number: string;
}

export type RestaurantErrors = Record<RestaurantField, string>;

export interface RestaurantFilters {
  search: string;
  cuisine: string;
}