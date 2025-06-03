import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NewServiceReq, Registration } from '../Class';
import { WebService } from '../Service';

@Component({
  selector: 'app-new-service-request',
  templateUrl: './new-service-request.component.html',
  styleUrls: ['./new-service-request.component.scss']
})
export class NewServiceRequestComponent {

  @ViewChild('NewServiceReqForm') form: NgForm;
  newServiceReq: NewServiceReq;
  registration:Registration
  UId:any
  constructor(private router: Router,
    private http: HttpClient,
    private service: WebService,private route: ActivatedRoute,) {
      $(function() {
        $('[data-toggle="offcanvas"]').on("click", function() {
          $('.sidebar-offcanvas').toggleClass('active');
        });
      });

    this.newServiceReq = new NewServiceReq();
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("this.UId",this.UId);
    });
    this.service.GetRegistrationById(this.UId).subscribe((result) => {
       
      this.registration = result;
      console.log(this.registration);

    });

  }
  onSubmit() {
    console.log("prop", this.newServiceReq);
    this.newServiceReq.Email=this.registration.Email
    this.newServiceReq.Status="Active"
    this.service.AddNewServiceReq(this.newServiceReq).subscribe((result: number) => {
      if (result > 0) {
        // this.industry = new Industry();
       Swal.fire({
                title: 'Success!',
                text: 'New Service Request Saved Successfully.',
                icon: 'success',
                confirmButtonText: 'Ok'
              });
      } else {
          Swal.fire({
                  title: 'Opps..!',
                  text: 'Something went wrong! Please try again',
                  icon: 'warning',
                  confirmButtonText: 'Ok'
                });;
      }
    });
   // Clear the form's validation state
  
   this.form.resetForm();
  }

  ngOnInit(): void {
    $(function() {
      $('[data-toggle="offcanvas"]').on("click", function() {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
    // this.dashboardService.initDashboardFeatures();

  }
}
