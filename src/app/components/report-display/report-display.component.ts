import { Component, Input } from '@angular/core';

import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.scss']
})
export class ReportDisplayComponent {
  private _report: SafeHtml | string = '';
  @Input() set report(value: string) {
    if (value) {
      this.convertMarkdown(value);
    } else {
      this._report = '';
    }
  }
  get report(): SafeHtml | any {
    return this._report;
  }
  
  // private _report: SafeHtml | string = '';
  @Input() loading = false;

  constructor(private sanitizer: DomSanitizer) {}

  private async convertMarkdown(value: string) {
    try {
      const markdown = await marked(value);
      this._report = this.sanitizer.bypassSecurityTrustHtml(markdown);
    } catch (error) {
      console.error('Error converting markdown:', error);
      this._report = value; // Fallback to raw text if markdown conversion fails
    }
  }
}


