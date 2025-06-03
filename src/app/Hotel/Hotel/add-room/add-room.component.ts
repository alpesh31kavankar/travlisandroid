import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rooms, ServiceMaster, AdmVendor, Registration, Hotel } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent {

  @ViewChild('RoomsForm') form: NgForm;
  rooms = new Rooms();
  HotelList: Hotel[];
  serviceMasterList: ServiceMaster[] = [];
  admVendorList: AdmVendor[] = [];
  filesToUpload: Array<File> = [];
  imgPath: string = GlobalVariable.BASE_API_URL;

  searchTerm: string = '';
  showDropdown: boolean = false;

  categories: any[] = [];
  allCities: string[] = []; 
  filteredCities: string[] = [];


  selectedFileNames: string[] = [];

  UId: any
  registration: Registration;
  mainlist = []
  registrationList: any[]
  VendorId;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: WebService
     ) {
      this.rooms.hotel = new Hotel();
  

    this.registration = new Registration();
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });
    this.service.GetRegistrationById(this.UId).subscribe((result) => {
      this.registration = result;
      console.log("Registration", this.registration);
    })

  }

  ngOnInit() {
  //  this.FindAdmvendorID() ;
   this.GetAllhotel()

   
  }


  GetAllhotel() {
    this.service.GetAllHotel().subscribe((result) => {
      this.HotelList = result;
      console.log("HotelList", this.HotelList);
    });
  }




//============================================================

  // FindAdmvendorID() {
  //   this.service.GetAllAdmVendor().subscribe((result: any[]) => {
    
  //     console.log("All vendors", result);
    
  //     // Assuming this.registration.RegistrationId contains the registration ID to match
  //   this.VendorId = result.find(vendor => vendor.RegistrationId === this.registration.RegistrationId);
    
  //     if ( this.VendorId) {
  //       console.log("Matched Vendor:",  this.VendorId);
  //       console.log("AdmVendorId:",  this.VendorId.AdmVendorId);  // Print the AdmVendorId
  //     } else {
  //       console.log("No vendor found with the matching RegistrationId");
  //     }
    
  //   });
  //     }



  roomsChange(event) {
        debugger
        console.log('UserIdr:', event.target.value);
        this.rooms.HotelId = event.target.value;
        // this.GetAllAdmStateMaster();
      
      }
//==================================== old code for singal image ============================================================

  OnSubmit() {


  // Trim all string inputs to remove leading and trailing spaces

  this.rooms.RoomType = this.rooms.RoomType?.trim();
  this.rooms.PricePerNight = this.rooms.PricePerNight?.toString().trim();
  this.rooms.Image = this.rooms.Image?.toString().trim();
  this.rooms.Amenities = this.rooms.Amenities?.trim();
  this.rooms.NoOfRoomS = this.rooms.NoOfRoomS?.toString().trim();
  this.rooms.AvilableRooms = this.rooms.AvilableRooms?.toString().trim();
  this.rooms.Status = this.rooms.Status?.trim();

  // Check for invalid fields with whitespace or empty values
  if (
    
    !this.rooms.RoomType ||
    !this.rooms.PricePerNight ||
    !this.rooms.Image ||
    !this.rooms.Amenities ||
    !this.rooms.NoOfRoomS ||
    !this.rooms.AvilableRooms ||
    !this.rooms.Status
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Input',
      text: 'All fields must be filled and cannot be just spaces.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#007bff',
    });
    return; // Prevent form submission
  }



    this.rooms.PriceStartFrom="1";
    this.rooms.RegistrationId= this.UId;
    this.rooms.HotelId;
    // this.rooms.HotelId=1
    console.log("Rooms", this.rooms);
    this.service.AddRooms(this.rooms).subscribe((result) => {
      if (result > 0) {
        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        this.service.SaveRoomsImage(formData, result).subscribe(() => {
       
          this.router.navigateByUrl('/AddRooms');
        });
        // alert('Saved Successfully.');
        this.showSuccessAlert()
      } else {
        // alert('Something went wrong! Please try again.');
this.showSuccessAlert1()

      }
    });
    this.form.resetForm();
  }


 fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload.length > 0) {
      this.rooms.Image = this.filesToUpload[0].name;
    }
  }

//=========================== multipal imagel=================================================
// OnSubmit() {
//       this.rooms.PriceStartFrom="1";
//     this.rooms.RegistrationId= this.UId;
//     this.rooms.HotelId;
//     // this.rooms.HotelId=1
//     console.log("Rooms", this.rooms);
//   this.service.AddRooms(this.rooms).subscribe((result) => {
//     if (result > 0) {
//       const formData = new FormData();
      
//       // Loop through all selected files and append them to the FormData with a prefixed name
//       for (let i = 0; i < this.filesToUpload.length; i++) {
//         formData.append('uploadedImages', this.filesToUpload[i], result + "_" + this.filesToUpload[i].name);
//       }

//       // Call the SaveRoomsImage service with the FormData and result ID
//       this.service.SaveRoomsImage(formData, result).subscribe(() => {
//         this.showSuccessAlert();
//         this.router.navigateByUrl('/AddRooms');
//         this.form.resetForm();
//       });
//     } else {
//       // Show error alert if the room saving operation fails
//       Swal.fire({
//         title: 'Error',
//         text: 'Something went wrong! Please try again.',
//         icon: 'error'
//       });
//     }
//   });
// }


// //===========================================================================================

// fileChangeEvent(fileInput: any) {
//   // Collect selected files
//   this.filesToUpload = <Array<File>>fileInput.target.files;
//   this.selectedFileNames = [];

//   // Store the file names for display
//   for (let i = 1; i < this.filesToUpload.length; i++) {
    
//     this.selectedFileNames.push(this.filesToUpload[i].name);
//     this.rooms.Image = this.filesToUpload[i].name;
//   }
// }


 

//========================================================================================

  getAdmVendorList(): void {
    this.service.GetAllAdmVendor().subscribe(
      (result: AdmVendor[]) => {
        console.log("AdmVendorList raw response: ", result); // Check raw response
        this.admVendorList = result;
        console.log("AdmVendorList bound: ", this.admVendorList); // Confirm binding
      },
      error => {
        console.error("Failed to fetch AdmVendorList", error);
      }
    );
  }

//==========================================================================================





  showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green; ">Saved Successfully.</b>',
      icon: 'success'
    });
  }

  showSuccessAlert1() {
    Swal.fire({
      title: 'Error',
      html: ' <b style="color:red; ">Something went wrong! Please try again.</b>',
      icon: 'error'
    });
  }
}