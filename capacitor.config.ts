import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.travlis.app',
  appName: 'travlis',
  webDir: 'www',
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
     // androidClientId: '377742763230-nbrsmp04030uj9oaqva4kfsen1a967hi.apps.googleusercontent.com',
     // serverClientId:'377742763230-abhplhvcfv8dbs4mcdgu34lbkr67h47a.apps.googleusercontent.com',  // Replace with your Android client ID
      clientId: '772278678318-msd4b4rja5q6b9meug65gu1u6ukjpcf8.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
     }
     }
};

export default config;
