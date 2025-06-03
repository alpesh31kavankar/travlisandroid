//ng g c AddTravel
import { HttpClient } from '@angular/common/http';
import { Component , ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../../Service';
import { NgForm } from '@angular/forms';
import { AdmVendor, Registration, ServiceMaster, Travel, Vehicle } from '../../Class';
import Swal from 'sweetalert2';
@Component({
selector:   'app-add-travel',
templateUrl:   './add-travel.component.html',
styleUrls:   ['./add-travel.component.scss']
})
export class AddTravelComponent {
@ViewChild('TravelForm') form: NgForm;
// travel = new   Travel();
// serviceMasterList: ServiceMaster[] = [];
// admVendorList: AdmVendor[] = [];
// filesToUpload: Array<File> = [];

// searchTerm2: string = '';
// searchTerm1: string = '';
// showDropdown2: boolean = false;
// showDropdown1: boolean = false;

// categories: any[] = [];
// allCities: string[] = []; 
// filteredCities: string[] = [];

// submitted = false;
//   imageSelected = false; // To track if an image is selected
//   imageTouched = false;  // To track if the input has been touched

// constructor(private router: Router,
// private http: HttpClient,
// private service: WebService) {
// this.travel = new Travel();
// // this.travel.serviceMaster = new ServiceMaster();
// // this.travel.admVendor = new AdmVendor();
// }



// ngOnInit(): void {
//   this.getServiceMasterList();
//   this.getAdmVendorList();
//   this.getCities();
// }

// getServiceMasterList(): void {
//   this.service.GetAllServiceMaster().subscribe(
//     (result: ServiceMaster[]) => {
//       console.log("ServiceMasterList raw response: ", result); // Check raw response
//       this.serviceMasterList = result;
//       console.log("ServiceMasterList bound: ", this.serviceMasterList); // Confirm binding
//     },
//     error => {
//       console.error("Failed to fetch ServiceMasterList", error);
//     }
//   );
// }



// getAdmVendorList(): void {
//   this.service.GetAllAdmVendor().subscribe(
//     (result: AdmVendor[]) => {
//       console.log("AdmVendorList raw response: ", result); // Check raw response
//       this.admVendorList = result;
//       console.log("AdmVendorList bound: ", this.admVendorList); // Confirm binding
//     },
//     error => {
//       console.error("Failed to fetch AdmVendorList", error);
//     }
//   );
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////
// getCities(): void {
//   this.service.GetAllAdmCityMaster().subscribe((cities) => {
//     // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
//     this.allCities = cities.map(city => city.CityDescription); // Extract only city names
//     console.log(this.allCities); // Log the city names
//     this.filteredCities = this.allCities; // Initially, show all city names
//   });
// }
// //============================================================================================

// filterCities2() {
// if (this.searchTerm2) {
//   this.filteredCities = this.allCities.filter(city =>
//     city.toLowerCase().startsWith(this.searchTerm2.toLowerCase())
//   );
// } else {
//   this.filteredCities = this.allCities;
// }
// this.showDropdown2 = true; // Keep the dropdown visible
// }

// // Toggle dropdown when input is clicked
// toggleDropdown2() {
// this.showDropdown2 = !this.showDropdown2;
// if (!this.searchTerm2) {
//   this.filteredCities = this.allCities;
// }
// }

// // Handle city selection
// selectCity2(city: string) {
// this.searchTerm2 = city;
// // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
// this.showDropdown2 = false;
// }

// // Hide dropdown when input loses focus
// hideDropdown2() {
// setTimeout(() => {
//   this.showDropdown2 = false;
// }, 200);
// }
// //============================================================================================
// filterCities1() {
// if (this.searchTerm1) {
//   this.filteredCities = this.allCities.filter(city =>
//     city.toLowerCase().startsWith(this.searchTerm1.toLowerCase())
//   );
// } else {
//   this.filteredCities = this.allCities;
// }
// this.showDropdown1 = true; // Keep the dropdown visible
// }

// // Toggle dropdown when input is clicked
// toggleDropdown1() {
// this.showDropdown1 = !this.showDropdown1;
// if (!this.searchTerm1) {
//   this.filteredCities = this.allCities;
// }
// }

// // Handle city selection
// selectCity1(city: string) {
// this.searchTerm1 = city;
// // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
// this.showDropdown1 = false;
// }

// // Hide dropdown when input loses focus
// hideDropdown1() {
// setTimeout(() => {
//   this.showDropdown1 = false;
// }, 200);
// }

// ////////////////////////////////////////////////////////////////////////////////////////


// OnSubmit() {
//   // this.travel.Form=this.searchTerm2
//   this.travel.To=this.searchTerm1
//   // this.travel.ServiceMasterId=3;
//   this.travel.VendorId=3;
// console.log("travel",this.travel);
// this.service.AddTravel(this.travel).subscribe((result) => {
//   if (result > 0) {
//     const formData = new FormData();
//     formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
//     this.service.SaveTravelImage(formData, result).subscribe(() => {
//       // return;
//     });
//     // alert('Saved Successfully.');
//     this.showSuccessAlert()
//   } else {
//     // alert('Something went wrong! Please try again.');
//     this.showSuccessAlert1()
//   }
// });
// // this.form.resetForm();
// }

// fileChangeEvent(fileInput: any): void {
//   this.filesToUpload = <Array<File>>fileInput.target.files;
//   if (this.filesToUpload.length > 0) {
//     this.travel.Image = this.filesToUpload[0].name;
//     this.imageSelected = !!this.filesToUpload; // Set to true if a file is selected
//     this.imageTouched = true;     // Mark the input as touched

//   }
// }
// showSuccessAlert() {
//   Swal.fire({
//     title: 'Success',
//     html: ' <b style="color:green; ">Saved Successfully.</b>',
//     icon: 'success'
//   });
// }

// showSuccessAlert1() {
//   Swal.fire({
//     title: 'Error',
//     html: ' <b style="color:red; ">Something went wrong! Please try again.</b>',
//     icon: 'error'
//   });
// }

// }




// @ViewChild('TravelForm') form: NgForm;
// travel = new   Travel();

// VehicleList: Vehicle[];
// // vehicle = new Vehicle();
// constructor(private router: Router,
// private http: HttpClient,
// private service: WebService) {

// this.travel.vehicle = new Vehicle();
// // this.travel = new Travel();
// }




// OnSubmit() {

//   this.service.AddTravel(this.travel).subscribe((result) => {
//     if (result > 0) {
//       const formData = new FormData();
//       // formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
//       // this.service.SaveTravelImage(formData, result).subscribe(() => {
//       //   // return;
//       // });
//       alert('Saved Successfully.');
//       // this.showSuccessAlert()
//     } else {
//       alert('Something went wrong! Please try again.');
//       // this.showSuccessAlert1()
//     }
//   });
//   // this.form.resetForm();
//   }






  // console.log("travel",this.travel);

travel = new   Travel();

VehicleList: Vehicle[];
// vehicle = new Vehicle();

serviceMasterList: ServiceMaster[] = [];
admVendorList: AdmVendor[] = [];
filesToUpload: Array<File> = [];

searchTerm2: string = '';
searchTerm1: string = '';
showDropdown2: boolean = false;
showDropdown1: boolean = false;

categories: any[] = [];
allCities: string[] = []; 
filteredCities: string[] = [];
VendorId;
UId: any
registration: Registration;
mainlist = []
registrationList: any[]

submitted = false;
  imageSelected = false; // To track if an image is selected
  imageTouched = false;  // To track if the input has been touched

  selectedVehicleId: number | null = null;
  selectedVehicle: any | null = null;
  isAvailableSeatsInvalid: boolean = false;
  NoOfSeat:any=0


constructor(private router: Router,
  private route: ActivatedRoute,
private http: HttpClient,
private service: WebService) {
this.travel = new Travel();
// this.travel.serviceMaster = new ServiceMaster();
// this.travel.admVendor = new AdmVendor();

this.travel.vehicle = new Vehicle();
// this.travel = new Travel();


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
  this.getServiceMasterList();
  // this.getAdmVendorList();
  this.getCities();
  this.GetAllVehicle()
  this.FindAdmvendorID() ;

  
}


isWhitespace(value: string): boolean {
  return value.trim().length === 0;
}


  GetAllVehicle() {
    this.service.GetAllVehicle().subscribe((result) => {
      this.VehicleList = result;
      console.log("VehicleList", this.VehicleList);
    });
  }



  updateSelectedVehicle() {
    console.log('this.travel.vehicle.VehicleId:',this.travel.vehicle.VehicleId);
    this.selectedVehicle = this.VehicleList.find(vehicle => vehicle.VehicleId == this.travel.vehicle.VehicleId) ;
    console.log('this.selectedVehicle:',this.selectedVehicle);
 // Set 'CreatedBy' with the number of seats from the selected vehicle
 if (this.selectedVehicle) {
  this.travel.CreatedBy = this.selectedVehicle.NoOfSeats; // Ensure NoOfSeats is a number or a string as required
} else {
  this.travel.CreatedBy = ''; // Reset to empty if no vehicle is selected
}

console.log('Updated travel.CreatedBy:', this.travel.CreatedBy); 
  }

 

  validateAvailableSeats() {
    if (this.selectedVehicle && this.travel.UpdatedBy) {
      this.isAvailableSeatsInvalid = +this.travel.UpdatedBy > +this.selectedVehicle.NoOfSeats;
    } else {
      this.isAvailableSeatsInvalid = false;
    }
  }
  

  travelChange(event) {
 
    console.log('UserIdr:', event.target.value);
    this.travel.VehicleId = event.target.value;
    // this.GetAllAdmStateMaster();
  
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



// getAdmVendorList(): void {
//   this.service.GetAllAdmVendor().subscribe(
//     (result: AdmVendor[]) => {
//       console.log("AdmVendorList raw response: ", result); // Check raw response
//       this.admVendorList = result;
//       console.log("AdmVendorList bound: ", this.admVendorList); // Confirm binding
//     },
//     error => {
//       console.error("Failed to fetch AdmVendorList", error);
//     }
//   );
// }


FindAdmvendorID() {
  this.service.GetAllAdmVendor().subscribe((result: any[]) => {
  
    console.log("All vendors", result);
  
    // Assuming this.registration.RegistrationId contains the registration ID to match
  this.VendorId = result.find(vendor => vendor.RegistrationId === this.registration.RegistrationId);
  
    if ( this.VendorId) {
      console.log("Matched Vendor:",  this.VendorId);
      console.log("AdmVendorId:",  this.VendorId.AdmVendorId);  // Print the AdmVendorId
    } else {
      console.log("No vendor found with the matching RegistrationId");
    }
  
  });
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////
getCities(): void {
  this.service.GetAllAdmCityMaster().subscribe((cities) => {
    // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
    this.allCities = cities.map(city => city.CityDescription); // Extract only city names
    console.log(this.allCities); // Log the city names
    this.filteredCities = this.allCities; // Initially, show all city names
  });
}
//============================================================================================

filterCities2() {
if (this.searchTerm2) {
  this.filteredCities = this.allCities.filter(city =>
    city.toLowerCase().startsWith(this.searchTerm2.toLowerCase())
  );
} else {
  this.filteredCities = this.allCities;
}
this.showDropdown2 = true; // Keep the dropdown visible
}

// Toggle dropdown when input is clicked
toggleDropdown2() {
this.showDropdown2 = !this.showDropdown2;
if (!this.searchTerm2) {
  this.filteredCities = this.allCities;
}
}

// Handle city selection
selectCity2(city: string) {
this.searchTerm2 = city;
// this.cityInfo.Name = city; // Set the selected city in the cityInfo object
this.showDropdown2 = false;
}

// Hide dropdown when input loses focus
hideDropdown2() {
setTimeout(() => {
  this.showDropdown2 = false;
}, 200);
}
//============================================================================================
filterCities1() {
if (this.searchTerm1) {
  this.filteredCities = this.allCities.filter(city =>
    city.toLowerCase().startsWith(this.searchTerm1.toLowerCase())
  );
} else {
  this.filteredCities = this.allCities;
}
this.showDropdown1 = true; // Keep the dropdown visible
}

// Toggle dropdown when input is clicked
toggleDropdown1() {
this.showDropdown1 = !this.showDropdown1;
if (!this.searchTerm1) {
  this.filteredCities = this.allCities;
}
}

// Handle city selection
selectCity1(city: string) {
this.searchTerm1 = city;
// this.cityInfo.Name = city; // Set the selected city in the cityInfo object
this.showDropdown1 = false;
}

// Hide dropdown when input loses focus
hideDropdown1() {
setTimeout(() => {
  this.showDropdown1 = false;
}, 200);
}

////////////////////////////////////////////////////////////////////////////////////////


OnSubmit() {

  // Trim whitespace from input fields
  // this.travel.VehicleId = this.travel.VehicleId?.trim();
  // this.travel.CreatedBy = this.travel.CreatedBy?.trim();
  // this.travel.UpdatedBy = this.travel.UpdatedBy?.trim();
  // this.travel.LeavingFrom = this.travel.LeavingFrom?.trim();
  // this.travel.GoingTo = this.travel.GoingTo?.trim();
  this.travel.Departure = this.travel.Departure?.trim();
  this.travel.Arrival = this.travel.Arrival?.trim();
  this.travel.Price = this.travel.Price?.toString().trim();
  this.travel.Amenities = this.travel.Amenities?.trim();
  this.travel.Status = this.travel.Status?.trim();

  // Check if any required fields are empty or contain just spaces
  if (
    // !this.travel.VehicleId ||
    // !this.travel.CreatedBy ||
    // !this.travel.UpdatedBy || 
    // !this.travel.LeavingFrom ||
    // !this.travel.GoingTo ||
    !this.travel.Departure ||
    !this.travel.Arrival ||
    !this.travel.Price ||
    !this.travel.Amenities ||
    !this.travel.Status
  ) {
    Swal.fire({
      icon: 'warning',
      title: 'Invalid Input',
      text: 'All fields must be filled and cannot be just spaces.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#007bff',
    });
    return;
  }

  
  this.travel.VendorId=this.UId;
  this.travel.From=this.searchTerm2
  this.travel.To=this.searchTerm1

console.log("travel",this.travel);
this.service.AddTravel(this.travel).subscribe((result) => {
  if (result > 0) {
    const formData = new FormData();
   
    Swal.fire({
      title: 'Success!',
      text: 'Trip has been added successfully.',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        // Navigate to the RoomList route
        this.router.navigateByUrl('/TravelList');
      }
    });
  } else {
    // alert('Something went wrong! Please try again.');
    this.showSuccessAlert1()
  }
});
// this.form.resetForm();
}

fileChangeEvent(fileInput: any): void {
  this.filesToUpload = <Array<File>>fileInput.target.files;
  if (this.filesToUpload.length > 0) {
    this.travel.Image = this.filesToUpload[0].name;
    this.imageSelected = !!this.filesToUpload; // Set to true if a file is selected
    this.imageTouched = true;     // Mark the input as touched

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