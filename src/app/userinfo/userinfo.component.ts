import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';
import { AdmVendor, Registration, UserDetail } from '../Class';
import { GlobalVariable } from '../Global';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.scss']
})
export class UserinfoComponent {
  userDetail: UserDetail;
  registration: Registration;
  // userInfo: any = {
  //   FName: 'Mike',
  //   LName: 'Lazaridis',
  //   Email: 'MikeLazaridis@gmail.com',
  //   contactNo: ''
  // };
  userInfo: Registration;
  userid;
  currentView = 'profile';
  editMode = false;
  hideSidebarOnMobile = true;
  isSidebarVisible = false;

  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  imgPath: string = GlobalVariable.BASE_API_URL;

  // travelHistory = [
  //   {
  //     dayOfWeek: 'Monday',
  //     date: '01/01/2023',
  //     locationFrom: 'New York',
  //     locationTo: 'Los Angeles',
  //     time: '10:00 AM'
  //   },

  // ];

  preferredBudget: number;
  travelType: string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {
    this.userDetail = new UserDetail();
    this.registration = new Registration();
  }

  // sliderOpen = false; // to track slider state

  // toggleSlider() {
  //   this.sliderOpen = !this.sliderOpen;
  // }
  ngOnInit(): void {
    this.GetInfo();

    this.service.GetAllUserDetail().subscribe((result) => {
      console.log("All user ", result);

      const user = result.find((user: any) => user.RegistrationId == this.userid);
      console.log("Deatil user  info ", user);
      this.userDetail = user
    });

    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    }
  }

  GetInfo() {
    this.userid = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UserID", this.userid);

    this.service.GetRegistrationById(this.userid).subscribe((result) => {
      this.userInfo = result
      console.log("User Info", result);
      //  this.userDetail.RegistrationId=this.userInfo.RegistrationId;
      //  this.userDetail.Contact="";
      //   this.userDetail.Tagline="";
      //    this.userDetail.Photo="";
      //    this.userDetail.BirthDate="";
      //    this.userDetail.Address="";
      //    this.userDetail.Status="";
      //    this.userDetail.Gender="";
      //    this.userDetail.AdmCountryMasterId="";
      //    this.userDetail.AdmStateMasterId="";
      //    this.userDetail.AdmCityMasterId="";
      //  console.log( "this.userDetail1" ,this.userDetail);


      //  this.service.AddUserDetail(this.userDetail).subscribe(result => {


    });


  }
  setView(view: string) {
    this.currentView = view;
    this.isSidebarVisible = false; // Hide sidebar after selecting an option on mobile
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleSidebarVisibility() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }



  savePreferences() {
    // Save travel preferences logic...
  }


  // fetchUserInfo() {
  //   this.userService.getUserInfo(this.userInfo.id)
  //     .subscribe((data) => {

  //       console.log(data);
  //       // this.userInfo = data;

  //     });
  // }

  saveInfo() {
    // this.service.UpdateRegistration( this.userInfo)
    //   .subscribe(() => {
    //     console.log("Avinash");

    //     this.editMode = false;
    //   });

    this.service.UpdateUserDetail(this.userDetail).subscribe((result) => {
      console.log("Avinash");
      if (result > 0) {
        console.log("Result", result);


        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        this.service.SaveUserDetailImage(formData, this.userDetail.UserDetailsId).subscribe(data => {
          alert('Saved Successfully.');
          // this.router.navigateByUrl('/AdmActivitiesMasterList');
        });
      } else {
        alert("Something went wrong! Please try again.");
      }
      this.editMode = false;
    });
  }
  // openModal() {
  //   const modalElement = document.getElementById('exampleModal');
  //   const modal = new bootstrap.Modal(modalElement);
  //   modal.show();
  // }




  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.selectedFileNames = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
      this.userDetail.Photo = this.filesToUpload[i].name;
    }
  }

}
