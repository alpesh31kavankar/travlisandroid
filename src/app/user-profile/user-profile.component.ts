import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail, Registration, AdmCountryMaster, AdmDestinations, AdmStateMaster } from '../Class';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  // cityInfo :AdmCityInfo
  today: string;    // Holds today's date in yyyy-MM-dd format
  admDestinations: AdmDestinations;
  admCountryMaster: AdmCountryMaster;
  admStateMaster: AdmStateMaster;
  AdmCountryMasterList: any[] = [];
  AdmStateMasterList: any[] = [];
  AdmCityMasterList: any[] = [];

  searchTerm: string = '';
  showDropdown: boolean = false;
  categories: any[] = [];
  allCities: string[] = [];
  allCitiesID: string[] = [];
  filteredCities: string[] = [];
 cityid
  userDetail: UserDetail;
  registration: Registration;
  // userInfo: any = {
  //   FName: 'Mike',
  //   LName: 'Lazaridis',
  //   Email: 'MikeLazaridis@gmail.com',
  //   contactNo: ''
  // };
   userInfo:  Registration;
  userid;
  currentView = 'profile';
  editMode = false;
  hideSidebarOnMobile = true;
  isSidebarVisible = false;

  filesToUpload: Array<File>;
  selectedFileNames: string[] = [];
  imgPath: string = GlobalVariable.BASE_API_URL;


  travelPreferences: string[] = [
    'Family Travelers',
    'Couples',
    'Group Travelers',
    'Budget Travelers',
    'Solo Travelers', // Include relevant options
    'Luxury Travelers',
    'Eco-Conscious Travelers',
    'Adventure Travelers'

  ];

  preferredBudget: number;
  travelType: string;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {
    this.userDetail = new  UserDetail();
    this.registration = new  Registration();
  }
  
 
  ngOnInit(): void {

    const currentDate = new Date();
    this.today = currentDate.toISOString().split('T')[0]; // Format date as yyyy-MM-dd

    this.GetAllAdmCityMaster()
  this.GetInfo();

  this.service.GetAllUserDetail().subscribe((result) => {
    console.log("All user ",result);

    // this.searchTerm=result.AdmCityMasterId;
    // console.log("city",this.searchTerm);
    
    const user = result.find((user: any) => user.RegistrationId == this.userid);
   console.log("Deatil user  info ",user);
   
   this.userDetail =user 
   this.searchTerm=user.AdmCityMasterId
  });

  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }

  }

  GetInfo(){
    this.userid = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UserID",this.userid);
    
    this.service.GetRegistrationById(this.userid).subscribe((result) => {
     this.userInfo=result
     console.log("User Info",result);
     
    
       });
    

  }
  setView(view: string) {
    this.currentView = view;
    this.isSidebarVisible = false; // Hide sidebar after selecting an option on mobile
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  toggleSidebarVisibility() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

 

  savePreferences() {
    // Save travel preferences logic...
  }



  // saveInfo() {
  
  //   this.userDetail.AdmCityMasterId=this.searchTerm;
  //   // this.userDetail.Photo="123.jpg"
  //   this.userDetail.Status="Active"
  //     this.service.UpdateUserDetail(this.userDetail).subscribe((result) => {
  //       console.log("Avinash");
  //       if (result > 0) {
  //         console.log("Result",result);
          
          
  //         const formData = new FormData();
  //         formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
  //         this.service.SaveUserDetailImage(formData, this.userDetail.UserDetailsId).subscribe(data => {
          
  //           // this.router.navigateByUrl('/AdmActivitiesMasterList');
  //         });
  //         alert('Saved Successfully.');
  //       } else {
  //         alert("Something went wrong! Please try again.");
  //       }
  //       this.editMode = false;
  //     });


      // this.service.GetAllUserDetail().subscribe((result) => {
      //   console.log("All user ",result);
    
      //   this.userDetail=result
        
      
      // });
    
      saveInfo() {

        this.userDetail.Contact = this.userDetail.Contact.trim();
        this.userDetail.Tagline = this.userDetail.Tagline.trim();
        this.userDetail.Address = this.userDetail.Address.trim();

        if (!this.userDetail.Contact || !this.userDetail.Tagline || !this.userDetail.Address || !this.userDetail.Gender ) {
          Swal.fire({
            icon: 'warning',
            title: 'Invalid Input',
            text: 'All fields must be filled and cannot be just spaces.',
            confirmButtonText: 'OK',
            confirmButtonColor: '#007bff',
          });
          return;
        }
        this.userDetail.AdmCityMasterId = this.searchTerm;
        // this.userDetail.Photo = "123.jpg";
        this.userDetail.Status = "Active";
        
        this.service.UpdateUserDetail(this.userDetail).subscribe((result) => {
          console.log("Avinash");
          if (result > 0) {

            Swal.fire({
              icon: 'success',
              title: 'Saved Successfully!',
              showConfirmButton: false,
              timer: 1500 // Automatically close after 1.5 seconds
            }).then(() => {
              // Redirect to dashboard after success message
              this.router.navigateByUrl('/UserDashbord');
            });
            console.log("Result", result);
            
            const formData = new FormData();
            formData.append('uploadedImage', this.filesToUpload[0], this.filesToUpload[0].name);
            
            this.service.SaveUserDetailImage(formData, this.userDetail.UserDetailsId).subscribe(() => {
              // Show SweetAlert success message
           
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Something went wrong!',
              text: 'Please try again.',
              showConfirmButton: true
            });
          }
          this.editMode = false;
        });
      }
  
 



  fileChangeEvent(fileInput: any): void {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.selectedFileNames = [];
    for (let i = 0; i < this.filesToUpload.length; i++) {
      this.selectedFileNames.push(this.filesToUpload[i].name);
      this.userDetail.Photo = this.filesToUpload[i].name;
    }
  }


  GetAllAdmCityMaster() {
  
    this.service.GetAllAdmCityMaster().subscribe((cities) => {
      // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
      this.allCities = cities.map(city => city.CityDescription); // Extract only city names
      // this. cityid=cities.map(city => city.AdmStateMasterId);
      
      console.log(this.allCities); // Log the city names
      this.filteredCities = this.allCities; // Initially, show all city names

    });

    

    
  }
  

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


  //===============================================================

 selectCity(city: any) {
  this.searchTerm = city;

  // Update the selected city to userDetail
  this.service.GetAllAdmCityMaster().subscribe((cities) => {
    // Find the city where the CityDescription matches the selected city
    const matchingCity = cities.find(c => c.CityDescription.toLowerCase() === this.searchTerm.toLowerCase());
    
    if (matchingCity) {
      this.userDetail.AdmCountryMasterId = matchingCity.admCountryMaster.CountryDescription;
      this.userDetail.AdmStateMasterId = matchingCity.admStateMaster.StateDescription;
      console.log(`Matching City Found: ${matchingCity.CityDescription}, State: ${matchingCity.admStateMaster.StateDescription}, Country: ${matchingCity.admCountryMaster.CountryDescription}`);
    } else {
      console.log('No matching city found');
    }
    this.showDropdown = false;
  });
}

onCityChange(city: string) {
  this.searchTerm = city;

  // Update the selected city to userDetail
  this.service.GetAllAdmCityMaster().subscribe((cities) => {
    // Find the city where the CityDescription matches the searchTerm
    const matchingCity = cities.find(c => c.CityDescription.toLowerCase() === this.searchTerm.toLowerCase());

    if (matchingCity) {
      this.userDetail.AdmCountryMasterId = matchingCity.admCountryMaster.CountryDescription;
      this.userDetail.AdmStateMasterId = matchingCity.admStateMaster.StateDescription;
      console.log(`Matching City Found: ${matchingCity.CityDescription}, State: ${matchingCity.admStateMaster.StateDescription}, Country: ${matchingCity.admCountryMaster.CountryDescription}`);
    } else {
      console.log('No matching city found');
    }
  });
}

 //================================================================
  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  GetAllAdmstateMaster() {
  
    this.service.GetAllAdmCityMaster().subscribe((cities) => {
      // Assuming 'cities' is an array of objects, we'll map to extract only city descriptions
      this.allCities = cities.map(city => city.CityDescription); // Extract only city names
      console.log(this.allCities); // Log the city names
      this.filteredCities = this.allCities; // Initially, show all city names
   
    });

}

// onCityChange(searchTerm: string) {
//   // Find the selected city from the full list of cities
//   const matchingCity = this.allCities.find(city => city.CityDescription.toLowerCase() === searchTerm.toLowerCase());

//   // If the city is found, update the Country and State fields
//   if (matchingCity) {
//     this.userDetail.AdmCountryMasterId = matchingCity.admCountryMaster.CountryDescription;
//     this.userDetail.AdmStateMasterId = matchingCity.admStateMaster.StateDescription;
//     console.log(`Updated Country: ${this.userDetail.AdmCountryMasterId}, State: ${this.userDetail.AdmStateMasterId}`);
//   } else {
//     console.log('No matching city found');
//   }
// }



}