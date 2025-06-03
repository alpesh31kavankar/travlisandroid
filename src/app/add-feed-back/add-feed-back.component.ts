import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { WebService } from '../../Service';
import { NgForm } from '@angular/forms';
// import { FeedBack } from '../../Class';
import Swal from 'sweetalert2';
import { FeedBack } from '../Class';
import { WebService } from '../Service';
@Component({
  selector: 'app-add-feed-back',
  templateUrl: './add-feed-back.component.html',
  styleUrls: ['./add-feed-back.component.scss']
})
export class AddFeedBackComponent {
  @ViewChild('FeedBackForm') form: NgForm;
  feedBackList: FeedBack[];
  feedBack = new FeedBack();
  UId:any

  isOnlyWhitespace(text: string): boolean {
    return !text.trim();
  }
  constructor(private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient,
      private service: WebService
  ) {
      this.feedBack = new FeedBack();
      this.route.params.subscribe((params) => {
        this.UId = JSON.parse(sessionStorage.getItem('SID'));
        console.log("UId", this.UId);
      });
  }

  onSubmit() {

    if (this.isOnlyWhitespace(this.feedBack.FeedBackText)) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Input',
            text: 'Feedback text cannot be empty or whitespace.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff',
          });
          return;
      }
      this.feedBack.Rating="2"
          this.feedBack.RegistrationId=this.UId
              this.feedBack.AdmVendorId=2
              this.feedBack.Status="Active"
      console.log("feedBack", this.feedBack);
      this.feedBack.FeedBackText = this.feedBack.FeedBackText.trim();
      this.service.AddFeedBack(this.feedBack).subscribe((result) => {
          if (result > 0) {
              Swal.fire({
                  title: 'Success',
                  text: 'Feedback  has been Send successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK'
              });
          } else {
              Swal.fire({
                  title: 'Error',
                  text: 'Something went wrong! Please try again.',
                  icon: 'error',
                  confirmButtonText: 'OK'
              });
          }
      });

      // Reset form after submission
      this.form.resetForm();
  }
}