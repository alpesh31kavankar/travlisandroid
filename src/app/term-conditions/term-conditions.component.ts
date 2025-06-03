import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebService } from '../Service';

@Component({
  selector: 'app-term-conditions',
  templateUrl: './term-conditions.component.html',
  styleUrls: ['./term-conditions.component.scss']
})
export class TermConditionsComponent {

  terms1: boolean = false;
  terms2: boolean = false;

 
  Id:any
  constructor(private route: ActivatedRoute, private router: Router,
    private http: HttpClient,
    private service: WebService){
      this.route.params.subscribe((params) => {
        this.Id = params['Id'];
        });

    }
  verifyEmail(){
    this.router.navigateByUrl("/VerifyEmail/" + this.Id);
  }
}
