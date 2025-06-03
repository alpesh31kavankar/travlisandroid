import { Component, ElementRef, ViewChild } from '@angular/core';
import { Registration, UserDetail, UserRole } from '../Class';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../Service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';
import { Service1Service } from '../service1.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @ViewChild('passwordInput') passwordInput: ElementRef;

  // Flag to toggle password visibility
  showPassword: boolean = false;
  userDetail: UserDetail;
  // Method to toggle password visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    const passwordInputType = this.showPassword ? 'text' : 'password';
    this.passwordInput.nativeElement.setAttribute('type', passwordInputType);
  }
  registration: Registration
  searchText1: any
  searchText2: any
  mainlist: any[] = []
  registrationList: any[] = []
  emailStatus: any
  registrationId: any
  defaultRole: any
  userid: any
  user: any
  loggedIn: any
  newId: any
  userRole: UserRole
  constructor(private authService: SocialAuthService,private service2: Service1Service, private router: Router, private http: HttpClient, private service: WebService, private route: ActivatedRoute) {
    this.registration = new Registration();
    this.userRole = new UserRole();
    this.userDetail = new UserDetail();
  }


  async signIn() {
    try {
      await this.service2.init(); //
      this.user = await this.service2.googleSignIn();
      // alert(this.user);
      if (this.user) {
        // alert('Sign-In Successful! User info: ' + JSON.stringify(this.user));
        
        this.service.GetAllRegistration().subscribe((result) => {
          this.mainlist = []
          this.registrationList = []
          for (let data of result) {
            this.registrationList.push(data);
          }
          this.mainlist = this.registrationList.filter(x => x.Email == this.user.email);
  
  
          if (this.mainlist.length == 0) {
            //mail not exist then Add new record
            this.registration.FName = this.user.displayName

            this.registration.LName = ""
  
            this.registration.Email = this.user.email
            this.registration.OTPNo = ""
            this.registration.Password = ""
            this.registration.EmailStatus = "Active"
            this.registration.Status = "Active"
            this.registration.DefaultRole = 2
  
            this.service.AddRegistration(this.registration).subscribe((result) => {
              if (result > 0) {
                // alert('Signup Successfully.');
  
                this.showSuccessAlert4()
                sessionStorage.setItem('SID', result)
  
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
                // //=======================================================================================================
  
                //Add Default user Role as a EndUser
  
                this.userRole.RegistrationId = result
                this.userRole.RoleId = 2
                // this.userRole.AdmRoleMasterId=2
                this.userRole.Status = "InActive"
                this.userRole.CreatedBy = "0"
                this.service.AddUserRole(this.userRole).subscribe((result) => {
                  if (result > 0) {
                    // alert('add user Role Successfully.');
                    this.router.navigateByUrl("/UserDashbord");
  
                  }
                  else {
                    // alert("Something went wrong! Please try again.")
                    this.showSuccessAlert3()
                  }
                });
  
              }
              else {
                // alert("Something went wrong! Please try again.")
                this.showSuccessAlert3()
              }
            });
          }
          else {
  
  
            this.service.GetRegistrationByEmail(this.user.email).subscribe((result) => {
              this.registration = result;
              this.newId = this.registration.RegistrationId
              sessionStorage.setItem('SID', this.newId);
              this.userid = JSON.parse(sessionStorage.getItem('SID'));
              console.log("userid", this.userid);
              if (this.userid == 0) {
                // alert("Something went wrong! Please try again.");
                this.showSuccessAlert3()
  
  
              }
              else {
                // alert("User registred alredy ");
                this.showSuccessAlert2()
  
                if (this.registration.DefaultRole == 2) {
                  this.router.navigateByUrl("/UserDashbord");
                } else {
                  // this.router.navigateByUrl("/DashboardVendor");
                }
  
              }
            })
  
  
  
          }
        })


      }

    } catch (error) {
      // Check if error has a message property
      const errorMessage = (error instanceof Error) ? error.message : 'Unknown error occurred.';
      alert('Error during sign-in: ' + errorMessage);
      console.error('Error during sign-in:', error);
    }
  }



  // showSuccessAlert() {
  //   Swal.fire({
  //     title: 'Success',
  //     html: 'You clicked the <b style="color:green;">Success</b> button!',
  //     icon: 'success'
  //   });
  // }
  OnSubmit() {
    console.log("registration", this.registration);

    this.service.GetAllRegistration().subscribe((result) => {
      this.mainlist = []
      this.registrationList = []
      for (let data of result) {
        this.registrationList.push(data);
      }
      this.mainlist = this.registrationList.filter(x => x.Email == this.searchText1);
      console.log("this.mainlist.length on s", this.mainlist.length);
      if (this.mainlist.length == 1) {
        this.emailStatus = this.mainlist[0].EmailStatus;
        this.registrationId = this.mainlist[0].RegistrationId;
        this.defaultRole = this.mainlist[0].DefaultRole;
        console.log("this.emailStatus", this.emailStatus);

        //check EmailStatus
        if (this.emailStatus == "Active") {
          this.service.Login(this.searchText1, this.searchText2).subscribe((result) => {
            if (result.RegistrationId == 0) {
              // alert('Invalid Email or Password.');

              this.showSuccessAlert1()
              // this.showPasswordMismatchAlert()



            }
            else {
              sessionStorage.setItem('SID', result.RegistrationId);
              // alert("Login Successfully");
              this.showSuccessAlert()

              if (this.defaultRole == "2") {
                // this.router.navigateByUrl("/Dashboard");
                this.router.navigateByUrl("/UserDashbord");
              } else {
                this.router.navigateByUrl("/VendorDashboard");
              }


            }
          })
        }
        else {
          // alert("Please Activate Your mail First.")
          this.showSuccessAlert5()
          this.router.navigateByUrl("/VerifyEmail/" + this.registrationId);
        }


      }
      else {
        // alert("Please Signup first")
        this.showSuccessAlert6()
      }

    })
  }


  ngOnInit() {

    this.userid = JSON.parse(sessionStorage.getItem('SID'));
    if (this.userid == 0) {
      // alert("Invalid Email and Password.")
      // alert('Invalid Email or Password.');
    }
    else {
      // alert("Login Successfully");
      // this.showSuccessAlert() ;
      this.router.navigateByUrl("/UserDashbord");
    }

    ////////////////////////////////////////////////////////////////////////

  }


  // checkPasswordLength(event: any) {
  //   const value = event.target.value;
  //   if (value.length > 8) {
  //     this.searchText2 = value.slice(0, 8);
  //   }
  // }


  showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green; ">Welcome back! You are now logged in</b>',
      icon: 'success'
    });
  }

  showSuccessAlert1() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Invalid Email or Password.</b>',
      icon: 'warning'
    });
  }

  // showPasswordMismatchAlert() {
  //   Swal.fire({
  //     title: 'Password Mismatch',
  //     html: '<b style="color:red;">The passwords do not match. Please try again.</b>',
  //     icon: 'warning',
  //     timer: 3000,
  //     showConfirmButton: false
  //   });
  // }



  showSuccessAlert2() {
    Swal.fire({
      title: 'Success!',
      text: 'Login Successfully.',
      icon: 'success',
      confirmButtonText: 'Ok'
    });
  }

  showSuccessAlert3() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Something went wrong! Please try again.</b>',
      icon: 'warning'
    });
  }
  showSuccessAlert4() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green;">Signup Successfully. </b>',
      icon: 'success'
    });
  }
  showSuccessAlert5() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Please Activate Your mail First.</b>',
      icon: 'warning'
    });
  }
  showSuccessAlert6() {
    Swal.fire({
      title: 'Warning',
      html: '<b style="color:red;">Please Signup first</b>',
      icon: 'warning'
    });
  }
}
