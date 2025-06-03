import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';
import Swal from 'sweetalert2';
import { Registration } from '../Class';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit{

  activeTab: string = 'hotels';
  to: string = 'Halifax';
  from: string = 'Ottawa';
  departureDay: string = '';
  returnDay: string = '';

  todayDate: string;
  departureDate: string | null = null;
  returnDate: string | null = null;


  tripType: string = 'Solo'; // Default selection
  noOfPersons: number;

  filter: string = 'hotel'; // Ensure this matches the option value in the dropdown

  //=======================For hotel Search  =========================================================
  searchTerm: string = '';
  showDropdown: boolean = false;

  //=======================For Travel  Search =========================================================

  searchTerm2: string = '';
  searchTerm1: string = '';
  showDropdown2: boolean = false;
  showDropdown1: boolean = false;

  //================================================================================================ 

  categories: any[] = [];
  allCities: string[] = [];
  filteredCities: string[] = [];


  isSubmitEnabled: boolean = false;

  registration: Registration;
  UId: any;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService, private sharedService: SharedService) {

    // $(function () {
    //   $('[data-toggle="offcanvas"]').on("click", function () {
    //     $('.sidebar-offcanvas').toggleClass('active');
    //   });
    // });

    this.registration = new Registration();
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);

    });
    const today = new Date();
    this.todayDate = today.toISOString().split('T')[0];
  }

  //=======================================================================================

  ngOnInit(): void {
    this.getCities();
    console.log("Ats");
    this.getAllUserRole()
    // $(function () {
    //   $('[data-toggle="offcanvas"]').on("click", function () {
    //     $('.sidebar-offcanvas').toggleClass('active');
    //   });
    // });

    // this.initOffcanvas();
    
   
    if (!localStorage.getItem('foo')) { 
      localStorage.setItem('foo', 'no reload') 
      location.reload() 
    } else {
      localStorage.removeItem('foo') 
    }

  }

 

  getAllUserRole(): void {
    this.service.GetAllUserRole().subscribe(data => {
      console.log("All user Rolr ", data);

      console.log("All user Rolr ", this.UId);
      // Check if there is an active user role with SId
      // Filter the userRole objects that match the specified RegistrationId
      const filteredRoles = data.filter(userRole => userRole.RegistrationId == this.UId);

      // Check if all filtered userRole objects have Status 'Active'
      const hasActiveRole = filteredRoles.length > 0 && filteredRoles.every(userRole => userRole.Status == 'Active');
      console.log("hasActiveRole", hasActiveRole);

      this.isSubmitEnabled = hasActiveRole;
    });
  }




  // private initOffcanvas(): void {
  //   $(function () {
  //     $('[data-toggle="offcanvas"]').on("click", function () {
  //       $('.sidebar-offcanvas').toggleClass('active');
  //     });
  //   });
  // }


  // private initOffcanvas(): void {
  //   $(function () {
  //     $('[data-toggle="offcanvas"]').on("click", function () {
  //       $('.sidebar-offcanvas').toggleClass('active');
  
  //       // Store the sidebar state in localStorage
  //       if ($('.sidebar-offcanvas').hasClass('active')) {
  //         localStorage.setItem('sidebarState', 'active');
  //       } else {
  //         localStorage.removeItem('sidebarState');
  //       }
  //     });
  //   });
  // }








  //=============================================================================================




  onSearch1(form: any): void {
    if (this.isSubmitEnabled) {
      // alert(" Surech")
      const searchParams = {
        from: this.searchTerm2,
        to: this.searchTerm1,
        // from: this.searchTerm,
        departureDay: form.value.departure,
        returnDay: form.value.return,
        tripType: this.tripType,
        noOfPersons: this.noOfPersons,
        // NoOfPerson :form.value.return.searchTerm1
      };

      console.log('Search Parameters:', searchParams);

      this.router.navigate(['/searchinfo/', searchParams]);

      form.reset();
    }
    else {
      Swal.fire({
        title: 'Confirmation',
        text: 'You need to purchase a plan to continue. Do you want to proceed?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Purchase Plan',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/Subscription']);
        }
      });
    }
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


  updateDepartureDay(departureValue: string) {
    this.departureDate = departureValue;
    if (this.returnDate && this.returnDate < this.departureDate) {
      // Reset return date if it is before the new departure date
      this.returnDate = null;
    }
  }

  updateReturnDate(returnValue: string) {
    this.returnDate = returnValue;
  }

  // getDayOfWeek(date: string): string {
  //   const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //   return days[new Date(date).getDay()];
  // }



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
    // this.router.navigate(['/TestCard/', searchParams]);

    form.reset();
  }

  //////////////////////////////////////Travel Surch///////////////////////////////////////////////
  //============================================================================================

  filterCities2() {
    if (this.searchTerm2) {
      this.filteredCities = this.allCities.filter(city =>
        city.toLowerCase().startsWith(this.searchTerm2.toLowerCase())
      );
    } else {
      this.filteredCities = this.allCities;
    }
    this.showDropdown2 = true; // Keep the dropdown visible
  }

  // Toggle dropdown when input is clicked
  toggleDropdown2() {
    this.showDropdown2 = !this.showDropdown2;
    if (!this.searchTerm2) {
      this.filteredCities = this.allCities;
    }
  }

  // Handle city selection
  selectCity2(city: string) {
    this.searchTerm2 = city;
    // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
    this.showDropdown2 = false;
  }

  // Hide dropdown when input loses focus
  hideDropdown2() {
    setTimeout(() => {
      this.showDropdown2 = false;
    }, 200);
  }
  //============================================================================================
  filterCities1() {
    if (this.searchTerm1) {
      this.filteredCities = this.allCities.filter(city =>
        city.toLowerCase().startsWith(this.searchTerm1.toLowerCase())
      );
    } else {
      this.filteredCities = this.allCities;
    }
    this.showDropdown1 = true; // Keep the dropdown visible
  }

  // Toggle dropdown when input is clicked
  toggleDropdown1() {
    this.showDropdown1 = !this.showDropdown1;
    if (!this.searchTerm1) {
      this.filteredCities = this.allCities;
    }
  }

  // Handle city selection
  selectCity1(city: string) {
    this.searchTerm1 = city;
    // this.cityInfo.Name = city; // Set the selected city in the cityInfo object
    this.showDropdown1 = false;
  }

  // Hide dropdown when input loses focus
  hideDropdown1() {
    setTimeout(() => {
      this.showDropdown1 = false;
    }, 200);
  }


  showSuccessAlert() {
    Swal.fire({
      title: 'Success',
      html: ' <b style="color:green; ">Saved Successfully.</b>',
      icon: 'success'
    });
  }

  showErrorAlert() {
    Swal.fire({
      title: 'Error',
      html: ' <b style="color:red; ">Something went wrong! Please try again.</b>',
      icon: 'error'
    });


  }








  // ngOnInit(): void {
  //   this.initOffcanvas();

  //   // Subscribe to refresh events
  //   this.sharedService.refresh$.subscribe(() => {
  //     this.loadData();
  //   });



  // }

}



