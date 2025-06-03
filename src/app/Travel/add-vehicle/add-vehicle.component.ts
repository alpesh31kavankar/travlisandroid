import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Registration, Vehicle } from 'src/app/Class';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent {

  @ViewChild('VehicleForm') form: NgForm;
  vehicle = new   Vehicle();
  filesToUpload: File[];
  travel: any;
  imageSelected: boolean;
  imageTouched: boolean;

  VendorId;
  UId: any
registration: Registration;

  constructor(private router: Router,
    private route: ActivatedRoute,
  private http: HttpClient,
  private service: WebService) {
  this.vehicle = new Vehicle();
  this.route.params.subscribe((params) => {
    this.UId = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UId", this.UId);
  });
  this.service.GetRegistrationById(this.UId).subscribe((result) => {
    this.registration = result;
    console.log("Registration", this.registration);
  })
  }



  vehicleTypes: string[] = [
    'Car',
    // 'Truck',
    // 'Motorcycle',
    // 'Bicycle',
    // 'Van',
    'Bus'
  ];


  ngOnInit(): void {
    // this.getServiceMasterList();
    // this.getAdmVendorList();
    // this.getCities();
    // this.GetAllVehicle()
    this.FindAdmvendorID() ;


    
  }


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




      OnSubmit() {
        this.vehicle.VendorId = 1; 
        this.vehicle.RegistrationId = this.registration.RegistrationId; 
        console.log("vehicle", this.vehicle);
      
        this.service.AddVehicle(this.vehicle).subscribe((result) => {
          if (result > 0) {
            const formData = new FormData();
            formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
            this.service.SaveVehicleImage(formData, result).subscribe(() => {
              Swal.fire({
                title: 'Success!',
                text: 'Vechical has been added successfully.',
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
              confirmButtonText: 'Ok'
            });
          }
        });
      
        // Optionally reset the form after submission
        // this.form.resetForm();
      }
      

  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    if (this.filesToUpload.length > 0) {
      this.vehicle.Image = this.filesToUpload[0].name;
      this.imageSelected = !!this.filesToUpload; // Set to true if a file is selected
      this.imageTouched = true;     // Mark the input as touched
  
    }
  }
  }