import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';
import { ActivatedRoute } from '@angular/router';
// import * as $ from 'jquery'; // Import jQuery

export interface CityData {
  city: string;
}

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  cityForm: FormGroup;
  errorMessage = '';
  loading = false;
  report: SafeHtml | null = null;
  cityName: string | null = null;

  constructor(
    private fb: FormBuilder,
    private geminiService: GeminiService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute
  ) {
    this.cityForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]]
    });


  }

  // ngOnInit(): void {
  //   this.cityName = this.route.snapshot.paramMap.get('id');
  //   console.log('City Name:', this.cityName);
  //   this.onSubmit();

  //   alert('hi')

  //   if (!localStorage.getItem('foo')) {
  //     localStorage.setItem('foo', 'no reload')
  //     location.reload()
  //   } else {
  //     localStorage.removeItem('foo')
  //   }
  // }

  // ngAfterViewInit(): void {
  //   // Ensure the sidebar toggle works after the view is initialized
  //   this.initializeSidebarToggle();
  // }

  // private initializeSidebarToggle(): void {
  //   // Sidebar toggle using jQuery after view initialization
  //   $(document).ready(() => {
  //     $('[data-toggle="offcanvas"]').on('click', () => {
  //       $('.sidebar-offcanvas').toggleClass('active');
  //     });
  //   });
  // }

  ngOnInit(): void {
    this.cityName = this.route.snapshot.paramMap.get('id');
    console.log('City Name:', this.cityName);
    this.onSubmit();
  
    // alert('hi')
  
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
  }
  




  onSubmit(): void {
    if (this.cityName) {
      this.loading = true;
      this.errorMessage = '';

      const cityData: CityData = { city: this.cityName };

      this.geminiService.generateReport(cityData).subscribe({
        next: (response) => {
          const reportText = response?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from API';
          this.convertMarkdown(reportText);
        },
        error: (error) => {
          console.error('Error calling Gemini API:', error);
          this.errorMessage = 'Failed to search city. Please try again.';
          this.report = null;
        },
        complete: () => {
          this.loading = false;
        }
      });
    } else {
      this.errorMessage = 'City name is missing in URL.';
    }
  }

  private async convertMarkdown(value: string) {
    try {
      const markdown = await marked(value);
      this.report = this.sanitizer.bypassSecurityTrustHtml(markdown);
    } catch (error) {
      console.error('Error converting markdown:', error);
      this.report = this.sanitizer.bypassSecurityTrustHtml(value);
    }
  }
}
