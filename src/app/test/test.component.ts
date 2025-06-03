import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {
//   toggleOn: boolean = true; // Used to toggle visibility
//   popularMovies: any[] = []; // Array to hold movie data

//   constructor() { }

//   ngOnInit(): void {
//     // Dummy data with multiple movie details
//     this.popularMovies = [
//       {
//         id: 1,
//         title: 'The Shawshank Redemption',
//         vote_average: 9.3,
//         poster_path: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg'
//       },
//       {
//         id: 2,
//         title: 'The Godfather',
//         vote_average: 9.2,
//         poster_path: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg'
//       },
//       {
//         id: 3,
//         title: 'The Dark Knight',
//         vote_average: 9.0,
//         poster_path: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg'
//       },
//       {
//         id: 4,
//         title: 'Inception',
//         vote_average: 8.8,
//         poster_path: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg'
//       },
//       {
//         id: 5,
//         title: 'Fight Club',
//         vote_average: 8.8,
//         poster_path: 'https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg'
//       },
//       {
//         id: 6,
//         title: 'Pulp Fiction',
//         vote_average: 8.9,
//         poster_path: 'https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg'
//       }
//     ];
//   }
// }

checkIn: string | null = null;
  checkOut: string | null = null;
  today: string = ''; // Stores today's date as a string
  minCheckOutDate: string = ''; // Minimum date for check-out
  totalDays: number | null = null;

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0]; // Set today's date
  }

  // Update the minimum check-out date to be at least the next day after check-in
  updateCheckOutMinDate(): void {
    if (this.checkIn) {
      const checkInDate = new Date(this.checkIn);
      checkInDate.setDate(checkInDate.getDate() + 1); // Set to next day
      this.minCheckOutDate = checkInDate.toISOString().split('T')[0];
    }
  }

  // Calculate the total number of days between check-in and check-out
  calculateTotalDays(): void {
    if (this.checkIn && this.checkOut) {
      const checkInDate = new Date(this.checkIn);
      const checkOutDate = new Date(this.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      this.totalDays = timeDiff / (1000 * 3600 * 24); // Convert milliseconds to days
    }
  }
}