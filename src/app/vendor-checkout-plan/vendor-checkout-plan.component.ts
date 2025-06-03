import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import Swal from 'sweetalert2';
import { AdmVendorSubscription, VendorPurchasePlan, VendorTransactionDetail, UserRole } from '../Class';
import { WebService } from '../Service';

@Component({
  selector: 'app-vendor-checkout-plan',
  templateUrl: './vendor-checkout-plan.component.html',
  styleUrls: ['./vendor-checkout-plan.component.scss']
})
export class VendorCheckoutPlanComponent {

  UId: any
  PlanId: any
  admVendorSubscription: AdmVendorSubscription
  vendorPurchasePlan: VendorPurchasePlan
  vendorTransactionDetail:VendorTransactionDetail

  userRolelist: any[] = []
  mainUserRolelist: any[] = []

  userRole:UserRole
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;


  constructor(private router: Router,
    private http: HttpClient,
    private service: WebService, private route: ActivatedRoute) {
      this.vendorPurchasePlan = new VendorPurchasePlan()
      this.vendorTransactionDetail=new VendorTransactionDetail()
      this.userRole = new UserRole()
      this.route.params.subscribe((params) => {
        this.UId = JSON.parse(sessionStorage.getItem('SID'));
        console.log("in  this.PlanId", this.UId)
        this.PlanId = params['AdmVendorSubscriptionId'];
        console.log("in  this.PlanId", this.PlanId)
  
        this.service.GetAdmVendorSubscriptionById(this.PlanId).subscribe((result) => {
  
          this.admVendorSubscription = result;
          console.log("admVendorSubscription", this.admVendorSubscription);
  
        });
  
      });
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
                value: this.admVendorSubscription.Price,
                breakdown: {
                  item_total: {
                    currency_code: 'CAD',
                    value:this.admVendorSubscription.Price
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
                    value: this.admVendorSubscription.Price,
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
              text: `Thank you for your purchase! Your payment of ${this.admVendorSubscription.Price} has been successfully processed, and your ${this.admVendorSubscription.Title} plan has been successfully activated.`,
               icon: 'success',
              confirmButtonText: 'OK',
              showCloseButton: true // Adds the close button
        
            });
  
  
          // this.makePayment();
            // alert(`Thank you for your purchase! Your payment of ${this.admSubscription.Price} has been successfully processed, and your ${this.admSubscription.Title} plan has been successfully activated.`);
  
            // add transaction table
        this.vendorTransactionDetail.TransactionId=data.id
        this.vendorTransactionDetail.RegistrationId=this.UId
        this.vendorTransactionDetail.TransactionStatus=data.status
        this.vendorTransactionDetail.TransactionAmount=this.admVendorSubscription.Price
        this.vendorTransactionDetail.AdmVendorSubscriptionId=this.admVendorSubscription.AdmVendorSubscriptionId
        this.vendorTransactionDetail.Status="active"
        this.vendorTransactionDetail.TransactionDate=new Date().toISOString();
        console.log("transactionDetail", this.vendorTransactionDetail);
        this.service.AddVendorTransactionDetail(this.vendorTransactionDetail).subscribe((result) => {
          if (result > 0) {
            // alert('Transaction completed.');
            this.makePayment();
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
      this.initConfig();
    }
  
  
  
  
    makePayment() {
      this.vendorPurchasePlan.AdmVendorSubscriptionId = this.PlanId;
      this.vendorPurchasePlan.RegistrationId = this.UId;
      this.vendorPurchasePlan.OfferedFor = this.admVendorSubscription.PlanPeriod;
      this.vendorPurchasePlan.Status = "Active";
   
    // Convert PlanPeriod to number if it's a string
    const planPeriodMonths = Number(this.admVendorSubscription.PlanPeriod);
  
    // Calculate the next renewal date
    const currentDate = new Date();
    const nextRenewalDate = new Date(currentDate);
    nextRenewalDate.setMonth(currentDate.getMonth() + planPeriodMonths);
    this.vendorPurchasePlan.NextRenewalDate = nextRenewalDate.toISOString();
    
      this.service.AddVendorPurchasePlan(this.vendorPurchasePlan).subscribe((result) => {
        if (result > 0) {
  
          // this.router.navigateByUrl("/DashboardVendor");
  
   this.service.GetAllUserRole().subscribe((result) => {
    // console.log(result);
    this.userRolelist = []
    for (let data of result) {
      this.userRolelist.push(data);
    }
    console.log(this.userRolelist, "propLandLordList");
    this.mainUserRolelist = this.userRolelist.filter(x => x.RegistrationId == this.UId && x.RoleId==3)
    if(this.mainUserRolelist.length==1){
      const userRoleId = this.mainUserRolelist[0].UserRoleId;
  
      this.service.GetUserRoleById(userRoleId).subscribe((result) => {
  
        this.userRole = result;
        console.log("userRole",this.userRole);
        // this.userRole.PlanStatus="Active"
        //==============================================================
        this.userRole.CreatedBy=this.admVendorSubscription.CreatedBy
        //===========================================================
        
        this.userRole.Status="Active"
        this.service.UpdateUserRole(this.userRole).subscribe((result) => {
          if (result == 0) {
            alert("Something went wrong! Please try again.");
          } else {
                  Swal.fire({
                  title: 'Success!',
                  text: 'Saved Successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  showCloseButton: true // Adds the close button
                });   
            // sessionStorage.setItem('TenantId', userRoleId);
            this.router.navigateByUrl("/VendorDashboard");
         }
        });      
      });
  
    }else{
  
      this.userRole.RegistrationId=this.UId
      this.userRole.RoleId=3
      this.userRole.CreatedBy=this.admVendorSubscription.CreatedBy
      // this.userRole.PlanStatus="Active"
      this.userRole.Status="Active"
      this.service.AddUserRole(this.userRole).subscribe((result) => {
        if (result > 0) {
                Swal.fire({
                  title: 'Success!',
                  text: 'Saved Successfully.',
                  icon: 'success',
                  confirmButtonText: 'OK',
                  showCloseButton: true // Adds the close button
                });
          // sessionStorage.setItem('TenantId', result);
          this.router.navigateByUrl("/VendorDashboard");
        
        }
        else {
                  Swal.fire({
                 icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong! Please try again.',
  
                  confirmButtonText: 'OK',
                  showCloseButton: true // Adds the close button
                });
        }
      });
    }
      });        
        } else {
                  Swal.fire({
                 icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong! Please try again.',
  
                  confirmButtonText: 'OK',
                  showCloseButton: true // Adds the close button
                });;
        }
      });
    }

  
  
  }
  