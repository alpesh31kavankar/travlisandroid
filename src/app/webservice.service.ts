import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdmCountryMaster, AdmStateMaster, AdmCityMaster } from '../app/Class';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private countriesUrl = 'assets/countries.json';
  private statesUrl = 'assets/states.json';
  private citiesUrl = 'assets/cities.json';

  constructor(private http: HttpClient) {}

  GetAllAdmCountryMaster(): Observable<AdmCountryMaster[]> {
    return this.http.get<AdmCountryMaster[]>(this.countriesUrl);
  }

  GetAllAdmStateMaster(): Observable<AdmStateMaster[]> {
    return this.http.get<AdmStateMaster[]>(this.statesUrl);
  }

  GetAllAdmCityMaster(): Observable<AdmCityMaster[]> {
    return this.http.get<AdmCityMaster[]>(this.citiesUrl);
  }
}
