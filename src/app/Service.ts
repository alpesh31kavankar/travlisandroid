import { Injectable } from        '@angular/core';
import { HttpRequest, HttpClient } from        '@angular/common/http';
import { Observable} from        'rxjs';
import { HttpHeaders } from        '@angular/common/http';
import { Registration,UserDetail,UserSocialMedia,EmergencyContact,DestinationGallery,Trip,TripType,Feedback,Gallery,ServiceTable,VendorService,Alert,Booking,Hotel,UserRole, Login, AdmVendor, AdmDestinations, Blog, ServiceMaster, Travel,  } from        './Class';
//add name of class here
import { GlobalVariable } from        './Global';
@Injectable({
providedIn:        'root'
})

export class WebService {
 
 

httpOptions = {
 headers: new HttpHeaders({
        'Content-Type':  'application/json',
 "Access-Control-Allow-Headers": "Content-Type",
 "Access-Control-Allow-Methods":        'GET, POST, OPTIONS, DELETE,PUT',
 "Content-Security-Policy":        'upgrade-insecure-requests' 
  })
};
  getAllUserProfiles: any;
constructor (private http: HttpClient){  }
//Registration
AddRegistration(Registration): Observable<any> {
 return this.http.post<Registration>( GlobalVariable.SERVICE_API_URL +"Registration/AddRegistration",Registration, this.httpOptions);
}
GetAllRegistration()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Registration/GetAllRegistration", this.httpOptions);
}

GetRegistrationByEmail(Email){
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Registration/GetRegistrationByEmail?Email="+Email,this.httpOptions);
  }

DeleteRegistration(RegistrationId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Registration/DeleteRegistration?RegistrationId="+RegistrationId, this.httpOptions);
}
GetRegistrationById(RegistrationId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Registration/GetRegistrationById?RegistrationId="+RegistrationId, this.httpOptions);
}
UpdateRegistration(Registration): Observable<any> {
 return this.http.post<Registration>( GlobalVariable.SERVICE_API_URL +"Registration/UpdateRegistration",Registration, this.httpOptions);
}
SaveRegistrationImage(formdata,RegistrationId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Registration/SaveRegistrationImage?RegistrationId="+RegistrationId, formdata, null );
return this.http.request(uploadReq);
}
Login(Email, Password): Observable<any> {
   
  return this.http.get<Login>(GlobalVariable.SERVICE_API_URL+"Registration/Login?Email="+Email+"&Password="+Password);
  }
  SendOTPEmail(Email){
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL +"Registration/SendOTPEmail?Email="+Email,this.httpOptions);
  }
//   SendOTPEmailp(Email){
//     return this.http.get<any>(GlobalVariable.SERVICE_API_URL +"Registration/SendOTPEmailp?Email="+Email,this.httpOptions);
//   }


//AdmVendor
AddAdmVendor(AdmVendor): Observable<any> {
 return this.http.post<AdmVendor>( GlobalVariable.SERVICE_API_URL +"AdmVendor/AddAdmVendor",AdmVendor, this.httpOptions);
}
GetAllAdmVendor()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmVendor/GetAllAdmVendor", this.httpOptions);
}
DeleteAdmVendor(AdmVendorId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"AdmVendor/DeleteAdmVendor?AdmVendorId="+AdmVendorId, this.httpOptions);
}
GetAdmVendorById(AdmVendorId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmVendor/GetAdmVendorById?AdmVendorId="+AdmVendorId, this.httpOptions);
}
UpdateAdmVendor(AdmVendor
    
): Observable<any> {
 return this.http.post<AdmVendor>( GlobalVariable.SERVICE_API_URL +"AdmVendor/UpdateAdmVendor",AdmVendor, this.httpOptions);
}
SaveAdmVendorImage(formdata,AdmVendorId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"AdmVendor/SaveAdmVendorImage?AdmVendorId="+AdmVendorId, formdata, null );
return this.http.request(uploadReq);
}







//UserDetail
AddUserDetail(UserDetail): Observable<any> {
 return this.http.post<UserDetail>( GlobalVariable.SERVICE_API_URL +"UserDetail/AddUserDetail",UserDetail, this.httpOptions);
}
GetAllUserDetail()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserDetail/GetAllUserDetail", this.httpOptions);
}
DeleteUserDetail(UserDetailsId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"UserDetail/DeleteUserDetail?UserDetailsId="+UserDetailsId, this.httpOptions);
}
GetUserDetailById(UserDetailsId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserDetail/GetUserDetailById?UserDetailsId="+UserDetailsId, this.httpOptions);
}
UpdateUserDetail(UserDetail): Observable<any> {
 return this.http.post<UserDetail>( GlobalVariable.SERVICE_API_URL +"UserDetail/UpdateUserDetail",UserDetail, this.httpOptions);
}
SaveUserDetailImage(formdata,UserDetailsId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"UserDetail/SaveUserDetailImage?UserDetailsId="+UserDetailsId, formdata, null );
return this.http.request(uploadReq);
}
//AdmDestinations
AddAdmDestinations(AdmDestinations): Observable<any> {
    return this.http.post<AdmDestinations>( GlobalVariable.SERVICE_API_URL +"AdmDestinations/AddAdmDestinations",AdmDestinations, this.httpOptions);
   }
   GetAllAdmDestinations()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmDestinations/GetAllAdmDestinations", this.httpOptions);
   }
   DeleteAdmDestinations(AdmDestinationsId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"AdmDestinations/DeleteAdmDestinations?AdmDestinationsId="+AdmDestinationsId, this.httpOptions);
   }
   GetAdmDestinationsById(AdmDestinationsId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmDestinations/GetAdmDestinationsById?AdmDestinationsId="+AdmDestinationsId, this.httpOptions);
   }
   UpdateAdmDestinations(AdmDestinations): Observable<any> {
    return this.http.post<AdmDestinations>( GlobalVariable.SERVICE_API_URL +"AdmDestinations/UpdateAdmDestinations",AdmDestinations, this.httpOptions);
   }
   SaveAdmDestinationsImage(formdata,AdmDestinationsId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"AdmDestinations/SaveAdmDestinationsImage?AdmDestinationsId="+AdmDestinationsId, formdata, null );
   return this.http.request(uploadReq);
   }
   
//UserSocialMedia
AddUserSocialMedia(UserSocialMedia): Observable<any> {
 return this.http.post<UserSocialMedia>( GlobalVariable.SERVICE_API_URL +"UserSocialMedia/AddUserSocialMedia",UserSocialMedia, this.httpOptions);
}
GetAllUserSocialMedia()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserSocialMedia/GetAllUserSocialMedia", this.httpOptions);
}
DeleteUserSocialMedia(UserSocialMediaId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"UserSocialMedia/DeleteUserSocialMedia?UserSocialMediaId="+UserSocialMediaId, this.httpOptions);
}
GetUserSocialMediaById(UserSocialMediaId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserSocialMedia/GetUserSocialMediaById?UserSocialMediaId="+UserSocialMediaId, this.httpOptions);
}
UpdateUserSocialMedia(UserSocialMedia): Observable<any> {
 return this.http.post<UserSocialMedia>( GlobalVariable.SERVICE_API_URL +"UserSocialMedia/UpdateUserSocialMedia",UserSocialMedia, this.httpOptions);
}
SaveUserSocialMediaImage(formdata,UserSocialMediaId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"UserSocialMedia/SaveUserSocialMediaImage?UserSocialMediaId="+UserSocialMediaId, formdata, null );
return this.http.request(uploadReq);
}
//EmergencyContact
AddEmergencyContact(EmergencyContact): Observable<any> {
 return this.http.post<EmergencyContact>( GlobalVariable.SERVICE_API_URL +"EmergencyContact/AddEmergencyContact",EmergencyContact, this.httpOptions);
}
GetAllEmergencyContact()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"EmergencyContact/GetAllEmergencyContact", this.httpOptions);
}
DeleteEmergencyContact(EmergencyContactId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"EmergencyContact/DeleteEmergencyContact?EmergencyContactId="+EmergencyContactId, this.httpOptions);
}
GetEmergencyContactById(EmergencyContactId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"EmergencyContact/GetEmergencyContactById?EmergencyContactId="+EmergencyContactId, this.httpOptions);
}
UpdateEmergencyContact(EmergencyContact): Observable<any> {
 return this.http.post<EmergencyContact>( GlobalVariable.SERVICE_API_URL +"EmergencyContact/UpdateEmergencyContact",EmergencyContact, this.httpOptions);
}
SaveEmergencyContactImage(formdata,EmergencyContactId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"EmergencyContact/SaveEmergencyContactImage?EmergencyContactId="+EmergencyContactId, formdata, null );
return this.http.request(uploadReq);
}
      
//DestinationGallery
AddDestinationGallery(DestinationGallery): Observable<any> {
 return this.http.post<DestinationGallery>( GlobalVariable.SERVICE_API_URL +"DestinationGallery/AddDestinationGallery",DestinationGallery, this.httpOptions);
}
GetAllDestinationGallery()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"DestinationGallery/GetAllDestinationGallery", this.httpOptions);
}
DeleteDestinationGallery(DestinationGalleryId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"DestinationGallery/DeleteDestinationGallery?DestinationGalleryId="+DestinationGalleryId, this.httpOptions);
}
GetDestinationGalleryById(DestinationGalleryId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"DestinationGallery/GetDestinationGalleryById?DestinationGalleryId="+DestinationGalleryId, this.httpOptions);
}
UpdateDestinationGallery(DestinationGallery): Observable<any> {
 return this.http.post<DestinationGallery>( GlobalVariable.SERVICE_API_URL +"DestinationGallery/UpdateDestinationGallery",DestinationGallery, this.httpOptions);
}
SaveDestinationGalleryImage(formdata,DestinationGalleryId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"DestinationGallery/SaveDestinationGalleryImage?DestinationGalleryId="+DestinationGalleryId, formdata, null );
return this.http.request(uploadReq);
}
//Trip
AddTrip(Trip): Observable<any> {
 return this.http.post<Trip>( GlobalVariable.SERVICE_API_URL +"Trip/AddTrip",Trip, this.httpOptions);
}
GetAllTrip()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Trip/GetAllTrip", this.httpOptions);
}
DeleteTrip(TripId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Trip/DeleteTrip?TripId="+TripId, this.httpOptions);
}
GetTripById(TripId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Trip/GetTripById?TripId="+TripId, this.httpOptions);
}
UpdateTrip(Trip): Observable<any> {
 return this.http.post<Trip>( GlobalVariable.SERVICE_API_URL +"Trip/UpdateTrip",Trip, this.httpOptions);
}
SaveTripImage(formdata,TripId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Trip/SaveTripImage?TripId="+TripId, formdata, null );
return this.http.request(uploadReq);
}
//TripType
AddTripType(TripType): Observable<any> {
 return this.http.post<TripType>( GlobalVariable.SERVICE_API_URL +"TripType/AddTripType",TripType, this.httpOptions);
}
GetAllTripType()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TripType/GetAllTripType", this.httpOptions);
}
DeleteTripType(TripTypeId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"TripType/DeleteTripType?TripTypeId="+TripTypeId, this.httpOptions);
}
GetTripTypeById(TripTypeId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TripType/GetTripTypeById?TripTypeId="+TripTypeId, this.httpOptions);
}
UpdateTripType(TripType): Observable<any> {
 return this.http.post<TripType>( GlobalVariable.SERVICE_API_URL +"TripType/UpdateTripType",TripType, this.httpOptions);
}
SaveTripTypeImage(formdata,TripTypeId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"TripType/SaveTripTypeImage?TripTypeId="+TripTypeId, formdata, null );
return this.http.request(uploadReq);
}
//Feedback
AddFeedback(Feedback): Observable<any> {
 return this.http.post<Feedback>( GlobalVariable.SERVICE_API_URL +"Feedback/AddFeedback",Feedback, this.httpOptions);
}
GetAllFeedback()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Feedback/GetAllFeedback", this.httpOptions);
}
DeleteFeedback(FeedbackId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Feedback/DeleteFeedback?FeedbackId="+FeedbackId, this.httpOptions);
}
GetFeedbackById(FeedbackId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Feedback/GetFeedbackById?FeedbackId="+FeedbackId, this.httpOptions);
}
UpdateFeedback(Feedback): Observable<any> {
 return this.http.post<Feedback>( GlobalVariable.SERVICE_API_URL +"Feedback/UpdateFeedback",Feedback, this.httpOptions);
}
SaveFeedbackImage(formdata,FeedbackId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Feedback/SaveFeedbackImage?FeedbackId="+FeedbackId, formdata, null );
return this.http.request(uploadReq);
}
//Gallery
AddGallery(Gallery): Observable<any> {
 return this.http.post<Gallery>( GlobalVariable.SERVICE_API_URL +"Gallery/AddGallery",Gallery, this.httpOptions);
}
GetAllGallery()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Gallery/GetAllGallery", this.httpOptions);
}
DeleteGallery(GalleryId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Gallery/DeleteGallery?GalleryId="+GalleryId, this.httpOptions);
}
GetGalleryById(GalleryId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Gallery/GetGalleryById?GalleryId="+GalleryId, this.httpOptions);
}
UpdateGallery(Gallery): Observable<any> {
 return this.http.post<Gallery>( GlobalVariable.SERVICE_API_URL +"Gallery/UpdateGallery",Gallery, this.httpOptions);
}
SaveGalleryImage(formdata,GalleryId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Gallery/SaveGalleryImage?GalleryId="+GalleryId, formdata, null );
return this.http.request(uploadReq);
}
//ServiceTable
AddServiceTable(ServiceTable): Observable<any> {
 return this.http.post<ServiceTable>( GlobalVariable.SERVICE_API_URL +"ServiceTable/AddServiceTable",ServiceTable, this.httpOptions);
}
GetAllServiceTable()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ServiceTable/GetAllServiceTable", this.httpOptions);
}
DeleteServiceTable(ServiceTableId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"ServiceTable/DeleteServiceTable?ServiceTableId="+ServiceTableId, this.httpOptions);
}
GetServiceTableById(ServiceTableId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ServiceTable/GetServiceTableById?ServiceTableId="+ServiceTableId, this.httpOptions);
}
UpdateServiceTable(ServiceTable): Observable<any> {
 return this.http.post<ServiceTable>( GlobalVariable.SERVICE_API_URL +"ServiceTable/UpdateServiceTable",ServiceTable, this.httpOptions);
}
SaveServiceTableImage(formdata,ServiceTableId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"ServiceTable/SaveServiceTableImage?ServiceTableId="+ServiceTableId, formdata, null );
return this.http.request(uploadReq);
}

//VendorService
AddVendorService(VendorService): Observable<any> {
 return this.http.post<VendorService>( GlobalVariable.SERVICE_API_URL +"VendorService/AddVendorService",VendorService, this.httpOptions);
}
GetAllVendorService()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"VendorService/GetAllVendorService", this.httpOptions);
}
DeleteVendorService(VendorServiceId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"VendorService/DeleteVendorService?VendorServiceId="+VendorServiceId, this.httpOptions);
}
GetVendorServiceById(VendorServiceId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"VendorService/GetVendorServiceById?VendorServiceId="+VendorServiceId, this.httpOptions);
}
UpdateVendorService(VendorServiceId): Observable<any> {
 return this.http.post<VendorService>( GlobalVariable.SERVICE_API_URL +"VendorService/UpdateVendorService",VendorServiceId, this.httpOptions);
}
SaveVendorServiceImage(formdata,VendorServiceId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"VendorService/SaveVendorServiceImage?VendorServiceId="+VendorServiceId, formdata, null );
return this.http.request(uploadReq);
}
//Blog
 
//Alert
AddAlert(Alert): Observable<any> {
 return this.http.post<Alert>( GlobalVariable.SERVICE_API_URL +"Alert/AddAlert",Alert, this.httpOptions);
}
GetAllAlert()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Alert/GetAllAlert", this.httpOptions);
}
DeleteAlert(AlertId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Alert/DeleteAlert?AlertId="+AlertId, this.httpOptions);
}
GetAlertById(AlertId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Alert/GetAlertById?AlertId="+AlertId, this.httpOptions);
}
UpdateAlert(Alert): Observable<any> {
 return this.http.post<Alert>( GlobalVariable.SERVICE_API_URL +"Alert/UpdateAlert",Alert, this.httpOptions);
}
SaveAlertImage(formdata,AlertId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Alert/SaveAlertImage?AlertId="+AlertId, formdata, null );
return this.http.request(uploadReq);
}
//Booking
AddBooking(Booking): Observable<any> {
 return this.http.post<Booking>( GlobalVariable.SERVICE_API_URL +"Booking/AddBooking",Booking, this.httpOptions);
}
GetAllBooking()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Booking/GetAllBooking", this.httpOptions);
}
DeleteBooking(BookingId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Booking/DeleteBooking?BookingId="+BookingId, this.httpOptions);
}
GetBookingById(BookingId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Booking/GetBookingById?BookingId="+BookingId, this.httpOptions);
}
UpdateBooking(Booking): Observable<any> {
 return this.http.post<Booking>( GlobalVariable.SERVICE_API_URL +"Booking/UpdateBooking",Booking, this.httpOptions);
}
SaveBookingImage(formdata,BookingId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Booking/SaveBookingImage?BookingId="+BookingId, formdata, null );
return this.http.request(uploadReq);
}


//UserRole
AddUserRole(UserRole): Observable<any> {
 return this.http.post<UserRole>( GlobalVariable.SERVICE_API_URL +"UserRole/AddUserRole",UserRole, this.httpOptions);
}
GetAllUserRole()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserRole/GetAllUserRole", this.httpOptions);
}
DeleteUserRole(UserRoleId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"UserRole/DeleteUserRole?UserRoleId="+UserRoleId, this.httpOptions);
}
GetUserRoleById(UserRoleId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"UserRole/GetUserRoleById?UserRoleId="+UserRoleId, this.httpOptions);
}
UpdateUserRole(UserRole): Observable<any> {
 return this.http.post<UserRole>( GlobalVariable.SERVICE_API_URL +"UserRole/UpdateUserRole",UserRole, this.httpOptions);
}
SaveUserRoleImage(formdata,UserRoleId): Observable<any> {
const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"UserRole/SaveUserRoleImage?UserRoleId="+UserRoleId, formdata, null );
return this.http.request(uploadReq);
}

//==============================================================================
//Blog
AddBlog(Blog): Observable<any> {
    return this.http.post<Blog>( GlobalVariable.SERVICE_API_URL +"Blog/AddBlog",Blog, this.httpOptions);
   }

   GetAllBlog()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Blog/GetAllBlog", this.httpOptions);
   }

   DeleteBlog(BlogId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Blog/DeleteBlog?BlogId="+BlogId, this.httpOptions);
   }

   GetBlogById(BlogId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Blog/GetBlogById?BlogId="+BlogId, this.httpOptions);
   }
   
   UpdateBlog(Blog): Observable<any> {
    return this.http.post<Blog>( GlobalVariable.SERVICE_API_URL +"Blog/UpdateBlog",Blog, this.httpOptions);
   }
   SaveBlogImage(formdata,BlogId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Blog/SaveBlogImage?BlogId="+BlogId, formdata, null );
   return this.http.request(uploadReq);
   }

   //======================================================================================
   //Hotel
   AddHotel(Hotel): Observable<any> {
    return this.http.post<Hotel>( GlobalVariable.SERVICE_API_URL +"Hotel/AddHotel",Hotel, this.httpOptions);
   }
   GetAllHotel()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Hotel/GetAllHotel", this.httpOptions);
   }
   DeleteHotel(HotelId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Hotel/DeleteHotel?HotelId="+HotelId, this.httpOptions);
   }
   GetHotelById(HotelId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Hotel/GetHotelById?HotelId="+HotelId, this.httpOptions);
   }
   UpdateHotel(Hotel): Observable<any> {
    return this.http.post<Hotel>( GlobalVariable.SERVICE_API_URL +"Hotel/UpdateHotel",Hotel, this.httpOptions);
   }
   SaveHotelImage(formdata,HotelId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Hotel/SaveHotelImage?HotelId="+HotelId, formdata, null );
   return this.http.request(uploadReq);
   }

   
  //Travel
  AddTravel(Travel): Observable<any> {
    return this.http.post<Travel>( GlobalVariable.SERVICE_API_URL +"Travel/AddTravel",Travel, this.httpOptions);
   }
   GetAllTravel()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Travel/GetAllTravel", this.httpOptions);
   }
   DeleteTravel(TravelId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Travel/DeleteTravel?TravelId="+TravelId, this.httpOptions);
   }
   GetTravelById(TravelId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Travel/GetTravelById?TravelId="+TravelId, this.httpOptions);
   }
   UpdateTravel(Travel): Observable<any> {
    return this.http.post<Travel>( GlobalVariable.SERVICE_API_URL +"Travel/UpdateTravel",Travel, this.httpOptions);
   }
   SaveTravelImage(formdata,TravelId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Travel/SaveTravelImage?TravelId="+TravelId, formdata, null );
   return this.http.request(uploadReq);
   }


   //Vehicle
AddVehicle(Vehicle): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Vehicle/AddVehicle",Vehicle, this.httpOptions);
   }
   GetAllVehicle()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Vehicle/GetAllVehicle", this.httpOptions);
   }
   DeleteVehicle(VehicleId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Vehicle/DeleteVehicle?VehicleId="+VehicleId, this.httpOptions);
   }
   GetVehicleById(VehicleId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Vehicle/GetVehicleById?VehicleId="+VehicleId, this.httpOptions);
   }
   UpdateVehicle(Vehicle): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Vehicle/UpdateVehicle",Vehicle, this.httpOptions);
   }
   SaveVehicleImage(formdata,VehicleId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Vehicle/SaveVehicleImage?VehicleId="+VehicleId, formdata, null );
   return this.http.request(uploadReq);
   }




   //ServiceMaster
   AddServiceMaster(ServiceMaster): Observable<any> {
    return this.http.post<ServiceMaster>( GlobalVariable.SERVICE_API_URL +"ServiceMaster/AddServiceMaster",ServiceMaster, this.httpOptions);
   }
   GetAllServiceMaster()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ServiceMaster/GetAllServiceMaster", this.httpOptions);
   }
   DeleteServiceMaster(ServiceMasterId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"ServiceMaster/DeleteServiceMaster?ServiceMasterId="+ServiceMasterId, this.httpOptions);
   }
   GetServiceMasterById(ServiceMasterId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ServiceMaster/GetServiceMasterById?ServiceMasterId="+ServiceMasterId, this.httpOptions);
   }
   UpdateServiceMaster(ServiceMaster): Observable<any> {
    return this.http.post<ServiceMaster>( GlobalVariable.SERVICE_API_URL +"ServiceMaster/UpdateServiceMaster",ServiceMaster, this.httpOptions);
   }
   SaveServiceMasterImage(formdata,ServiceMasterId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"ServiceMaster/SaveServiceMasterImage?ServiceMasterId="+ServiceMasterId, formdata, null );
   return this.http.request(uploadReq);
   }

//===========Acitivity====================================================================================
//Activities
AddActivities(Activities): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Activities/AddActivities",Activities, this.httpOptions);
   }
   GetAllActivities()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Activities/GetAllActivities", this.httpOptions);
   }
   DeleteActivities(ActivitiesId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Activities/DeleteActivities?ActivitiesId="+ActivitiesId, this.httpOptions);
   }
   GetActivitiesById(ActivitiesId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Activities/GetActivitiesById?ActivitiesId="+ActivitiesId, this.httpOptions);
   }
   UpdateActivities(Activities): Observable<any> {
    
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Activities/UpdateActivities",Activities, this.httpOptions);
   }
   SaveActivitiesImage(formdata,ActivitiesId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Activities/SaveActivitiesImage?ActivitiesId="+ActivitiesId, formdata, null );
   return this.http.request(uploadReq);
   }

   //====================================================================================================
   //AdmCityMaster
   AddAdmCityMaster(AdmCityMaster): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmCityMaster/AddAdmCityMaster",AdmCityMaster, this.httpOptions);
   }
   GetAllAdmCityMaster()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmCityMaster/GetAllAdmCityMaster", this.httpOptions);
   }
   DeleteAdmCityMaster(AdmCityMasterId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"AdmCityMaster/DeleteAdmCityMaster?AdmCityMasterId="+AdmCityMasterId, this.httpOptions);
   }
   GetAdmCityMasterById(AdmCityMasterId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmCityMaster/GetAdmCityMasterById?AdmCityMasterId="+AdmCityMasterId, this.httpOptions);
   }
   UpdateAdmCityMaster(AdmCityMaster): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmCityMaster/UpdateAdmCityMaster",AdmCityMaster, this.httpOptions);
   }
   SaveAdmCityMasterImage(formdata,AdmCityMasterId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"AdmCityMaster/SaveAdmCityMasterImage?AdmCityMasterId="+AdmCityMasterId, formdata, null );
   return this.http.request(uploadReq);
   }
   

//CityInfo
AddCityInfo(CityInfo): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"CityInfo/AddCityInfo",CityInfo, this.httpOptions);
   }
   GetAllCityInfo()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"CityInfo/GetAllCityInfo", this.httpOptions);
   }
   DeleteCityInfo(AdmCityInfoId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"CityInfo/DeleteCityInfo?AdmCityInfoId="+AdmCityInfoId, this.httpOptions);
   }
   GetCityInfoById(AdmCityInfoId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"CityInfo/GetCityInfoById?AdmCityInfoId="+AdmCityInfoId, this.httpOptions);
   }
   UpdateCityInfo(CityInfo): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"CityInfo/UpdateCityInfo",CityInfo, this.httpOptions);
   }
   SaveCityInfoImage(formdata,AdmCityInfoId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"CityInfo/SaveCityInfoImage?CityInfoId="+AdmCityInfoId, formdata, null );
   return this.http.request(uploadReq);
   }



//Rooms
AddRooms(Rooms): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Rooms/AddRooms",Rooms, this.httpOptions);
   }
   GetAllRooms()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Rooms/GetAllRooms", this.httpOptions);
   }
   DeleteRooms(RoomsId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"Rooms/DeleteRooms?RoomsId="+RoomsId, this.httpOptions);
   }
   GetRoomsById(RoomsId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"Rooms/GetRoomsById?RoomsId="+RoomsId, this.httpOptions);
   }
   UpdateRooms(Rooms): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"Rooms/UpdateRooms",Rooms, this.httpOptions);
   }
   SaveRoomsImage(formdata,RoomsId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"Rooms/SaveRoomsImage?RoomsId="+RoomsId, formdata, null );
   return this.http.request(uploadReq);
   }

//FeedBack
AddFeedBack(FeedBack): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"FeedBack/AddFeedBack",FeedBack, this.httpOptions);
   }
   GetAllFeedBack()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"FeedBack/GetAllFeedBack", this.httpOptions);
   }
   DeleteFeedBack(FeedBackId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"FeedBack/DeleteFeedBack?FeedBackId="+FeedBackId, this.httpOptions);
   }
   GetFeedBackById(FeedBackId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"FeedBack/GetFeedBackById?FeedBackId="+FeedBackId, this.httpOptions);
   }
   UpdateFeedBack(FeedBack): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"FeedBack/UpdateFeedBack",FeedBack, this.httpOptions);
   }
   SaveFeedBackImage(formdata,FeedBackId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"FeedBack/SaveFeedBackImage?FeedBackId="+FeedBackId, formdata, null );
   return this.http.request(uploadReq);
   }
   
//HotelBookTrs
AddHotelBookTrs(HotelBookTrs): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelBookTrs/AddHotelBookTrs",HotelBookTrs, this.httpOptions);
   }
   GetAllHotelBookTrs()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelBookTrs/GetAllHotelBookTrs", this.httpOptions);
   }
   DeleteHotelBookTrs(HotelBookTrsId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"HotelBookTrs/DeleteHotelBookTrs?HotelBookTrsId="+HotelBookTrsId, this.httpOptions);
   }
   GetHotelBookTrsById(HotelBookTrsId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelBookTrs/GetHotelBookTrsById?HotelBookTrsId="+HotelBookTrsId, this.httpOptions);
   }
   UpdateHotelBookTrs(HotelBookTrs): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelBookTrs/UpdateHotelBookTrs",HotelBookTrs, this.httpOptions);
   }
   SaveHotelBookTrsImage(formdata,HotelBookTrsId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"HotelBookTrs/SaveHotelBookTrsImage?HotelBookTrsId="+HotelBookTrsId, formdata, null );
   return this.http.request(uploadReq);
   }
   //HotelBooking
   AddHotelBooking(HotelBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelBooking/AddHotelBooking",HotelBooking, this.httpOptions);
   }
   GetAllHotelBooking()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelBooking/GetAllHotelBooking", this.httpOptions);
   }
   DeleteHotelBooking(HotelBookingId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"HotelBooking/DeleteHotelBooking?HotelBookingId="+HotelBookingId, this.httpOptions);
   }
   GetHotelBookingById(HotelBookingId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelBooking/GetHotelBookingById?HotelBookingId="+HotelBookingId, this.httpOptions);
   }
   UpdateHotelBooking(HotelBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelBooking/UpdateHotelBooking",HotelBooking, this.httpOptions);
   }
   SaveHotelBookingImage(formdata,HotelBookingId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"HotelBooking/SaveHotelBookingImage?HotelBookingId="+HotelBookingId, formdata, null );
   return this.http.request(uploadReq);
   }
   //TravelBooking
   AddTravelBooking(TravelBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelBooking/AddTravelBooking",TravelBooking, this.httpOptions);
   }
   GetAllTravelBooking()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelBooking/GetAllTravelBooking", this.httpOptions);
   }
   DeleteTravelBooking(TravelBookingId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"TravelBooking/DeleteTravelBooking?TravelBookingId="+TravelBookingId, this.httpOptions);
   }
   GetTravelBookingById(TravelBookingId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelBooking/GetTravelBookingById?TravelBookingId="+TravelBookingId, this.httpOptions);
   }
   UpdateTravelBooking(TravelBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelBooking/UpdateTravelBooking",TravelBooking, this.httpOptions);
   }
   SaveTravelBookingImage(formdata,TravelBookingId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"TravelBooking/SaveTravelBookingImage?TravelBookingId="+TravelBookingId, formdata, null );
   return this.http.request(uploadReq);
   }
   //TravelBookTrs
   AddTravelBookTrs(TravelBookTrs): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelBookTrs/AddTravelBookTrs",TravelBookTrs, this.httpOptions);
   }
   GetAllTravelBookTrs()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelBookTrs/GetAllTravelBookTrs", this.httpOptions);
   }
   DeleteTravelBookTrs(TravelBookTrsId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"TravelBookTrs/DeleteTravelBookTrs?TravelBookTrsId="+TravelBookTrsId, this.httpOptions);
   }
   GetTravelBookTrsById(TravelBookTrsId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelBookTrs/GetTravelBookTrsById?TravelBookTrsId="+TravelBookTrsId, this.httpOptions);
   }
   UpdateTravelBookTrs(TravelBookTrs): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelBookTrs/UpdateTravelBookTrs",TravelBookTrs, this.httpOptions);
   }
   SaveTravelBookTrsImage(formdata,TravelBookTrsId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"TravelBookTrs/SaveTravelBookTrsImage?TravelBookTrsId="+TravelBookTrsId, formdata, null );
   return this.http.request(uploadReq);
   }


    //AdmSubscription
 AddAdmSubscription(AdmSubscription): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmSubscription/AddAdmSubscription",AdmSubscription, this.httpOptions);
   }
   GetAllAdmSubscription()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmSubscription/GetAllAdmSubscription", this.httpOptions);
   }
   DeleteAdmSubscription(AdmSubscriptionId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"AdmSubscription/DeleteAdmSubscription?AdmSubscriptionId="+AdmSubscriptionId, this.httpOptions);
   }
   GetAdmSubscriptionById(AdmSubscriptionId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmSubscription/GetAdmSubscriptionById?AdmSubscriptionId="+AdmSubscriptionId, this.httpOptions);
   }
   UpdateAdmSubscription(AdmSubscription): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmSubscription/UpdateAdmSubscription",AdmSubscription, this.httpOptions);
   }
   SaveAdmSubscriptionImage(formdata,AdmSubscriptionId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"AdmSubscription/SaveAdmSubscriptionImage?AdmSubscriptionId="+AdmSubscriptionId, formdata, null );
   return this.http.request(uploadReq);
   }
   
   
   
   //AdmVendorSubscription
   AddAdmVendorSubscription(AdmVendorSubscription): Observable<any> {
       return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/AddAdmVendorSubscription",AdmVendorSubscription, this.httpOptions);
      }
      GetAllAdmVendorSubscription()  {
          return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/GetAllAdmVendorSubscription", this.httpOptions);
      }
      DeleteAdmVendorSubscription(AdmVendorSubscriptionId): Observable<any> {
          return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/DeleteAdmSubscription?AdmVendorSubscriptionId="+AdmVendorSubscriptionId, this.httpOptions);
      }
      GetAdmVendorSubscriptionById(AdmVendorSubscriptionId): Observable<any> {
          return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/GetAdmVendorSubscriptionById?AdmVendorSubscriptionId="+AdmVendorSubscriptionId, this.httpOptions);
      }
      UpdateAdmVendorSubscription(AdmVendorSubscription): Observable<any> {
       return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/UpdateAdmVendorSubscription",AdmVendorSubscription, this.httpOptions);
      }
      SaveAdmVendorSubscriptionImage(formdata,AdmVendorSubscriptionId): Observable<any> {
      const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"AdmVendorSubscription/SaveAdmVendorSubscriptionImage?AdmVendorSubscriptionId="+AdmVendorSubscriptionId, formdata, null );
      return this.http.request(uploadReq);
      }



//TransactionDetail
AddTransactionDetail(TransactionDetail): Observable<any> {
    return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "TransactionDetail/AddTransactionDetail", TransactionDetail, this.httpOptions);
  }
  GetAllTransactionDetail() {
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "TransactionDetail/GetAllTransactionDetail", this.httpOptions);
  }
  DeleteTransactionDetail(TransactionDetailId): Observable<any> {
    return this.http.delete<any>(GlobalVariable.SERVICE_API_URL + "TransactionDetail/DeleteTransactionDetail?TransactionDetailId=" + TransactionDetailId, this.httpOptions);
  }
  GetTransactionDetailById(TransactionDetailId): Observable<any> {
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "TransactionDetail/GetTransactionDetailById?TransactionDetailId=" + TransactionDetailId, this.httpOptions);
  }
  UpdateTransactionDetail(TransactionDetail): Observable<any> {
    return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "TransactionDetail/UpdateTransactionDetail", TransactionDetail, this.httpOptions);
  }
  SaveTransactionDetailImage(formdata, TransactionDetailId): Observable<any> {
    const uploadReq = new HttpRequest('Post', GlobalVariable.SERVICE_API_URL + "TransactionDetail/SaveTransactionDetailImage?TransactionDetailId=" + TransactionDetailId, formdata, null);
    return this.http.request(uploadReq);
  }

  //VendorTransactionDetail
  AddVendorTransactionDetail(VendorTransactionDetail): Observable<any> {
    return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/AddVendorTransactionDetail", VendorTransactionDetail, this.httpOptions);
  }
  GetAllVendorTransactionDetail() {
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/GetAllVendorTransactionDetail", this.httpOptions);
  }
  DeleteVendorTransactionDetail(VendorTransactionDetailId): Observable<any> {
    return this.http.delete<any>(GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/DeleteVendorTransactionDetail?VendorTransactionDetailId=" + VendorTransactionDetailId, this.httpOptions);
  }
  GetVendorTransactionDetailById(VendorTransactionDetailId): Observable<any> {
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/GetVendorTransactionDetailById?VendorTransactionDetailId=" + VendorTransactionDetailId, this.httpOptions);
  }
  UpdateVendorTransactionDetail(VendorTransactionDetail): Observable<any> {
    return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/UpdateVendorTransactionDetail", VendorTransactionDetail, this.httpOptions);
  }
  SaveVendorTransactionDetailImage(formdata, VendorTransactionDetailId): Observable<any> {
    const uploadReq = new HttpRequest('Post', GlobalVariable.SERVICE_API_URL + "VendorTransactionDetail/SaveTransactionDetailImage?VendorTransactionDetailId=" + VendorTransactionDetailId, formdata, null);
    return this.http.request(uploadReq);
  }



        //PurchasePlan
        AddPurchasePlan(PurchasePlan): Observable<any> {
            return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "PurchasePlan/AddPurchasePlan", PurchasePlan, this.httpOptions);
          }
          GetAllPurchasePlan() {
            return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "PurchasePlan/GetAllPurchasePlan", this.httpOptions);
          }
          DeletePurchasePlan(PurchasePlanId): Observable<any> {
            return this.http.delete<any>(GlobalVariable.SERVICE_API_URL + "PurchasePlan/DeletePurchasePlan?PurchasePlanId=" + PurchasePlanId, this.httpOptions);
          }
          GetPurchasePlanById(PurchasePlanId): Observable<any> {
            return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "PurchasePlan/GetPurchasePlanById?PurchasePlanId=" + PurchasePlanId, this.httpOptions);
          }
          UpdatePurchasePlan(PurchasePlan): Observable<any> {
            return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "PurchasePlan/UpdatePurchasePlan", PurchasePlan, this.httpOptions);
          }
          SavePurchasePlanImage(formdata, PurchasePlanId): Observable<any> {
            const uploadReq = new HttpRequest('Post', GlobalVariable.SERVICE_API_URL + "PurchasePlan/SavePurchasePlanImage?PurchasePlanId=" + PurchasePlanId, formdata, null);
            return this.http.request(uploadReq);
          }
        
            //VendorPurchasePlan
            AddVendorPurchasePlan(VendorPurchasePlan): Observable<any> {
              return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/AddVendorPurchasePlan", VendorPurchasePlan, this.httpOptions);
            }
            GetAllVendorPurchasePlan() {
              return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/GetAllVendorPurchasePlan", this.httpOptions);
            }
            DeleteVendorPurchasePlan(VendorPurchasePlanId): Observable<any> {
              return this.http.delete<any>(GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/DeleteVendorPurchasePlan?VendorPurchasePlanId=" + VendorPurchasePlanId, this.httpOptions);
            }
            GetVendorPurchasePlanById(VendorPurchasePlanId): Observable<any> {
              return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/GetVendorPurchasePlanById?VendorPurchasePlanId=" + VendorPurchasePlanId, this.httpOptions);
            }
            UpdateVendorPurchasePlan(VendorPurchasePlan): Observable<any> {
              return this.http.post<any>(GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/UpdateVendorPurchasePlan", VendorPurchasePlan, this.httpOptions);
            }
            // SaveVendorPurchasePlanImage(formdata, PurchasePlanId): Observable<any> {
            //   const uploadReq = new HttpRequest('Post', GlobalVariable.SERVICE_API_URL + "VendorPurchasePlan/SavePurchasePlanImage?PurchasePlanId=" + PurchasePlanId, formdata, null);
            //   return this.http.request(uploadReq);
            // }

//HotelTrsDetail
AddHotelTrsDetail(HotelTrsDetail): Observable<any> {
 return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/AddHotelTrsDetail",HotelTrsDetail, this.httpOptions);
}
GetAllHotelTrsDetail()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/GetAllHotelTrsDetail", this.httpOptions);
}
DeleteHotelTrsDetail(HotelTrsDetail): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/DeleteHotelTrsDetail?HotelTrsDetail="+HotelTrsDetail, this.httpOptions);
}
GetHotelTrsDetailById(HotelTrsDetail): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/GetHotelTrsDetailById?HotelTrsDetail="+HotelTrsDetail, this.httpOptions);
}
UpdateHotelTrsDetail(HotelTrsDetail): Observable<any> {
 return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/UpdateHotelTrsDetail",HotelTrsDetail, this.httpOptions);
}
// SaveHotelTrsDetailImage(formdata,HotelTrsDetail): Observable<any> {
// const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"HotelTrsDetail/SaveHotelTrsDetailImage?HotelTrsDetail="+HotelTrsDetail, formdata, null );
// return this.http.request(uploadReq);
// }
//TravelTrsDetail
AddTravelTrsDetail(TravelTrsDetail): Observable<any> {
 return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/AddTravelTrsDetail",TravelTrsDetail, this.httpOptions);
}
GetAllTravelTrsDetail()  {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/GetAllTravelTrsDetail", this.httpOptions);
}
DeleteTravelTrsDetail(TravelBookTrsId): Observable<any> {
    return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/DeleteTravelTrsDetail?TravelBookTrsId="+TravelBookTrsId, this.httpOptions);
}
GetTravelTrsDetailById(TravelBookTrsId): Observable<any> {
    return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/GetTravelTrsDetailById?TravelBookTrsId="+TravelBookTrsId, this.httpOptions);
}
UpdateTravelTrsDetail(TravelTrsDetail): Observable<any> {
 return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/UpdateTravelTrsDetail",TravelTrsDetail, this.httpOptions);
}
// SaveTravelTrsDetailImage(formdata,TravelBookTrsId): Observable<any> {
// const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"TravelTrsDetail/SaveTravelTrsDetailImage?TravelBookTrsId="+TravelBookTrsId, formdata, null );
// return this.http.request(uploadReq);
// }


//NewServiceReq
AddNewServiceReq(NewServiceReq): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"NewServiceReq/AddNewServiceReq",NewServiceReq, this.httpOptions);
   }
   GetAllNewServiceReq()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"NewServiceReq/GetAllNewServiceReq", this.httpOptions);
   }
   DeleteNewServiceReq(NewServiceReqId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"NewServiceReq/DeleteNewServiceReq?NewServiceReqId="+NewServiceReqId, this.httpOptions);
   }
   GetNewServiceReqById(NewServiceReqId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"NewServiceReq/GetNewServiceReqById?NewServiceReqId="+NewServiceReqId, this.httpOptions);
   }
   UpdateNewServiceReq(NewServiceReq): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"NewServiceReq/UpdateNewServiceReq",NewServiceReq, this.httpOptions);
   }
   SaveNewServiceReqImage(formdata,NewServiceReqId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"NewServiceReq/SaveNewServiceReqImage?NewServiceReqId="+NewServiceReqId, formdata, null );
   return this.http.request(uploadReq);
   }

//Role
GetAllRole() {
    return this.http.get<any>(GlobalVariable.SERVICE_API_URL + "Role/GetAllRole", this.httpOptions);
    }



    //ActivityBooking
AddActivityBooking(ActivityBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"ActivityBooking/AddActivityBooking",ActivityBooking, this.httpOptions);
   }
   GetAllActivityBooking()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ActivityBooking/GetAllActivityBooking", this.httpOptions);
   }
   DeleteActivityBooking(ActivityBookingId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"ActivityBooking/DeleteActivityBooking?ActivityBookingId="+ActivityBookingId, this.httpOptions);
   }
   GetActivityBookingById(ActivityBookingId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ActivityBooking/GetActivityBookingById?ActivityBookingId="+ActivityBookingId, this.httpOptions);
   }
   UpdateActivityBooking(ActivityBooking): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"ActivityBooking/UpdateActivityBooking",ActivityBooking, this.httpOptions);
   }
   SaveActivityBookingImage(formdata,ActivityBookingId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"ActivityBooking/SaveActivityBookingImage?ActivityBookingId="+ActivityBookingId, formdata, null );
   return this.http.request(uploadReq);
   }
   //ActivityTrsDetail
   AddActivityTrsDetail(ActivityTrsDetail): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/AddActivityTrsDetail",ActivityTrsDetail, this.httpOptions);
   }
   GetAllActivityTrsDetail()  {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/GetAllActivityTrsDetail", this.httpOptions);
   }
   DeleteActivityTrsDetail(ActivityTrsDetailId): Observable<any> {
       return this.http.delete<any>( GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/DeleteActivityTrsDetail?ActivityTrsDetailId="+ActivityTrsDetailId, this.httpOptions);
   }
   GetActivityTrsDetailById(ActivityTrsDetailId): Observable<any> {
       return this.http.get<any>( GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/GetActivityTrsDetailById?ActivityTrsDetailId="+ActivityTrsDetailId, this.httpOptions);
   }
   UpdateActivityTrsDetail(ActivityTrsDetail): Observable<any> {
    return this.http.post<any>( GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/UpdateActivityTrsDetail",ActivityTrsDetail, this.httpOptions);
   }
   SaveActivityTrsDetailImage(formdata,ActivityTrsDetailId): Observable<any> {
   const uploadReq = new  HttpRequest('Post',GlobalVariable.SERVICE_API_URL +"ActivityTrsDetail/SaveActivityTrsDetailImage?ActivityTrsDetailId="+ActivityTrsDetailId, formdata, null );
   return this.http.request(uploadReq);
   }
}
   