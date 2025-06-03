import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';

@Component({
  selector: 'app-surch',
  templateUrl: './surch.component.html',
  styleUrls: ['./surch.component.scss']
})
export class SurchComponent {
  From:String="Halifax";
  To:string="Ottawa";

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {

   
  
    }

  //==========================================================================
  flights = [
    { airline: 'Indigo', departure: '06:00', arrival: '07:00', price: '₹4000' },
    { airline: 'Air India', departure: '08:00', arrival: '09:00', price: '₹4500' },
    { airline: 'Indigo', departure: '10:00', arrival: '11:00', price: '₹3000' },
    { airline: 'Air India', departure: '15:00', arrival: '16:00', price: '₹6500' }
  ];

  

  //===================================================================================

  vendors: any[] = [
    { heading: 'Adventure in the Mountains', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1O04Fm8s4yuhlzr20c6YlG3XUzAdeCTi7ow2TmXBaSv2UEAr' },
    { heading: 'Arts and  culture', photoUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTQHX0PaRSJDJHeffos8CF6d-8z_FWN0YDZ7qCzLGtXGSYVBgCA' },
    { heading: 'Relax at the Beach', photoUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTB3XADGa2yyWC2b6kvkrVS3FOLgIlLoUNCWP7zO0NuBILhrHas' },
    { heading: 'boating-and-fishing', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1KITRRtD7Ozbi5T4_4NSapoaAEgIRHy2raBpJ3XqOzxJkVrT8' },
   
  ];

  getBackgroundImage(url: string) {
    return {
      'background-image': `url(${url})`,
      'background-size': 'cover',
      'background-position': 'center'
    };

  }
//====================================================================================




  properties: any[] = [
    { 
      name: 'Fairmont Chateau Laurier', 
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRduTD5wTt1_05FSvykGQD2iX8wtFofddAIAskaysKGtY73aNochchrWJgCbC-wk2NXR0w&usqp=CAU', 
      cost: 350, 
      serviceDetails: 'Luxury rooms, Free Wi-Fi, Pool, Spa', 
      location: 'Canada',
      city: 'Ottawa'
    },
    { 
      name: 'The Ritz-Carlton', 
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Bq9qqyU2hngXu5ajAaHJM3SlhyMLWIT8PIMf2J91eFVa_vdRA40UfMIFX6QgEeE5Ei8&usqp=CAU', 
      cost: 500, 
      serviceDetails: 'Luxury rooms, Free Wi-Fi, Pool, Spa, Fitness Center', 
      location: 'Canada',
      city: 'Toronto'
    },
    { 
      name: 'Four Seasons Hotel', 
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsANnT7ZsXbzYh-ryf5I5nzijfl6KJCL9mCg&s', 
      cost: 450, 
      serviceDetails: 'Luxury rooms, Free Wi-Fi, Pool, Spa, Fitness Center, Restaurant', 
      location: 'Canada',
      city: 'Toronto'
    },
    { 
      name: 'Shangri-La Hotel', 
      photoUrl: 'https://media-cdn.tripadvisor.com/media/photo-s/1c/33/70/d5/hotel-canada.jpg', 
      cost: 400, 
      serviceDetails: 'Luxury rooms, Free Wi-Fi, Pool, Spa, Fitness Center, Restaurant, Bar', 
      location: 'Canada',
      city: 'Vancouver'
    },
    
  ];


  //=====================================================================================

  blogs = [
    { title: 'An Unforgettable Autumn Adventure in Jasper', 
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBm2NJd25Bnz-T0KKo5NniTlwx812gTTEa9Q&s', 
      excerpt: 'Experience Jasper s autumn magic! Discover vibrant fall foliage, mild weather, and fewer crowds in the Canadian Rockies. Enjoy exclusive deals for June-October, or book 2025 now at 2024 prices!'
     },
    { title: 'Elevate Your Canadian Rockies Winter Experience',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eJmA8eG0wU3yOuRcPwAn8lXoSTsOHMH2_w&s', 
       excerpt: 'Winter in the Canadian Rockies is nothing short of magical, and were here to make it an experience you ll treasure forever. Between the enchanting destinations of Jasper, Banff & Lake Louise, youll find yourself in a true winter wonderland.'
       },
       { title: 'Elevate Your Canadian Rockies Winter Experience',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eJmA8eG0wU3yOuRcPwAn8lXoSTsOHMH2_w&s', 
         excerpt: 'Winter in the Canadian Rockies is nothing short of magical, and were here to make it an experience you ll treasure forever. Between the enchanting destinations of Jasper, Banff & Lake Louise, youll find yourself in a true winter wonderland.'
         }
  ];


  surch(){
    this.router.navigateByUrl('/searchinfo');
  }
}
