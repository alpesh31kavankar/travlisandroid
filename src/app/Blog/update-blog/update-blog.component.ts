import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog, ServiceMaster, AdmVendor, Registration } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-blog',
  templateUrl: './update-blog.component.html',
  styleUrls: ['./update-blog.component.scss']
})
export class UpdateBlogComponent {

  @ViewChild('BlogForm') form: NgForm;
  blog = new Blog();
  serviceMasterList: ServiceMaster[] = [];
  admVendorList: AdmVendor[] = [];
  filesToUpload: Array<File> = [];
  imgPath: string = GlobalVariable.BASE_API_URL;
  id
  imagePreview: string | ArrayBuffer | null = null;  // This will hold the image preview data

  searchTerm: string = '';
  searchTerm1: string = '';
  showDropdown: boolean = false;

  categories: any[] = [];
  allCities: string[] = [];
  filteredCities: string[] = [];

  UId: any
  registration: Registration;
  mainlist = []
  registrationList: any[]
  VendorId;

  isModalOpen: boolean = false;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
    this.blog.serviceMaster = new ServiceMaster();
    this.blog.admVendor = new AdmVendor();


    this.registration = new Registration();
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });
    this.service.GetRegistrationById(this.UId).subscribe((result) => {
      this.registration = result;
      console.log("Registration", this.registration);
    })

  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('BlogId')!;
    console.log("id is", this.id);


    this.getServiceMasterList();
    this.getAdmVendorList();
    this.getDetail();
    // this.searchTerm=this.searchTerm1
    this.getCities();
    this.FindAdmvendorID();

  }



  getCities(): void {
    this.service.GetAllAdmCityMaster().subscribe((cities) => {
      // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
      this.allCities = cities.map(city => city.CityDescription); // Extract only city names
      console.log(this.allCities); // Log the city names
      this.filteredCities = this.allCities; // Initially, show all city names
    });
  }


  //============================================================================================

  filterCities() {

    if (this.searchTerm) {
      this.filteredCities = this.allCities.filter(city =>
        city.toLowerCase().startsWith(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCities = this.allCities;
    }
    this.showDropdown = true; // Keep the dropdown visible
  }

  // Toggle dropdown when input is clicked
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (!this.searchTerm) {
      this.filteredCities = this.allCities;
    }
  }

  // Handle city selection
  selectCity(city: string) {
    this.searchTerm = city;
    // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
    this.showDropdown = false;
  }

  // Hide dropdown when input loses focus
  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }



  FindAdmvendorID() {


    this.service.GetAllAdmVendor().subscribe((result: any[]) => {

      console.log("All vendors", result);

      // Assuming this.registration.RegistrationId contains the registration ID to match
      this.VendorId = result.find(vendor => vendor.RegistrationId === this.registration.RegistrationId);

      if (this.VendorId) {
        console.log("Matched Vendor:", this.VendorId);
        console.log("AdmVendorId:", this.VendorId.AdmVendorId);  // Print the AdmVendorId
      } else {
        console.log("No vendor found with the matching RegistrationId");
      }

    });
  }


  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




  getServiceMasterList(): void {
    this.service.GetAllServiceMaster().subscribe(
      (result: ServiceMaster[]) => {
        console.log("ServiceMasterList raw response: ", result); // Check raw response
        this.serviceMasterList = result;
        console.log("ServiceMasterList bound: ", this.serviceMasterList); // Confirm binding
      },
      error => {
        console.error("Failed to fetch ServiceMasterList", error);
      }
    );
  }

  getAdmVendorList(): void {
    this.service.GetAllAdmVendor().subscribe(
      (result: AdmVendor[]) => {
        console.log("AdmVendorList raw response: ", result); // Check raw response
        this.admVendorList = result;
        console.log("AdmVendorList bound: ", this.admVendorList); // Confirm binding
      },
      error => {
        console.error("Failed to fetch AdmVendorList", error);
      }
    );
  }

  getDetail() {
    this.service.GetBlogById(this.id).subscribe(result => {
      console.log("Blog by id ", result);
      this.blog = result;
      this.searchTerm = this.blog.City


    });
  }

  OnSubmit(): void {

    this.blog.Name = this.blog.Name.trim();
    this.blog.Subtitle = this.blog.Subtitle.trim();
    this.blog.Description = this.blog.Description.trim();
    this.searchTerm = this.searchTerm.trim();
  
    // Check if any required field is empty or just spaces
    if (!this.blog.Name || !this.blog.Subtitle || !this.blog.Description || !this.searchTerm) {
      Swal.fire({
        icon: 'warning',
        title: 'Invalid Input',
        text: 'All fields must be filled and cannot be just spaces.',
        confirmButtonText: 'OK',
        confirmButtonColor: '#007bff',
      });
      return;
    }

    this.blog.serviceMaster.ServiceMasterId = 1
    this.blog.admVendor.AdmVendorId=this.UId ;

  this.blog.Image=this.blog.Image

    this.blog.City = this.searchTerm

    this.service.UpdateBlog(this.blog).subscribe(result => {
      if (result > 0) {
        console.log(result);

       
        const formData = new FormData();
        formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
        this.service.SaveBlogImage(formData, result).subscribe(() => {
          // alert('Saved Successfully.');

           
          Swal.fire({
            title: 'Success!',
            text: 'Blog has been update successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              // Navigate to the RoomList route
              this.router.navigateByUrl('/BlogList');
            }
          });
         
        });
        // alert('Saved Successfully.');
        // Swal.fire({
        //   title: 'Success!',
        //   text: 'Saved Successfully.',
        //   icon: 'success',
        //   confirmButtonText: 'OK',
        // });
      } else {
        // alert('Something went wrong! Please try again.');
        this.showSuccessAlert1()
      }
    });
  }

  // fileChangeEvent(fileInput: any): void {
  //   this.filesToUpload = <Array<File>>fileInput.target.files;
  //   if (this.filesToUpload.length > 0) {
  //     this.blog.Image = this.filesToUpload[0].name;
  //   }
  //   else {
  //     this.blog.Image = '';  // Handle the case where no file is selected
  //   }
  // }

  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  
    if (this.filesToUpload.length > 0) {
      const file = this.filesToUpload[0];
      this.blog.Image = file.name;  // Store the image file name
  
      // Create a preview of the uploaded image
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;  // Store the image preview in the component
      };
      reader.readAsDataURL(file);  // Read the file as a data URL for preview
    } else {
      // If no image is selected, reset the preview
      this.imagePreview = null;
    }
  }
  
  

  showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green; ">Saved Successfully.</b>',
      icon: 'success'
    });
  }

  showSuccessAlert1() {
    Swal.fire({
      title: 'Error',
      html: ' <b style="color:red; ">Something went wrong! Please try again.</b>',
      icon: 'error'
    });
  }


  openModal() {
    this.isModalOpen = true;
  }

  // Close the modal
  closeModal() {
    this.isModalOpen = false;
  }



}