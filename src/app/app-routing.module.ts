import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './button/button.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpMatchComponent } from './otp-match/otp-match.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AuthGuard } from './auth-guard.service';
import { SurchComponent } from './surch/surch.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VendorRequestComponent } from './vendor-request/vendor-request.component';
// import { Surch2Component } from './surch2/surch2.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { AddserviceComponent } from './addservice/addservice.component';
import { AllservicesComponent } from './allservices/allservices.component';
import { UpdateservicesComponent } from './updateservices/updateservices.component';
import { ActiveusersComponent } from './activeusers/activeusers.component';
import { AddBlogComponent } from './Blog/add-blog/add-blog.component';
// import { Blog, HotelBooking } from './Class';
import { BlogListComponent } from './Blog/blog-list/blog-list.component';
import { UpdateBlogComponent } from './Blog/update-blog/update-blog.component';
// import { AddHotelComponent } from './Hotel/add-hotel/add-hotel.component';
// import { HotelListComponent } from './Hotel/hotel-list/hotel-list.component';
// import { UpdateHotelComponent } from './Hotel/update-hotel/update-hotel.component';
import { AddTravelComponent } from './Travel/add-travel/add-travel.component';
import { TravelListComponent } from './Travel/travel-list/travel-list.component';
import { UpdateTravelComponent } from './Travel/update-travel/update-travel.component';
import { UserinfoComponent } from './userinfo/userinfo.component';
// import { SearchInfoComponent } from './search-info/search-info.component';
import { AddActivityComponent } from './Acitity/add-activity/add-activity.component';
import { ActivityListComponent } from './Acitity/activity-list/activity-list.component';
import { UpdateActivityComponent } from './Acitity/update-activity/update-activity.component';
import { UserSearchComponent } from './user-search/user-search.component';
// import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { SearchInfo1Component } from './search-info1/search-info1.component';
import { UserProfile1Component } from './user-profile1/user-profile1.component';
import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { Search1Component } from './search1/search1.component';
import { UserProfileHotelComponent } from './user-profile-hotel/user-profile-hotel.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
// import { HotelComponent } from './AllSearch/hotel/hotel.component';
// import { TravelComponent } from './AllSearch/travel/travel.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
// import { DemoComponent } from './demo/demo.component';
// import { AddRoomComponent } from './Hotel/add-room/add-room.component';
// import { RoomListComponent } from './Hotel/room-list/room-list.component';
// import { UpdateRoomComponent } from './Hotel/update-room/update-room.component';
import { AddVehicleComponent } from './Travel/add-vehicle/add-vehicle.component';
import { UpdateVehicleComponent } from './Travel/update-vehicle/update-vehicle.component';
import { VehicleListComponent } from './Travel/vehicle-list/vehicle-list.component';
import { TestCardComponent } from './test-card/test-card.component';
// import { HotelRoomDetailComponent } from './hotel-room-detail/hotel-room-detail.component';
import { TestComponent } from './test/test.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';

import { HotelBookingListComponent } from './BookingDetail/hotel-booking-list/hotel-booking-list.component';

import { TravelBookingListComponent } from './BookingDetail/travel-booking-list/travel-booking-list.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CheckoutPlanComponent } from './checkout-plan/checkout-plan.component';
import { VendorSubscriptionComponent } from './vendor-subscription/vendor-subscription.component';
import { VendorCheckoutPlanComponent } from './vendor-checkout-plan/vendor-checkout-plan.component';
import { HotelCheckoutPlanComponent } from './hotel-checkout-plan/hotel-checkout-plan.component';
import { TravelCheckoutPlanComponent } from './travel-checkout-plan/travel-checkout-plan.component';
import { NewServiceRequestComponent } from './new-service-request/new-service-request.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { AddFeedBackComponent } from './add-feed-back/add-feed-back.component';
import { SearchInfoComponent } from './search-info/search-info/search-info.component';
import { AddHotelComponent } from './Hotel/Hotel/add-hotel/add-hotel.component';
import { HotelListComponent } from './Hotel/Hotel/hotel-list/hotel-list.component';
import { AddRoomComponent } from './Hotel/Hotel/add-room/add-room.component';
import { UpdateHotelComponent } from './Hotel/Hotel/update-hotel/update-hotel.component';
import { RoomListComponent } from './Hotel/Hotel/room-list/room-list.component';
import { UpdateRoomComponent } from './Hotel/Hotel/update-room/update-room.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail/hotel-detail.component';
import { HotelRoomDetailComponent } from './hotel-room-detail/hotel-room-detail/hotel-room-detail.component';
import { UserFormComponent } from './components/user-form/user-form.component';



const routes: Routes = [
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'usersearch', component: UserSearchComponent, canActivate: [AuthGuard] },
  { path: 'Home', component: HomeComponent },
  { path: 'VendorDashboard', component: VendorDashboardComponent, canActivate: [AuthGuard] },

  { path: 'Forms', component: FormsComponent, canActivate: [AuthGuard] },
  { path: 'Login', component: LoginComponent },
  // { path: 'UserDashbord', component: UserProfileComponent },
  { path: 'Vendor', component: VendorRequestComponent, canActivate: [AuthGuard] },
  { path: 'Button', component: ButtonComponent, canActivate: [AuthGuard] },

  { path: 'Registration', component: RegistrationComponent },
  { path: 'OtpMatch', component: OtpMatchComponent },
  { path: 'VerifyEmail/:Id', component: VerifyEmailComponent },
  { path: 'TermConditions/:Id', component: TermConditionsComponent },

  { path: 'UpdateServices', component: UpdateservicesComponent, canActivate: [AuthGuard] },
  { path: 'UpdateServices/:VendorServiceId', component: UpdateservicesComponent, canActivate: [AuthGuard] },



  { path: 'NewServiceRequest', component: NewServiceRequestComponent, canActivate: [AuthGuard] },


  { path: 'UserDetail', component: UserDetailComponent, canActivate: [AuthGuard] },


  { path: 'Surch', component: SurchComponent, canActivate: [AuthGuard] },
  { path: 'searchinfo/:to', component: SearchInfoComponent, canActivate: [AuthGuard] },
  { path: 'userinfo', component: UserinfoComponent, canActivate: [AuthGuard] },
  { path: 'UserProfile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'UserProfile1', component: UserProfile1Component, canActivate: [AuthGuard] },
  { path: 'UserProfile-Hotel', component: UserProfileHotelComponent, canActivate: [AuthGuard] },


  { path: 'UserDashbord', component: UserDashboardComponent, canActivate: [AuthGuard] },
  // { path: 'AllHotel', component: HotelComponent,canActivate: [AuthGuard] },
  // { path: 'AllTravel', component: TravelComponent },


  { path: 'searchinfo', component: SearchInfoComponent, canActivate: [AuthGuard] },
  { path: 'searchinfo1', component: SearchInfo1Component, canActivate: [AuthGuard] },
  { path: 'Search_Hotel', component: SearchHotelComponent, canActivate: [AuthGuard] },
  { path: 'Search_Travel', component: Search1Component, canActivate: [AuthGuard] },

  { path: 'ActiveUser', component: ActiveusersComponent, canActivate: [AuthGuard] },
  { path: 'AddService', component: AddserviceComponent, canActivate: [AuthGuard] },
  { path: 'AllServices', component: AllservicesComponent, canActivate: [AuthGuard] },

  { path: 'AddBlog', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'BlogList', component: BlogListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateBlog/:BlogId', component: UpdateBlogComponent, canActivate: [AuthGuard] },


  { path: 'AddHotel', component: AddHotelComponent, canActivate: [AuthGuard] },
  { path: 'HotelList', component: HotelListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateHotel/:HotelId', component: UpdateHotelComponent, canActivate: [AuthGuard] },


  { path: 'AddRoom', component: AddRoomComponent, canActivate: [AuthGuard] },
  { path: 'RoomList', component: RoomListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateRoom/:RoomId', component: UpdateRoomComponent, canActivate: [AuthGuard] },

  { path: 'hotel-room-detail/:RoomId', component: HotelRoomDetailComponent, canActivate: [AuthGuard] },

  { path: 'AddVehicle', component: AddVehicleComponent, canActivate: [AuthGuard] },
  { path: 'VehicleList', component: VehicleListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateVehicle/:VehicleId', component: UpdateVehicleComponent, canActivate: [AuthGuard] },

  { path: 'AddTravel', component: AddTravelComponent, canActivate: [AuthGuard] },
  { path: 'TravelList', component: TravelListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateTravel/:TravelId', component: UpdateTravelComponent, canActivate: [AuthGuard] },

  { path: 'TravelDetail/:TravelId', component: TravelDetailComponent, canActivate: [AuthGuard] },


  // { path: 'AddVehicle', component: AddVehicleComponent },
  // { path: 'VehicleList', component: VehicleListComponent },
  // { path: 'UpdateVehicle/:VehicleId', component: UpdateVehicleComponent },

  { path: 'AddActivity', component: AddActivityComponent, canActivate: [AuthGuard] },
  { path: 'ActivityList', component: ActivityListComponent, canActivate: [AuthGuard] },
  { path: 'UpdateActivity/:ActivitiesId', component: UpdateActivityComponent, canActivate: [AuthGuard] },

  { path: 'HotelDetail/:HotelId', component: HotelDetailComponent, canActivate: [AuthGuard] },
  { path: 'AcitivityDetail', component: ActivityDetailsComponent, canActivate: [AuthGuard] },
  { path: 'BlogDetails', component: BlogDetailComponent, canActivate: [AuthGuard] },

  { path: 'AcitivityDetail/:AcitivityId', component: ActivityDetailsComponent, canActivate: [AuthGuard] },
  { path: 'BlogDetails/:BlogId', component: BlogDetailComponent, canActivate: [AuthGuard] },

  { path: 'TestCard', component: TestCardComponent, canActivate: [AuthGuard] },

  { path: 'test', component: TestComponent },


  { path: 'HotelBooking', component: HotelBookingListComponent },
  { path: 'TravelBooking', component: TravelBookingListComponent },

  { path: 'Subscription', component: SubscriptionComponent },
  { path: 'CheckoutPlan/:AdmSubscriptionId', component: CheckoutPlanComponent },

  { path: 'VendorSubscription', component: VendorSubscriptionComponent, canActivate: [AuthGuard] },


  { path: 'VendorCheckoutPlan/:AdmVendorSubscriptionId', component: VendorCheckoutPlanComponent },

  { path: 'HotelPayment/:HotelId', component: HotelCheckoutPlanComponent },

  { path: 'TravelPayment/:TravelId', component: TravelCheckoutPlanComponent },
  { path: 'AddFeedBack', component: AddFeedBackComponent },
  
  { path: 'Aboutcity/:id', component: UserFormComponent },

  { path: 'ForgotPassword', component: ForgotPasswordComponent },
  { path: 'OtpMatch/:Id', component: OtpMatchComponent },
  { path: 'ResetPassword/:Id', component: ResetPasswordComponent },
  { path: 'mybookings', component: MybookingsComponent, canActivate: [AuthGuard] },
  // { path: '',   redirectTo: '/HotelBooking', pathMatch: 'full' },
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, {useHash: true})],
  // imports: [RouterModule.forRoot(routes)],
  // exports: [RouterModule]

  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
