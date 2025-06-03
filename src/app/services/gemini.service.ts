import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CityData } from '../components/user-form/user-form.component';


@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiKey = 'AIzaSyC2irPijtkQY42TFsQGz_AdSqCQzcLmxCE';
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor(private http: HttpClient) { }

  generateReport(userData: CityData): Observable<any> {
   

    const prompt = `Generate a city information report for the following details:  
    - City Name: ${userData.city}  
  
  Provide details about the city's weather, nearby locations, and other relevant geographical or cultural insights.`;
  
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ]
    };

    const url = `${this.apiUrl}?key=${this.apiKey}`;
    
    return this.http.post(url, requestBody).pipe(
      catchError(error => {
        console.error('Error generating report:', error);
        return throwError(() => new Error('Failed to generate report. Please try again.'));
      })
    );
  }
}
export { CityData };

