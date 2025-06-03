import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRole, Registration } from '../Class';
import { WebService } from '../Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-sidebar',
  templateUrl: './vendor-sidebar.component.html',
  styleUrls: ['./vendor-sidebar.component.scss'],

})
export class VendorSidebarComponent {
  isSubmitted: boolean = false;
  activeMenu: string = '';
  UId: any
  registration: Registration;
    data1;


  constructor(private route: ActivatedRoute, private router: Router,private http: HttpClient,private service: WebService) {
 
    this.registration = new Registration();
  this.route.params.subscribe((params) => {
    this.UId = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UId", this.UId);
  });
  




  
  //==================================================
  // ngAfterViewInit() {
  //   // Manually initialize the collapse on sidebar items
  //   $('[data-toggle="collapse"]').on('click', function (e) {
  //     e.preventDefault();
  //     var target = $(this).attr('aria-controls');
  //     $('#' + target).collapse('toggle');
  //   });
  // }

  //======================================================================
  this.service.GetAdmVendorById(this.UId).subscribe((result) => {
    this.data1 = result;
    console.log("Vendor:-", result );
    console.log("Vendor:-", this.data1.Status );
    if (this.data1.Status == 'Active') {
      this.isSubmitted = true; 
    }
  })
  }


  ngOnInit() {
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }


  toggleMenu(menu: string) {
    this.activeMenu = this.activeMenu === menu ? '' : menu;

  }

//===================================================================
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


}
