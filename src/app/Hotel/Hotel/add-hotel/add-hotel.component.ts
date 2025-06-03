import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel, AdmVendor, ServiceMaster, Registration } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent {
  @ViewChild('HotelForm') form: NgForm;
  hotel = new Hotel();
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

  ngOnInit() {
    this.getAdmVendorList();
    this.getServiceMasterList();


    this.getCities();

    this.FindAdmvendorID();


    
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





  OnSubmit() {


    // Trim all string inputs to remove leading and trailing spaces
    this.hotel.HotelName = this.hotel.HotelName?.trim();
    this.searchTerm = this.searchTerm?.trim();
    this.hotel.Address = this.hotel.Address?.trim();
    this.hotel.ContactNo = this.hotel.ContactNo?.toString().trim();  // Convert to string and trim
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


    // this.hotel.serviceMaster.ServiceMasterId=2
    this.hotel.VendorId = 1;
    this.hotel.CreatedBy = "1";
    this.hotel.UpdatedBy = "1";
    this.hotel.Status = "Active";

    this.hotel.RegistrationId = this.UId
    this.hotel.City = this.searchTerm
    console.log("hotel", this.hotel);
    this.service.AddHotel(this.hotel).subscribe((result) => {
      if (result > 0) {
        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        this.service.SaveHotelImage(formData, result).subscribe(() => {


          Swal.fire({
            title: 'Success!',
            text: 'Hotel has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Navigate to the RoomList route
              this.router.navigateByUrl('/HotelList');
            }
          });

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

  //============================================================================
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

  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload.length > 0) {
      this.hotel.Image = this.filesToUpload[0].name;
    }
  }




  // fileChangeEvent(fileInput: any) {
  //   // Collect selected files
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  //   this.selectedFileNames = [];

  //   // Store the file names for display
  //   for (let i = 1; i < this.filesToUpload.length; i++) {

  //     this.selectedFileNames.push(this.filesToUpload[i].name);
  //     this.hotel.Image = this.filesToUpload[i].name;
  //   }
  // }


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