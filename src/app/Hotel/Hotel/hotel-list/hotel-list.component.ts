import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss']
})
export class HotelListComponent {
  HotelList: Hotel[] = [];
  

  data1;
  VID;
  UId;
  imgPath: string = GlobalVariable.BASE_API_URL;
  constructor(  private route: ActivatedRoute,
    private router: Router, 
    private http: HttpClient, 
    private service: WebService) {
      this.route.params.subscribe((params) => {
        this.UId = JSON.parse(sessionStorage.getItem('SID'));
        console.log("UId", this.UId);
      });
    
    }



  ngOnInit(): void {
    this.getHotels();


    
  }

  getHotels(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllHotel().subscribe((data: any[]) => {
      this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
  
      console.log("Filtered Hotel List Data:", this.HotelList);
   
    });
  }

  Edit(HotelId: number): void {
    this.router.navigate(['/UpdateHotel/', HotelId]);
  }

  View(HotelId: number): void {
      this.router.navigate(['/view-adm-country-master', HotelId]);
  }

  Delete(HotelId: number): void {
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
        this.service.DeleteHotel(HotelId).subscribe(
          () => {
            Swal.fire(
              'Deleted!',
              'The hotel has been deleted.',
              'success'
            );
            this.getHotels(); // Refresh the hotel list after deletion
          },
          (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting the hotel.',
              'error'
            );
          }
        );
      }
    });
  }
  

}
