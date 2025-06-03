import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Activities, ServiceMaster, AdmVendor, Registration, AdmSubscription, ActivityBooking, HotelTrsDetail, PurchasePlan, Rooms, UserDetail, ActivityTrsDetail, UserRole } from '../Class';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent {

 myvenderid:any
  userRole: UserRole;
  userRoleList: any[] = []
  mainUserRoleList: any[] = []
  URoleId: any
  currentcount: any



  id
  acitivities = new Activities(); // Corrected class name
  serviceMasterList: ServiceMaster[] = [];
  admVendorList: AdmVendor[] = [];
  filesToUpload: Array<File> = [];
  imgPath: string = GlobalVariable.BASE_API_URL;




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

  // fixedPricePerPerson: number = 100; 
// this.yourElement?.nativeElement?.focus();

PlanId: any
admSubscription: AdmSubscription
purchasePlan: PurchasePlan
transactionDetail:ActivityTrsDetail

userRolelist: any[] = []
mainUserRolelist: any[] = []
myRoomsinfo:Rooms
// userRole:UserRole
public payPalConfig?: IPayPalConfig;
showSuccess: boolean | undefined;




departureDay: string = '';
returnDay: string = '';
tripType: string = '';
noOfPersons: string = '';
From: string = "";
to: string = "";

isModalVisible = false;
today: string = new Date().toISOString().split('T')[0];
minCheckOutDate: string = '';
activityBooking: ActivityBooking = new ActivityBooking();
RoomsList: Rooms;
RoomDetail: any;
MyRoomID: number;
MyRegistrationID: number;

MyVendorID;
isBookingFormVisible: boolean = false;
totalDays;
userProfiles: UserDetail[] = [];
matchingProfiles: UserDetail[] = [];
MyUserID: number | null = null;





  // constructor(private router: Router,private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
  //   this.acitivities.serviceMaster = new ServiceMaster();
  //   this.acitivities.admVendor = new AdmVendor();
    
  //   this.registration = new Registration();
  //   this.route.params.subscribe((params) => {
  //     this.UId = JSON.parse(sessionStorage.getItem('SID'));
  //     console.log("UId", this.UId);
  //   });
  //   this.service.GetRegistrationById(this.UId).subscribe((result) => {
  //     this.registration = result;
  //     console.log("Registration", this.registration);
  //   })

  // }

  
  // ngOnInit(): void {

  //   this.id = +this.route.snapshot.paramMap.get('AcitivityId')!;
  //   console.log("id is", this.id);

  //   // this.getServiceMasterList();
  //   // this.getAdmVendorList();
  //  this. getDetail()

  // //  this.getCities();
  // //  this.FindAdmvendorID();
  // }

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
    this.RoomsList=new Rooms();
    this.myRoomsinfo=new Rooms();

    this.acitivities.serviceMaster = new ServiceMaster();


    //===================================================================
      this.acitivities.admVendor = new AdmVendor();
      
      this.registration = new Registration();
      this.route.params.subscribe((params) => {
        this.UId = JSON.parse(sessionStorage.getItem('SID'));
        console.log("UId", this.UId);
      });
      this.service.GetRegistrationById(this.UId).subscribe((result) => {
        this.registration = result;
        console.log("Registration", this.registration);
      })



//=======================new Rooms();=================================

$(function() {
  $('[data-toggle="offcanvas"]').on("click", function() {
    $('.sidebar-offcanvas').toggleClass('active');
  });
});
this.purchasePlan = new PurchasePlan()
this.transactionDetail=new ActivityTrsDetail()
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
              value: this.activityBooking.TotalPrice,
              breakdown: {
                item_total: {
                  currency_code: 'CAD',
                  value:this.activityBooking.TotalPrice
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
                  value: this.activityBooking.TotalPrice,
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
            text: `Thank you for Acitivity Booking ! Your payment of ${this.activityBooking.TotalPrice} has been successfully processed, and your Hotel Book has been successfully .`,
             icon: 'success',
            confirmButtonText: 'OK',
            showCloseButton: true // Adds the close button
      
          });

      this.OnSubmit()
          this.makePayment();
          // alert(`Thank you for your purchase! Your payment of ${this.admSubscription.Price} has been successfully processed, and your ${this.admSubscription.Title} plan has been successfully activated.`);

          // add transaction table
      this.transactionDetail.ActivityTrsDetailId=  parseInt(data.id)
      this.transactionDetail.RegistrationId=this.MyRegistrationID
      this.transactionDetail.TransactionStatus=data.status
      this.transactionDetail.TransactionAmount= this.activityBooking.TotalPrice
      this.transactionDetail.AdmSubscriptionId=2
      // this.transactionDetail.AdmSubscriptionId=this.admSubscription.AdmSubscriptionId
      this.transactionDetail.Status="active"
      this.transactionDetail.TransactionDate=new Date().toISOString();
      console.log("transactionDetail", this.transactionDetail);
      this.service.AddActivityTrsDetail(this.transactionDetail).subscribe((result) => {
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


  //====================================================================================
  ngOnInit(): void {

  this.id = +this.route.snapshot.paramMap.get('AcitivityId')!;
    console.log("id is", this.id);

    // this.getServiceMasterList();
    // this.getAdmVendorList();
   this. getDetail1()

  //  this.getCities();
  //  this.FindAdmvendorID();





    $(function() {
      $('[data-toggle="offcanvas"]').on("click", function() {
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
    
      this.activityBooking.NoOfPersons = this.noOfPersons;
      this.activityBooking.City = this.departureDay || this.today;
     
    
      // this.updateCheckOutMinDate();
      // this.calculateTotalDays(); // Ensure the total price is calculated when the page loads
      
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
  
    this.getDetail1();
    this.fetchUserProfiles();

    //===========================================================================

    this.service.GetAllUserRole().subscribe((result) => {
      // console.log(result);
      for (let data of result) {
        this.userRoleList.push(data);
      }
      console.log("userRoleList", this.userRoleList);
      console.log("vender RegistrationId ID", this.myvenderid);
      this.mainUserRoleList = this.userRoleList.filter(x => x.RegistrationId ==  this.myvenderid  && x.RoleId == 3)
     
      
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
  

  getDetail1(){
    this.service.GetActivitiesById(this.id).subscribe(result => {
      console.log("acitivities by id ",result);
      this.acitivities=result;
      this.myvenderid=result.admVendor.AdmVendorId
console.log("my id ",this.myvenderid);

      // this.searchTerm=this.acitivities.City
    
    });
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


  // getDetail() {
  //   this.service.GetRoomsById(this.MyRoomID).subscribe(result => {
  //     this.RoomsList = result;
  //     this.myRoomsinfo=result
  //     this.service.GetHotelById(result.hotel.HotelId).subscribe(res => {
  //       this.RoomDetail = res;
  //       this.MyVendorID = this.RoomDetail.VendorId;
  //       this.calculateTotalDays(); // Ensure price calculation when room details are fetched
  //     });
  //   });
  // }



 
  


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


  // calculateTotalDays(): void {
    
  //     const checkInDate = new Date(this.activityBooking.City);
   
  //     const timeDiff = checkInDate.getTime();
  //     this.totalDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
  
  //     // const pricePerNight = parseFloat(this.RoomsList?.PricePerNight || '0'); // Safely parse price per night
  //     const persons = parseInt(this.activityBooking.NoOfPersons || '0'); // Parse number of persons
    
  
  //     // Calculate the minimum number of rooms required
  //     // const requiredRooms = Math.ceil(persons / roomCapacity);
  
  //     // Set the number of rooms in the booking based on required rooms
  //     // this.activityBooking.NoOfRooms = requiredRooms.toString();
  
  //     // Calculate the total price based on days, price per night, and required rooms
  //     this.activityBooking.TotalPrice = (this.totalDays > 0 
  //       ? (this.totalDays * persons *2 ).toFixed(2) // Fixed to 2 decimal places
  //       : '0.00');
  
  //     console.log("Total Price:", this.activityBooking.TotalPrice);

    
  // }
  
  updateTotalPrice() {
    this.activityBooking.TotalPrice = (Number(this.acitivities.Amount) * Number(this.activityBooking.NoOfPersons)).toString();

  }
  OnSubmit() {

    if (this.userRole.CreatedBy !== '0') {


      this.updateTotalPrice();
   
      this.activityBooking.ActivitiesId = this.id;
      this.activityBooking.Name = this.acitivities.Name;
      this.activityBooking.RegistrationId = this.MyRegistrationID;
      this.activityBooking.Amount = "0";
     
      this.activityBooking.Status = "Active";
  
      console.log(this.activityBooking);
  
      this.service.AddActivityBooking(this.activityBooking).subscribe(result => {
        if (result > 0) {
          // alert('Saved Successfully.');

           
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
    else{

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



}
