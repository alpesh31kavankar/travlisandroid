import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Vehicle, ServiceMaster, AdmVendor, Registration } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-vehicle',
  templateUrl: './update-vehicle.component.html',
  styleUrls: ['./update-vehicle.component.scss']
})
export class UpdateVehicleComponent {
  imgPath: string = GlobalVariable.BASE_API_URL;
  imagePreview: string | ArrayBuffer | null = null;  // This will hold the image preview data
  @ViewChild('VehicleForm') form: NgForm;
  vehicle = new Vehicle();
  serviceMasterList: ServiceMaster[] = [];
  admVendorList: AdmVendor[] = [];
  filesToUpload: Array<File> = [];
  
  searchTerm2: string = '';
  searchTerm1: string = '';
  showDropdown2: boolean = false;
  showDropdown1: boolean = false;
id
  
  allCities: string[] = []; 
  filteredCities: string[] = [];
  
  submitted = false;
  imageSelected = false; // To track if an image is selected
  imageTouched = false;  // To track if the input has been touched
  // route: any;

  VendorId;
  UId: any
  registration: Registration;
  mainlist = []
  registrationList: any[]
  
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
    // this.vehicle.serviceMaster = new ServiceMaster();
    // this.vehicle.admVendor = new AdmVendor();



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
    this.id = +this.route.snapshot.paramMap.get('VehicleId')!;
    console.log("id is", this.id);

    // this.loadAdmVendors();
    // this.loadServiceMasters();
    this.getDetail();

    // this.getCities();
    this.FindAdmvendorID();

    //  this.searchTerm2= this.travel.Form
    //  this.searchTerm1= this.travel.To

    
  }

  
  vehicleTypes: string[] = [
    'Car',
    // 'Truck',
    // 'Motorcycle',
    // 'Bicycle',
    // 'Van',
    'Bus'
  ];


  

  OnSubmit() {
    this.vehicle.VendorId = 1; 
    this.vehicle.RegistrationId = this.registration.RegistrationId; 
    
    this.vehicle.Form = this.searchTerm2;
    this.vehicle.To = this.searchTerm1;
  
    console.log("Submitting vehicle:", this.vehicle);
  
    this.service.UpdateVehicle(this.vehicle).subscribe((result) => {
      console.log("vehicle Result:", result);
      
      if (result > 0) {
        // Prepare the image data to be uploaded
        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        
        // Save the image
        this.service.SaveVehicleImage(formData, this.vehicle.VehicleId).subscribe(() => {
          // SweetAlert success message
           Swal.fire({
            title: 'Success!',
            text: 'Vechical has been  update successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Navigate to the RoomList route
              this.router.navigateByUrl('/VehicleList');
            }
          });
        });
      } else {
        // SweetAlert error message
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong! Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  

  getDetail() {
    this.service.GetVehicleById(this.id).subscribe(result => {
      console.log("Vehicle by id ", result);
      this.vehicle = result;
      console.log("Vehicle Result", this.vehicle);
      this.searchTerm1 = this.vehicle.To
      this.searchTerm2 = this.vehicle['Form']

    });
  }
  



  // fileChangeEvent(fileInput: any): void {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  //   if (this.filesToUpload.length > 0) {
  //     this.vehicle.Image = this.filesToUpload[0].name;
  //     this.imageSelected = true; 
  //     this.imageTouched = true;
  //   }
  // }


  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
    if (this.filesToUpload.length > 0) {
      const file = this.filesToUpload[0];
      this.vehicle.Image = file.name;  // Store the image file name
  
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
  
  

// ===========================================================================================


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
    //=======================================================================================

}
