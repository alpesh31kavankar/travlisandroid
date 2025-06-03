import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Registration, UserDetail, UserRole, vendor } from '../Class';
import { WebService } from '../Service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  isSubmitted: boolean = false;
  confirmPassword: string = '';
  referralCode: string = '';
  // ConfirmPassword: '';
  userDetail: UserDetail;
  userRole: UserRole
  registration: Registration
  // userDetail: UserDetail
  Id: any;
  filesToUpload: Array<File>;
  Emailid: any
  selectedFileNames: string[] = [];
  registrationList: any[]
  mainlist: any[]
  mainlist1: any[]
  isPasswordVisible: boolean;


  vendor:vendor ;


  constructor(private router: Router,
    private http: HttpClient,
    private service: WebService) {
    this.registration = new Registration();
    this.userDetail = new UserDetail();
    this.userRole = new UserRole();
    this.registrationList = []
    this.mainlist = []
    this.mainlist1 = []
  }

  OnSubmit() {
    this.isSubmitted = true;
    console.log("this.registration", this.registration);
    console.log("this.registration.Email", this.registration.Email);
    console.log(this.confirmPassword, "this.confirmPassword")
    if (this.registration.Password == this.confirmPassword) {
      this.service.GetAllRegistration().subscribe((result) => {
        this.registrationList = []
        for (let data of result) {
          this.registrationList.push(data);
        }
        this.mainlist = this.registrationList.filter(x => x.Email == this.registration.Email);
        console.log("this.mainlist.length", this.mainlist.length);
        if (this.mainlist.length == 1) {
          // alert('This email registered allready');
          this.showSuccessAlert2()


        }
        else {
debugger
          this.Emailid = this.registration.Email
          this.registration.EmailStatus = "InActive"
          this.registration.OTPNo = ""
          this.registration.DefaultRole = 2
          this.registration.Status = "InActive"
          this.service.AddRegistration(this.registration).subscribe((result) => {

            if (result > 0) {
              // alert('User Registrated Successfully.');

              this.showSuccessAlert1()


              console.log(result);

              //======================================================================================================
              this.userDetail.RegistrationId = result;
              this.userDetail.Contact = "";
              this.userDetail.Tagline = "";
              this.userDetail.Photo = "src/assets/profilePhoto.png";
              this.userDetail.BirthDate = "";
              this.userDetail.Address = "";
              this.userDetail.Status = "";
              this.userDetail.Gender = "";
              this.userDetail.AdmCountryMasterId = "";
              this.userDetail.AdmStateMasterId = "";
              this.userDetail.AdmCityMasterId = "";
              this.userDetail.UpdatedBy = "";
              console.log("this.userDetail1", this.userDetail);


              this.service.AddUserDetail(this.userDetail).subscribe(result => {


              });

              //////////////////////////Vender Data////////////////////////////////////////////////////////
              // console.log("Registration:-", this.registration);
    
              // this.vendor.Name = "";
              // this.vendor.SubTitle = "";
              // this.vendor.RegistrationId = result;
              // this.vendor.Photo="";
              // this.vendor.Description=""
              // this.vendor.Status="123"
          
              // console.log("vendor", this.vendor);
          
              // this.service.AddAdmVendor(this.vendor).subscribe(result => {
              //   if (result > 0) {
              //     // const formData = new FormData();
              //     // formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
              //     // this.service.SaveAdmVendorImage(formData, result).subscribe(data => {
              //       alert('Request Send  Successfully.');
              //     //   this.router.navigateByUrl('/Dashboard');
              //     // });
              //   } else {
              //     alert("Something went wrong! Please try again.");
              //   }
               
              // });

              // //=======================================================================================================

              //Add Default user Role as a EndUser
              this.userRole.RegistrationId = result
              this.userRole.RoleId = 2
                   this.userRole.CreatedBy = "0"
              // this.userRole.AdmRoleMasterId=2
              this.userRole.Status = "InActive"
              this.service.AddUserRole(this.userRole).subscribe((result) => {
                if (result > 0) {
                  // alert('add user Role Successfully.');
                }
                else {
                  // alert("Something went wrong! Please try again.")
                  this.showSuccessAlert3()

                }
              });

              this.SendOTPEmail()
            }
            else {
              // alert("Something went wrong! Please try again.")
              this.showSuccessAlert7()

            }
          });

        }
      })
    }
    else {
      // alert("not match")
      this.showSuccessAlert()
    }
  }


  
  //send otp to email and store to Database
  SendOTPEmail() {
    debugger
    this.registrationList = []
    this.mainlist1 = []
    this.service.SendOTPEmail(this.registration.Email).subscribe({

      next: (response) => {


        // alert("Otp Sent to your registered Email ")

        this.showSuccessAlert4() 

        console.log('Email sent successfully:', response);
        this.registration.OTPNo = response.otp;
        console.log('Received OTP:', this.registration.OTPNo);

        this.service.GetAllRegistration().subscribe((result) => {
          this.registrationList = result;
          this.mainlist1 = this.registrationList.filter(x => x.Email == this.registration.Email);

          for (let data1 of this.mainlist1) {
            this.Id = data1.RegistrationId;
          }

          this.service.GetRegistrationById(this.Id).subscribe((result) => {
            this.registration = result;
            console.log("fun", this.registration);
            this.registration.OTPNo = response.otp;
            this.service.UpdateRegistration(this.registration).subscribe((result) => {
              if (result == 0) {
                // alert('Not updated!');

              } else {
                // alert('updated successfully');
                this.router.navigateByUrl("/TermConditions/" + this.Id);
              }
            });
          });
        });
      }
    });


  }


  ngOnInit(): void {
  }

  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    const confirmPasswordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
  }
  passwordsMatch(form: NgForm) {
    const password = form.controls['Password'];
    const confirmPassword = form.controls['ConfirmPassword'];
    if (password && confirmPassword) {
      return password.value === confirmPassword.value ? null : { passwordsMismatch: true };
    }
    return null;
  }

 
  showSuccessAlert2() {
    Swal.fire({
          title: 'Warning',
      html: ' <b style="color:red; ">This email registered already</b>',
        icon: 'warning'
    });
  }
  showSuccessAlert1 () {
    Swal.fire({
      title: 'Success',
      html: '<b style="color:green;">User Registered Successfully.</b>',
      icon: 'success'
    });
  }

  showSuccessAlert() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Invalid Email or Password.</b>',
      icon: 'warning'
    });
  }


  showSuccessAlert3() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Something went wrong! Please try again..</b>',
      icon: 'warning'
    });
  }

  showSuccessAlert7() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Something went wrong! Please try again..</b>',
      icon: 'warning'
    });
  }

  showSuccessAlert4() {
    Swal.fire({
      title: 'Success',
      html: '<b style="color:green;">Otp Sent to your registered Email</b>',
      icon: 'success'
    });
  }
  
}