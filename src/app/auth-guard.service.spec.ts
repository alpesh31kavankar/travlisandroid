import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';


import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebService } from 'src/app/Service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    UId: any
    constructor( private route: ActivatedRoute, private router: Router,
        private http: HttpClient,
        private service: WebService) {}
  isLoggedIn(): boolean {

    this.route.params.subscribe((params) => {
        this.UId = JSON.parse(sessionStorage.getItem('SID'));
  
      });
    // Check if the user is logged in based on your authentication mechanism
    return !!sessionStorage.getItem('SID'); // Example: Check if access token exists in sessionStorage
  }
}
