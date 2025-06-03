import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activities } from 'src/app/Class'; // Assuming 'Activities' is defined in your 'Class' file.
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {
  imgPath: string = GlobalVariable.BASE_API_URL;
  ActivitiesList: Activities[] = []; // Fixed the reference to match your HTML
  data1;
  UId: any
  VID;
  constructor(  private route: ActivatedRoute,private router: Router, private http: HttpClient, private service: WebService) {


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




  }

  ngOnInit(): void {
    this.getActivities(); // Fixed the method name
  }

  getActivities(): void { // Corrected method name
    // this.service.GetAllActivities().subscribe(
    //   (data: Activities[]) => { // Assuming 'Activities' is an array of activity objects
    //     this.ActivitiesList = data;
    //     console.log("Activities Data is ", data);
    //   },
    //   (error) => {
    //     console.error('Failed to fetch activities', error);
    //   }
    // );

    this.service.GetAllActivities().subscribe((data: any[]) => {
      // Filter activities where AdmVendorId matches the retrieved VID
      // this.ActivitiesList = data
      // this.ActivitiesList = data.filter(activity => activity.RegistrationId ==   this.UId);
      this.ActivitiesList = data.filter(activity => activity.CreatedBy ==  this.UId);

  
    });
  }

  Edit(ActivitiesId: number): void {
    this.router.navigate(['/UpdateActivity/', ActivitiesId]);
  }

  View(ActivitiesId: number): void {
    this.router.navigate(['/view-adm-country-master', ActivitiesId]);
  }

  Delete(ActivitiesId: number): void {
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
        this.service.DeleteActivities(ActivitiesId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'The activity has been deleted.',
              'success'
            );
            this.getActivities(); // Re-fetch the list after delete
          },
          (error) => {
            Swal.fire(
              'Error!',
              'Failed to delete the activity.',
              'error'
            );
            console.error('Failed to delete activity', error);
          }
        );
      }
    });
  }
  
}
