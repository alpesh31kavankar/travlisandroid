import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { FormsComponent } from './forms/forms.component';
import { LoginComponent } from './login/login.component';
import { ButtonComponent } from './button/button.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OtpMatchComponent } from './otp-match/otp-match.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {GoogleLoginProvider,FacebookLoginProvider} from '@abacritt/angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SurchComponent } from './surch/surch.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { VendorRequestComponent } from './vendor-request/vendor-request.component';
import { Surch2Component } from './surch2/surch2.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';

import { ProfileIconComponent } from './profile-icon/profile-icon.component';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorSidebarComponent } from './vendor-sidebar/vendor-sidebar.component';
import { AllservicesComponent } from './allservices/allservices.component';
import { UpdateservicesComponent } from './updateservices/updateservices.component';
import { ActiveusersComponent } from './activeusers/activeusers.component';
import { AddserviceComponent } from './addservice/addservice.component';
import { AddBlogComponent } from './Blog/add-blog/add-blog.component';
import { BlogListComponent } from './Blog/blog-list/blog-list.component';
import { UpdateBlogComponent } from './Blog/update-blog/update-blog.component';

import { AddTravelComponent } from './Travel/add-travel/add-travel.component';
import { TravelListComponent } from './Travel/travel-list/travel-list.component';
import { UpdateTravelComponent } from './Travel/update-travel/update-travel.component';
import { UserinfoComponent } from './userinfo/userinfo.component';

import { AddActivityComponent } from './Acitity/add-activity/add-activity.component';
import { ActivityListComponent } from './Acitity/activity-list/activity-list.component';
import { UpdateActivityComponent } from './Acitity/update-activity/update-activity.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { SearchComponent } from './search/search.component';

import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { Search1Component } from './search1/search1.component';
import { SearchInfo1Component } from './search-info1/search-info1.component';

import { SearchHotelComponent } from './search-hotel/search-hotel.component';
import { UserProfileHotelComponent } from './user-profile-hotel/user-profile-hotel.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { TravelSearchComponent } from './travel-search/travel-search.component';
import { HotelComponent } from './AllSearch/hotel/hotel.component';
import { TravelComponent } from './AllSearch/travel/travel.component';
import { UserProfile1Component } from './user-profile1/user-profile1.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DemoComponent } from './demo/demo.component';

import { AddVehicleComponent } from './Travel/add-vehicle/add-vehicle.component';
import { VehicleListComponent } from './Travel/vehicle-list/vehicle-list.component';
import { UpdateVehicleComponent } from './Travel/update-vehicle/update-vehicle.component';
import { TestCardComponent } from './test-card/test-card.component';
// import { HotelRoomDetailComponent } from './hotel-room-detail/hotel-room-detail.component';
import { TestComponent } from './test/test.component';
import { TravelDetailComponent } from './travel-detail/travel-detail.component';

import { HotelBookingListComponent } from './BookingDetail/hotel-booking-list/hotel-booking-list.component';
import { TravelBookingListComponent } from './BookingDetail/travel-booking-list/travel-booking-list.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CheckoutPlanComponent } from './checkout-plan/checkout-plan.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { VendorSubscriptionComponent } from './vendor-subscription/vendor-subscription.component';
import { VendorCheckoutPlanComponent } from './vendor-checkout-plan/vendor-checkout-plan.component';
import { HotelCheckoutPlanComponent } from './hotel-checkout-plan/hotel-checkout-plan.component';
import { TravelCheckoutPlanComponent } from './travel-checkout-plan/travel-checkout-plan.component';
import { NewServiceRequestComponent } from './new-service-request/new-service-request.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { AddFeedBackComponent } from './add-feed-back/add-feed-back.component';
import { AddRoomComponent } from './Hotel/Hotel/add-room/add-room.component';
import { RoomListComponent } from './Hotel/Hotel/room-list/room-list.component';
import { UpdateRoomComponent } from './Hotel/Hotel/update-room/update-room.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail/hotel-detail.component';
import { AddHotelComponent } from './Hotel/Hotel/add-hotel/add-hotel.component';
import { HotelListComponent } from './Hotel/Hotel/hotel-list/hotel-list.component';
import { UpdateHotelComponent } from './Hotel/Hotel/update-hotel/update-hotel.component';
import { SearchInfoComponent } from './search-info/search-info/search-info.component';
import { HotelRoomDetailComponent } from './hotel-room-detail/hotel-room-detail/hotel-room-detail.component';
import { ReportDisplayComponent } from './components/report-display/report-display.component';
import { UserFormComponent } from './components/user-form/user-form.component';
// import { TestComponent } from './test/test.component';




   
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent, 
    FooterComponent,
    FormsComponent,
    LoginComponent,    
    ButtonComponent,   
    ForgotPasswordComponent,
    OtpMatchComponent,
    ResetPasswordComponent,
    SurchComponent,
    UserProfileComponent,
    VendorRequestComponent,
    Surch2Component,
    HomeComponent,
    RegistrationComponent,
 
    ProfileIconComponent,
    VendorDashboardComponent,
    VendorSidebarComponent,
    AllservicesComponent,
    UpdateservicesComponent,
    ActiveusersComponent,
    AddserviceComponent,
    AddBlogComponent,
    BlogListComponent,
    UpdateBlogComponent,
    AddHotelComponent,
    HotelListComponent,
    UpdateHotelComponent,
    AddTravelComponent,
    TravelListComponent,
    UpdateTravelComponent,
    UserinfoComponent,
    SearchInfoComponent,
    AddActivityComponent,
    ActivityListComponent,
    UpdateActivityComponent,
    NavbarComponent,
    UserSearchComponent,
    SearchComponent,
    HotelDetailComponent,
    ActivityDetailsComponent,
    BlogDetailComponent,
    TermConditionsComponent,
    VerifyEmailComponent,
    Search1Component,
    SearchInfo1Component,
    UserProfile1Component,
    SearchHotelComponent,
    UserProfileHotelComponent,
    UserDetailComponent,
    TravelSearchComponent,
    HotelComponent,
    TravelComponent,
    UserDashboardComponent,
    DemoComponent,
    AddRoomComponent,
    RoomListComponent,
    UpdateRoomComponent,
    AddVehicleComponent,
    VehicleListComponent,
    UpdateVehicleComponent,
    TestCardComponent,
    HotelRoomDetailComponent,
    TestComponent,
    TravelDetailComponent,
    
    HotelBookingListComponent,
    TravelBookingListComponent,
    SubscriptionComponent,
    CheckoutPlanComponent,
    VendorSubscriptionComponent,
    VendorCheckoutPlanComponent,
    HotelCheckoutPlanComponent,
    TravelCheckoutPlanComponent,
    NewServiceRequestComponent,
    MybookingsComponent,
    AddFeedBackComponent,
    UserFormComponent,
    ReportDisplayComponent
  
  
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    NgxPayPalModule  
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // '188718229861-5upd898p32a51hjmgsa9etp1usnh0dlb.apps.googleusercontent.com'
                          '128585235049-rqh5anqmpgu82d73g6eed6e67m03eec7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('clientId')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
