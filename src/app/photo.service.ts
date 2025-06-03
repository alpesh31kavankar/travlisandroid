import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private photoSubject = new BehaviorSubject<string | null>(null);

  // Observable to subscribe to changes
  photo$ = this.photoSubject.asObservable();

  // Method to update the photo
  updatePhoto(photoUrl: string) {
    this.photoSubject.next(photoUrl);
  }
}
