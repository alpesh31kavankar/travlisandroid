import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../Class';
import { WebService } from '../Service';

@Component({
  selector: 'app-updateservices',
  templateUrl: './updateservices.component.html',
  styleUrls: ['./updateservices.component.scss']
})
export class UpdateservicesComponent {
  VendorServiceId: any;
  vendorService: VendorService;
  

  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient,
    private service: WebService) {
    this.vendorService = new VendorService();
    this.route.params.subscribe((params) => {
      this.VendorServiceId = params['VendorServiceId'];
  
      this.service.GetVendorServiceById(this.VendorServiceId).subscribe((result) => {
        this.vendorService = result;
        console.log("VendorService", this.vendorService);
      });
    });
  }
  
  OnSubmit() {
    console.log(this.vendorService);
    this.service.UpdateVendorService(this.vendorService).subscribe((result) => {
      console.log(result);
      if (result == 0) {
        alert("Something went wrong! Please try again.");
      } else {
        alert('Saved Successfully.');
      }
    });
  }

  ngOnInit(): void {
    
  }
}

