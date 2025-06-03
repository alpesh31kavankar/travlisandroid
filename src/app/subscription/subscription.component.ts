import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SubscriptionComponent implements OnInit {

  admSubscriptionList: any[] = [];
  purchasedPlans: any[] = [];
  UId: any;
  imgPath: string = GlobalVariable.BASE_API_URL;

  constructor(
    private router: Router,
    private http: HttpClient,
    private service: WebService
  ) {}

  ngOnInit(): void {
    this.UId = JSON.parse(sessionStorage.getItem('SID'));

    // Fetch purchased plans first, then load subscription list
    this.fetchPurchasedPlans().then(() => {
      this.loadSubscriptionList();
    });



    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }
  }

  // Load all subscription plans and set 'isPurchased' status
  private loadSubscriptionList(): void {
    this.service.GetAllAdmSubscription().subscribe((subscriptions) => {
      this.admSubscriptionList = subscriptions.map((subscription) => {
        subscription.isPurchased = this.isPlanPurchased(subscription.AdmSubscriptionId);
        return subscription;
      });
      console.log(this.admSubscriptionList, "admSubscriptionList");
    });
  }

  // Fetch purchased plans and return a promise
  private fetchPurchasedPlans(): Promise<void> {
    return new Promise((resolve) => {
      this.service.GetAllPurchasePlan().subscribe((plans) => {
        this.purchasedPlans = plans;
        console.log(this.purchasedPlans, "purchasedPlans");
        resolve();
      });
    });
  }

  // Check if a plan is already purchased for this user
  private isPlanPurchased(subscriptionId: number): boolean {
    return this.purchasedPlans.some(
      (plan) => plan.admSubscription?.AdmSubscriptionId === subscriptionId && plan.RegistrationId === this.UId
    );
  }

  // Handle the "Buy Now" button click
  onClick(subscriptionId: number): void {
    if (!this.isPlanPurchased(subscriptionId)) {
      this.router.navigateByUrl("/CheckoutPlan/" + subscriptionId);
    }
  }
}
