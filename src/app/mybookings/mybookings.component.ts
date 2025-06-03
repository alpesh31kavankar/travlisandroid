import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from '../Service';
import { Activities, ActivityBooking, Hotel, HotelBooking, Rooms, Travel, TravelBooking, Vehicle } from '../Class';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { GlobalVariable } from '../Global';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})
export class MybookingsComponent {
  currentSection: string = 'travel'; 
  showSection(section: string) {
    this.currentSection = section;
  }

  imgPath: string = GlobalVariable.BASE_API_URL;

  filteredHotels:Rooms[]=[]
  ActivityList:ActivityBooking[]=[]
  RomsList:Rooms[]=[]
  HotelList: HotelBooking[] = [];
  travelBookingList:any[]=[]
  traveHotelList:any[]=[]
  AcitivitylList:any[]=[]
  VList:Travel[]=[]
  UId:any
  Hotlename:any
  HotelList1: Hotel[] = [];
  Activity1: Activities[] = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private service: WebService
  ) {
    this.route.params.subscribe((params) => {
      this.UId = JSON.parse(sessionStorage.getItem('SID'));
      console.log("UId", this.UId);
    });

   
    this.service.GetAllTravelBooking().subscribe((result) => {
      console.log(result);

      // for(let data of result){
      //     this.travelBookingList.push(data);   
      // }    
      this.travelBookingList = result.filter(hotel => hotel.RegistrationId == this.UId); 
           console.log("travelBookingList",this.travelBookingList);
    });

////////////////////////////////////////////////////////////////////////////////////

    this.service.GetAllHotelBooking().subscribe((result) => {
      // console.log(result);
      for(let data of result){
          this.traveHotelList.push(data);   
      }     
           console.log(".traveHotelList",this.traveHotelList);
    });
    

    this.service.GetAllActivityBooking().subscribe((result) => {
      // console.log(result);
      for(let data of result){
          this.AcitivitylList.push(data);   
      }     
           console.log(".Activity Booking list",this.traveHotelList);
    });

  }

  





  ngOnInit(): void {
    this.getHotels();
   this.AllTravel()
  this. getActivity()
this. getRooms();
  this.getHotels1();
  this.getAllActivity()


  if (!localStorage.getItem('foo')) { 
    localStorage.setItem('foo', 'no reload') 
    location.reload() 
  } else {
    localStorage.removeItem('foo') 
  }
  }


  getRooms(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllRooms().subscribe((data: any[]) => {
      this.RomsList=data;
    //this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
  

      console.log("All RomsList List Data:", this.RomsList);
   
    });
  }

  getHotels1(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllHotel().subscribe((data: any[]) => {
      this.HotelList1=data;
    //this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
  

      console.log("All Hotel List Data:", this.HotelList1);
   
    });
  }


  getAllActivity(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllActivities().subscribe((data: any[]) => {
      
      this.Activity1 = data
  

      console.log("All ActivityList List Data:", this.HotelList);
   
    });
  }


  getHotels(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllHotelBooking().subscribe((data: any[]) => {
     // this.HotelList=data;
    this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
  

      console.log("All HotelBooking List Data:", this.HotelList);
   
    });
  }


  getActivity(): void {
    // this.service.GetAllHotel().subscribe(data => {
    //   this.HotelList = data;
    //   console.log("Hotel Data is ",data);
      
    // });
    this.service.GetAllActivityBooking().subscribe((data: any[]) => {
      
      this.ActivityList = data.filter(hotel => hotel.RegistrationId == this.UId);
  

      console.log("All HotelBooking List Data:", this.HotelList);
   
    });
  }



  AllTravel(){

    this.service.GetAllTravel().subscribe((result) => {
       
     
      this.VList = result;
      // console.log( "All Vendor list ", this.VList);
        console.log( "All vList list ",this.VList );
      });
      
    }


  // getVechical(): void {
  //   // this.service.GetAllHotel().subscribe(data => {
  //   //   this.HotelList = data;
  //   //   console.log("Hotel Data is ",data);
      
  //   // });
  //   this.service.GetAllVehicle().subscribe((data: any[]) => {
  //     this.VList=data
  //     this.HotelList = data.filter(hotel => hotel.RegistrationId == this.UId);
  

  //     console.log("All TravelBooking List Data:", this.HotelList);
   
  //   });
  // }

  //==========================================================================================


  getTrvel(VehicleId: number): string {
    const filteredHotels = this.VList.filter(trs => trs.TravelId == VehicleId);
    // console.log("my to is",filteredHotels);
    
    const hotelNames = filteredHotels.map(trs => trs.To);
  

      // console.log("my to:", hotelNames);
    
      // Join names with a comma separator, or return 'No names available' if none found
      return hotelNames.length > 0 ? hotelNames.join(', ') : 'No names available';

  }

  getTrvelFrom(VehicleId: number): string {
    const filteredHotels = this.VList.filter(trs => trs.TravelId == VehicleId);
    // console.log("my to is",filteredHotels);
    
    const hotelNames = filteredHotels.map(trs => trs.From);
  

      // console.log("my to:", hotelNames);
    
      // Join names with a comma separator, or return 'No names available' if none found
      return hotelNames.length > 0 ? hotelNames.join(', ') : 'No names available';

  }


  getDept(VehicleId: number): string {
    const filteredHotels = this.VList.filter(trs => trs.TravelId == VehicleId);
    // console.log("my to is",filteredHotels);
    
    const hotelNames = filteredHotels.map(trs => trs.Departure);
  

      // console.log("my to:", hotelNames);
    
      // Join names with a comma separator, or return 'No names available' if none found
      return hotelNames.length > 0 ? hotelNames.join(', ') : 'No names available';

  }

  getArv(VehicleId: number): string {
    const filteredHotels = this.VList.filter(trs => trs.TravelId == VehicleId);
    // console.log("my to is",filteredHotels);
    
    const hotelNames = filteredHotels.map(trs => trs.Arrival);
  

      // console.log("my to:", hotelNames);
    
      // Join names with a comma separator, or return 'No names available' if none found
      return hotelNames.length > 0 ? hotelNames.join(', ') : 'No names available';

  }



  getHotelname(Roomsid: number): string {
    console.log("my room id is ",Roomsid);
    
    this.filteredHotels = this.RomsList.filter(trs => trs.RoomsId == Roomsid);
    console.log("my Holte name",this.filteredHotels);
    // this. Hotlename=this.filteredHotels.hotel.HotelName


    this.Hotlename = this.filteredHotels.map(trs => trs.hotel.HotelName);
  

      console.log("my to:", this.Hotlename);
    
      // Join names with a comma separator, or return 'No names available' if none found
      return this.Hotlename.length > 0 ? this.Hotlename.join(', ') : 'No names available';

  }

  getHotelImage(UId: number): string {
    const filteredHotels = this.HotelList1.filter(hotel => hotel.RegistrationId === UId);

    if (filteredHotels.length > 0) {
      return filteredHotels[0].Image;
    } else {
      return 'NoImageAvailable.png';
    }
  }



//   getActivityImage(UId ) {
//     console.log("Regstration id",UId);
    
//     const filteredHotels1 = this.Activity1.filter(hotel => hotel.CreatedBy == UId);
// console.log("ActivityImage",filteredHotels1 );

//     if (filteredHotels1.length > 0) {
//       return filteredHotels1[0].Image;
//     } else {
//       return 'NoImageAvailable.png';
//     }
//   }

  getActivityImage(UId): string {
    console.log("Registration ID", UId);

    // Filter activities based on CreatedBy (UId)
    const filteredActivities = this.Activity1.filter(activity => activity.CreatedBy == UId);
    console.log("Filtered Activity Image", filteredActivities);

    // Return the image or a default image if no match is found
    if (filteredActivities.length > 0 && filteredActivities[0].Image) {
      return filteredActivities[0].Image;  // Return the image if found
      
    } else {
      return 'NoImageAvailable.png';  // Default image if no activity found
    }
  }



  downloadPDF() {
    const DATA = document.getElementById('travel-data');
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgHeight = (canvas.height * 208) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 10, 208, imgHeight);
        pdf.save('travel_bookings.pdf');
      });
    }
  }

  // downloadPDF1() {
  //   const DATA = document.getElementById('hotel-booking-data');
  //   if (DATA) {
  //     html2canvas(DATA).then(canvas => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const imgHeight = (canvas.height * 208) / canvas.width;
  //       pdf.addImage(imgData, 'PNG', 0, 10, 208, imgHeight);
  //       pdf.save('hotel_bookings.pdf');
  //     });
  //   }
  // }


  

  downloadPDF2() {
    const DATA = document.getElementById('Activity-booking-data');
    if (DATA) {
      html2canvas(DATA).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgHeight = (canvas.height * 208) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 10, 208, imgHeight);
        pdf.save('hotel_bookings.pdf');
      });
    }
  }


  downloadPDF1(index: number): void {
    const elementId = `hotel-section-${index}`;
    const element = document.getElementById(elementId);

    if (!element) {
      console.error(`Element with id "${elementId}" not found!`);
      return;
    }

    // Generate PDF
    html2canvas(element, {
      scale: 2, // Increase resolution
      useCORS: true, // Enable cross-origin handling
      allowTaint: false, // Prevent tainting
    })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Hotel_Booking_${index + 1}.pdf`);
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }
}


