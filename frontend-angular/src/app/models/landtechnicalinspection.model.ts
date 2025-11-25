/**
 * LandTechnicalInspection data model
 */

export interface LandTechnicalInspection {
  id: number,
  landCode: number,
  governorateCode: number,
  governorate: string,
  landAddress: string,
  landOwnerName: string,
  landOwnerAddress: string,
  totalArea: number,
  landNature: string,
  landOwnershipCode: number,
  landOwnerShipName: string,
  // الحدود
  northernBoundary: string,
  southernBoundary: string,
  easternBoundary: string,
  westernBoundary: string,

  // الأطوال
  northernBoundaryLength: number,
  southernBoundaryLength: number,
  easternBoundaryLength: number,
  westernBoundaryLength: number,

  // الزوايا
  northeastBoundary: string,
  northwestBoundary: string,
  southeastBoundary: string,
  southwestBoundary: string,

  // أطوال الزوايا
  northeastBoundaryLength: number,
  northwestBoundaryLength: number,
  southeastBoundaryLength: number,
  southwestBoundaryLength: number,

  technicalResponsiblePersonId: number,
  legalResponsiblePersonId: number,
  needsCommitteeDate: Date,
  technicalInspectionDate: Date
};