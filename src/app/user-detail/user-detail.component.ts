import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmDestinations, Registration, UserDetail } from '../Class';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  // @ViewChild('AdmActivitiesMasterForm') form: NgForm;
  userDetail: UserDetail;
  // userDetail: UserDetail={
  //   UserDetailsId: null,
   
  //   RegistrationId: null,
  //   Contact: "",
  //   Tagline: "",
  //   Photo: "",
  //   BirthDate: "",
  //   Address: "",
  //   Gender: "",
  //   Status: "",
  // }
  registration: Registration;
  SId: any;
  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  imgPath: string = GlobalVariable.BASE_API_URL;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {
    this.userDetail = new  UserDetail();
    this.registration = new  Registration();
    // this.admActivitiesMaster.admDestinations = new AdmDestinations();
    this.route.params.subscribe((params) => {
      this.SId = JSON.parse(sessionStorage.getItem('SID'));
    });
  }

   ngOnInit(): void {
    this.service.GetRegistrationById(this.SId).subscribe((result) => {
      this.registration = result;
      console.log("Registration", this.registration);
    })

    // this.service.GetAllUserDetail().subscribe((result) => {
    //   this.registration = result;
    //   console.log("UserID", this.registration);
    // })

    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

 

  OnSubmit(): void {
    this.userDetail.RegistrationId= this.registration.RegistrationId;
    console.log("UserDetail",this.userDetail);
    this.service.AddUserDetail(this.userDetail).subscribe(result => {
      if (result > 0) {
        console.log("Result",result);
        
        
        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        this.service.SaveUserDetailImage(formData,result).subscribe(data => {
          alert('Saved Successfully.');
          // this.router.navigateByUrl('/AdmActivitiesMasterList');
        });
      } else {
        alert("Something went wrong! Please try again.");
      }
    });
  }

  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.selectedFileNames = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
      this. userDetail.Photo = this.filesToUpload[i].name;
    }
  }
}