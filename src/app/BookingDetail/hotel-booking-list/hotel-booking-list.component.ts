import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, HotelBooking, Registration, Rooms, UserDetail } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-booking-list',
  templateUrl: './hotel-booking-list.component.html',
  styleUrls: ['./hotel-booking-list.component.scss']
})
export class HotelBookingListComponent implements OnInit {
  hotelBookingList: HotelBooking[] = [];
  userId: any;
  vendorId: any;
  imgPath: string = GlobalVariable.BASE_API_URL;
  RList:Registration[]=[]
  RoomList:Rooms[]=[]
  HotelList:Hotel[]=[]


  HList
Rid;
  UserList:UserDetail[]=[]
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: WebService
  ) {
    this.route.params.subscribe((params) => {
      this.userId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("User ID:", this.userId);
    });
  }

  ngOnInit(): void {
    
    this.getAllRegistrations();

     this.getAllUserDetil();
 this.getAllRoom();
    this.getVendorData();
    this.getAllHotelBookingList();
  
  }

 getVendorData(): void {
    this.service.GetAllAdmVendor().subscribe((result: any[]) => {
      const vendor = result.find(v => v.RegistrationId === this.userId);
      if (vendor) {
        console.log("Vendor:", vendor);
        this.vendorId = vendor.AdmVendorId;
        console.log("Vendor ID:", this.vendorId);
      } else {
        console.log("Vendor not found with the given Registration ID");
      }
    });
  }

  getAllHotelBookingList(): void {
    this.service.GetAllHotelBooking().subscribe(data => {
      this.hotelBookingList = data.filter(booking => booking.RegistrationId == this.userId);
      console.log("Hotel Booking List Data:", this.hotelBookingList);
    });
  }

  edit(bookingId: number): void {
    this.router.navigate(['/UpdateBlog/', bookingId]);
  }

  delete(bookingId: number): void {
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
        this.service.DeleteBlog(bookingId).subscribe(
          () => {
            Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
            // this.getAllHotelBookingList(); // Refresh the list after deletion
          },
          (error) => {
            Swal.fire('Error!', 'There was an error deleting the booking.', 'error');
          }
        );
      }
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

//////////////////////////////////////////////////////////
  // getAllRooms(): void {
  //   this.service.GetAllRooms().subscribe((result) => {
  //     this.RoomList = result;
  //     // console.log("All Registration List:", this.RList);
  //   });
  // }


  getAllRoom(): void {
    
  this.service.GetAllRooms().subscribe((result) => {
    this.RoomList = result;
    console.log("All RoomList :", this.RoomList);
  });

  }

//=========================================================
  getHotels(registrationId: number): string {
    // Filter hotels based on RegistrationId
    console.log(registrationId);
    
    const filteredHotels = this.RList.filter(hotel => hotel.RegistrationId === registrationId);
    
    console.log(filteredHotels);
    
    // Map the filtered hotels to their names (FName)
    const hotelNames = filteredHotels.map(hotel => hotel.FName); // Ensure FName is the correct field name
    const hotelLNames = filteredHotels.map(hotel => hotel.LName);
    console.log(`Number of Hotels with Registration ID ${registrationId}: ${hotelNames.length}`);
    
    // Return hotel names or a message if no hotels are found
    return hotelNames.length > 0
      ? hotelNames.join(', ') +" "+ hotelLNames.join(', ') // Join names into a string and display
      : 'No hotels found for this registration ID';
}

//==================================== contact number =======================================================
getContact(registrationId: number): string {
  // Filter hotels based on RegistrationId
  console.log(registrationId);

  
  const filteredContacts = this.UserList.filter(user => user.RegistrationId === registrationId);
  
  console.log(" my contact " ,filteredContacts);
  
  // Map the filtered contacts to their contact numbers
  const contactNumbers = filteredContacts.map(user => user.Contact); // Ensure Contact is the correct field name
  console.log(`Number of contacts with Registration ID ${registrationId}: ${contactNumbers.length}`);
  
  // Return contact numbers or a message if no contacts are found
  return contactNumbers.length > 0
    ? contactNumbers.join(', ') // Join contact numbers into a string and display
    : 'No contacts found for this registration ID';
}

//=======================================================================================================

getRoomsType(RoomId: number): string {
  // Filter hotels based on RegistrationId
  this.Rid=RoomId
  console.log("my Room id ",RoomId);
  
 

  // this.service.GetRoomsById(registrationId).subscribe((result) => {
  //   this.RoomList = result;
  //   console.log("All UserList :", this.UserList);
  // });

  const filteredRoom = this.RoomList.filter(user => user.RoomsId == RoomId);
  
  console.log(" my Roooms " ,filteredRoom);
  
  // Map the filtered contacts to their contact numbers
  const contactNumbers = filteredRoom.map(user => user.RoomType); // Ensure Contact is the correct field name
  // console.log(`Number of contacts with Registration ID ${RoomId}: ${contactNumbers.length}`);
  
  // Return contact numbers or a message if no contacts are found
  return contactNumbers.length > 0
    ? contactNumbers.join(', ') // Join contact numbers into a string and display
    : 'No contacts found for this registration ID';
}


}
