import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';

@Component({
  selector: 'app-allservices',
  templateUrl: './allservices.component.html',
  styleUrls: ['./allservices.component.scss']
})
export class AllservicesComponent {
  AllServicesList: any[] = [];
  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor(private router: Router, private http: HttpClient, private service: WebService) { }
  
  Delete(VendorServiceId) {
    alert('Are you sure you want to delete?');
    this.service.DeleteVendorService(VendorServiceId).subscribe(result => {
      if (result == "Success") {
        this.AllServicesList = this.AllServicesList.filter(
          (item) => item.Id != VendorServiceId);
        alert("Deleted Successfully");
      } else {
        alert("Somthing went wrong! please try again.");
      }
    });
  }

  Edit(VendorServiceId): void {
    try {
      this.router.navigateByUrl("/UpdateServices/" + VendorServiceId);
    } catch (error) {
      alert("certi-" + error);
    } 
  }

  View(VendorServiceId): void {
    try {
      this.router.navigateByUrl("/ViewBlog/" + VendorServiceId, { skipLocationChange: true });
    } catch (error) {
      alert("certi-" + error);
    } 
  }

  ngOnInit(): void {
    this.service.GetAllVendorService().subscribe((result) => {
      console.log(result);
      for (let data of result) {
        this.AllServicesList.push(data);   
      }     
      console.log(this.AllServicesList);
    });
  }

}