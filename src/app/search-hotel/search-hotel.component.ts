import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';

@Component({
  selector: 'app-search-hotel',
  templateUrl: './search-hotel.component.html',
  styleUrls: ['./search-hotel.component.scss']
})
export class SearchHotelComponent {
  to: string = 'Halifax';
  from: string = 'Ottawa';
  departureDay: string = '';
  returnDay: string = '';
  filter: string = 'hotel'; // Ensure this matches the option value in the dropdown


  searchTerm: string = '';
  searchTerm1: string = '';
  showDropdown: boolean = false;
  showDropdown1: boolean = false;

  categories: any[] = [];
  allCities: string[] = []; 
  filteredCities: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {}

//=======================================================================================
  ngOnInit(): void {
    this.getCities();
    console.log("Ats");
    
  }
  getCities(): void {
    this.service.GetAllAdmCityMaster().subscribe((cities) => {
      // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
      this.allCities = cities.map(city => city.CityDescription); // Extract only city names
      console.log(this.allCities); // Log the city names
      this.filteredCities = this.allCities; // Initially, show all city names
    });
  }
//============================================================================================

filterCities() {
  if (this.searchTerm) {
    this.filteredCities = this.allCities.filter(city =>
      city.toLowerCase().startsWith(this.searchTerm.toLowerCase())
    );
  } else {
    this.filteredCities = this.allCities;
  }
  this.showDropdown = true; // Keep the dropdown visible
}

// Toggle dropdown when input is clicked
toggleDropdown() {
  this.showDropdown = !this.showDropdown;
  if (!this.searchTerm) {
    this.filteredCities = this.allCities;
  }
}

// Handle city selection
selectCity(city: string) {
  this.searchTerm = city;
  // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
  this.showDropdown = false;
}

// Hide dropdown when input loses focus
hideDropdown() {
  setTimeout(() => {
    this.showDropdown = false;
  }, 200);
}
  //===================================================================================================
  updateDepartureDay(date: string): void {
    this.departureDay = this.getDayOfWeek(date);
  }

  updateReturnDay(date: string): void {
    this.returnDay = this.getDayOfWeek(date);
  }

  getDayOfWeek(date: string): string {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  }

  onFilterChange(event: Event): void {
    const selectedFilter = (event.target as HTMLSelectElement).value;

    if (selectedFilter === 'hotel') {
      this.router.navigate(['/UserProfile-Hotel']); // Navigate to Vendor route for hotels
    } else if (selectedFilter === 'travel') {
      this.router.navigate(['/AllHotel']); // Navigate to Vendor route for travel
    }
  }

  onSearch(form: any): void {
    const searchParams = {
      to: this.searchTerm,
      // from: this.from,
      // departureDay: form.value.departure,
      // returnDay: form.value.return,
      filter: this.filter
    };

    console.log('Search Parameters:', searchParams);

    this.router.navigate(['/searchinfo1/', searchParams]);

    form.reset();
  }


  ///////////////////////////// icon based searh /////////////////////////////
  // setFilter(filterValue: string) {
  //   this.filter = filterValue;
  //   this.onFilterChange(filterValue);
  // }
  
  // onFilterChange(value: string) {
 
  //   console.log('Filter changed to:', value);
     

  //   if (value === 'hotel') {
  //     this.router.navigate(['/UserProfile-Hotel']); 
  //   } else if (value === 'travel') {
  //     this.router.navigate(['/AllHotel']); 
  //   }
  // }

}
