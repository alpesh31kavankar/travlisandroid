import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isNavOpen = false;
  // onExploreClick(location: string) {
    onExploreClick(location: string) {
    console.log(`Exploring ${location}`);
    // Add your navigation or other logic here
  }



  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }


}
