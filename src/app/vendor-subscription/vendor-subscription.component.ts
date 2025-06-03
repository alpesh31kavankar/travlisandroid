import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vendor-subscription',
  templateUrl: './vendor-subscription.component.html',
  styleUrls: ['./vendor-subscription.component.scss']
})
export class VendorSubscriptionComponent {


  admVendorSubscriptionList: any[];
  UId: any
  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute, private service: WebService) {
    // $(function () {
    //   $('[data-toggle="offcanvas"]').on("click", function () {
    //     $('.sidebar-offcanvas').toggleClass('active');
    //   });
    // });
    this.admVendorSubscriptionList = []
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("this.UId", this.UId);
    });
  }


  GetAllAdmVendorSubscription() {
    this.service.GetAllAdmVendorSubscription().subscribe((result) => {
      // console.log(result);
      this.admVendorSubscriptionList = []
      for (let data of result) {
        this.admVendorSubscriptionList.push(data);
      }
      console.log(this.admVendorSubscriptionList, "admVendorSubscriptionList");
      //  this.mainPropLandLordList=this.propLandLordList.filter(x => x.registration.RegistrationId==this.UId)

    });
  }

  onClick(AdmVendorSubscriptionId) {
    try {
      this.router.navigateByUrl("/VendorCheckoutPlan/" + AdmVendorSubscriptionId);
    } catch (error) {
      alert("certi-" + error);
    }
  }

  

  ngOnInit(): void {
    this.GetAllAdmVendorSubscription()
    // $(function () {
    //   $('[data-toggle="offcanvas"]').on("click", function () {
    //     $('.sidebar-offcanvas').toggleClass('active');
    //   });
    // });

    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }

  }
  // private initOffcanvas(): void {
  //   $(function () {
  //     $('[data-toggle="offcanvas"]').on("click", function () {
  //       $('.sidebar-offcanvas').toggleClass('active');
  //     });
  //   });
  // }


  //===================================================================

}
