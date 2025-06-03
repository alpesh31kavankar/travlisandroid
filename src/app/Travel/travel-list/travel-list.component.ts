import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Travel } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent {






UId: any

data1;
VID;
travelList: any[];
imgPath: string = GlobalVariable.BASE_API_URL;
constructor(
  private route: ActivatedRoute,
  private router: Router, private http: HttpClient, private service: WebService) {
  
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

  
  
  
  this.travelList = [];
  this.GetAllTravel(); // Corrected method name
}

ngOnInit(): void {
  this.GetAllTravel();


  
}
GetAllTravel() {
  // this.service.GetAllTravel().subscribe((result: any[]) => {
  //   this.travelList = result;
  //   console.log("Travel List ",this.travelList);
    
  // });
  this.service.GetAllTravel().subscribe((data: any[]) => {
    this.travelList = data.filter(travel => travel.VendorId ==  this.UId );
    // this.travelList = data;
    console.log("All Travel LIst",this.travelList);
    
  });
}

Delete(item: any): void {
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
      this.service.DeleteTravel(item).subscribe((response) => {
        if (response === "Success") {
          this.travelList = this.travelList.filter((t) => t.id !== item.id); // Update travel list
          Swal.fire(
            'Deleted!',
            'The travel item has been deleted successfully.',
            'success'
          );
          this.GetAllTravel(); // Refresh the travel list after deletion
        } else {
          Swal.fire(
            'Error!',
            'There was an error deleting the travel item.',
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



Edit(TravelId: number): void {
  this.router.navigate(['/UpdateTravel/', TravelId]);
}
}
