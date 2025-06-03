import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../components/environment/environment';
import { UserData } from '../components/user-form/user-form.component';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private apiUrl = environment.geminiApiUrl; // Use environment variable

  constructor(private http: HttpClient) {}

  generateReport(userData: UserData): Observable<any> {
    const prompt = `Generate a fitness report for a person with the following details:
    - Name: ${userData.name}
    - Age: ${userData.age}
    - Gender: ${userData.gender}
    - Weight: ${userData.weight} kg
    - BMI Category: ${userData.bmi}
    - Preferred Diet Plan: ${userData.dietPlan}
    - State of Residence in India: ${userData.state}

    Please include personalized diet recommendations (including Indian foods specific to their region), exercise suggestions, and health insights based on this information. Consider regional dietary habits and preferences from their state in India.`;

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    return this.http.post(this.apiUrl, requestBody);
  }
}
