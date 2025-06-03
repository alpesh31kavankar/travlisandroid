import { Component } from '@angular/core';
import { Registration } from '../Class';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../Service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

    registration: Registration;
  
    mainList: any;
    demo: any;
    Id: any;
    confirmPassword: any
    newPassword:any
  
  
    constructor(private router: Router, private http: HttpClient,
      private service: WebService, private route: ActivatedRoute,) {
  
      this.registration = new Registration();
  
      this.mainList = [];
      this.demo = 0;
      
  
      this.route.params.subscribe((params) => {
        debugger
        this.Id = params['Id'];
        console.log("addclient", this.Id)
  
        this.service.GetRegistrationById(this.Id).subscribe((result) => {
  
          this.registration = result;
          console.log("this.registration", this.registration);
  
        });
  
      });
  
    }
    
    // OnSubmit() {
    //   console.log(this.newPassword, "this.newPassword");
    //   console.log(this.confirmPassword, "this.confirmPassword");
    
    //   if (this.newPassword === this.confirmPassword) {
    //     console.log("final", this.registration);
    //     this.registration.Password = this.newPassword;
    
    //     this.service.UpdateRegistration(this.registration).subscribe((result) => {
    //       console.log("hhh", result);
    
    //       if (result === 0) {
    //         Swal.fire({
    //           icon: 'error',
    //           title: 'Error',
    //           text: 'Something went wrong! Please try again.',
    //           timer: 3000,
    //           showConfirmButton: false
    //         });
    //       } else {
    //         Swal.fire({
    //           icon: 'success',
    //           title: 'Password Reset Successfully',
    //           text: 'A confirmation email has been sent to your registered email address.',
    //           timer: 3000,
    //           showConfirmButton: false
    //         }).then(() => {
    //           this.router.navigate(['/Login']);
    //         });
    //       }
    //     });
    //   } else {
    //     Swal.fire({
    //       icon: 'warning',
    //       title: 'Password Mismatch',
    //       text: 'The passwords do not match. Please try again.',
    //       timer: 3000,
    //       showConfirmButton: false
    //     });
    //   }
    // }



    OnSubmit() {
      console.log(this.newPassword, "this.newPassword");
      console.log(this.confirmPassword, "this.confirmPassword");
    
      // Check if passwords match
      if (this.newPassword === this.confirmPassword) {
        console.log("final", this.registration);
        this.registration.Password = this.newPassword;
    
        // Call service to update registration details
        this.service.UpdateRegistration(this.registration).subscribe((result) => {
          console.log("hhh", result);
    
          // If the update was successful, send OTP email
          if (result === 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Something went wrong! Please try again.',
              timer: 3000,
              showConfirmButton: false
            });
          } else {
            // Send OTP email (call SendOTPEmailp service here)
            this.service.SendOTPEmail(this.registration.Email).subscribe(
              (otpResult) => {
                console.log("OTP sent", otpResult);
                Swal.fire({
                  icon: 'success',
                  title: 'Password Reset Successfully',
                  text: 'A confirmation email has been sent to your registered email address.',
                  timer: 3000,
                  showConfirmButton: false
                }).then(() => {
                  this.router.navigate(['/Login']);
                });
              },
              (error) => {
                console.error("Error sending OTP email", error);
                Swal.fire({
                  icon: 'error',
                  title: 'OTP Error',
                  text: 'There was an issue sending the OTP email. Please try again.',
                  timer: 3000,
                  showConfirmButton: false
                });
              }
            );
          }
        });
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Password Mismatch',
          text: 'The passwords do not match. Please try again.',
          timer: 3000,
          showConfirmButton: false
        });
      }
    }
    
    
  }