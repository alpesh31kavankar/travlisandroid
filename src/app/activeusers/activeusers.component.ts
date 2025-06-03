import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmVendor, Blog, Registration, UserDetail, UserRole } from '../Class';
import { WebService } from '../Service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-activeusers',
  templateUrl: './activeusers.component.html',
  styleUrls: ['./activeusers.component.scss']
})
export class ActiveusersComponent {

  RUserList: Registration[] = [];
  VList:AdmVendor[]=[]

  UList:UserDetail[]=[]
  remainingRegistrations:Registration[]=[]

  userDetail: UserDetail;
  userRole: UserRole
  registration: Registration
  registrationList: any[]
  mainlist: any[]
  mainlist1: any[]

  constructor( private route: ActivatedRoute,private router: Router, private http: HttpClient, private service: WebService) {
    // this.registration = new Registration();
    // this.userDetail = new  UserDetail();
    // this.userRole = new UserRole();
    // this.registrationList = []
    // this.mainlist = []
    // this.mainlist1 = []
  }

  ngOnInit(): void {
    // this.AllUser();
    // this.AllVendor();

   

    // console.log( "All Vendor list ", this.VList);
    // console.log( "All Registration list ",this.RUserList );
    
    // const remainingRegistrations = this.getFilteredRegistrations(
    //   this.RUserList, 
    //   this.VList
    // );
  
    // console.log('Remaining Registrations:', remainingRegistrations);

    this.loadData();
    // this.getEducationTitle(this.RegistrationId)
    this.AllUserDetail()
  }


  loadData() {
    // Wait for both API calls to complete
    forkJoin({
      users: this.service.GetAllRegistration(),
      vendors: this.service.GetAllAdmVendor()
    }).subscribe(({ users, vendors }) => {
      this.RUserList = users;
      this.VList = vendors;
  
      console.log('All Vendor List:', this.VList);
      console.log('All Registration List:', this.RUserList);
  
      // Call the filtering function after data is loaded
     this.remainingRegistrations = this.getFilteredRegistrations(
        this.RUserList, 
        this.VList
      );
  
      console.log('Remaining Registrations:', this.remainingRegistrations);
    });
  }

  //////////////////////////////////////////////////////////////////////////////
  AllUser(){

  this.service.GetAllRegistration().subscribe((result) => {
     
    // console.log( "All Registration list ",result);
    this.RUserList = result;
   console.log( "All Registration list ",this.RUserList );
    });
  }


  ////////////////////////////////////////////////////////////////////////
    AllVendor(){

      this.service.GetAllAdmVendor().subscribe((result) => {
         
       
        this.VList = result;
        // console.log( "All Vendor list ", this.VList);
          console.log( "All Registration list ",this.VList );
        });
        
    
  }

//////////////////////////////////////////////////////////////////


getFilteredRegistrations(
  registrations,
  vendors
) {
  console.log(registrations);
  console.log(vendors);
  // Extract all RegistrationIds from the vendor list into a Set for quick lookup
  const vendorIds = new Set(vendors.map(vendor => vendor.RegistrationId));

  console.log('Vendor Registration IDs:', vendorIds);

  // Filter out registrations that have a matching RegistrationId in the vendor list
  const filteredRegistrations = registrations.filter(
    registration => !vendorIds.has(registration.RegistrationId)
  );

  console.log('Filtered Registrations:', filteredRegistrations);

  return filteredRegistrations;
}
//==================================================================================
AllUserDetail(){

  this.service.GetAllUserDetail().subscribe((result) => {
     
   
    this.UList = result;
    // console.log( "All Vendor list ", this.VList);
      console.log( "All UList list ",this.UList );
    });
    

}
//=================================================================================
// getEducationTitle(registrationId: number): string {
//   console.log("registrationId", registrationId);
//   const educations = this.UList.filter(edu => edu.RegistrationId === registrationId);
//   console.log("educations found:", educations);
  
//   const diplomas = educations.map(edu => edu.UpdatedBy); // Assuming 'Diploma' is a field
//   console.log("diplomas:", diplomas);

//   return diplomas.length > 0 ? diplomas.join(', ') : 'Not available';
// }

getUpdatedBy(registrationId: number): string {
  const educations = this.UList.filter(edu => edu.RegistrationId === registrationId);
  console.log("list",educations);
  
  const updatedByList = educations.map(edu => edu.UpdatedBy);
  console.log("Updated By:", updatedByList);

  return updatedByList.length > 0 ? updatedByList.join(', ') : 'Not available';
}


  //===========================================================

  // Edit(BlogId: number): void {
  //   this.router.navigate(['/UpdateBlog/', BlogId]);
  // }

 

  // Delete(BlogId: number): void {
  //   if (confirm('Are you sure you want to delete this record?')) {
  //     this.service.DeleteBlog(BlogId).subscribe(() => {
  //       // this.getBlogs(); 
  //     });
  //   }
  // }

}
