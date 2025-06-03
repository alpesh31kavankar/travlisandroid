import { Component } from '@angular/core';
import * as $ from 'jquery';
import { Registration, UserRole, vendor } from '../Class';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';
import Swal from 'sweetalert2';
// declare let body: JQuery<HTMLElement>;
@Component({
  selector: 'app-vendor-request',
  templateUrl: './vendor-request.component.html',
  styleUrls: ['./vendor-request.component.scss']
})
export class VendorRequestComponent {


  //   vendor1: vendor[] = [];
  //   showRequestDiv: boolean = false;  // Flag to control request div visibility
  //   vendorExists;
  //   // selectedRole: string;


  //   selectedRole: any;


  //   mainlist = []
  //   registrationList: any[]

  //   isSelected: boolean = false;
  //   isSubmitted: boolean = false; // Track if form is already submitted
  //   data: any

  //   vendor: vendor
  //     = {
  //       RegistrationId: null,
  //       Name: "",
  //       SubTitle: "",
  //       Photo: " ",
  //       Description: "",
  //       Status: "123",

  //     };
  //   data1;
  //   //==================================================
  //   terms1: boolean = false;
  //   terms2: boolean = false;
  //   UId: any
  //   userRoleList: any[] = []
  //   roleList: any[] = []
  //   unmatchedRoles: any[] = []
  //   // selectedRoles: number[] = [];
  //   unmatchedRoles1: any[] = [];
  //   // unmatchedRoles1: any[] = [];

  //   matchedRoles: any[] = []
  //   mn: any[] = []
  //   mainList: any[] = []
  //   roleId: any
  //   userRole: UserRole
  //   registration: Registration;
  //   MId: any

  //   constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {
  //     this.userRole = new UserRole();
  //     this.vendor = new vendor()
  //     this.registration = new Registration();
  //     this.route.params.subscribe((params) => {
  //       this.UId = JSON.parse(sessionStorage.getItem('SID'));
  //       console.log("UId", this.UId);
  //     });
  //     this.service.GetRegistrationById(this.UId).subscribe((result) => {
  //       this.registration = result;
  //       console.log("Registration", this.registration);

  //       // this.selectedRole == this.registration.DefaultRole;
  //       // console.log("Defult Role From taable" ,this.registration.DefaultRole);

  //     })


  //   }

  //   OnSubmit() {

  //   }

  //   //******************************************************************************** */ 

  //   // ngOnInit(): void {

  //   //         // this.registration.DefaultRole=1
  //   //         this.service.GetRegistrationById(this.UId).subscribe((result) => {
  //   //           this.registration = result;
  //   //           console.log("Registration Details  of User ", this.registration);

  //   //           this.selectedRole == this.registration.DefaultRole;



  //   //           // this.selectedRole == this.registration.DefaultRole;
  //   //           // console.log("Defult Role From taable" ,this.registration.DefaultRole);
  //   //         });

  //   // }

  //   //================================ new for vendor Request=========================================================

  //   ngOnInit() {
  //     this.getRegistrationDetails();
  //     this.getAllVendors();
  //   }

  //   // Fetch registration details by User ID
  //   getRegistrationDetails() {
  //     this.service.GetRegistrationById(this.UId).subscribe((result) => {
  //       this.registration = result;
  //       console.log("Registration Details of User", this.registration);

  //       if (this.registration) {
  //         this.selectedRole = this.registration.DefaultRole;
  //       } else {
  //         console.log("Registration ID not found.");
  //       }

  //       // Check vendor existence only after both data sources are loaded
  //       this.checkVendorExistence();
  //     });
  //   }

  //   // Fetch all vendors from the API
  //   getAllVendors() {
  //     this.service.GetAllAdmVendor().subscribe((vendors) => {
  //       this.vendor1 = vendors;
  //       console.log("All Vendors:", this.vendor1);

  //       // Check vendor existence only after both data sources are loaded
  //       this.checkVendorExistence();
  //     });
  //   }

  //   // Check if the RegistrationId exists in the vendors list
  //   checkVendorExistence() {
  //     if (this.registration && this.vendor1.length) {
  //       this.vendorExists = this.vendor1.some(
  //         (vendor) => vendor.RegistrationId === this.registration.RegistrationId
  //       );

  //       // Show the request div only if the RegistrationId is not found
  //       this.showRequestDiv = !this.vendorExists;
  //     }
  //   }
  //   //===========================================================================
  //   selectRole(role: number) {

  //     this.selectedRole = role;  // Update the selected role immediately
  //     this.registration.DefaultRole = this.selectedRole;  // Update the selected role immediately
  //     ;
  //   }

  //   submitRole() {
  //     // this.registration.DefaultRole = this.selectedRole;
  //     // console.log('Submitting Role:', this.selectedRole);

  //     // // Call service to update the registration
  //     // this.service.UpdateRegistration(this.registration).subscribe((result) => {
  //     //   console.log("Registration updated:", this.registration);
  //     // });

  //     console.log('Selected Role:', this.registration.DefaultRole);

  //     // Add logic to submit the selected role
  //     // For example, send `registration.DefaultRole` to your service.
  //     this.service.UpdateRegistration(this.registration).subscribe((result) => {
  //       if (result > 0) {
  //         alert('Select Default Role Successfully.');

  //         console.log("Registration updated", result);

  //       }
  //       else {
  //         alert('select role First or somthing wrong ');
  //       }
  //     });
  //   }


  // //=========================================================================================================

  //   getSelectedRoles() {
  //     this.service.GetAllAdmVendor().subscribe((result: any[]) => {

  //       console.log("All vendors", result);
  //       this.registrationList = []
  //       for (let data of result) {
  //         this.registrationList.push(data);

  //       }
  //       console.log("All vendorsList", this.registrationList);
  //       // Assuming UId is the property you want to match
  //       this.mainlist = this.registrationList.filter(vendor => vendor.RegistrationId == this.registration.RegistrationId);
  //       console.log("this.mainlist.length", this.mainlist.length);
  //       if (this.mainlist.length == 1) {
  //         alert('This vendors Request Send allready');
  //       }
  //       else {


  //         console.log("All vendors", result);



  //         console.log("No vendor found with the given UId.");
  //         //  if (this.isSelected && !this.isSubmitted  ) {

  //         console.log("Registration:-", this.registration);

  //         this.vendor.Name = this.registration.FName;
  //         this.vendor.SubTitle = this.registration.LName;
  //         this.vendor.RegistrationId = this.registration.RegistrationId;
  //         this.vendor.Photo = "123.png";
  //         this.vendor.Description = ""
  //         this.vendor.Status = "Pending"

  //         console.log("vendor", this.vendor);

  //         this.service.AddAdmVendor(this.vendor).subscribe(result => {
  //           if (result > 0) {
  //             // const formData = new FormData();
  //             // formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
  //             // this.service.SaveAdmVendorImage(formData, result).subscribe(data => {
  //             alert('Request Send  Successfully.');
  //             //   this.router.navigateByUrl('/Dashboard');
  //             // });
  //           } else {
  //             alert("Something went wrong! Please try again.");
  //           }
  //           this.isSubmitted = true;
  //         });
  //       }



  //     });
  //     //=======================================================================

  //   }
  // }



  //==================================================new Code===========================================


  terms1: boolean = false;
  terms2: boolean = false;
  UId: any
  userRoleList: any[] = []
  roleList: any[] = []
  unmatchedRoles: any[] = []
  selectedRoles: number[] = [];
  unmatchedRoles1: any[] = [];
  matchedRoles: any[] = []
  mn: any[] = []
  mainList: any[] = []
  roleId: any
  userRole: UserRole
  registration: Registration;
  MId: any

  uRList: any[] = []
  mainURList: any[] = []


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {
    // $(function () {
    //   $('[data-toggle="offcanvas"]').on("click", function () {
    //     $('.sidebar-offcanvas').toggleClass('active');
    //   });
    // });
    this.userRole = new UserRole();
    this.registration = new Registration();
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });
    this.service.GetRegistrationById(this.UId).subscribe((result) => {
      this.registration = result;
      console.log("registration", this.registration);
    })

    this.service.GetAllUserRole().subscribe((result) => {
      this.userRoleList = []
      this.matchedRoles = []
      this.MId = 0
      for (let data of result) {
        this.userRoleList.push(data);
      }
      // const userRoleIds: number[] = this.userRoleList.map(userRole => userRole.RoleId);

      const userRoleIds: number[] = this.userRoleList
        .filter(userRole => userRole.RegistrationId === this.UId)
        .map(userRole => userRole.RoleId);

      this.matchedRoles = this.userRoleList.filter(r => r.Status == "Active" && r.RegistrationId === this.UId);
      this.MId = this.matchedRoles.length.toString()
      console.log("userRoleIds", userRoleIds)

      this.service.GetAllRole().subscribe((result) => {
        this.roleList = []
        this.unmatchedRoles = []
        for (let data of result) {
          this.roleList.push(data);
        }
        this.unmatchedRoles = this.roleList.filter(role => !userRoleIds.includes(role.RoleId) && role.RoleId != 1);

      })


    })
  }

  OnSubmit() {
    this.mainList = this.matchedRoles.filter(role => role.isSelected);
    console.log("this.mainList", this.mainList)
    this.roleId = this.mainList[0].RoleId;
    this.registration.DefaultRole = this.roleId
    this.service.UpdateRegistration(this.registration).subscribe((result) => {
      if (result == 0) {


      } else {

      }
    });

  }



  // private initOffcanvas(): void {
  //   $(function () {
  //     $('[data-toggle="offcanvas"]').on("click", function () {
  //       $('.sidebar-offcanvas').toggleClass('active');
  //     });
  //   });
  // }

  ngOnInit(): void {

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

    // this.initOffcanvas();
    this.tran();
    // Assuming you have fetched the unmatched roles and assigned them to this.unmatchedRoles
    // Initialize isSelected property for each role
    this.unmatchedRoles1.forEach(role => {
      role.isSelected = false; // Initialize all checkboxes as unchecked initially
    });
  }

  getSelectedRoles() {

    this.unmatchedRoles.forEach(role => {
      if (role.isSelected) {
        // Logic to submit the role request
        // Set the role's `isSubmitted` property to `true` once request is submitted
        role.isSubmitted = true;

        // Optional: Add logic here to make a request to the backend
        // to mark this role as submitted in the database.
      }
    });



    this.mn = this.unmatchedRoles.filter(role => role.isSelected);
    console.log("this.mn", this.mn)

    // Extracting RoleIds from this.mn
    const selectedRoleIds: number[] = this.mn.map(role => role.RoleId);
    console.log("Selected RoleIds:", selectedRoleIds);

    // Iterate over selectedRoleIds array
    selectedRoleIds.forEach(roleId => {
      this.userRole.RegistrationId = this.UId; // Assuming result is already defined
      this.userRole.RoleId = roleId;
      this.userRole.Status = "InActive";

      // 
      this.service.GetAllUserRole().subscribe((result) => {
        this.uRList = []
        this.mainURList = []
        for (let data of result) {
          this.uRList.push(data);
        }
        this.mainURList = this.uRList.filter(x => x.RegistrationId == this.UId && x.RoleId == roleId);
        console.log(this.mainURList, "this.mainURList")
        if (this.mainURList.length == 0) {
          this.userRole.CreatedBy = "0"
          // Call the AddUserRole function for each roleId

          this.service.AddUserRole(this.userRole).subscribe((result) => {
            if (result > 0) {


              Swal.fire({
                title: 'Success!',
                text: 'Request sent successfully.',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
            } else {
              Swal.fire({
                title: 'Opps..!',
                text: 'Something went wrong! Please try again',
                icon: 'warning',
                confirmButtonText: 'Ok'
              });
            }
          });
        } else {
          alert("already sent request")
        }
      })


    })
  }

  tran() {
    $(document).ready(function () {
      $("div.bhoechie-tab-menu>div.list-group>a").click(function (e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
      });
    });
  }


}