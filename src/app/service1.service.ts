
import { Injectable } from '@angular/core';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

@Injectable({
  providedIn: 'root'
})
export class Service1Service {


// android id
clientId= '772278678318-msd4b4rja5q6b9meug65gu1u6ukjpcf8.apps.googleusercontent.com'
//clientId= '377742763230-nbrsmp04030uj9oaqva4kfsen1a967hi.apps.googleusercontent.com'
private user: any;
private initialized = false; // Track initialization status

constructor() {
 // this.init();
}

async init() {
 if (!this.initialized) {
   await GoogleAuth.initialize( { clientId: this.clientId,scopes: ['profile', 'email'] });
   this.initialized = true; // Mark as initialized
 }

 await GoogleAuth.initialize();
//  alert('Google initsucc');

}

async googleSignIn(): Promise<any> {
 try {
   console.log('Attempting Google Sign-In...');
   const user = await GoogleAuth.signIn();
   

  //  alert('Google Sign-In Successful! User info: ' + JSON.stringify(user));
   return user; // Return the signed-in user info
 } catch (error: unknown) {
   let errorMessage = 'Unknown error occurred.';
   let errorCode = 'No code available';
   let errorDetails = 'No details available';

   if (error instanceof Error) {
     errorMessage = error.message;
     errorCode = (error as any).code || 'No code available';
     errorDetails = (error as any).details || 'No details available';
   }

   console.error('Google Sign-In Error:', error);
   alert(`Sign-In Failed: ${errorMessage}`); // More user-friendly error alert
   throw error; // Re-throw the error to be caught in the calling function
 }
}
}