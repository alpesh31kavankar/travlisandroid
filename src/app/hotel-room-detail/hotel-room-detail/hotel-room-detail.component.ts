import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as bootstrap from 'bootstrap';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import Swal from 'sweetalert2';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import { UserRole, AdmSubscription, PurchasePlan, HotelTrsDetail, Rooms, HotelBooking, UserDetail } from 'src/app/Class';

@Component({
  selector: 'app-hotel-room-detail',
  templateUrl: './hotel-room-detail.component.html',
  styleUrls: ['./hotel-room-detail.component.scss']
})
export class HotelRoomDetailComponent {
  // @ViewChild('bookingSummaryModal', { static: false }) bookingSummaryModal!: ElementRef;

  originalPrice: any
  discountPercentage: any
  discountAmount: any
  finalPrice: any



  myvenderid: any
  userRole: UserRole;
  userRoleList: any[] = []
  mainUserRoleList: any[] = []
  URoleId: any
  currentcount: any


  // this.yourElement?.nativeElement?.focus();
  UId: any
  PlanId: any
  admSubscription: AdmSubscription
  purchasePlan: PurchasePlan
  transactionDetail: HotelTrsDetail

  userRolelist: any[] = []
  mainUserRolelist: any[] = []
  myRoomsinfo: Rooms
  // userRole:UserRole
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;

  myRoomsinfo1: Rooms


  departureDay: string = '';
  returnDay: string = '';
  tripType: string = '';
  noOfPersons: string = '';
  From: string = "";
  to: string = "";

  isModalVisible = false;
  today: string = new Date().toISOString().split('T')[0];
  minCheckOutDate: string = '';
  hotelBooking: HotelBooking = new HotelBooking();
  RoomsList: Rooms;
  RoomDetail: any;
  MyRoomID: number;
  MyRegistrationID: number;
  imgPath: string = GlobalVariable.BASE_API_URL;
  MyVendorID;
  isBookingFormVisible: boolean = false;
  totalDays;
  userProfiles: UserDetail[] = [];
  matchingProfiles: UserDetail[] = [];
  MyUserID: number | null = null;

  imageUrls: string[] = [];
  imageArrays = []

  allCityImages = []
  RoomImageList: any[] = []

  images = []
  allRoomImages: any[];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
    this.RoomsList = new Rooms();
    this.myRoomsinfo = new Rooms();
    //=======================new Rooms();=================================

    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
    this.purchasePlan = new PurchasePlan()
    this.transactionDetail = new HotelTrsDetail()
    // this.userRole = new UserRole()
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("in  this.PlanId", this.UId)
      this.PlanId = params['TravelId'];

      console.log("in  this.PlanId", this.PlanId)

      // this.service.GetAdmSubscriptionById(this.PlanId).subscribe((result) => {

      //   this.admSubscription = result;
      //   console.log("admSubscription", this.admSubscription);

      // });

    });
    //==========================================================================

  }

  private initConfig(): void {

    this.payPalConfig = {
      currency: 'CAD',
      clientId: 'ASx9o9GHbGl_OEbKrxViLtFobZnn6-ZfH19dHsSBDy5RWrR36oKxiWSOKmRZqZ9WL6UadwR_2VbVTQ3m',
      // AXSvNFUVWMEbhlq2OE8tvvM-XaSshFeY1AyFKul3uoeF49yK8T1G-B9HccWXmwOwlfFvGjAX0R0RHYpt
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'CAD',
              value: this.hotelBooking.TotalPrice,
              breakdown: {
                item_total: {
                  currency_code: 'CAD',
                  value: this.hotelBooking.TotalPrice
                }
              }
            },

            items: [
              {
                name: 'Enterprise Subscription',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'CAD',
                  value: this.hotelBooking.TotalPrice,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        this.showSuccess = true;


        if (data.status === 'COMPLETED') {
          Swal.fire({
            title: 'Success!',
            text: `Thank you for Hotel Booking ! Your payment of ${this.hotelBooking.TotalPrice} has been successfully processed, and your Hotel Book has been successfully .`,
            icon: 'success',
            confirmButtonText: 'OK',
            showCloseButton: true // Adds the close button

          });
          this.OnSubmit();
          this.deductRoomAvailability();
          this.makePayment();
          // alert(`Thank you for your purchase! Your payment of ${this.admSubscription.Price} has been successfully processed, and your ${this.admSubscription.Title} plan has been successfully activated.`);

          // add transaction table
          this.transactionDetail.HotelTrsDetailId = parseInt(data.id)
          this.transactionDetail.RegistrationId = this.UId
          this.transactionDetail.TransactionStatus = data.status
          this.transactionDetail.TransactionAmount = this.hotelBooking.TotalPrice
          this.transactionDetail.AdmSubscriptionId = 2
          // this.transactionDetail.AdmSubscriptionId=this.admSubscription.AdmSubscriptionId
          this.transactionDetail.Status = "active"
          this.transactionDetail.TransactionDate = new Date().toISOString();
          console.log("transactionDetail", this.transactionDetail);
          this.service.AddHotelTrsDetail(this.transactionDetail).subscribe((result) => {
            if (result > 0) {
              // alert('Transaction completed.');
              // this.makePayment();
            }
            else {
              Swal.fire({
                title: 'Failed!',
                text: 'Something went wrong! Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
                showCloseButton: true // Adds the close button
              })
              // alert("Something went wrong! Please try again.")
            }
          });


        } else {
          Swal.fire({
            title: 'Failed!',
            text: 'We regret to inform you that your payment could not be processed.',
            icon: 'error',
            confirmButtonText: 'OK',
            showCloseButton: true // Adds the close button
          })
          // alert("We regret to inform you that your payment could not be processed.")
        }

      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }

  ngOnInit(): void {


    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
    this.initConfig();


    this.route.queryParamMap.subscribe(params => {
      this.to = params.get('to') || '';
      this.From = params.get('from') || this.to;
      this.departureDay = params.get('departureDay') || '';
      this.returnDay = params.get('returnDay') || '';
      this.tripType = params.get('tripType') || '';
      this.noOfPersons = params.get('noOfPersons') || '';

      // this.hotelBooking.NoOfPersons = this.noOfPersons;
      this.hotelBooking.CheckIn = this.departureDay || this.today;
      this.hotelBooking.CheckOut = this.returnDay || '';

      this.updateCheckOutMinDate();
      this.calculateTotalDays(); // Ensure the total price is calculated when the page loads

      console.log('Query Parameters:', {
        to: this.to,
        from: this.From,
        departureDay: this.departureDay,
        returnDay: this.returnDay,
        tripType: this.tripType,
        noOfPersons: this.noOfPersons
      });
    });

    this.MyRoomID = +this.route.snapshot.paramMap.get('RoomId')!;
    this.MyRegistrationID = JSON.parse(sessionStorage.getItem('SID')!);

    this.getDetail();
    this.fetchUserProfiles();
    // this.getRoomsImage();


    //===========================================================================

    this.service.GetAllUserRole().subscribe((result) => {
      // console.log(result);
      for (let data of result) {
        this.userRoleList.push(data);
      }
      console.log("userRoleList", this.userRoleList);
      console.log("vender RegistrationId ID", this.myvenderid);
      this.mainUserRoleList = this.userRoleList.filter(x => x.RegistrationId == this.myvenderid && x.RoleId == 3)


      console.log("mainUserRoleList", this.mainUserRoleList);

      for (let i of this.mainUserRoleList) {
        this.URoleId = i.UserRoleId
      }

      console.log("this.URoleId", this.URoleId)

      this.service.GetUserRoleById(this.URoleId).subscribe((result) => {

        this.userRole = result;
        console.log(this.userRole);

      });
    });


    //===============================================================================

  }

  //============================================================

  makePayment() {
    this.purchasePlan.AdmSubscriptionId = this.PlanId;
    this.purchasePlan.RegistrationId = this.UId;
    this.purchasePlan.OfferedFor = "2";
    this.purchasePlan.Status = "Active";

    // Convert PlanPeriod to number if it's a string
    // const planPeriodMonths = Number(this.admSubscription.PlanPeriod);

    // Calculate the next renewal date
    // const currentDate = new Date();
    // const nextRenewalDate = new Date(currentDate);
    // nextRenewalDate.setMonth(currentDate.getMonth() + planPeriodMonths);
    // this.purchasePlan.NextRenewalDate = nextRenewalDate.toISOString();

    //     this.service.AddPurchasePlan(this.purchasePlan).subscribe((result) => {
    //       if (result > 0) {

    //         this.router.navigateByUrl("/Dashboard");

    // //  this.service.GetAllUserRole().subscribe((result) => {
    // //   // console.log(result);
    // //   this.userRolelist = []
    // //   for (let data of result) {
    // //     this.userRolelist.push(data);
    // //   }
    // //   console.log(this.userRolelist, "propLandLordList");
    // //   this.mainUserRolelist = this.userRolelist.filter(x => x.registration.RegistrationId == this.UId && x.RoleId==2)
    // //   if(this.mainUserRolelist.length==1){
    // //     const userRoleId = this.mainUserRolelist[0].UserRoleId;

    // //     this.service.GetUserRoleById(userRoleId).subscribe((result) => {

    // //       this.userRole = result;
    // //       console.log("userRole",this.userRole);
    // //       // this.userRole.PlanStatus="Active"
    // //       this.userRole.Status="Active"
    // //       this.service.UpdateUserRole(this.userRole).subscribe((result) => {
    // //         if (result == 0) {
    // //           alert("Something went wrong! Please try again.");
    // //         } else {
    // //                 Swal.fire({
    // //                 title: 'Success!',
    // //                 text: 'Saved Successfully.',
    // //                 icon: 'success',
    // //                 confirmButtonText: 'OK',
    // //                 showCloseButton: true // Adds the close button
    // //               });   
    // //           // sessionStorage.setItem('TenantId', userRoleId);
    // //           this.router.navigateByUrl("/DashboardVendor");
    // //        }
    // //       });      
    // //     });

    // //   }else{

    // //     this.userRole.RegistrationId=this.UId
    // //     this.userRole.RoleId=2
    // //     // this.userRole.PlanStatus="Active"
    // //     this.userRole.Status="Active"
    // //     this.service.AddUserRole(this.userRole).subscribe((result) => {
    // //       if (result > 0) {
    // //               Swal.fire({
    // //                 title: 'Success!',
    // //                 text: 'Saved Successfully.',
    // //                 icon: 'success',
    // //                 confirmButtonText: 'OK',
    // //                 showCloseButton: true // Adds the close button
    // //               });
    // //         // sessionStorage.setItem('TenantId', result);
    // //         this.router.navigateByUrl("/Dashboard");

    // //       }
    // //       else {
    // //                 Swal.fire({
    // //                icon: 'error',
    // //                 title: 'Oops...',
    // //                 text: 'Something went wrong! Please try again.',

    // //                 confirmButtonText: 'OK',
    // //                 showCloseButton: true // Adds the close button
    // //               });
    // //       }
    // //     });
    // //   }
    // //     });        
    //       } else {
    //                 Swal.fire({
    //                icon: 'error',
    //                 title: 'Oops...',
    //                 text: 'Something went wrong! Please try again.',

    //                 confirmButtonText: 'OK',
    //                 showCloseButton: true // Adds the close button
    //               });;
    //       }
    //     });
  }


  //==========================================================================


  getDetail() {
    this.service.GetRoomsById(this.MyRoomID).subscribe(result => {
      this.RoomsList = result;

      this.calculateDiscountedPrice(this.RoomsList.PricePerNight, this.RoomsList.UpdatedDate);

      this.myvenderid = result.RegistrationId
      this.myRoomsinfo = result
      this.service.GetHotelById(result.hotel.HotelId).subscribe(res => {
        this.RoomDetail = res;
        console.log("HotelDetail", this.RoomDetail);
        this.myvenderid = res.RegistrationId
        this.MyVendorID = this.RoomDetail.VendorId;
        this.calculateTotalDays(); // Ensure price calculation when room details are fetched
      });
    });
  }



  //==========================================================================
  calculateDiscountedPrice(originalPrice, Discount) {
    // Convert the original price to a number (removing $ and any commas)
    const price = parseFloat(originalPrice.replace('$', '').replace(/,/g, ''));
    console.log("price", price);
    console.log("Discount", Discount);

    // Calculate 10% discount
    const discountAmount = price * (Number(Discount) / 100);
    const discountedPrice = price - discountAmount;
    console.log("discountedPrice", discountedPrice);
    console.log("discountAmount", discountAmount);


    // Format the result back to currency

    // this.originalPrice= price.toFixed(2);
    // this.discountPercentage= 10%;
    // this.discountAmount = discountAmount.toFixed(2)
    this.finalPrice = discountedPrice.toFixed(2)

  }
  //=================================================================

  deductRoomAvailability() {
    console.log("my room info is", this.myRoomsinfo);

    // Parse `NoOfRooms` and `AvailableRooms` as integers to ensure proper calculations
    const requiredRooms = parseInt(this.hotelBooking.NoOfRooms || '0', 10);
    const availableRooms = parseInt(this.myRoomsinfo.AvilableRooms || '0', 10);

    // Check if enough rooms are available
    if (availableRooms >= requiredRooms) {
      // Calculate new available rooms and convert to string
      this.myRoomsinfo.AvilableRooms = (availableRooms - requiredRooms).toString();

      // Call service to update room availability in the backend
      this.service.UpdateRooms(this.myRoomsinfo).subscribe(
        (response) => {

          console.log('Room availability updated successfully:', response);
          this.router.navigateByUrl("/mybookings");
        },
        (error) => {
          console.error('Error updating room availability:', error);
        }
      );
    } else {
      alert('Not enough available rooms for this booking.');
    }
  }



  fetchUserProfiles(): void {
    this.service.GetAllUserDetail().subscribe(
      (profiles) => {
        this.userProfiles = profiles;
        this.findMatchingProfiles();
      },
      (error) => {
        console.error('Error fetching user profiles:', error);
      }
    );
  }

  findMatchingProfiles(): void {
    this.matchingProfiles = this.userProfiles.filter(profile => profile.RegistrationId === this.MyRegistrationID);
    if (this.matchingProfiles.length > 0) {
      this.MyUserID = this.matchingProfiles[0].UserDetailsId;
    } else {
      this.MyUserID = null;
    }
  }

  // getDetail() {
  //   this.service.GetRoomsById(this.MyRoomID).subscribe(result => {
  //     this.RoomsList = result;
  //     this.service.GetHotelById(result.hotel.HotelId).subscribe(res => {
  //       this.RoomDetail = res;
  //       this.MyVendorID = this.RoomDetail.VendorId;
  //     });
  //   });
  // }

  updateCheckOutMinDate(): void {
    if (this.hotelBooking.CheckIn) {
      const checkInDate = new Date(this.hotelBooking.CheckIn);
      checkInDate.setDate(checkInDate.getDate() + 1);
      this.minCheckOutDate = checkInDate.toISOString().split('T')[0];
      if (!this.hotelBooking.CheckOut) {
        this.hotelBooking.CheckOut = this.minCheckOutDate;
      }
    } else {
      this.minCheckOutDate = '';
      this.hotelBooking.CheckOut = null;
    }
  }

  calculateTotalDays(): void {
    if (this.hotelBooking.CheckIn && this.hotelBooking.CheckOut) {
      const checkInDate = new Date(this.hotelBooking.CheckIn);
      const checkOutDate = new Date(this.hotelBooking.CheckOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      this.totalDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days

      const pricePerNight = parseFloat(this.finalPrice || '0'); // Safely parse price per night
      const persons = parseInt(this.hotelBooking.NoOfPersons || '0', 10); // Parse number of persons
      const roomCapacity = 3; // Define room capacity, e.g., 3 persons per room

      // Calculate the minimum number of rooms required
      const requiredRooms = Math.ceil(persons / roomCapacity);

      // Set the number of rooms in the booking based on required rooms
      this.hotelBooking.NoOfRooms = requiredRooms.toString();


      // Calculate the total price based on days, price per night, and required rooms
      this.hotelBooking.TotalPrice = (this.totalDays > 0
        ? (this.totalDays * pricePerNight * requiredRooms).toFixed(2) // Fixed to 2 decimal places
        : '0.00');

      console.log("Total Price:", this.hotelBooking.TotalPrice);
      console.log("Number of Rooms Required:", requiredRooms);
    } else {
      this.hotelBooking.TotalPrice = '0.00'; // Reset if dates are not valid
    }
  }

  OnSubmit() {

    // if (this.bookingSummaryModal?.nativeElement) {
    //   this.bookingSummaryModal.nativeElement.focus();
    // } else {
    //   console.warn("Element 'yourElement' is not available in the DOM");
    // }
    if (this.userRole.CreatedBy !== '0') {

      this.hotelBooking.RoomId = this.MyRoomID;
      this.hotelBooking.RegistrationId = this.MyRegistrationID;
      this.hotelBooking.UserId = this.MyUserID;
      this.hotelBooking.VendorId = this.MyVendorID;
      this.hotelBooking.Status = "Active";

      console.log(this.hotelBooking);

      this.service.AddHotelBooking(this.hotelBooking).subscribe(result => {
        if (result > 0) {
          // alert('Saved Successfully.');
          this.deductRoomAvailability();

          //===============================================================================================
          // Ensure CreatedBy is converted to a valid number
          let createdBy = parseInt(this.userRole.CreatedBy, 10); // Parse as a base-10 number

          if (isNaN(createdBy)) {
            console.error("CreatedBy is not a valid numeric string:", this.userRole.CreatedBy);
            createdBy = 0; // Default to 0 if the string is invalid
          }

          // Perform the arithmetic
          this.currentcount = createdBy - 1;
          console.log("currentcount", this.currentcount);

          // Update CreatedBy with the new value, converting it back to a string
          this.userRole.CreatedBy = this.currentcount.toString();
          console.log("this.userRole.CreatedBy", this.userRole.CreatedBy);

          this.service.UpdateUserRole(this.userRole).subscribe((result) => {
            console.log("hhh", result);
            if (result == 0) {
              // alert("Something went wrong! Please try again.");
              Swal.fire({
                title: 'Oops!',
                text: 'Something went wrong! Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
            } else { }
          })

          //================================================================================================

        } else {
          // alert('Something went wrong! Please try again.');
          Swal.fire({
            title: 'Oops!',
            text: 'Something went wrong! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
        }
      });


    }

    else {

      Swal.fire({
        icon: 'error',
        title: 'Limit Reached',
        text: ` You cannot add any more.`,
        confirmButtonText: 'OK'
      });

    }



    //   const modalElement = this.bookingSummaryModal.nativeElement;
    //   const modal = new bootstrap.Modal(modalElement);
    //   modal.show();
  }




  // closeSummaryModal() {
  //   const modalElement = this.bookingSummaryModal.nativeElement;
  //   const modal = new bootstrap.Modal(modalElement);
  //   modal.hide();
  // }

  toggleBookingForm(): void {
    this.isBookingFormVisible = !this.isBookingFormVisible;
  }

  goBack() {
    window.history.back();
  }

  // BookHotel() {
  //   this.router.navigateByUrl("/TravelPayment/" + this.hotelBooking.TotalPrice);
  //   this.OnSubmit(); // Reuse OnSubmit for booking logic
  // }


  // getRoomsImage(): void {
  //   this.service.GetRoomsById(this.MyRoomID).subscribe(data => {
  //       this.RoomImageList = data; // Assign data to RoomImageList
  //       console.log("RoomImageList Data is:", data);

  //       // No need to filter since you're directly assigning data to images
  //       this.images = this.RoomImageList;
  //       console.log("Filtered RoomImageList:", this.images);

  //       // Extract and flatten image arrays from each room
  //       // this.allRoomImages = this.images.flatMap(room => {
  //       //     if (room.Image) {
  //       //         const imageFileNames = room.Image.split(',').slice(1).map(fileName => fileName.trim());
  //       //         console.log("Image filenames for room:", imageFileNames);
  //       //         return imageFileNames;
  //       //     }
  //       //     return [];
  //       // });

  //       this.imageUrls = data.Image.split(',').slice(1).map(image => image.trim());
  //       console.log("Extracted image URLs:", this.imageUrls);

  //   });
  // }


}
