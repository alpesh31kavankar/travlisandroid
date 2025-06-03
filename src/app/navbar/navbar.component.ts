import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDetail } from '../Class';
import { GlobalVariable } from '../Global';
import { WebService } from '../Service';
import { Location } from '@angular/common';  // Import Location service
import { PhotoService } from '../photo.service';
import { Dropdown } from 'bootstrap';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  // @ViewChild('dropdownButton', { static: false }) dropdownButton!: ElementRef;
  userDetail: UserDetail;
  activeMenu: string | null = null;
  // data = {
  //   FName: 'Mike ',
  //   LName: 'Lazaridis'
  // };
  imageUrl12:string
  // ="GlobalVariable.BASE_API_URL+ 'Content/UserDetail/' + this.userDetail.Photo"  
  userid;
  data;
  imgPath: string = GlobalVariable.BASE_API_URL;
  
  imageUrl: string | ArrayBuffer | null = null;
  location: any;
  
  photoUrl: string | null = null;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private http: HttpClient, 
    private service: WebService,
    private photoService: PhotoService) {
    this.userDetail = new  UserDetail();

    $(function() {
      $('[data-toggle="offcanvas"]').on("click", function() {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
  
   
  }


  // ngAfterViewInit() {
  //   const dropdown = new Dropdown(this.dropdownButton.nativeElement);
  // }

  // toggleDropdown() {
  //   const dropdown = new Dropdown(this.dropdownButton.nativeElement);
  //   dropdown.toggle();
  // }


  toggleMenu(menuName: string) {
    this.activeMenu = this.activeMenu === menuName ? null : menuName;
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    const button = event.target as HTMLElement;
    const dropdown = new Dropdown(button);
    dropdown.toggle();
  }

  ngOnInit(): void {
    

   
  this.initOffcanvas();
  

    this.userid = JSON.parse(sessionStorage.getItem('SID'));
    console.log("UserID",this.userid);
    
    this.service.GetRegistrationById(this.userid).subscribe((result) => {
     this.data=result
     console.log(this.data);
   
    });


     this.service.GetAllUserDetail().subscribe((result) => {
       // console.log("All user ",result);
       
       const user = result.find((user: any) => user.RegistrationId == this.userid);
     //  console.log("Deatil user  info ",user);
       this.userDetail =user 
      
       
     
   });
  
   
  }










  Logout(){
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/Login']).then(() => {
      window.location.reload(); // Force reload to ensure that the login page is displayed fresh
    });
  }

  // goBack(): void {
  //   this.location.back();  // Navigate back to the previous page
  // } 
   goBack() {
    window.history.back();
  }

  private initOffcanvas(): void {
    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active');
      });
    });
  }

}