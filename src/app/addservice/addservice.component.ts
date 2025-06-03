import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService, AdmVendor, ServiceTable, AdmDestinations } from '../Class';
import { WebService } from '../Service';
@Component({
  selector: 'app-addservice',
  templateUrl: './addservice.component.html',
  styleUrls: ['./addservice.component.scss']
})
export class AddserviceComponent {
  @ViewChild('VendorServiceForm') form: NgForm;
  AdmDestinationslist: any[] = [];

  vendorService = new VendorService();
  admVendor = new AdmVendor();
  serviceTable = new ServiceTable();
  admDestinations = new AdmDestinations();

  constructor(private router: Router,
              private http: HttpClient,
              private service: WebService) {
    this.vendorService = new VendorService();
    this.vendorService.admVendor = new AdmVendor();
    this.vendorService.serviceTable = new ServiceTable();
    this.vendorService.admDestinations = new AdmDestinations();
  }

  OnSubmit() {
    console.log("vendorService", this.vendorService);
    this.service.AddVendorService(this.vendorService).subscribe((result) => {
      if (result > 0) {
        alert('Saved Successfully.');
      } else {
        alert('Something went wrong! Please try again.');
      }
    });
    this.form.resetForm();
  }

  ngOnInit(): void {
    this.GetAllAdmDestinations();
  }

  GetAllAdmDestinations() {
    this.service.GetAllAdmDestinations().subscribe((data: any[]) => {
      this.AdmDestinationslist = data;
    }, error => {
      console.error('Error fetching AdmDestinations:', error);
    });
  }
}