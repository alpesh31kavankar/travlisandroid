import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Registration } from 'src/app/Class';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  isSubmitting: boolean = false;

  registrationlist: any[]
  mainlist: any[]
  mainlist1:any[]
  registration: Registration;
  Id:any

  constructor(private router: Router,
    private http: HttpClient,
    private service: WebService) {
    this.registration = new Registration();
    this.registrationlist = []
    this.mainlist = []
    this.mainlist1=[] 
  }
  OnSubmit() {
    this.registrationlist = []
    this.service.GetAllRegistration().subscribe((result) => {
      console.log(result);
    
      for (let data of result) {
        this.registrationlist.push(data);
      }
      console.log("registration", this.registrationlist); //Email

      this.mainlist = this.registrationlist.filter(x => x.Email == this.registration.Email);
      console.log("e1", this.mainlist);

      if (this.mainlist.length == 1) {
        // alert('Email Id Existed');
        this.SendOTPEmail()
        this.isSubmitting = true;
      }

      else {
        // alert("Invalid Email Id");
        this.notmacthAlert()
      }
    });

  }


  SendOTPEmail() {
    this.registrationlist = []
    this.mainlist = []
    this.mainlist1=[]
    this.service.SendOTPEmail(this.registration.Email).subscribe({

      next: (response) => {
        // alert("Email sent successfully")
this.showSuccessAlert()
        console.log('Email sent successfully:', response);
      
        this.registration.OTPNo = response.otp;
        console.log('Received OTP:', this.registration.OTPNo);
       
        this.service.GetAllRegistration().subscribe((result) => {
          this.registrationlist = result;
          this.mainlist1 = this.registrationlist.filter(x => x.Email == this.registration.Email);

          for (let data1 of this.mainlist1) {
            this.Id = data1.RegistrationId;
       
          }
          debugger
          this.service.GetRegistrationById(this.Id).subscribe((result) => {
            this.registration = result;
            console.log("fun", this.registration);

          
            this.registration.OTPNo = response.otp;
            this.service.UpdateRegistration(this.registration).subscribe((result) => {
              if (result == 0) {
                // alert('Not updated!');

              this.notmacthAlert1()

              } else {
                // alert('updated successfully');
                this.router.navigateByUrl("/OtpMatch/" + this.Id);

                
              }
            });
          });
        });
      }
    });
  }
  showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green;">Email sent successfully</b>',
      icon: 'success'
    });
  }

  notmacthAlert() {
    Swal.fire({
      title: 'Warning!',
      html: ' <b style="color:red;">Invalid Email Id</b>',
      icon: 'warning'
    });
  }

  notmacthAlert1() {
    Swal.fire({
      title: 'Warning!',
      html: ' <b style="color:red;">Not updated!</b>',
      icon: 'warning'
    });
  }


  handleButtonClick(event: Event): void {
    if (this.isSubmitting) {
      event.preventDefault(); // Prevents additional clicks
      return;
    }
  
    this.isSubmitting = true;
    this.OnSubmit();
  }


}
