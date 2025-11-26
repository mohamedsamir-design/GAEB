import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: 'land-operations',
  //   loadComponent: () => import('./components/lands-applications/lands-applications-operations/CreateNew').then(m => m.CreateNew),
  //   canActivate: [authGuard]
  // },
  {
    path: 'land-technical-inspection-inquiry',
    loadComponent: () => import('./components/database-operations/land-technical-inspection-inquiry/land-technical-inspection-inquiry').then(m => m.LandTechnicalInspectionInquiryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'query-menus-list',
    loadComponent: () => import('./components/database-operations/query-menus-list/query-menus-list').then(m => m.QueryMenusListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'lands',
    loadComponent: () => import('./components/lands-applications/lands-applications-home/lands-applications-home').then(m => m.LandsApplicationsHome),
    canActivate: [authGuard]
  },
  {
    path: 'lands-main-menu',
    loadComponent: () => import('./components/lands-applications/lands-applications-main-menu/lands-applications-main-menu').then(m => m.LandsApplicationsMainMenu),
    canActivate: [authGuard]
  },
  {
    path: 'building-amenities',
    loadComponent: () => import('./components/lands-applications/building-amenities/building-amenities').then(m => m.BuildingAmenities),
    canActivate: [authGuard]
  },
  {
    path: 'database-operations-home',
    loadComponent: () => import('./components/database-operations/database-operations-home/database-operations-home').then(m => m.DatabaseOperationsHome),
    canActivate: [authGuard]
  },
  {
    path: 'property-registration-list',
    loadComponent: () => import('./components/database-operations/property-registration-list/property-registration-list').then(m => m.PropertyRegistrationList),
    canActivate: [authGuard]
  },
  {
    path: 'property-registration-list-insertions',
    loadComponent: () => import('./components/database-operations/property-registration-list-insertions/property-registration-list-insertions').then(m => m.PropertyRegistrationListInsertions),
    canActivate: [authGuard]
  },
  {
    path: 'map-integration-with-land-system',
    loadComponent: () => import('./components/database-operations/map-integration-with-land-system/map-integration-with-land-system').then(m => m.MapIntegrationWithLandSystem),
    canActivate: [authGuard]
  },
  {
    path: 'land-data-legal-link',
    loadComponent: () => import('./components/database-operations/land-data-legal-link/land-data-legal-link').then(m => m.LandDataLegalLink),
    canActivate: [authGuard]
  },
  {
    path: 'land-technical-inspection',
    loadComponent: () => import('./components/database-operations/land-technical-inspection/land-technical-inspection').then(m => m.LandTechnicalInspectionComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./components/dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications-menu',
    loadComponent: () => import('./components/applications-menu/applications-menu').then(m => m.ApplicationsMenuComponent),
    canActivate: [authGuard]
  },
  {
    path: 'applications',
    loadComponent: () => import('./components/applications/applications').then(m => m.ApplicationsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'educational-building',
    loadComponent: () => import('./components/educational-building/educational-building').then(m => m.EducationalBuildingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'land-inquiry',
    loadComponent: () => import('./components/land-inquiry/land-inquiry').then(m => m.LandInquiryComponent),
    canActivate: [authGuard]
  },
  // Land Inquiry Flow
  {
    path: 'land-inquiry-id',
    loadComponent: () => import('./components/land-inquiry-id/land-inquiry-id').then(m => m.LandInquiryIdComponent),
    canActivate: [authGuard]
  },
  {
    path: 'land-coordinates',
    loadComponent: () => import('./components/land-coordinates/land-coordinates').then(m => m.LandCoordinatesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'data-availability',
    loadComponent: () => import('./components/data-availability/data-availability').then(m => m.DataAvailabilityComponent),
    canActivate: [authGuard]
  },
  {
    path: 'data-availability/:id',
    loadComponent: () => import('./components/data-availability/data-availability').then(m => m.DataAvailabilityComponent),
    canActivate: [authGuard]
  },
  {
    path: 'land-inquiry-id/:id',
    loadComponent: () => import('./components/land-inquiry-id/land-inquiry-id').then(m => m.LandInquiryIdComponent),
    canActivate: [authGuard]
  },
  {
    path: 'land-coordinates/:id',
    loadComponent: () => import('./components/land-coordinates/land-coordinates').then(m => m.LandCoordinatesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-inquiry',
    loadComponent: () => import('./components/building-inquiry/building-inquiry').then(m => m.BuildingInquiryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-inquiry/:id',
    loadComponent: () => import('./components/building-inquiry/building-inquiry').then(m => m.BuildingInquiryComponent),
    canActivate: [authGuard]
  },
  // Building Displacement Menu
  {
    path: 'building-displacement-menu',
    loadComponent: () => import('./components/building-displacement-menu/building-displacement-menu').then(m => m.BuildingDisplacementMenuComponent),
    canActivate: [authGuard]
  },
  // Building Displacement Flow
  {
    path: 'building-displacement-pre',
    loadComponent: () => import('./components/building-displacement-pre/building-displacement-pre').then(m => m.BuildingDisplacementPreComponent),
    canActivate: [authGuard]
  },
  {
    path: 'displacement-council-approval',
    loadComponent: () => import('./components/displacement-council-approval/displacement-council-approval').then(m => m.DisplacementCouncilApprovalComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-displacement-post',
    loadComponent: () => import('./components/building-displacement-post/building-displacement-post').then(m => m.BuildingDisplacementPostComponent),
    canActivate: [authGuard]
  },
  {
    path: 'displacement-final-compensation',
    loadComponent: () => import('./components/displacement-final-compensation/displacement-final-compensation').then(m => m.DisplacementFinalCompensationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-network-costs',
    loadComponent: () => import('./components/building-network-costs/building-network-costs').then(m => m.BuildingNetworkCostsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-temporary-fulfillment',
    loadComponent: () => import('./components/building-temporary-fulfillment/building-temporary-fulfillment').then(m => m.BuildingTemporaryFulfillmentComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-property-handover',
    loadComponent: () => import('./components/building-property-handover/building-property-handover').then(m => m.BuildingPropertyHandoverComponent),
    canActivate: [authGuard]
  },
  // School Map Inquiry Flow
  {
    path: 'school-map-inquiry',
    loadComponent: () => import('./components/school-map-inquiry/school-map-inquiry').then(m => m.SchoolMapInquiryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'school-map-study-period',
    loadComponent: () => import('./components/school-map-study-period/school-map-study-period').then(m => m.SchoolMapStudyPeriodComponent),
    canActivate: [authGuard]
  },
  {
    path: 'school-map-roads',
    loadComponent: () => import('./components/school-map-roads/school-map-roads').then(m => m.SchoolMapRoadsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'school-map-annexes',
    loadComponent: () => import('./components/school-map-annexes/school-map-annexes').then(m => m.SchoolMapAnnexesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'school-map-spaces',
    loadComponent: () => import('./components/school-map-spaces/school-map-spaces').then(m => m.SchoolMapSpacesComponent),
    canActivate: [authGuard]
  },
  // Building Data Completion Flow
  {
    path: 'building-data-completion',
    loadComponent: () => import('./components/building-data-completion/building-data-completion').then(m => m.BuildingDataCompletionComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-basic-data',
    loadComponent: () => import('./components/building-basic-data/building-basic-data').then(m => m.BuildingBasicDataComponent),
    canActivate: [authGuard]
  },
  {
    path: 'building-annexes-data',
    loadComponent: () => import('./components/building-annexes-data/building-annexes-data').then(m => m.BuildingAnnexesDataComponent),
    canActivate: [authGuard]
  },
  // Rental Buildings Status Flow - New Menu Structure
  {
    path: 'rental-status-menu',
    loadComponent: () => import('./components/rental-status-menu/rental-status-menu').then(m => m.RentalStatusMenuComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-status-report',
    loadComponent: () => import('./components/rental-status-report/rental-status-report').then(m => m.RentalStatusReportComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-decision-buildings',
    loadComponent: () => import('./components/rental-decision-buildings/rental-decision-buildings').then(m => m.RentalDecisionBuildingsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-inquiry-building',
    loadComponent: () => import('./components/rental-inquiry-building/rental-inquiry-building').then(m => m.RentalInquiryBuildingComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-status-edit',
    loadComponent: () => import('./components/rental-status-edit/rental-status-edit').then(m => m.RentalStatusEditComponent),
    canActivate: [authGuard]
  },
  // Legacy Rental Buildings Status Flow (kept for backward compatibility)
  {
    path: 'rental-buildings-status',
    loadComponent: () => import('./components/rental-buildings-status/rental-buildings-status').then(m => m.RentalBuildingsStatusComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-buildings-list',
    loadComponent: () => import('./components/rental-buildings-list/rental-buildings-list').then(m => m.RentalBuildingsListComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-building-location',
    loadComponent: () => import('./components/rental-building-location/rental-building-location').then(m => m.RentalBuildingLocationComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-building-details',
    loadComponent: () => import('./components/rental-building-details/rental-building-details').then(m => m.RentalBuildingDetailsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'rental-building-modify-status',
    loadComponent: () => import('./components/rental-building-modify-status/rental-building-modify-status').then(m => m.RentalBuildingModifyStatusComponent),
    canActivate: [authGuard]
  },
  {
    path: 'main-school-data-insertion',
    loadComponent: () => import('./components/lands-applications/main-data-for-school-insertion/main-data-for-school-insertion').then(m => m.MainDataForSchoolInsertion),
    canActivate: [authGuard]
  },
  {
    path: 'school-borders-data-insertion',
    loadComponent: () => import('./components/lands-applications/school-borders-data-insertion/school-borders-data-insertion').then(m => m.BordersComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
