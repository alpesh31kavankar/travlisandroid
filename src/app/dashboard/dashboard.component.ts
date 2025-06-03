import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { WebService } from '../Service';
import { GlobalVariable } from '../Global';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient, private service: WebService) {
    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });

  
    // this.service.GetAllUserDetail().subscribe((result) => {
    //   this.userDetailList = []
    //   this.mainUserDetailList = []
    //   for (let data of result) {
    //     this.userDetailList.push(data);
    //   }
    //   console.log("userDetailList", this.userDetailList);
    //   this.mainUserDetailList = this.userDetailList.filter(x => x.RegistrationId == this.UId);
    //   console.log("this.mainUserDetailList.length", this.mainUserDetailList.length);
    //   if ( this.mainUserDetailList.length>0) {

    //   } else {
    //     this.router.navigateByUrl('/AddUserDetail');

    //   }
    // })
   


  
  }



 
  ngOnInit(): void {
    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
  }

}
