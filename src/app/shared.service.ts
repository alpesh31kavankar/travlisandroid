import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private refreshSubject = new BehaviorSubject<boolean>(false);

  // Observable to listen for refresh events
  refresh$ = this.refreshSubject.asObservable();

  // Trigger refresh event
  triggerRefresh() {
    this.refreshSubject.next(true);
  }
}