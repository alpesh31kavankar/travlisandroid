import { Component, ElementRef, ViewChild } from '@angular/core';
import { Registration } from '../Class';
import { ActivatedRoute, Router } from '@angular/router';

import { WebService } from 'src/app/Service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-otp-match',
  templateUrl: './otp-match.component.html',
  styleUrls: ['./otp-match.component.scss']
})
export class OtpMatchComponent {


  //   @ViewChild('input1') input1!: ElementRef;
  //   @ViewChild('input2') input2!: ElementRef;
  //   @ViewChild('input3') input3!: ElementRef;
  //   @ViewChild('input4') input4!: ElementRef;
  //   @ViewChild('input5') input5!: ElementRef;
  //   @ViewChild('input6') input6!: ElementRef;

  //   Id: any;
  //   registration: Registration;
  //   Registrationlist: any[];
  //   showPassword: boolean;
  //   mainList: any[];
  //   searchText: any;
  //   otp1: any;
  //   otp2: any;
  //   otp3: any;
  //   otp4: any;
  //   otp5: any;
  //   otp6: any;

  //   constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,
  //     private service: WebService) {
  //     this.registration = new Registration();
  //     this.Registrationlist = [];
  //     this.mainList = []


  //     this.route.params.subscribe((params) => {
  //       this.Id = params['Id'];
  //       console.log(" this.Id", this.Id)
  //     });

  //   }


  //   ngOnInit(): void {
  //     this.service.GetRegistrationById(this.Id).subscribe((result) => {
  //       this.Registrationlist = []
  //       console.log(this.Registrationlist);

  //       this.mainList = []

  //       this.registration = result;
  //     });

  //   }


  //   moveToNext(currentInput: any, nextInput: any): void {
  //     if (currentInput.value.length === 1) {
  //       nextInput.focus();
  //     }
  //   }


  //   OnSubmit1() {

  //     this.service.GetRegistrationById(this.Id).subscribe((result) => {
  //       this.Registrationlist = []
  //       console.log(this.Registrationlist);

  //       this.mainList = []

  //       this.registration = result;
  //       if (this.registration.OTPNo == this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6) {
  //         // alert("otp Matched")
  //         this.OTPmatchAlert()


  //         this.router.navigateByUrl("/ResetPassword/" + this.Id);

  //       } else {
  //         // alert("otp not Matched")
  //         this.otpAlert()
  //       }


  //     });

  //   }


  //   SendOTPEmail() {


  //     this.service.GetRegistrationById(this.Id).subscribe((result) => {
  //       this.Registrationlist = []
  //       console.log(this.Registrationlist);

  //       this.mainList = []

  //       this.registration = result;
  //     });


  //     this.Registrationlist = []
  //     this.mainList = []
  //     console.log(this.registration.Email);


  //     this.service.SendOTPEmail(this.registration.Email).subscribe({

  //       next: (response) => {
  //         // alert("Otp Sent to your registered Email ")
  //         this.showSuccessAlert()

  //         // console.log('Email sent successfully:', response);


  //         this.registration.OTPNo = response.otp;
  //         console.log('Received OTP:', this.registration.OTPNo);

  //         this.service.GetAllRegistration().subscribe((result) => {
  //           this.Registrationlist = result;
  //           this.mainList = this.Registrationlist.filter(x => x.Email == this.registration.Email);

  //           for (let data1 of this.mainList) {
  //             this.Id = data1.RegistrationId;
  //           }

  //           this.service.GetRegistrationById(this.Id).subscribe((result) => {
  //             this.registration = result;
  //             console.log("fun", this.registration);
  //             this.registration.OTPNo = response.otp;
  //             this.service.UpdateRegistration(this.registration).subscribe((result) => {
  //               if (result == 0) {
  //                 // alert('Not updated!');

  //               } else {
  //                 // alert('updated successfully');
  //                 // this.router.navigateByUrl("/TermConditions/" + this.Id);
  //               }
  //             });
  //           });
  //         });
  //       }
  //     });
  //   }
  // showSuccessAlert() {
  //     Swal.fire({
  //       title: 'Success',
  //       html: ' <b style="color:green;">Otp Sent to your registered Email</b>',
  //       icon: 'success'
  //     });
  //   }

  //   OTPmatchAlert() {
  //     Swal.fire({
  //       title: 'Success',
  //       html: ' <b style="color:green;">OTP Matched</b>',
  //       icon: 'success'
  //     });
  //   }
  //   otpAlert() {
  //     Swal.fire({
  //       title: 'Warning',
  //       html: ' <b style="color:Red;">OTP not Matched</b>',
  //       icon: 'warning'
  //     });
  //   }
  // }



  @ViewChild('input1') input1!: ElementRef;
  @ViewChild('input2') input2!: ElementRef;
  @ViewChild('input3') input3!: ElementRef;
  @ViewChild('input4') input4!: ElementRef;
  @ViewChild('input5') input5!: ElementRef;
  @ViewChild('input6') input6!: ElementRef;

  Id: any;
  registration: Registration;
  Registrationlist: any[];
  showPassword: boolean;
  mainList: any[];
  searchText: any;
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;


  isResendDisabled: boolean = false; // To track whether the "Resend OTP" is disabled
  countdown: number = 0; // Countdown timer value in seconds
  countdownInterval: any; // To store the interval reference


  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute,
    private service: WebService) {
    this.registration = new Registration();
    this.Registrationlist = [];
    this.mainList = []


    this.route.params.subscribe((params) => {
      this.Id = params['Id'];
      console.log(" this.Id", this.Id)
    });

  }


  ngOnInit(): void {
    this.service.GetRegistrationById(this.Id).subscribe((result) => {
      this.Registrationlist = []
      console.log(this.Registrationlist);

      this.mainList = []

      this.registration = result;
    });

  }


  moveToNext(currentInput: any, nextInput: any): void {
    if (currentInput.value.length === 1) {
      nextInput.focus();
    }
  }


  moveBack(event: KeyboardEvent, currentInput: any, prevInput: any): void {
    if (event.key === 'Backspace' && currentInput.value.length === 0) {
      prevInput.focus(); prevInput.value = ''; // Clear the previous input value 
    }
  }

  OnSubmit1() {

    this.service.GetRegistrationById(this.Id).subscribe((result) => {
      this.Registrationlist = []
      console.log(this.Registrationlist);

      this.mainList = []

      this.registration = result;
      if (this.registration.OTPNo === this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6) {
        Swal.fire({
          icon: 'success',
          title: 'OTP Matched',
          text: 'Redirecting to reset password...',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigateByUrl("/ResetPassword/" + this.Id);
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'OTP Not Matched',
          text: 'Please check the OTP and try again.',
          timer: 2000,
          showConfirmButton: false
        });
      }



    });

  }

  onResendOtpClick(): void {
    if (!this.isResendDisabled) {
      this.SendOTPEmail();
      this.startCountdown(180); // 3 minutes = 180 seconds
    }
  }

  startCountdown(seconds: number): void {
    this.isResendDisabled = true;
    this.countdown = seconds;

    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown === 0) {
        clearInterval(this.countdownInterval);
        this.isResendDisabled = false;
      }
    }, 1000);
  }



  SendOTPEmail() {


    this.service.GetRegistrationById(this.Id).subscribe((result) => {
      this.Registrationlist = []
      console.log(this.Registrationlist);

      this.mainList = []

      this.registration = result;
    });


    this.Registrationlist = []
    this.mainList = []
    console.log(this.registration.Email);


    this.service.SendOTPEmail(this.registration.Email).subscribe({

      next: (response) => {
        // alert("Otp Sent to your registered Email ")


        Swal.fire({
          icon: 'success',
          title: 'OTP Sent',
          text: 'OTP has been sent to your registered email address.',
          timer: 3000,
          showConfirmButton: false
        });

        console.log('Email sent successfully:', response);
        this.registration.OTPNo = response.otp;
        console.log('Received OTP:', this.registration.OTPNo);

        this.service.GetAllRegistration().subscribe((result) => {
          this.Registrationlist = result;
          this.mainList = this.Registrationlist.filter(x => x.Email == this.registration.Email);

          for (let data1 of this.mainList) {
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
                // this.router.navigateByUrl("/TermConditions/" + this.Id);
              }
            });
          });
        });
      }
    });
  }

}