import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, ServiceMaster, AdmVendor, Registration } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.scss']
})
export class UpdateHotelComponent {

  imagePreview: string | ArrayBuffer | null = null;  // This will hold the image preview data
  @ViewChild('hotelForm') form: NgForm;
  hotel = new Hotel ();
  serviceMasterList: ServiceMaster[] = [];
  admVendorList: AdmVendor[] = [];
  filesToUpload: Array<File> = [];
  imgPath: string = GlobalVariable.BASE_API_URL;
  id
VendorId:any;

  searchTerm: string = '';
  showDropdown: boolean = false;

  categories: any[] = [];
  allCities: string[] = []; 
  filteredCities: string[] = [];

  UId: any
  registration: Registration;
  mainlist = []
  registrationList: any[]
  // VendorId;
  
 
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
    // this.hotel.serviceMaster = new ServiceMaster();
    // this.hotel.admVendor = new AdmVendor();



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

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('HotelId')!;
    console.log("id is", this.id);
    
    this.getServiceMasterList();
    this.getAdmVendorList();
    this.getDetail();


    this.getCities();
    this.FindAdmvendorID() ;

    // Retrieve VendorId
    // this.FindAdmvendorID();


  }

  getDetail(){
    this.service.GetHotelById(this.id).subscribe(result => {
      console.log("Hotel by id ",result);
      this.hotel=result;
      this.searchTerm=this.hotel.City
    
    });
  }
  

  getCities(): void {
    this.service.GetAllAdmCityMaster().subscribe((cities) => {
      // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
      this.allCities = cities.map(city => city.CityDescription); // Extract only city names
      console.log(this.allCities); // Log the city names
      this.filteredCities = this.allCities; // Initially, show all city names
    });
  }


  //============================================================================================

filterCities() {

  if (this.searchTerm) {
    this.filteredCities = this.allCities.filter(city =>
      city.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  } else {
    this.filteredCities = this.allCities;
  }
  this.showDropdown = true; // Keep the dropdown visible
}

// Toggle dropdown when input is clicked
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
  if (!this.searchTerm) {
    this.filteredCities = this.allCities;
  }
}

// Handle city selection
selectCity(city: string) {
  this.searchTerm = city;
  // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
  this.showDropdown = false;
}

// Hide dropdown when input loses focus
hideDropdown() {
  setTimeout(() => {
    this.showDropdown = false;
  }, 200);
}



  FindAdmvendorID() {

    this.service.GetAllAdmVendor().subscribe((result: any[]) => {

      console.log("All vendors", result);

      // Assuming this.registration.RegistrationId contains the registration ID to match
      this.VendorId = result.find(vendor => vendor.RegistrationId === this.registration.RegistrationId);

      if (this.VendorId) {
        console.log("Matched Vendor:", this.VendorId);
        console.log("AdmVendorId:", this.VendorId.AdmVendorId);  // Print the AdmVendorId
      } else {
        console.log("No vendor found with the matching RegistrationId");
      }

    });

    
      }





  getServiceMasterList(): void {
    this.service.GetAllServiceMaster().subscribe(
      (result: ServiceMaster[]) => {
        console.log("ServiceMasterList raw response: ", result); // Check raw response
        this.serviceMasterList = result;
        console.log("ServiceMasterList bound: ", this.serviceMasterList); // Confirm binding
      },
      error => {
        console.error("Failed to fetch ServiceMasterList", error);
      }
    );
  }

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



  OnSubmit(): void {
    // Log the vendor ID for debugging
    // this.hotel.VendorId = this.VendorId.AdmVendorId;

    // console.log('VendorId:', this.VendorId);
  
    // Trim all string inputs to remove leading and trailing spaces
    this.hotel.HotelName = this.hotel.HotelName?.trim();
    this.searchTerm = this.searchTerm?.trim();
    this.hotel.Address = this.hotel.Address?.trim();
    this.hotel.ContactNo = this.hotel.ContactNo?.trim();
    this.hotel.PropertyRules = this.hotel.PropertyRules?.trim();
    this.hotel.Amenities = this.hotel.Amenities?.trim();
  
    // Validate that no field is left blank or contains only spaces
    if (
      !this.hotel.HotelName ||
      !this.searchTerm ||
      !this.hotel.Address ||
      !this.hotel.ContactNo ||
      !this.hotel.PropertyRules ||
      !this.hotel.Amenities
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'All fields must be filled and cannot contain just spaces.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff',
      });
      return;
    }
  
    // Assigning default values to the hotel object
    this.hotel.VendorId =1;
    this.hotel.CreatedBy = '1';
    this.hotel.UpdatedBy = '1';
    this.hotel.Status = 'Active';
    this.hotel.RegistrationId = this.UId;
    this.hotel.City = this.searchTerm;
  
    console.log('Hotel info is:', this.hotel);
  
    // Call the service to update the hotel
    this.service.UpdateHotel(this.hotel).subscribe(
      (result) => {
        if (result > 0) {
          this.showSuccessAlert();
          console.log('Update result:', result);
  
          // If the hotel update is successful, upload the image
          if (this.filesToUpload && this.filesToUpload.length > 0) {
            const formData = new FormData();
            formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
  
            this.service.SaveHotelImage(formData, this.hotel.HotelId).subscribe(
              () => {
                Swal.fire({
                  title: 'Success!',
                  text: 'Hotel has been updated successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((swalResult) => {
                  if (swalResult.isConfirmed) {
                    // Navigate to the HotelList route
                    this.router.navigateByUrl('/HotelList');
                  }
                });
              },
              (error) => {
                console.error('Image upload failed:', error);
                Swal.fire({
                  icon: 'error',
                  title: 'Image Upload Failed',
                  text: 'The hotel was updated, but the image could not be uploaded.',
                  confirmButtonText: 'OK',
                  confirmButtonColor: '#d33',
                });
              }
            );
          }
        } else {
          // If something goes wrong with the update
          this.showSuccessAlert1();
        }
      },
      (error) => {
        console.error('Hotel update failed:', error);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Something went wrong while updating the hotel. Please try again.',
          confirmButtonText: 'OK',
          confirmButtonColor: '#d33',
        });
      }
    );
  }
  

  // fileChangeEvent(fileInput: any): void {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  //   if (this.filesToUpload.length > 0) {
  //     this.hotel.Image = this.filesToUpload[0].name;
  //   }
  // }

  
  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
    if (this.filesToUpload.length > 0) {
      const file = this.filesToUpload[0];
      this.hotel.Image = file.name;  // Store the image file name
  
      // Create a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;  // Store the image preview in the component
      };
      reader.readAsDataURL(file);  // Read the file as a data URL for preview
    } else {
      // If no image is selected, reset the preview
      this.imagePreview = null;
    }
  }


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