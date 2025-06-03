
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';
import { TravelBooking, Travel, Vehicle, UserDetail, TravelTrsDetail, UserRole, PurchasePlan } from '../Class';
import { WebService } from '../Service';
import { GlobalVariable } from '../Global';
import Swal from 'sweetalert2';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.scss']
})
export class TravelDetailComponent {
  @ViewChild('bookingSummaryModal') bookingSummaryModal!: ElementRef;
  


   myvenderid:any
    userRole: UserRole;
    userRoleList: any[] = []
    mainUserRoleList: any[] = []
    URoleId: any
    currentcount: any


    
  TravelBooking: TravelBooking 
  TravelList: Travel;
  VehicleDetail: Vehicle;
  MyTravelId: number;
  MyRegistrationID: number;
  imgPath: string = GlobalVariable.BASE_API_URL;
  isBookingFormVisible = false;
  MyVendorID: number;
  MyUserID: number | null = null;
  userProfiles: UserDetail[] = [];
  transactionDetail:TravelTrsDetail
  purchasePlan: PurchasePlan
  // Add properties for today's date and minimum check-out date
  today: string = new Date().toISOString().split('T')[0]; // Today's date
  minCheckOutDate: string = this.today; // Minimum check-out date
  
  amenitiesList: string[] = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;

  ttrsId:any



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: WebService
  ) {
this.transactionDetail=new TravelTrsDetail()

this.TravelBooking=new TravelBooking()
 
  }


  isPaypalButtonDisabled(): boolean {
    const noOfSeats = parseInt(this.TravelBooking.NoOfSets, 10);
    const availableSeats = parseInt(this.TravelList.UpdatedBy, 10);
    return isNaN(noOfSeats) || isNaN(availableSeats) || noOfSeats > availableSeats;
  }


  ngOnInit() {
    this.MyTravelId = +this.route.snapshot.paramMap.get('TravelId')!;
    this.MyRegistrationID = JSON.parse(sessionStorage.getItem('SID')!);
    this.getDetail();
    this.fetchUserProfiles();
    this.initConfig();

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
              value: this.TravelBooking.TotalPrice,
              breakdown: {
                item_total: {
                  currency_code: 'CAD',
                  value:this.TravelBooking.TotalPrice
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
                  value: this.TravelBooking.TotalPrice,
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
          // Swal.fire({
          //   title: 'Success!',
          //   text: 'Your ticket has been booked successfully!',
          //                icon: 'success',
          //   confirmButtonText: 'OK',
          //   showCloseButton: true // Adds the close button
      
          // });

          Swal.fire({
                      title: 'Success!',
                      text: `Thank you for Acitivity Booking ! Your payment of ${this.TravelBooking.TotalPrice} has been successfully processed, and your Hotel Book has been successfully .`,
                       icon: 'success',
                      confirmButtonText: 'OK',
                      showCloseButton: true // Adds the close button
                
                    });
          

         this. BookTravel()
this.ttrsId= parseInt(data.id)

console.log("this.ttrsId",this.ttrsId)
        // this.makePayment();
          // alert(`Thank you for your purchase! Your payment of ${this.admSubscription.Price} has been successfully processed, and your ${this.admSubscription.Title} plan has been successfully activated.`);

          // add transaction table
      this.transactionDetail.TravelBookTrsId= this.ttrsId
      this.transactionDetail.RegistrationId=this.MyRegistrationID
      this.transactionDetail.TransactionStatus=data.status
      this.transactionDetail.TransactionAmount= this.TravelBooking.TotalPrice
      this.transactionDetail.AdmSubscriptionId=2
      // this.transactionDetail.AdmSubscriptionId=this.admSubscription.AdmSubscriptionId
      this.transactionDetail.Status="active"
      this.transactionDetail.TransactionDate=new Date().toISOString();
      console.log("transactionDetail", this.transactionDetail);
      this.service.AddTravelTrsDetail(this.transactionDetail).subscribe((result) => {
        if (result > 0) {
          // alert('Transaction completed.');
          // this.makePayment();

          // this.TravelBooking.TravelDate=this.TravelList.Departure
          // this.TravelBooking.TravelId = this.MyTravelId;
          // this.TravelBooking.RegistrationId = this.MyRegistrationID;
          // this.TravelBooking.UserId = this.MyUserID;
          // this.TravelBooking.VendorId = this.MyVendorID;
          // this.TravelBooking.Status = "Active";
        
          // this.service.AddTravelBooking(this.TravelBooking).subscribe(result => {
          //   if (result > 0) {
          //     Swal.fire({
          //       title: 'Success!',
          //       text: 'Your booking has been saved successfully.',
          //       icon: 'success',
          //       confirmButtonText: 'OK'
          //     });
          //   } else {
          //     Swal.fire({
          //       title: 'Error!',
          //       text: 'Something went wrong! Please try again.',
          //       icon: 'error',
          //       confirmButtonText: 'OK'
          //     });
          //   }
          // });
        
//=*********************************************************************************************************
          // this.TravelBooking.TravelDate=this.TravelList.Departure
          // this.TravelBooking.TravelId = this.MyTravelId;
          // this.TravelBooking.RegistrationId = this.MyRegistrationID;
          // this.TravelBooking.UserId = this.MyUserID;
          // this.TravelBooking.VendorId = this.MyVendorID;
          // this.TravelBooking.Status = "Active";


          // if (this.userRole.CreatedBy !== '0') {


          //   this.service.AddTravelBooking(this.TravelBooking).subscribe(result => {
          //     if (result > 0) {
            

          //        //===============================================================================================
          //               // Ensure CreatedBy is converted to a valid number
          //               let createdBy = parseInt(this.userRole.CreatedBy, 10); // Parse as a base-10 number
            
          //               if (isNaN(createdBy)) {
          //                 console.error("CreatedBy is not a valid numeric string:", this.userRole.CreatedBy);
          //                 createdBy = 0; // Default to 0 if the string is invalid
          //               }
                    
          //               // Perform the arithmetic
          //               this.currentcount = createdBy - 1;
          //               console.log("currentcount", this.currentcount);
                    
          //               // Update CreatedBy with the new value, converting it back to a string
          //               this.userRole.CreatedBy = this.currentcount.toString();
          //               console.log("this.userRole.CreatedBy", this.userRole.CreatedBy);
                    
          //               this.service.UpdateUserRole(this.userRole).subscribe((result) => {
          //                 console.log("hhh", result);
          //                 if (result == 0) {
          //                   // alert("Something went wrong! Please try again.");
          //                   Swal.fire({
          //                     title: 'Oops!',
          //                     text: 'Something went wrong! Please try again.',
          //                     icon: 'error',
          //                     confirmButtonText: 'OK',
          //                   });
          //                 } else { }
          //               })
                  
          //         //================================================================================================
  
          //       const updatedBy = parseInt(this.TravelList.UpdatedBy, 10);
          //       const noOfSets = parseInt(this.TravelBooking.NoOfSets, 10);
                
          //       // Perform the subtraction safely if both are valid numbers
          //       if (!isNaN(updatedBy) && !isNaN(noOfSets)) {
          //         this.TravelList.UpdatedBy = (updatedBy - noOfSets).toString();
          //       } else {
          //         // console.error("Invalid number format for UpdatedBy or NoOfSets");
          //       }
                            
          //                   this.service.UpdateTravel(this.TravelList).subscribe((result) => {
          //                     console.log("hhh",result);
          //                     if (result == 0) {
          //                       alert("Something went wrong! Please try again.");
          //                     } else {
          //                       this.router.navigateByUrl("/mybookings");
          //                    }
                           
                              
          //                   });
  
                
                
          //     } else {
          //       Swal.fire({
          //         title: 'Error!',
          //         text: 'Something went wrong! Please try again.',
          //         icon: 'error',
          //         confirmButtonText: 'OK'
          //       });
          //     }
          //   });

          // }
          // else{
            
          //   Swal.fire({
          //     icon: 'error',
          //     title: 'Limit Reached',
          //     text: ` You cannot add any more.`,
          //     confirmButtonText: 'OK'
          //   });


          // }

        
    //********************************************************************************************************* */   


          //available seats deduct

          // this.service.GetTravelById(this.MyTravelId).subscribe(travel => {
          //   this.TravelList = travel;
         // Ensure these values are parsed as integers before subtraction


          // });



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


 

  fetchUserProfiles(): void {
    this.service.GetAllUserDetail().subscribe(profiles => {
      this.userProfiles = profiles;
      this.findMatchingProfiles();
    });
  }

  findMatchingProfiles(): void {
    this.MyUserID = this.userProfiles.find(p => p.RegistrationId === this.MyRegistrationID)?.UserDetailsId || null;
  }

  getDetail(): void {
    this.service.GetTravelById(this.MyTravelId).subscribe(travel => {
      this.TravelList = travel;
      console.log("All Vechical Detail",travel.VendorId );
      this.myvenderid=travel.VendorId
      this.service.GetVehicleById(travel.vehicle.VehicleId).subscribe(vehicle => {
        this.VehicleDetail = vehicle;
        this.MyVendorID = vehicle.VendorId;
      
        
        const amenities = this.VehicleDetail.Amenities;
        console.log(amenities);
        
        // Split the amenities, trim whitespace, and remove the last item
        this.amenitiesList = amenities.split(',').map(item => item.trim());
        
        // Remove the last item from the list
        this.amenitiesList.pop(); 
        
        console.log("list", this.amenitiesList);
      });
    });
  }

  calculateTotalPrice(): void {
    const pricePerSeat = parseFloat(this.TravelList?.Price || '0');
    const noOfSeats = parseInt(this.TravelBooking.NoOfSets || '0', 10);
    const totalPrice = pricePerSeat * noOfSeats;
    this.TravelBooking.TotalPrice = totalPrice.toFixed(2);
    console.log('Total Price:', this.TravelBooking.TotalPrice);
  }

  OnSubmit(): void {

    if (this.userRole.CreatedBy !== '0') {

      this.TravelBooking.TravelId = this.MyTravelId;
      this.TravelBooking.RegistrationId = this.MyRegistrationID;
      this.TravelBooking.UserId = this.MyUserID;
      this.TravelBooking.VendorId = this.MyVendorID;
      this.TravelBooking.Status = "Active";
    
      this.service.AddTravelBooking(this.TravelBooking).subscribe(result => {
        if (result > 0) {
          // Swal.fire({
          //   title: 'Success!',
          //   text: 'Your booking has been saved successfully.',
          //   icon: 'success',
          //   confirmButtonText: 'OK'
          // });

           
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    
      const modal = new bootstrap.Modal(this.bookingSummaryModal.nativeElement);
      modal.show();



    }
    else{

        Swal.fire({
                      icon: 'error',
                      title: 'Limit Reached',
                      text: ` You cannot add any more.`,
                      confirmButtonText: 'OK'
                    });

    }



    
  }
  
  toggleBookingForm(): void {
    this.isBookingFormVisible = !this.isBookingFormVisible;
  }

  goBack() {
    window.history.back();

  }

  BookTravel(){

    if (this.userRole.CreatedBy !== '0') {


      // this.router.navigateByUrl("/TravelPayment/" + this.TravelBooking.TotalPrice);

      this.TravelBooking.TravelDate=this.TravelList.Departure
      this.TravelBooking.TravelId = this.MyTravelId;
      this.TravelBooking.RegistrationId = this.MyRegistrationID;
      this.TravelBooking.UserId = this.MyUserID;
      this.TravelBooking.VendorId = this.MyVendorID;
      this.TravelBooking.Status = "Active";
    
      this.service.AddTravelBooking(this.TravelBooking).subscribe(result => {
        if (result > 0) {
          // Swal.fire({
          //   title: 'Success!',
          //   text: 'Your booking has been saved successfully.',
          //   icon: 'success',
          //   confirmButtonText: 'OK'
          // });
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
          Swal.fire({
            title: 'Error!',
            text: 'Something went wrong! Please try again.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      });
    
      const modal = new bootstrap.Modal(this.bookingSummaryModal.nativeElement);
      modal.show();

    }
    else{

        Swal.fire({
                  icon: 'error',
                  title: 'Limit Reached',
                  text: ` You cannot add any more.`,
                  confirmButtonText: 'OK'
                });
    }
    


   

    

    
  }


  // makePayment() {
  //   this.purchasePlan.AdmSubscriptionId = this.PlanId;
  //   this.purchasePlan.RegistrationId = this.UId;
  //   this.purchasePlan.OfferedFor = "2";
  //   this.purchasePlan.Status = "Active";
  
  // }
  


}
