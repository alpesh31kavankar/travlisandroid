import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';

@Component({
  selector: 'app-travel-search',
  templateUrl: './travel-search.component.html',
  styleUrls: ['./travel-search.component.scss']
})
export class TravelSearchComponent {


  
  to: string = '';
  from: string = '';
  departureDay: string = '';
  returnDay: string = '';
  filter: string = '';

  From:String="Ottawa,";
  // To:string="Ottawa";

  vendors1:[];
  // to:string;
  filteredVendors = [];
  filteredproperties=[];
  filteredblogs=[];
  filteredFlights: any[] = [];
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: WebService) {
  

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.to = params.get('to') || '';
      this.from = params.get('from') || '';
      this.departureDay = params.get('departureDay') || '';
      this.returnDay = params.get('returnDay') || '';
      this.filter = params.get('filter') || '';
    });




    // Filter the flights based on form input
    // this.filteredFlights = this.flights.filter(flight =>
    //   flight.from.toLowerCase().includes(searchData.from.toLowerCase()) &&
    //   flight.to.toLowerCase().includes(searchData.to.toLowerCase()) &&
    //   flight.departure === searchData.departure &&
    //   flight.return === searchData.return
    // );

    console.log('Filtered Flights:', this.filteredFlights);


    // this.filteredVendors= this.vendors.filter(vendor => vendor.city === this.to);
    this.filteredproperties= this.properties.filter(properties => properties.city === this.to);
    // this.filteredblogs= this.blogs.filter(blogs => blogs.city === this.to);

    // Now use these parameters to fetch or filter your data accordingly
    // console.log('Received Parameters:', this.to, this.from, this.departureDay, this.returnDay, this.filter);
  }


  flights = [
    { from: 'New York', to: 'Los Angeles', departure: '2024-09-30', return: '2024-10-10' },
    { from: 'Chicago', to: 'Miami', departure: '2024-10-05', return: '2024-10-15' },
    { from: 'Dallas', to: 'Houston', departure: '2024-09-25', return: '2024-10-05' },
    { from: 'San Francisco', to: 'Seattle', departure: '2024-10-01', return: '2024-10-08' }
  ];

  

  //===================================================================================

  vendors: any[] = [
    { heading: 'Adventure in the Mountains', city: 'Ottawa', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1O04Fm8s4yuhlzr20c6YlG3XUzAdeCTi7ow2TmXBaSv2UEAr' },
    { heading: 'Arts and  culture',city: 'Toronto', photoUrl: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTQHX0PaRSJDJHeffos8CF6d-8z_FWN0YDZ7qCzLGtXGSYVBgCA' },
    { heading: 'Relax at the Beach', city: 'Vancouver', photoUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTB3XADGa2yyWC2b6kvkrVS3FOLgIlLoUNCWP7zO0NuBILhrHas' },
    { heading: 'boating-and-fishing', city: 'Halifax', photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1KITRRtD7Ozbi5T4_4NSapoaAEgIRHy2raBpJ3XqOzxJkVrT8' },
   
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
      city: 'Toronto'
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
      name: 'The Ritz-Carlton', 
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-Bq9qqyU2hngXu5ajAaHJM3SlhyMLWIT8PIMf2J91eFVa_vdRA40UfMIFX6QgEeE5Ei8&usqp=CAU', 
      cost: 500, 
      serviceDetails: 'Luxury rooms, Free Wi-Fi, Pool, Spa, Fitness Center', 
      location: 'Canada',
      city: 'Toronto'
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
      city: 'Halifax'
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
       city: 'Toronto',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBm2NJd25Bnz-T0KKo5NniTlwx812gTTEa9Q&s', 
      excerpt: 'Experience Jasper s autumn magic! Discover vibrant fall foliage, mild weather, and fewer crowds in the Canadian Rockies. Enjoy exclusive deals for June-October, or book 2025 now at 2024 prices!'
     },

    { title: 'Elevate Your Canadian Rockies Winter Experience',
      city: 'Halifax',
      photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eJmA8eG0wU3yOuRcPwAn8lXoSTsOHMH2_w&s', 
       excerpt: 'Winter in the Canadian Rockies is nothing short of magical, and were here to make it an experience you ll treasure forever. Between the enchanting destinations of Jasper, Banff & Lake Louise, youll find yourself in a true winter wonderland.'
       },

       { title: 'Elevate Your Canadian Rockies Winter Experience',
          city: 'Vancouver',
        photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9eJmA8eG0wU3yOuRcPwAn8lXoSTsOHMH2_w&s', 
         excerpt: 'Winter in the Canadian Rockies is nothing short of magical, and were here to make it an experience you ll treasure forever. Between the enchanting destinations of Jasper, Banff & Lake Louise, youll find yourself in a true winter wonderland.'
         }
  ];



  HotelDeails(){
    this.router.navigate(['/HotelDetail']);
  }
  ActivityDeails(){
    this.router.navigate(['/AcitivityDetail']);
  }
  BlogDeails(){
    this.router.navigate(['/BlogDetails']);
  }
  
}
