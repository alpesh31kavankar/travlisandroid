// export class Registration {
//   RegistrationId: number;
//   FName: string;
//   LName: string;
//   Email: string;
//   Password: string;
//   ConfirmPassword: string;
//   EmailStatus: string;
//   OTPNo: string;
//   DefaultRole: number;
//   Status: string;
//   CreatedBy: string;
//   CreatedDate: string;
//   UpdatedBy: string;
//   UpdatedDate: string;
// }
// export class vendor {
//   RegistrationId: number;
//   Name: string;
//   SubTitle: string;
//   Photo:string;
//   Status:string;
//   Description:string;
  
 
 
// }



//     export class Login {
//         Email: string;
//         Password: string;
//     }
//     export class UserDetail{
//     UserDetailsId: number;
//     registration: Registration
//     RegistrationId: number;
//     Contact: string;
//     Tagline: string;
//     Photo: string;
//     BirthDate: string;
//     Address: string;
//     Gender: string;
//     Status: string;
//     Amount:number;
//     Description:String
//     // admCountryMaster: AdmCountryMaster
//     AdmCountryMasterId: string;
//     // admStateMaster: AdmStateMaster
//     AdmStateMasterId: string;
//     // admCityMaster: AdmCityMaster
//     AdmCityMasterId: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
   
//     export class Blog{
//       patchValue(arg0: { fileName: any; }) {
//         throw new Error('Method not implemented.');
//       }
//       BlogId: number;
//       serviceMaster: ServiceMaster
//       ServiceMasterId: number;
//       admVendor: AdmVendor
//       AdmVendorId: number;
//       Name: string;
//       Subtitle: string;
//       Description: string;
//       City: string;
//       Image: string;
//       Status: string;
//       CreatedDate: string;
//       CreatedBy: string;
//       UpdatedDate: string;
//       UpdatedBy: string;
//       }
     

//       export class Travel {
//         TravelId: number;
//         Title: string;
//         Subtitle: string;
//         admVendor: AdmVendor
//         AdmVendorId: number;
//         serviceMaster: ServiceMaster
//         ServiceMasterId: number;
//         TravelType: string;
//         TransType: string; 

//         To: string; 
//         Form: string; 

//         Image: string;
//         Departure: string;
//         Arrival: string;
//         Price: string;
//         Seats: string;
//         Amenities: string;
//         Status: string;
//         CreatedDate: string;
//         CreatedBy: string;
//       }
//       // export class Travel{
//       // TravelId: number;
//       // Title: string;
//       // admVendor: AdmVendor
//       // AdmVendorId: number;
//       // serviceMaster: ServiceMaster
//       // ServiceMasterId: number;
//       // TravelType: string;
//       // Photo: string;
//       // Departure: string;
//       // Arrival: string;
//       // Price: string;
//       // Seats: string;
//       // Amenities: string;
//       // Status: string;
//       // CreatedDate: string;
//       // CreatedBy: string;
//       // }
//       // export class ServiceMaster{
//       // ServiceMasterId: number;
//       // Title: string;
//       // Description: string;
//       // Status: string;
//       // CreatedDate: string;
//       // CreatedBy: string;
//       // UpdatedDate: string;
//       // UpdatedBy: string;
//       // }
      
      
//     export class UserSocialMedia{
//     UserSocialMediaId: number;
//     registration: Registration
//     RegistrationId: number;
//     Instagram: string;
//     Facebook: string;
//     Twiter: string;
//     LinkedIn: string;
//     YouTube: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class EmergencyContact{
//     EmergencyContactId: number;
//     registration: Registration
//     RegistrationId: number;
//     Name: string;
//     Relationship: string;
//     Contact: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class AdmDestinations{
//     AdmDestinationsId: number;
//     Title: string;
//     SubTitle: string;
//     Description: string;
//     Status: string;
//     // admCountryMaster: AdmCountryMaster
//     AdmCountryMasterId: number;
//     // admStateMaster: AdmStateMaster
//     AdmStateMasterId: number;
//     // admCityMaster: AdmCityMaster
//     AdmCityMasterId: number;
//     Photo: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class DestinationGallery{
//     DestinationGalleryId: number;
//     admDestinations: AdmDestinations
//     AdmDestinationsId: number;
//     Title: string;
//     SubTitle: string;
//     Status: string;
//     Photo: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
    
    
//     export class Trip{
//     TripId: number;
//     registration: Registration
//     RegistrationId: number;
//     admVendor: AdmVendor
//     AdmVendorId: number;
//     Source: string;
//     admDestinations: AdmDestinations
//     AdmDestinationsId: number;
//     Date: string;
//     tripType: TripType
//     TripTypeId: number;
//     Status: string;
//     Budget: number;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class TripType{
//     TripTypeId: number;
//     Title: string;
//     SubTitle: string;
//     Icon: string;
//     Status: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class Feedback{
//     FeedbackId: number;
//     registration: Registration
//     RegistrationId: number;
//     admVendor: AdmVendor
//     AdmVendorId: number;
//     FeedbackText: string;
//     Rating: number;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class Gallery{
//     GalleryId: number;
//     Title: string;
//     SubTitle: string;
//     registration: Registration
//     RegistrationId: number;
//     trip: Trip
//     TripId: number;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class ServiceTable{
//     ServiceTableId: number;
//     Title: string;
//     SubTitle: string;
//     vendorService: VendorService
//     VendorServiceId: number;
//     Photo: string;
//     Status: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class AdmVendor{
//     AdmVendorId: number;
//     registration: Registration
//     RegistrationId: number;
//     Name: string;
//     SubTitle: string;
//     Description: string;
//     Photo: string;
//     Status: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class VendorService{
//     push(data: any) {
//       throw new Error('Method not implemented.');
//     }
//     VendorServiceId: number;
//     admVendor: AdmVendor
//     AdmVendorId: number;
//     serviceTable: ServiceTable
//     ServiceTableId: number;
//     admDestinations: AdmDestinations
//     AdmDestinationsId: number;
//     ServiceCost: number;
//     Status: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class Alert{
//     AlertId: number;
//     registration: Registration
//     RegistrationId: number;
//     admDestinations: AdmDestinations
//     AdmDestinationsId: number;
//     AlertMessage: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class Booking{
//     BookingId: number;
//     registration: Registration
//     RegistrationId: number;
//     vendorService: VendorService
//     VendorServiceId: number;
//     BookingDate: string;
//     Status: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class Hotel{
//       HotelId: number;
//       admVendor: AdmVendor
//       AdmVendorId: number;
//       serviceMaster: ServiceMaster
//       ServiceMasterId: number;
//       Title: string;
//       City: string;
//       Address: string;
//       ContactNo: string;
//       NoOfRoom: string;
//       Image: string;
//       Amenities: string;
//       PropertyRules: string;
//       RoomType: string;
//       Amount: number;
//       Status: string;
//       CreatedDate: string;
//       CreatedBy: string;
//       UpdatedDate: string;
//       UpdatedBy: string;
//       }
      
//       export class ServiceMaster {
//         ServiceMasterId: number;
//         Title: string;
//         Description: string;
//         Status: string;
//         CreatedDate: string;
//         CreatedBy: string;
//         UpdatedDate: string;
//         UpdatedBy: string;
//       }


//     export class AdmRoleMaster{
//     AdmRoleMasterId: number;
//     RoleName: string;
//     DisplayRole: string;
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     Status: string;
//     }
//     export class UserRole{
    
//       RoleId: number;
//       Status: string;
//     UserRoleId: number;
//     admRoleMaster: AdmRoleMaster
//     AdmRoleMasterId: number;
//     registration: Registration
//     RegistrationId: number;
  
//     CreatedDate: string;
//     CreatedBy: string;
//     UpdatedDate: string;
//     UpdatedBy: string;
//     }
//     export class AdmCityMaster{
//         AdmCityMasterId: number;
//         admStateMaster: AdmStateMaster
//         AdmStateMasterId: number;
//         admCountryMaster: AdmCountryMaster
//         AdmCountryMasterId: number;
//         CityDescription: string;
//         Status: string;
//         CreatedDate: string;
//         CreatedBy: string;
//         UpdatedDate: string;
//         UpdatedBy: string;
//         }
// export class AdmCountryMaster{
//         AdmCountryMasterId: number;
//         CountryDescription: string;
//         Status: string;
//         CreatedDate: string;
//         CreatedBy: string;
//         UpdatedDate: string;
//         UpdatedBy: string;
//         }
// export class AdmStateMaster
// {       
//   AdmStateMasterId: number;
//   admCountryMaster: AdmCountryMaster
//   AdmCountryMasterId: number;
//   StateDescription: string;
//   Status: string;
//   CreatedDate: string;
//   CreatedBy: string;
//   UpdatedDate: string;
//   UpdatedBy: string;
// }
        

// // export class AdmCityMaster{
// //   AdmCityMasterId: number;
// //   admStateMaster: AdmStateMaster
// //   AdmStateMasterId: number;
// //   admCountryMaster: AdmCountryMaster
// //   AdmCountryMasterId: number;
// //   CityDescription: string;
// //   Status: string;
// //   CreatedDate: string;
// //   CreatedBy: string;
// //   UpdatedDate: string;
// //   UpdatedBy: string;
// //   registration: any;
// //   }






export class Registration {
  RegistrationId: number;
  FName: string;
  LName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  EmailStatus: string;
  OTPNo: string;
  DefaultRole: number;
  Status: string;
  CreatedBy: string;
  CreatedDate: string;
  UpdatedBy: string;
  UpdatedDate: string;
}
export class vendor {

  RegistrationId: number;
  Name: string;
  SubTitle: string;
  Photo:string;
  Status:string;
  Description:string;
  
 
 
}



    export class Login {
        Email: string;
        Password: string;
    }
    export class UserDetail{
    UserDetailsId: number;
    registration: Registration
    RegistrationId: number;
    Contact: string;
    Tagline: string;
    Photo: string;
    BirthDate: string;
    Address: string;
    Gender: string;
    Status: string;
    Amount:number;
    Description:String
    // admCountryMaster: AdmCountryMaster
    AdmCountryMasterId: string;
    // admStateMaster: AdmStateMaster
    AdmStateMasterId: string;
    // admCityMaster: AdmCityMaster
    AdmCityMasterId: string;

    // TravelPreference:string
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
   
    export class Blog{
   
      BlogId: number;
      serviceMaster: ServiceMaster
      ServiceMasterId: number;
      admVendor: AdmVendor
      AdmVendorId: number;
      Name: string;
      Subtitle: string;
      Description: string;
      City: string;
      Image: string;
      Status: string;
      CreatedDate: string;
      CreatedBy: string;
      UpdatedDate: string;
      UpdatedBy: string;
      }
     

      // export class Travel {
      //   TravelId: number;
      //   Title: string;
      //   Subtitle: string;
      //   admVendor: AdmVendor
      //   AdmVendorId: number;
      //   serviceMaster: ServiceMaster
      //   ServiceMasterId: number;
      //   TravelType: string;
      //   TransType: string; 

      //   To: string; 
      //   Form: string; 

      //   Image: string;
      //   Departure: string;
      //   Arrival: string;
      //   Price: string;
      //   Seats: string;
      //   Amenities: string;
      //   Status: string;
      //   CreatedDate: string;
      //   CreatedBy: string;
      // }
      
     
      
      
    export class UserSocialMedia{
    UserSocialMediaId: number;
    registration: Registration
    RegistrationId: number;
    Instagram: string;
    Facebook: string;
    Twiter: string;
    LinkedIn: string;
    YouTube: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class EmergencyContact{
    EmergencyContactId: number;
    registration: Registration
    RegistrationId: number;
    Name: string;
    Relationship: string;
    Contact: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class AdmDestinations{
    AdmDestinationsId: number;
    Title: string;
    SubTitle: string;
    Description: string;
    Status: string;
    // admCountryMaster: AdmCountryMaster
    AdmCountryMasterId: number;
    // admStateMaster: AdmStateMaster
    AdmStateMasterId: number;
    // admCityMaster: AdmCityMaster
    AdmCityMasterId: number;
    Photo: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class DestinationGallery{
    DestinationGalleryId: number;
    admDestinations: AdmDestinations
    AdmDestinationsId: number;
    Title: string;
    SubTitle: string;
    Status: string;
    Photo: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    
    
    export class Trip{
    TripId: number;
    registration: Registration
    RegistrationId: number;
    admVendor: AdmVendor
    AdmVendorId: number;
    Source: string;
    admDestinations: AdmDestinations
    AdmDestinationsId: number;
    Date: string;
    tripType: TripType
    TripTypeId: number;
    Status: string;
    Budget: number;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class TripType{
    TripTypeId: number;
    Title: string;
    SubTitle: string;
    Icon: string;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class Feedback{
    FeedbackId: number;
    registration: Registration
    RegistrationId: number;
    admVendor: AdmVendor
    AdmVendorId: number;
    FeedbackText: string;
    Rating: number;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class Gallery{
    GalleryId: number;
    Title: string;
    SubTitle: string;
    registration: Registration
    RegistrationId: number;
    trip: Trip
    TripId: number;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class ServiceTable{
    ServiceTableId: number;
    Title: string;
    SubTitle: string;
    vendorService: VendorService
    VendorServiceId: number;
    Photo: string;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class AdmVendor{
    AdmVendorId: number;
    registration: Registration
    RegistrationId: number;
    Name: string;
    SubTitle: string;
    Description: string;
    Photo: string;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class VendorService{
    push(data: any) {
      throw new Error('Method not implemented.');
    }
    VendorServiceId: number;
    admVendor: AdmVendor
    AdmVendorId: number;
    serviceTable: ServiceTable
    ServiceTableId: number;
    admDestinations: AdmDestinations
    AdmDestinationsId: number;
    ServiceCost: number;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class Alert{
    AlertId: number;
    registration: Registration
    RegistrationId: number;
    admDestinations: AdmDestinations
    AdmDestinationsId: number;
    AlertMessage: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class Booking{
    BookingId: number;
    registration: Registration
    RegistrationId: number;
    vendorService: VendorService
    VendorServiceId: number;
    BookingDate: string;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }


    // export class Hotel{
    //   HotelId: number;
    //   admVendor: AdmVendor
    //   AdmVendorId: number;
    //   serviceMaster: ServiceMaster
    //   ServiceMasterId: number;
    //   Title: string;
    //   City: string;
    //   Address: string;
    //   ContactNo: string;
    //   NoOfRoom: string;
    //   Image: string;
    //   Amenities: string;
    //   PropertyRules: string;
    //   RoomType: string;
    //   Amount: number;
    //   Status: string;
    //   CreatedDate: string;
    //   CreatedBy: string;
    //   UpdatedDate: string;
    //   UpdatedBy: string;
    //   }
      
      export class ServiceMaster {
        ServiceMasterId: number;
        Title: string;
        Description: string;
        Status: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
      }


    export class AdmRoleMaster{
    AdmRoleMasterId: number;
    RoleName: string;
    DisplayRole: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Status: string;
    }
    export class UserRole{
    
      RoleId: number;
      Status: string;
    UserRoleId: number;
    admRoleMaster: AdmRoleMaster
    AdmRoleMasterId: number;
    registration: Registration
    RegistrationId: number;
  
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    }
    export class AdmCityMaster{
        AdmCityMasterId: number;
        admStateMaster: AdmStateMaster
        AdmStateMasterId: number;
        admCountryMaster: AdmCountryMaster
        AdmCountryMasterId: number;
        CityDescription: string;
        Status: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
        }
export class AdmCountryMaster{
        AdmCountryMasterId: number;
        CountryDescription: string;
        Status: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
        }
export class AdmStateMaster
{       
  AdmStateMasterId: number;
  admCountryMaster: AdmCountryMaster
  AdmCountryMasterId: number;
  StateDescription: string;
  Status: string;
  CreatedDate: string;
  CreatedBy: string;
  UpdatedDate: string;
  UpdatedBy: string;
}
        

// export class AdmCityMaster{
//   AdmCityMasterId: number;
//   admStateMaster: AdmStateMaster
//   AdmStateMasterId: number;
//   admCountryMaster: AdmCountryMaster
//   AdmCountryMasterId: number;
//   CityDescription: string;
//   Status: string;
//   CreatedDate: string;
//   CreatedBy: string;
//   UpdatedDate: string;
//   UpdatedBy: string;
//   registration: any;
//   }


export class Activities{
  ActivitiesId: number;
  Name: string;
  Subtitle: string;
  Description: string;
  Amount: Number;
  Image: string;
  Country: string;
  City: string;
  Status: string;
  CreatedDate: string;
  CreatedBy: string;
  UpdatedDate: string;
  UpdatedBy: string;
  serviceMaster: ServiceMaster;
  admVendor: AdmVendor;
  ServiceMasterId: number;
  AdmVendorId: number;
  Amenities: any;
  }


  export class TravelTrip{
    From: string;                         // Departure city
  To: string;                           // Destination city
  Date: Date;                           // Travel date
  Time: string;                         // Travel time
  AvailableDays: { [key: string]: boolean }; // Available days of the week
  TravelType: string;  // Type of travel (Bus, Car, Bike)
  Amenities: string;   // Amenities (AC, Non-AC)
  Price: number; 
  // Items: TravelItem[]; 
  }


  //////////////////////////////////////////////////////////////////////////////////////////
  export class Vehicle{
    VehicleId: number;
    VendorId: number;
    RegistrationId: number;
    VehicleNo: string;
    AgencyName: string;
    VehicleType: string;
    NoOfSeats: string;
    TypesOfVehicle: string;
    Amenities: string;
    Image: string;
    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
    Form: string;
    To: string;
    }

    export class FeedBack{
      FeedBackId: number;  // Ensure this property exists
      RegistrationId: number;
      AdmVendorId: number;
      FeedBackText: string;
      Rating: string;
      Status: string;
      CreatedDate: string;
      CreatedBy: string;
      UpdatedDate: string;
      UpdatedBy: string;
      }


    export class Travel{
  
   
    TravelId: number;
    vehicle: Vehicle
    VehicleId: number;
    VendorId: number;
    From: string;
    To: string;
    Departure: string;
    Arrival: string;
    Amenities: string;
    Price: string;
    Status: string;
    Image: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
      Form: string;
   
    }
    export class Rooms{
      RoomsId: number;
      hotel: Hotel
      HotelId: number;
      RegistrationId: number;
      RoomType: string;
      NoOfRoomS: string;
      AvilableRooms: string;
      PriceStartFrom: string;
      PricePerNight: string;
      Amenities: string;
      Image: string;
      Status: string;
      CreatedDate: string;
      CreatedBy: string;
      UpdatedDate: string;
      UpdatedBy: string;
      }
    export class Hotel{
    HotelId: number;
    VendorId: number;
    RegistrationId: number;
    HotelName: string;
    Address: string;
    ContactNo: string;
    PropertyRules: string;
    Amenities: string;
    Image: string;
    City: string;
    PriceRange:string;

    Status: string;
    CreatedDate: string;
    CreatedBy: string;
    UpdatedDate: string;
    UpdatedBy: string;
      hotel: any;
    }
    



    ///////======================================================================================

    
      export class HotelBookTrs{
        HotelBookTrsId: number;
        RegistrationId: number;
        TransactionId: number;
        TransactionDate: string;
        TransactionStatus: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
        }
        export class HotelBooking{
     
        HotelBookingId: number;
        RoomId: number;
        VendorId: number;
        UserId: number;
        RegistrationId: number;
        CheckIn: string;
        CheckOut: string;
        NoOfRooms: string;
        NoOfPersons: string;
        TotalPrice: string;
        Status: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
        }
        export class TravelBooking{
          TravelBookingId: number;
          TravelId: number;
          VendorId: number;
          UserId: number;
          RegistrationId: number;
          NoOfSets: string;
          TravelDate: string;
          TotalPrice: string;
          Status: string;
          CreatedDate: string;
          CreatedBy: string;
          UpdatedDate: string;
          }
        export class TravelBookTrs{
        TravelBookTrsId: number;
        RegistrationId: number;
        TransactionId: number;
        TransactionDate: string;
        TransactionStatus: string;
        CreatedDate: string;
        CreatedBy: string;
        UpdatedDate: string;
        UpdatedBy: string;
        }

        export class AdmSubscription{
          AdmSubscriptionId: number;
          Title: string;
          SubTitle: string;
          Description: string;
          Price: string;
          PlanPeriod: string;
          Status: string;
          CreatedDate: string;
          CreatedBy: string;
          UpdatedDate: string;
          UpdatedBy: string;
          }
      
          export class AdmVendorSubscription{
              AdmVendorSubscriptionId: number;
              Title: string;
              SubTitle: string;
              Description: string;
              Price: string;
              PlanPeriod: string;
              Status: string;
              CreatedDate: string;
              CreatedBy: string;
              UpdatedDate: string;
              UpdatedBy: string;
              }
  

              export class PurchasePlan{
                PurchasePlanId: number;
                admSubscription: AdmSubscription
                AdmSubscriptionId: number;
                registration: Registration
                RegistrationId: number;
                OfferedFor: string;
                NextRenewalDate: string;
                Status: string;
                CreatedBy: string;
                CreatedDate: string;
                UpdatedDate: string;
                UpdatedBy: string;
                }
            
                export class VendorPurchasePlan{
                    VendorPurchasePlanId: number;
                    admVendorSubscription: AdmVendorSubscription
                    AdmVendorSubscriptionId: number;
                    registration: Registration
                    RegistrationId: number;
                    OfferedFor: string;
                    NextRenewalDate: string;
                    Status: string;
                    CreatedBy: string;
                    CreatedDate: string;
                    UpdatedDate: string;
                    UpdatedBy: string;
                    }



                    
                    export class TransactionDetail{
                      TransactionDetailId: number;
                      registration: Registration
                      RegistrationId: number;
                      admSubscription: AdmSubscription
                      AdmSubscriptionId: number;
                      TransactionId: string;
                      TransactionDate: string;
                      TransactionStatus: string;
                      TransactionAmount: string;
                      Status: string;
                      CreatedBy: string;
                      CreatedDate: string;
                      UpdatedDate: string;
                      UpdatedBy: string;
                      }
          
                      
                      export class VendorTransactionDetail{
                          VendorTransactionDetailId: number;
                          registration: Registration
                          RegistrationId: number;
                          admVendorSubscription: AdmSubscription
                          AdmVendorSubscriptionId: number;
                          TransactionId: string;
                          TransactionDate: string;
                          TransactionStatus: string;
                          TransactionAmount: string;
                          Status: string;
                          CreatedBy: string;
                          CreatedDate: string;
                          UpdatedDate: string;
                          UpdatedBy: string;
                          }

                          export class HotelTrsDetail{
                            HotelTrsDetailId: number;
                            RegistrationId: number;
                            AdmSubscriptionId: number;
                            TransactionDate: string;
                            TransactionStatus: string;
                            TransactionAmount: string;
                            Status: string;
                            CreatedDate: string;
                            CreatedBy: string;
                            UpdatedDate: string;
                            UpdatedBy: string;
                            }
                            export class TravelTrsDetail{
                            TravelBookTrsId: number;
                            RegistrationId: number;
                            AdmSubscriptionId: number;
                            TransactionDate: string;
                            TransactionStatus: string;
                            TransactionAmount: string;
                            Status: string;
                            CreatedDate: string;
                            CreatedBy: string;
                            UpdatedDate: string;
                            UpdatedBy: string;
                            }
                            

                            export class NewServiceReq {
                              NewServiceReqId: number;
                              Email: string;
                              ServiceName: string;
                              ServiceDescription: string;
                              Status: string;
                              CreatedBy: string;
                              CreatedDate: string;
                              UpdatedBy: string;
                              UpdatedDate: string;
                              }
                              export class ActivityBooking{
                                ActivityBookingId: number;
                                ActivitiesId: number;
                                RegistrationId: number;
                                Name: string;
                                City: string;
                                Amount: string;
                                NoOfPersons: string;
                                TotalPrice: string;
                                Status: string;
                                CreatedDate: string;
                                CreatedBy: string;
                                UpdatedDate: string;
                                UpdatedBy: string;
                                }
                                export class ActivityTrsDetail{
                                ActivityTrsDetailId: number;
                                RegistrationId: number;
                                AdmSubscriptionId: number;
                                TransactionDate: string;
                                TransactionStatus: string;
                                TransactionAmount: string;
                                Status: string;
                                CreatedDate: string;
                                CreatedBy: string;
                                UpdatedDate: string;
                                UpdatedBy: string;
                                }
                                