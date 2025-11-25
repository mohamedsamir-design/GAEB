/**
 * Land Data Model
 * Represents land parcels and their associated information
 */
export interface GovernorateData {
  id: number;
  name: string;
  BRCE: number;
  BRCD: number;
}

/**
 * Building Location Data
 * Represents buildings on a land parcel
 */
export interface LandOwnerData {
  id: number;
  name: string;
}

/**
 * Land Coordinates
 * Represents coordinate points for a land parcel
 */
export interface LandCoordinates {
  id: string;
  landId: string;
  pointNumber: number;
  latitude: number;
  longitude: number;
  elevation?: number;
}
