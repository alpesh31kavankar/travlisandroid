import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
to="Halifax"
from="Ottawa"
  departureDay: string = '';
  returnDay: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private service: WebService) {

  }


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

  onSearch(form: any): void {
    this.to;
    console.log(form.value);
    // this.router.navigateByUrl('/searchinfo');
    // this.router.navigate(['/searchinfo', this.to]);
    this.router.navigate(['/searchinfo/', this.to]);
   console.log(this.to);
   
    form.reset();

  
  }
}