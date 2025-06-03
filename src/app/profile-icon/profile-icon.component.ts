import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../Service';
import { UserDetail } from '../Class';
import { GlobalVariable } from '../Global';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-profile-icon',
  templateUrl: './profile-icon.component.html',
  styleUrls: ['./profile-icon.component.scss']
})
export class ProfileIconComponent {
  userDetail: UserDetail = new UserDetail();
  imageUrl: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  showModal: boolean = false;
  imgPath: string = GlobalVariable.BASE_API_URL;
  data: any;
  userid: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: WebService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.userid = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UserID", this.userid);

    this.service.GetRegistrationById(this.userid).subscribe((result) => {
      this.data = result;
      console.log(this.data);
    });

    this.service.GetAllUserDetail().subscribe((result) => {
      const user = result.find((user: any) => user.RegistrationId == this.userid);
      this.userDetail = user;
      console.log("user Detail is ", this.userDetail);
    });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.imageUrl = null; // Clear the preview image on close
    this.selectedFile = null; // Reset the file selection
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result;

      
      reader.readAsDataURL(this.selectedFile);
    }
  }

  saveImage(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('uploadedImage', this.selectedFile, this.selectedFile.name);

      // Update user details first
      this.service.UpdateUserDetail(this.userDetail).subscribe(result => {
        if (result > 0) {
          console.log("User details updated successfully.");

          // Update the profile image
          this.service.SaveUserDetailImage(formData, this.userDetail.UserDetailsId).subscribe(
            () => {
              // SweetAlert success message
           
              this.showModal = false;
              // window.location.reload();
              this.reloadUserDetails(); // Reload updated user details
            },
            error => {
              console.error('Error updating image:', error);
              Swal.fire({
                icon: 'error',
                title: 'Error updating image',
                text: 'User details were updated, but image update failed.',
                showConfirmButton: true
              });
            }
          );
          Swal.fire({
            icon: 'success',
            title: 'Profile image updated successfully!',
            showConfirmButton: true
          });

        } else {
          // SweetAlert error message for user detail update failure
          Swal.fire({
            icon: 'error',
            title: 'Something went wrong!',
            text: 'Please try again.',
            showConfirmButton: true
          });
        }
      });
    }
  }

  editProfile(): void {
    this.router.navigateByUrl('/UserProfile');
  }

  onImageError(event: Event): void {
    (event.target as HTMLImageElement).src = '/assets/profilePhoto.png';
  }

  reloadUserDetails(): void {
    // Reload user details after update
    this.service.GetAllUserDetail().subscribe(allUsers => {
      const user = allUsers.find((u: any) => u.RegistrationId == this.userid);
      this.userDetail = user;
      this.imageUrl = `${this.imgPath}Content/UserDetail/${this.userDetail.Photo}`;
    });
  }
}