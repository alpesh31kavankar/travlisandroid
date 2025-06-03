import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Registration } from '../Class';
import { WebService } from '../Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent {


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
  otp1: any;
  otp2: any;
  otp3: any;
  otp4: any;
  otp5: any;
  otp6: any;

  isResendDisabled: boolean = false; // To track whether the "Resend OTP" is disabled
  countdown: number = 0; // Countdown timer value in seconds
  countdownInterval: any; // To store the interval reference


  constructor(private renderer: Renderer2, private router: Router, private http: HttpClient, private route: ActivatedRoute,
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
    if (event.key === 'Backspace' && currentInput.value.length === 0) 
      { prevInput.focus(); prevInput.value = ''; // Clear the previous input value 
        } }  
  

  OnSubmit1() {
    this.Registrationlist = []
    this.mainList = []

    this.service.GetRegistrationById(this.Id).subscribe((result) => {

      this.registration = result;
      console.log("this.registration.OTPNo", this.registration.OTPNo)
      if (this.registration.OTPNo == this.otp1 + this.otp2 + this.otp3 + this.otp4 + this.otp5 + this.otp6) {
        // alert("otp Matched")
        Swal.fire({
          icon: 'success',
          title: 'OTP Matched',
          text: 'The OTP has been verified successfully!',
          confirmButtonText: 'Continue'
        });
        this.registration.EmailStatus = "Active";
        //Activate Email
        this.service.UpdateRegistration(this.registration).subscribe((result) => {
          if (result == 0) {
            // alert('Not updated!');
            Swal.fire({
              icon: 'error',
              title: 'Update Failed',
              text: 'Something went wrong! Please try again.',
              confirmButtonText: 'OK',
            });

          } else {
            // alert("Email activate Succesfully")
            Swal.fire({
              icon: 'success',
              title: 'OTP Matched',
              text: 'Your Email has been verified successfully!',
              confirmButtonText: 'Proceed',
            })
            // .then(() => {
            //   this.router.navigateByUrl("/ResetPassword/" + this.Id);
            // });
            this.router.navigate(['Login'])

          }
        });
      } else {
        // alert("otp not Matched")
        Swal.fire({
          icon: 'error',
          title: 'OTP Not Matched',
          text: 'Please check your OTP and try again.',
          confirmButtonText: 'Retry',
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
          icon: 'info',
          title: 'OTP Sent',
          text: 'An OTP has been sent to your registered email. Please check your inbox.',
          confirmButtonText: 'Okay'
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