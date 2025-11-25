/**
 * Land Data Model
 * Represents land parcels and their associated information
 */

export interface LandDataInsertion {
  id: string;
  landCode: number;
  governorateCode: number;
  landAddress: string;
  ownerName: string;
  ownerAddress: string;
  totalArea: number;
  landNature: string;//طبيعة الأرض
  ownershipCode: number;

  // الحدود
  north: string;
  south: string;
  east: string;
  west: string;

  // الأطوال
  lengthNorth: number;
  lengthSouth: number;
  lengthEast: number;
  lengthWest: number;

  // الزوايا
  ne?: string;
  nw?: string;
  se?: string;
  sw?: string;

  // أطوال الزوايا
  lengthNe?: number;
  lengthNw?: number;
  lengthSe?: number;
  lengthSw?: number;

  technicalResponsible: string;
  legalResponsible: string;
  inspectionDate: Date;
  committeeDate: Date;
}

export interface LandData {
  id: string;
  referenceNumber: string;
  usageStatus: string;
  headquarters: string;
  approvalStatus: string;
  identificationNumber: string;
  centerDepartment: string;
  totalArea: number;
  phase: string;
  approval: string;
  housing: string;
  committeePricing: number;
  purchasePrice: number;
  saleNegotiations: string;
  landCode: string;
  village: string;
  currentOwner: string;
  originalOwner: string;
  model: string;
  documents: string;
  plan: string;
  branchNotification: string;
  realEstateStatus: string;
  buildingBoundaries: string;
  networkData: string;
  networkObservations: string;
  landAreaFromTotal: string;
  landUseDatabase: string;
  landInspectionDatabase: string;
  landConstructionObstacles: string;
  landCreationObstacles: string;
  landConstructionData: string;
  landReceiptDatabase: string;
  paidAmountsDatabase: string;
  decisionData: string;
  landCommittees: string;
  landFacilities: string;
  landCoordinatesData: string;
  educationalStudies: string;
  landReviewCommittees: string;
}

/**
 * Building Location Data
 * Represents buildings on a land parcel
 */
export interface BuildingLocationData {
  id: string;
  code: string;
  locationName: string;
  coordinates: number;
  status: string;
  requiredStatus: string;
  neighborDescription?: string;
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
