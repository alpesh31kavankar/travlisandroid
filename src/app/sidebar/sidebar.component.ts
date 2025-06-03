import { Component , AfterViewInit } from '@angular/core';
import { Registration, UserRole } from '../Class';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../Service';
import Swal from 'sweetalert2';
declare var $: any; // Assuming you are using jQuery (if Bootstrap's JS relies on it)

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Manually initialize the collapse on sidebar items
    $('[data-toggle="collapse"]').on('click', function (e) {
      e.preventDefault();
      var target = $(this).attr('aria-controls');
      $('#' + target).collapse('toggle');
    });
  }

  terms1: boolean = false;
  terms2: boolean = false;
  UId: any
  userRoleList: any[] = []
  roleList: any[] = []
  unmatchedRoles: any[] = []
  selectedRoles: number[] = [];
  unmatchedRoles1: any[] = [];
  matchedRoles:any[]=[]
  mn: any[] = []
  mainList:any[]=[]
  roleId:any
  userRole: UserRole
  registration: Registration;
  MId:any
 

  myhide
  
  myhide1: any;
  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient,private service: WebService) {




    
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

      this.matchedRoles =this.userRoleList.filter(r => r.Status=="Active" && r.RegistrationId===this.UId);
      this.MId=this.matchedRoles.length.toString()
      console.log("userRoleIds", userRoleIds)

      this.myhide = userRoleIds.length < 2; 
      this.myhide1 = userRoleIds.length == 2; // Set myhide to true if userRoleIds length is less than 2
      console.log("Total role is", userRoleIds.length, "Hide status:", this.myhide);
   

    })
  }


  switchRole(Title){
    console.log("titleddd",Title)
    if(Title=='EndUser'){
      this.router.navigateByUrl("/UserDashbord");
    }else{
      this.router.navigateByUrl("/VendorDashboard");
    }

  }

  ngOnInit() {
    // this.service.GetAllUserRole().subscribe((result) => {
    //   console.log(result);

    //   // Check condition
    //   if (result.RoleID == 3 && result.RegistrationId == 'UId') {
    //     this.myhide1 = false; // Show the element
    //   }
    //   else{
    //     this.myhide1 = true;
    //   }
    // });
  }

  // ngOnInit(): void {
  //   // this.initOffcanvas();
 
  // }
  // private initOffcanvas(): void {
  //   $(function() {
  //     $('[data-toggle="offcanvas"]').on("click", function() {
  //       $('.sidebar-offcanvas').toggleClass('active');
  //     });
  //   });
  // }
  

  Logout() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        localStorage.clear();
        this.router.navigate(['/Login']).then(() => {
          window.location.reload(); // Reload the page to ensure the login page is loaded fresh
        });

        Swal.fire(
          'Logged Out!',
          'You have been successfully logged out.',
          'success'
        );
      }
    });
  }


// }

}
