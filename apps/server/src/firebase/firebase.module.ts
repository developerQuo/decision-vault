import { Global, Module, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Global()
@Module({
  providers: [
    {
      provide: 'FIREBASE_APP',
      useFactory: () => {
        // Only initialize if not already initialized (prevent hot-reload issues)
        if (admin.apps.length === 0) {
          // Check for service account path or use default credentials (e.g. env vars)
          // For now, I'm assuming default Google Application Credentials or existing env setup.
          // In a real scenario we might do admin.credential.cert(serviceAccount)

          return admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            projectId: process.env.FIREBASE_PROJECT_ID, // Explicitly set project ID
            // databaseURL: "https://<YOUR-PROJECT-ID>.firebaseio.com" // Recommended if using RTDB
          });
        }
        return admin.app();
      },
    },
  ],
  exports: ['FIREBASE_APP'],
})
export class FirebaseModule implements OnModuleInit {
  onModuleInit() {
    console.log('Firebase Module Initialized');
  }
}
