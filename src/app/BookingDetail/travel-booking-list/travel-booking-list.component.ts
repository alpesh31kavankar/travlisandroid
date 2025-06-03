import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelBooking, Registration, Travel, TravelBooking, UserDetail, Vehicle } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travel-booking-list',
  templateUrl: './travel-booking-list.component.html',
  styleUrls: ['./travel-booking-list.component.scss']
})
export class TravelBookingListComponent {

  TravelBookingList: TravelBooking[] = [];
  RList:Registration[]=[]
  TList:Travel[]=[]
  filteredTravelData:any[]=[]
  TravellistData:any[]=[]
myvechicalNo

myTid
  VList:Vehicle[]=[];
  UserList:UserDetail[]=[]
  data1;
  UId: any
  VID;
  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor( private route: ActivatedRoute,private router: Router, private http: HttpClient, private service: WebService) {
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });
  
  
      
    this.service.GetAllAdmVendor().subscribe((result: any[]) => {
      // Assuming 'result' is an array of vendors
      const vendor = result.find(v => v.RegistrationId === this.UId);
    
      if (vendor) {
        this.data1 = vendor;
        console.log("Vendor:-", vendor);
        console.log("Vendor Status:-", vendor.Status);
        this.VID=this.data1.AdmVendorId
        console.log( "Vendor ID is " ,this.VID);
        
      } else {
        console.log("Vendor not found with the given RegistrationId");
      }
    });


  }

  ngOnInit(): void {
    this.getAllRegistrations();

     this.getAllUserDetil();
     
      this. getAllTravel();
      this.getAllVechical();

    this.getAllTravelBookingList();
  }

  getAllTravelBookingList(): void {

   
    // this.BlogListCount = this.BlogList.length;

    this.service.GetAllTravelBooking().subscribe(data => {
      this.TravelBookingList = data.filter(res => res.RegistrationId === this.UId);
      //  this.TravelBookingList = data;
      console.log("TravelBookingList Data is ",  this.TravelBookingList);
      
    });
  }


  getAllRegistrations(): void {
    this.service.GetAllRegistration().subscribe((result) => {
      this.RList = result;
      console.log("All Registration List:", this.RList);
    });
  }

  

  getAllUserDetil(): void {
    this.service.GetAllUserDetail().subscribe((result) => {
      this.UserList = result;
      console.log("All UserList :", this.UserList);
    });
  }



  getAllTravel(): void {
    this.service.GetAllTravel().subscribe((result) => {
      this.TList = result;
      console.log("All TList List:", this.TList);
    });
  }
  


  getAllVechical(): void {
    this.service.GetAllVehicle().subscribe((result) => {
      this.VList = result;
      console.log("All VList List:", this.VList);
    });
  }


  //===============================================================================================





  //=================================== all Registration Data =============================================
  getRegistration(registrationId: number): string {
    // Filter hotels based on RegistrationId
    console.log(registrationId);
    
    const filteredregistration = this.RList.filter(res => res.RegistrationId === registrationId);
    
    console.log(filteredregistration);
    
    // Map the filtered hotels to their names (FName)
    const hotelNames = filteredregistration.map(res => res.FName); // Ensure FName is the correct field name
    const hotelLNames = filteredregistration.map(res => res.LName);
    // console.log(`Number of Hotels with Registration ID ${registrationId}: ${hotelNames.length}`);
    
    // Return hotel names or a message if no hotels are found
    return hotelNames.length > 0
      ? hotelNames.join(', ') +" "+ hotelLNames.join(', ') // Join names into a string and display
      : 'No hotels found for this registration ID';
}


//======================================= Contact No  =======================================================

getContact(registrationId: number): string {
  // Filter hotels based on RegistrationId
  console.log(registrationId);
  
  const filteredContacts = this.UserList.filter(user => user.RegistrationId === registrationId);
  
  console.log(" my contact " ,filteredContacts);
  
  // Map the filtered contacts to their contact numbers
  const contactNumbers = filteredContacts.map(user => user.Contact); // Ensure Contact is the correct field name
  // console.log(`Number of contacts with Registration ID ${registrationId}: ${contactNumbers.length}`);
  
  // Return contact numbers or a message if no contacts are found
  return contactNumbers.length > 0
    ? contactNumbers.join(', ') // Join contact numbers into a string and display
    : 'No contacts found for this registration ID';
}





//======================================Travel info   =========================================================

getTravelInfoFrom(registrationId: number): string {
  // Filter travel records based on VendorId (registrationId)
  console.log(registrationId);
  
  const filteredTravelData = this.TList.filter(user => user.TravelId == registrationId);
  
  console.log("Filtered Travel Data: ", filteredTravelData);
  
  // Map each entry to "From - To" format
  const travelInfo = filteredTravelData.map(user => `${user.From} - ${user.To}`);
  
  // console.log(`Number of travel entries with Vendor ID ${registrationId}: ${travelInfo.length}`);
  
  // Return the travel info or a message if no entries are found
  return travelInfo.length > 0
    ? travelInfo.join(', ')
    : 'No travel info found for this vendor ID';
}

//==================================== Vechical no  ============================================================

       //======================================Travel info   =========================================================

//   getVechicalNumber(TravelId: number): string {
//   // Filter travel records based on VendorId (registrationId)
//   console.log(TravelId);
//   this.myTid=TravelId

//  this.filteredTravelData = this.TList.filter(user => user.TravelId == TravelId);
  
//   console.log("Filtered Travel Data: ", this.filteredTravelData );
// // console.log("vechical id is ",this.filteredTravelData.vehicle.VehicleId);

// const vehicleIds = this.filteredTravelData.map(record => record.vehicle.VehicleId);

// console.log('Vehicle IDs:', vehicleIds);


// this.service.GetVehicleById(vehicleIds).subscribe((result) => {
//     // this.TravellistData = result;
//     console.log("VehicleNo :",result.VehicleNo );

//     this.TravellistData=result
//     this.myvechicalNo=result.VehicleNo
//   });



// // this.TravellistData=this.filteredTravelData 
// // console.log(this.TravellistData);

//   // Map each entry to "From - To" format
//   const travelInfo = this.TravellistData.map(user => user.VehicleNo);
  

//   console.log( "id is" );
  
//   // console.log(`Number of travel entries with Vendor ID ${registrationId}: ${travelInfo.length}`);
  
//   // Return the travel info or a message if no entries are found
//   return travelInfo.length > 0
//     ? travelInfo.join(', ')
//     : 'No travel info found for this vendor ID';

// }



getVechicalNumber(TravelId: number): string {
  // Filter travel records based on VendorId (registrationId)
  console.log(TravelId);
  this.myTid=TravelId

 this.filteredTravelData = this.TList.filter(user => user.TravelId == TravelId);
  
  // console.log("Filtered Travel Data: ", this.filteredTravelData );
// console.log("vechical id is ",this.filteredTravelData.vehicle.VehicleId);

const vehicleIds = this.filteredTravelData.map(record => record.vehicle.VehicleId);

// console.log('Vehicle IDs:', vehicleIds);


this.service.GetVehicleById(vehicleIds).subscribe((result) => {
    // this.TravellistData = result;
    // console.log("VehicleNo :",result.VehicleNo );

    this.TravellistData=result
    this.myvechicalNo=result.VehicleNo
  });



// this.TravellistData=this.filteredTravelData 
// console.log(this.TravellistData);

  // Map each entry to "From - To" format
  // const travelInfo = this.TravellistData.map(user => user.VehicleNo);
  
// 
  console.log( "id is" );
  
 
  return this.myvechicalNo

} 


 //===============================================================================================


  Edit(BlogId: number): void {
    this.router.navigate(['/UpdateBlog/', BlogId]);
  }

  View(BlogId: number): void {
      this.router.navigate(['/view-adm-country-master', BlogId]);
  }

  Delete(BlogId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, proceed with the deletion
        this.service.DeleteBlog(BlogId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Your blog has been deleted.',
              'success'
            );
            // this.getAllHolelBookingList(); // Refresh the list after deletion
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the blog.',
              'error'
            );
          }
        );
      }
    });
  }
  
  

}