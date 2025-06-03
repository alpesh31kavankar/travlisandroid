import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, Rooms } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent {
  RoomList: Rooms[] = [];
  HotelList: Hotel[] = [];
  UId: any
  hotel: Hotel;
  data1;
  VID;
  RID: any;

  imgPath: string = GlobalVariable.BASE_API_URL;

  constructor(
    private route: ActivatedRoute,
    private router: Router, private http: HttpClient, private service: WebService) {

    this.hotel = new Hotel()
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
        this.VID = this.data1.AdmVendorId
        console.log("Vendor ID is ", this.VID);

      } else {
        console.log("Vendor not found with the given RegistrationId");
      }
    });

    // this.service.GetAllHotel().subscribe((data: any[]) => {
    //   // this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);

    //   this. hotel = data.find(hotel => hotel.RegistrationId == this.UId);
    //   this.RID= this.hotel.HotelId


    //   console.log("Room id finding :",this.RID);


    // });
    // Step 1: Get All Hotels and find matching Hotel IDs by RegistrationId
    this.service.GetAllHotel().subscribe((hotels: any[]) => {
      const matchingHotels = hotels.filter(hotel => hotel.RegistrationId === this.UId);

      // Extract all HotelIds into an array
      const hotelIds = matchingHotels.map(hotel => hotel.HotelId);

      console.log("Matching Hotel IDs: ", hotelIds);

      // Step 2: Fetch all rooms and filter them by matching HotelIds
      this.service.GetAllRooms().subscribe((rooms: any[]) => {
        console.log("RoomList Data is: ", rooms);

        // Filter rooms that belong to the matching HotelIds
        this.RoomList = rooms.filter(room => hotelIds.includes(room.hotel.HotelId));

        console.log("Filtered RoomList: ", this.RoomList);
      });
    });


  }

  ngOnInit(): void {
    // this.getRooms();

    
  }

  // getRooms(): void {





  //   this.service.GetAllRooms().subscribe(data => {
  //     console.log("RoomList Data is ",data);

  //     this.RoomList = data.filter(room => room.hotel.HotelId == this.RID);
  //     // this.RoomList = data;
  //     console.log("RoomID Data is ", this.RoomList);

  //   });
  // }

  Edit(RoomId: number): void {
    this.router.navigate(['/UpdateRoom/', RoomId]);
  }

  View(HotelId: number): void {
    this.router.navigate(['/view-adm-country-master', HotelId]);
  }

  Delete(RoomsId: number): void {
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
        this.service.DeleteRooms(RoomsId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'The hotel has been deleted.',
              'success'
            );
            // this.getRooms(); // Refresh the hotel list after deletion
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the hotel.',
              'error'
            );
          }
        );
      }
    });
  }


}

