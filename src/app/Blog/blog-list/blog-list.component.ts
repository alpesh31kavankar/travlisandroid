import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdmVendor, Blog } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent {
  BlogList: Blog[] = [];
  admVendorList: AdmVendor[] = [];

  data1;
  UId: any
  VID;
  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor( private route: ActivatedRoute,private router: Router, private http: HttpClient, private service: WebService) {
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
        this.VID=this.data1.AdmVendorId
        console.log( "Vendor ID is " ,this.VID);
        
      } else {
        console.log("Vendor not found with the given RegistrationId");
      }
    });


  }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs(): void {

   
    // this.BlogListCount = this.BlogList.length;

    this.service.GetAllBlog().subscribe(data => {
      this.BlogList = data.filter(blog => blog.admVendor.AdmVendorId ==  this.UId);
      // this.BlogList = data;
      console.log("Blog Data is ", this.BlogList);
      
    });
  }

  Edit(BlogId: number): void {
    this.router.navigate(['/UpdateBlog/', BlogId]);
  }

  View(BlogId: number): void {
      this.router.navigate(['/view-adm-country-master', BlogId]);
  }

  Delete(BlogId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // If the user confirms, proceed with the deletion
        this.service.DeleteBlog(BlogId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'Your blog has been deleted.',
              'success'
            );
            this.getBlogs(); // Refresh the list after deletion
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the blog.',
              'error'
            );
          }
        );
      }
    });
  }
  
  

}