import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';
import { Hotel, Rooms, Travel } from '../Class';
import { GlobalVariable } from '../Global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-info1',
  templateUrl: './search-info1.component.html',
  styleUrls: ['./search-info1.component.scss']
})
export class SearchInfo1Component {
 

  showMoreActivities = false;
  showAllBlogs: boolean = false;

 
 

 







imgPath: string = GlobalVariable.BASE_API_URL;
  HotelList:Hotel[]=[]
  TravelList:Travel[]=[]
  RoomsList:Rooms[]=[]
  BolgList=[]
  ActivityList =[]
  CityImageList =[]

  imageArrays=[]
  
  allCityImages=[]
  // to: string = '';
  // from: string = '';
  // departureDay: string = '';
  // returnDay: string = '';
  filter: string = '';

  From:String="";
  to:string="";
hotelId;
  vendors1:[];
  // to:string;
  filteredVendors = [];
  filteredproperties=[];
  filteredblogs=[];
  activities=[]

  images=[]

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private http: HttpClient,
     private service: WebService) {
  

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
      // this.departureDay = params.get('departureDay') || '';
      // this.returnDay = params.get('returnDay') || '';
      this.filter = params.get('filter') || '';
    });

    

  
    
    this. getBlog();
    this.getActivity();
    this.getCityImage()
    
    this.getTravel();
    console.log( "iamges from city is ",this.imageArrays);

    // this.getRooms();
  
  }



  
    // getTravel(): void {
    //   this.service.GetAllTravel().subscribe(data => {
    //     this.TravelList = data; // Assign data to HotelList
    //     console.log("TravelList Data is:", data);
        
    //     // Filter hotel list by city

    //     this.filteredproperties = this.TravelList.filter(property => 
    //       property.Form.toLowerCase() == this.From.toLowerCase()
    //     );
    
    //     console.log("Filtered TravelList are:", this.filteredproperties);
    //   });
    // }
    
  
    getTravel(): void {
      this.service.GetAllHotel().subscribe(data => {
        this.HotelList = data; // Assign data to TravelList
        console.log("HotellList Data is:", data);
        
        // Filter travel list by both 'From' and 'To' fields
        this.filteredproperties = this.HotelList.filter(property => 
          // property.Form.toLowerCase() === this.From.toLowerCase() &&
          property.City.toLowerCase() === this.to.toLowerCase()
        );
        
        console.log("Filtered HotelList are:", this.filteredproperties);
        if(this.filteredproperties.length == 0){
          // alert("No list found")
          this.showErrorAlert()
        }
      });
    }


    // getRooms(): void {
    //   this.service.GetAllRooms().subscribe(data => {
    //     this.RoomsList = data; // Assign data to TravelList
    //     console.log("RoomsList Data is:", data);
        
    //     // Filter travel list by both 'From' and 'To' fields
    //     // this.filteredproperties = this.RoomsList.filter(property => 
    //     //   // property.Form.toLowerCase() === this.From.toLowerCase() &&
    //     //   property.RooCity.toLowerCase() === this.to.toLowerCase()
    //     // );
        
    //     console.log("Filtered HotelList are:", this.filteredproperties);
    //     if(this.filteredproperties.length == 0){
    //       alert("No list found")
    //     }
    //   });
    // }
    


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
      this.router.navigate(['/HotelDetail/',Acb]);
    }
    ActivityDeails(id){
  
      this.router.navigate(['/AcitivityDetail/'])
      this.router.navigate(['/AcitivityDetail/', id]);
    }
    BlogDeails(id){
      // this.router.navigate(['/BlogDetails']);
      this.router.navigate(['/BlogDetails/', id]);
    }





    showErrorAlert() {
      Swal.fire({
        title: 'Error',
        html: ' <b style="color:red; ">No list found.</b>',
        icon: 'error'
      });
    }
  


    goBack() {
      window.history.back();
    }

}