import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent {

  vehicleList: any[]; // Define the vehicleList array
  UId: any

  data1;
  VID;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
     private http: HttpClient, 
     private service: WebService) {
    
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);

    });
  
  
      
    // this.service.GetAllAdmVendor().subscribe((result: any[]) => {
    //   // Assuming 'result' is an array of vendors
    //   const vendor = result.find(v => v.RegistrationId === this.UId);
    
    //   if (vendor) {
    //     this.data1 = vendor;
    //     console.log("Vendor:-", vendor);
    //     console.log("Vendor Status:-", vendor.Status);
    //     this.VID=this.data1.AdmVendorId
    //     console.log( "Vendor ID is " ,this.VID);
        
    //   } else {
    //     console.log("Vendor not found with the given RegistrationId");
    //   }
    // });
    
    this.vehicleList = [];
    this.GetAllvehicle(); // Fetch all vehicles on component load


    
  }

  // Get all vehicles method

  GetAllvehicle() {
    // this.service.GetAllVehicle().subscribe(result => {
    //   this.vehicleList = result; // Populate vehicleList with result
    // });

    this.service.GetAllVehicle().subscribe((data: any[]) => {
      this.vehicleList = data.filter(vehicle => vehicle.RegistrationId == this.UId);
    });



  }

  // Delete VehicleId method
  Delete(vehicleId: number): void {
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
        // Proceed with the deletion if the user confirms
        this.service.DeleteVehicle(vehicleId).subscribe((response) => {
          if (response === "Success") {
            this.vehicleList = this.vehicleList.filter(item => item.vehicleId !== vehicleId); // Filter out the deleted vehicle
            Swal.fire(
              'Deleted!',
              'The vehicle has been deleted successfully.',
              'success'
            );
            this.GetAllvehicle(); // Refresh the vehicle list after deletion
          } else {
            Swal.fire(
              'Error!',
              'There was an error deleting the vehicle.',
              'error'
            );
          }
        });
      } else {
        Swal.fire(
          'Cancelled',
          'The action was cancelled.',
          'info'
        );
      }
    });
  }
  
  
  Edit(VehicleId: number): void {
    this.router.navigate(['/UpdateVehicle/', VehicleId]);
  }

 
}
