import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activities, AdmVendor, Blog, Hotel, Travel } from '../Class';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.scss']
})
export class VendorDashboardComponent {
  BlogList: Blog[] = [];
  BlogListCount;

  AcitivitList: Activities[] = [];
  AcitivityListCount;

  HotelList: Hotel[] = [];
  HotelListCount;

  TravelListCount: number;
  TravelList: any[];

  // TravelList: Travel[] = [];
  // TravelListCount;

  UId: any

  data1;
  VID;

  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private service: WebService) {
    // this.blog.admVendor = new AdmVendor();

    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });



    this.service.GetAllAdmVendor().subscribe((result: any[]) => {
      // Assuming 'result' is an array of vendors
      const vendor = result.find(v => v.RegistrationId === this.UId);

      if (vendor) {
        this.data1 = vendor;
        console.log("Vendor:-", vendor);
        console.log("Vendor Status:-", vendor.Status);
        this.VID = this.data1.AdmVendorId
        console.log("Vendor ID is ", this.VID);

      } else {
        console.log("Vendor not found with the given RegistrationId");
      }
    });

  }



  ngOnInit(): void {

    this.getAcitivity();
    this.getHotel();
    this.getTravel();
    this.getBlogs();


    // if (!localStorage.getItem('foo')) { 
    //   localStorage.setItem('foo', 'no reload') 
    //   location.reload() 
    // } else {
    //   localStorage.removeItem('foo') 
    // }
  }

  getBlogs(): void {

    // this.service.GetAllBlog().subscribe(data => {
    //   this.BlogList = data;
    //   this.BlogListCount= this.BlogList.length
    //   console.log("Blog Data is ",data);
    //   console.log("Blog Data count is ", this.BlogListCount);
    // });



    this.service.GetAllBlog().subscribe((data: any[]) => {
      console.log(data);


      // Filter blogs where AdmVendorId matches the retrieved VID
      this.BlogList = data.filter(blog => blog.admVendor.AdmVendorId == this.UId);
      this.BlogListCount = this.BlogList.length;

      console.log("Filtered Blog Data:", this.BlogList);
      console.log("Blog Data Count:", this.BlogListCount);
    });
  }




  getAcitivity(): void {

    // this.service.GetAllActivities().subscribe(data => {
    //   this.AcitivitList = data;
    //   this.AcitivityListCount= this.AcitivitList.length
    //   console.log("AcitivityList Data is ",data);
    //   console.log("AcitivityListCount count is ", this.AcitivityListCount);
    // });


    this.service.GetAllActivities().subscribe((data: any[]) => {
      // Filter activities where AdmVendorId matches the retrieved VID
      this.AcitivitList = data.filter(activity => activity.CreatedBy == this.UId);
      this.AcitivityListCount = this.AcitivitList.length;

      console.log("Filtered Activity List Data:", this.AcitivitList);
      console.log("Activity List Count:", this.AcitivityListCount);
    });
  }





  getHotel(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   this.HotelListCount= this.HotelList.length
    //   console.log("HotelListCount Data is ",data);
    //   console.log("HotelListCount count is ", this.HotelListCount);
    // });

    this.service.GetAllHotel().subscribe((data: any[]) => {
      this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
      this.HotelListCount = this.HotelList.length;

      console.log("Filtered Hotel List Data:", this.HotelList);
      console.log("Hotel List Count:", this.HotelListCount);
    });
  }




  // getTravel(): void {

  //   // this.service.GetAllTravel().subscribe(data => {
  //   //   this.TravelList = data;
  //   //   this.TravelListCount= this.TravelList.length
  //   //   console.log("TravelListCount Data is ",data);
  //   //   console.log("TravelListCount count is ", this.TravelListCount);
  //   // });

  //   this.service.GetAllTravel().subscribe((data: any[]) => {
  //     this.TravelList = data.filter(travel => travel.VendorId == this.VID);
  //     this.TravelListCount = this.TravelList.length;

  //     console.log("Filtered Travel List Data:", this.TravelList);
  //     console.log("Travel List Count:", this.TravelListCount);
  //   });
  // } 

  getTravel(): void {
    this.service.GetAllTravel().subscribe((data: any[]) => {
      // Filter the TravelList based on VendorId or other criteria
      this.TravelList = data.filter(travel => travel.VendorId == this.UId); // Adjust condition if needed

      // Get the count of filtered TravelList
      this.TravelListCount = this.TravelList.length;

      console.log("Filtered Travel List Data:", this.TravelList);
      console.log("Travel List Count:", this.TravelListCount);
    });
  }



}

