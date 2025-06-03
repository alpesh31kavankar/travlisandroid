import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';

import jsPDF from 'jspdf';
import { Rooms, Hotel, Travel } from 'src/app/Class';
import { GlobalVariable } from 'src/app/Global';
import { WebService } from 'src/app/Service';
import { WeatherService } from 'src/app/weather.service';

@Component({
  selector: 'app-search-info',
  templateUrl: './search-info.component.html',
  styleUrls: ['./search-info.component.scss']
})
export class SearchInfoComponent {

  //===========================================
  city: string = '';
  weather: any = null;
  error: string = '';
  loading: boolean = false;
  //============================================
  vechicalDetail:any
  TravelDetail1:any
  TravelDetail:any
  showMoreActivities = false;
  selectedImage: string | null = null;
 
  RoomsList:Rooms[]=[]
  showAllBlogs: boolean = false;

  // selectedVehicleType: string = 'Car'; // Default selected option
  selectedVehicleType: string = 'All';

imgPath: string = GlobalVariable.BASE_API_URL;
  HotelList:Hotel[]=[]
  TravelList:Travel[]=[]

  BolgList=[]
  ActivityList =[]
  CityImageList =[]

  imageArrays=[]
  
  allCityImages=[]
  // to: string = '';
  // from: string = '';
  departureDay: string = '';
  returnDay: string = '';
  tripType: string = '';
  noOfPersons: string = '';
  From:String="";
  to:string="";

  vendors1:[];
  // to:string;
  filteredVendors = [];
  filteredproperties=[];
  filteredproperties1=[];
  filteredblogs=[];
  activities=[]




  images=[]



  currentSection: string = 'travel'; // Default section
  // filteredproperties: any[] = []; // Your filtered properties data
  // filteredproperties1: any[] = []; // Your filtered hotels data
  // activities: any[] = []; // Your activities data
  // filteredblogs: any[] = []; // Your filtered blogs data
  // From: string = ''; // Initialize with your values
  // to: string = ''; // Initialize with your values
  // imgPath: string = ''; // Initialize with your values

  showSection(section: string) {
    this.currentSection = section;
  }
  
  
  isModalOpen: boolean = false;
  selectedProperty: any;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient,
     private service: WebService,
     private weatherService: WeatherService
    ) {

      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }
  }

  openModal(property: any) {
    this.selectedProperty = property;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedProperty = null;
  }




  toggleActivities() {
    this.showMoreActivities = !this.showMoreActivities;
  }

  seeMoreBlogs() {
    this.showAllBlogs = true;
  }

  // Function to show only the first blog
  seeLessBlogs() {
    this.showAllBlogs = false;
  }
  

  ngOnInit(): void {

    // this.showSlides(this.slideIndex);

    this.route.paramMap.subscribe(params => {
      this.to = params.get('to') || '';
      this.From = params.get('from') || '';
      this.departureDay = params.get('departureDay') || '';
      this.returnDay = params.get('returnDay') || '';
      this.tripType = params.get('tripType') || '';
      this.noOfPersons = params.get('noOfPersons') || '';



    });
//====================================wather code =============================================

    

  
    
    this. getBlog();
    this.getActivity();
    this.getCityImage()
    
    this.getTravel();
    this.getHotel()
    
    console.log( "iamges from city is ",this.imageArrays);
    
   this.searchWeather();
  }

//====================================wather code =============================================

searchWeather() {
    const trimmedCity = this.to .trim();
    if (!trimmedCity) {
      this.error = 'Please enter a city name';
      return;
    }

    this.loading = true;
    this.weatherService.getWeather(trimmedCity).subscribe({
      next: (data) => {
        this.weather = data;
        this.error = '';
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || 'Failed to fetch weather data';
        this.weather = null;
        this.loading = false;
      }
    });
  }

  downloadReport() {
    const doc = new jsPDF();
    const date = new Date().toLocaleString();

    // Header
    doc.setFontSize(18);
    doc.setTextColor(45, 45, 66);
    doc.text(`${this.weather.location.name} Weather Report`, 15, 20);
    
    // Subheader
    doc.setFontSize(10);
    doc.setTextColor(128, 128, 128);
    doc.text(`Generated: ${date} | Location: ${this.weather.location.lat}, ${this.weather.location.lon}`, 15, 27);

    // Weather Data Table
    autoTable(doc, {
      startY: 35,
      head: [['Parameter', 'Value']],
      body: [
        ['Temperature', `${this.weather.current.temp_c}°C / ${this.weather.current.temp_f}°F`],
        ['Condition', this.weather.current.condition.text],
        ['Humidity', `${this.weather.current.humidity}%`],
        ['Wind Speed', `${this.weather.current.wind_kph} km/h`],
        ['Wind Direction', this.weather.current.wind_dir],
        ['Feels Like', `${this.weather.current.feelslike_c}°C / ${this.weather.current.feelslike_f}°F`],
        ['Visibility', `${this.weather.current.vis_km} km`],
        ['UV Index', this.weather.current.uv],
        ['Last Updated', this.weather.current.last_updated]
      ],
      theme: 'grid',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [77, 171, 247], textColor: 255 },
      columnStyles: { 0: { fontStyle: 'bold' } }
    });

    // Save PDF
    doc.save(`weather-report-${this.weather.location.name}.pdf`);
  }





//============================================================================================
  
  getHotel(): void {
    this.service.GetAllHotel().subscribe(data => {
      this.HotelList = data; // Assign data to TravelList
      console.log("HotellList Data is:", data);
      
      // Filter travel list by both 'From' and 'To' fields
      this.filteredproperties1 = this.HotelList.filter(property => 
        // property.Form.toLowerCase() === this.From.toLowerCase() &&
        property.City.toLowerCase() === this.to.toLowerCase()
      );
      
      console.log("Filtered HotelList are:", this.filteredproperties1);
      if(this.filteredproperties1.length == 0){
        // alert("No list found")
        // this.showErrorAlert()
      }
    });
  }
    
  
    // getTravel(): void {
    //   this.service.GetAllTravel().subscribe(data => {
    //     this.TravelList = data; // Assign data to TravelList
    //     console.log("TravelList Data is:", data);
        
    //     // Filter travel list by both 'From' and 'To' fields
    //     this.filteredproperties = this.TravelList.filter(property => 
    //       property.From.toLowerCase() === this.From.toLowerCase() &&
    //       property.To.toLowerCase() === this.to.toLowerCase()
    //     );
        
    //     console.log("Filtered TravelList are:", this.filteredproperties);
    //     if(this.filteredproperties.length == 0){
    //       // alert("No list found")
    //       // this.showErrorAlert()
    //     }
    //   });
    // }
    


    // getTravel(): void {
    //   this.service.GetAllTravel().subscribe(data => {
    //     this.TravelList = data;
    //     console.log("Complete TravelList Data:", data);
    
    //     // Apply filters for 'From', 'To', and 'VehicleType'
    //     this.filteredproperties = this.TravelList.filter(property =>
    //       property.From.toLowerCase() === this.From.toLowerCase() &&
    //       property.To.toLowerCase() === this.to.toLowerCase() &&
    //       property.vehicle.VehicleType.toLowerCase() === this.selectedVehicleType.toLowerCase()
    //     );
    
    //     console.log("Filtered Travel List based on From, To, and VehicleType:", this.filteredproperties);
    
    //     if (this.filteredproperties.length === 0) {
    //       console.log("No travel options found for the selected filters.");
    //     }
    //   });
    // }
    

    // onVehicleTypeChange(vehicleType: string): void {
    //   this.selectedVehicleType = vehicleType;
    //   this.getTravel(); // Re-filter the list whenever the vehicle type changes
    // }


//=======================================================================================

getTravel(): void {
  this.service.GetAllTravel().subscribe(data => {
    this.TravelList = data;
    console.log("Complete TravelList Data:", data);

    // Apply filters for 'From', 'To', and 'VehicleType'
    this.applyFilters();
  });
}

// Method to handle filtering logic

applyFilters(): void {
  // Format departureDay to 'YYYY-MM-DD'
  const formDate = new Date(this.departureDay).toISOString().split('T')[0];

  if (this.selectedVehicleType === 'All') {
    // If 'All' is selected, don't filter by VehicleType
    this.filteredproperties = this.TravelList.filter(property => {
      // Format property's departure date to 'YYYY-MM-DD'
      console.log("Property Departure Date:", property.Departure);
      const propertyDate = new Date(property.Departure).toISOString().split('T')[0];
   
      return property.From.toLowerCase() === this.From.toLowerCase() &&
             property.To.toLowerCase() === this.to.toLowerCase() &&
             propertyDate === formDate; // Add date matching condition
    });
  } else {
    // Apply filtering based on 'From', 'To', selected 'VehicleType', and 'Departure' date
    this.filteredproperties = this.TravelList.filter(property => {
      const propertyDate = new Date(property.Departure).toISOString().split('T')[0];

      return property.From.toLowerCase() === this.From.toLowerCase() &&
             property.To.toLowerCase() === this.to.toLowerCase() &&
             property.vehicle.VehicleType.toLowerCase() === this.selectedVehicleType.toLowerCase() &&
             propertyDate === formDate; // Add date matching condition
    });
  }

  console.log("Filtered Travel List based on From, To, VehicleType, and Departure Date:", this.filteredproperties);

  // Check if no properties are found after filtering
  if (this.filteredproperties.length === 0) {
    console.log("No travel options found for the selected filters.");
  }
}


// Method to handle the vehicle type change from radio buttons
onVehicleTypeChange(vehicleType: string): void {
  this.selectedVehicleType = vehicleType;

  // Reapply filters whenever the vehicle type changes
  this.applyFilters();
}


//==========================BLog==================================================

    getBlog(): void {
      this.service.GetAllBlog().subscribe(data => {
        this.BolgList = data; // Assign data to TravelList
        console.log("BolgList Data is:", data);
        
        // Filter travel list by both 'From' and 'To' fields
        this.filteredblogs = this.BolgList.filter(property => 
          // property.Form.toLowerCase() === this.From.toLowerCase() &&
          property.City.toLowerCase() === this.to.toLowerCase()
        );
        
        console.log("Filtered BolgList are:", this.filteredblogs);
        // if(this.filteredblogs.length == 0){
        //   alert("No list found")
        // }
      });
    }



    
    getActivity(): void {
      this.service.GetAllActivities().subscribe(data => {
        this.ActivityList = data; // Assign data to TravelList
        console.log("Activities Data is:", data);
        
        // Filter travel list by both 'From' and 'To' fields
        this.activities = this.ActivityList.filter(property => 
          // property.Form.toLowerCase() === this.From.toLowerCase() &&
          property.City.toLowerCase() === this.to.toLowerCase()
        );
        
        console.log("Filtered ActivityList are:", this.activities);
        // if(this.filteredblogs.length == 0){
        //   alert("No list found")
        // }
      });
    }


    getCityImage(): void {
      this.service.GetAllCityInfo().subscribe(data => {
        this.CityImageList = data; // Assign data to CityImageList
        console.log("CityImageList Data is:", data);
        
        // Filter travel list by the selected city
        this.images = this.CityImageList.filter(property => 
          property.Name.toLowerCase() === this.to.toLowerCase()
        );
        
        console.log("Filtered CityImageList are:", this.images);
    
        // Flatten the image arrays into a single array
        this.imageArrays = this.images.map(category => {
          if (category.Image) {
            const imageFileNames = category.Image.split(',').slice(1).map(fileName => fileName.trim());
            console.log(imageFileNames); // Log each image array
            return imageFileNames; // Return the array of images
          }
          return [];
        });
    
        // Flatten the arrays into one single array
        this.allCityImages = this.imageArrays.reduce((acc, curr) => acc.concat(curr), []);
        console.log("All City Images:", this.allCityImages); // Log the final flattened array
      });
    }
   

    HotelDetails(Acb){

    
        this.service.GetAllRooms().subscribe(data => {
          this.RoomsList = data; // Assign data to TravelList
          console.log("RoomsList Data is:", data);
          
          // Filter travel list by both 'From' and 'To' fields
          this.filteredproperties = this.RoomsList.filter(property => 
            // property.Form.toLowerCase() === this.From.toLowerCase() &&
            property.hotel.HotelId == Acb
          );
          
          console.log("Filtered RoomslList are:", this.filteredproperties);
          if(this.filteredproperties.length == 0){
            alert("No list found")
          }
        });
      }
     
    

  

  // RoomDetails(Acb){

  //  this.router.navigate(['/hotel-room-detail/',Acb]);
  // }

  RoomDetails(Acb: string) {
    this.router.navigate(['/hotel-room-detail', Acb], {
      queryParams: {
        to: this.to,
        from: this.From,
        departureDay: this.departureDay,
        returnDay: this.returnDay,
        tripType: this.tripType,
        noOfPersons: this.noOfPersons
      }
    });
  }
  ActivityDeails(id){

    // this.router.navigate(['/AcitivityDetail/'])
    this.router.navigate(['/AcitivityDetail/', id]);
  }
  BlogDeails(id){
    // this.router.navigate(['/BlogDetails']);
    this.router.navigate(['/BlogDetails/', id]);
  }


  TravelDetails(id1){
    debugger;
    console.log("Travel id is ",id1);
    
    this.router.navigate(['/TravelDetail/',id1]);
  // this.service.GetRoomsById(id).subscribe(result => {
    this.service.GetTravelById(id1).subscribe(result => {
    console.log(" Travel by id ", result);
     this.TravelDetail1 = result;
    // console.log(" Hotel Result", result);
   
    this.service.GetVehicleById(result.vehicle.VehicleId).subscribe(result => {
      console.log(" Vechical Details by id ", result);
       this.vechicalDetail = result;
      // console.log(" Hotel Result", result);
     

    });
  });
}

openActivities() {
  // Scroll to the activities section
  const activitiesSection = document.querySelector('.activity-panel');
  if (activitiesSection) {
    activitiesSection.scrollIntoView({ behavior: 'smooth' });
  }
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
      html: ' <b style="color:red; ">No list found.</b>',
      icon: 'error'
    });
  }


  // openImageInModal(image: string) {
  //   this.selectedImage = ${this.imgPath}Content/CityInfo/${image};

  //   // Open the modal using Bootstrap's JS API
  //   const modal = new (window as any).bootstrap.Modal(document.getElementById('imageModal'));
  //   modal.show();
  // }


  goBack() {
    window.history.back();
  }



  seeMore(type: string) {
    if (type === 'travel') {
      // Navigate to travel details or load more travel properties
      // Example: this.router.navigate(['/travel', {from: this.From, to: this.to}]);
    } else if (type === 'hotel') {
      // Navigate to hotel details or load more hotel properties
      // Example: this.router.navigate(['/hotel', {to: this.to}]);
    }
  }


  mycity(){
    this.router.navigate(['/Aboutcity/',this.to]);
  }

}

function autoTable(doc: jsPDF, arg1: { startY: number; head: string[][]; body: any[][]; theme: string; styles: { fontSize: number; cellPadding: number; }; headStyles: { fillColor: number[]; textColor: number; }; columnStyles: { 0: { fontStyle: string; }; }; }) {
  throw new Error('Function not implemented.');
}
