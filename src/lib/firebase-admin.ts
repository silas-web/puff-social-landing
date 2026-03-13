import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseAdmin() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  // On Firebase App Hosting, the admin SDK auto-initializes with the project's credentials.
  // For local development, set GOOGLE_APPLICATION_CREDENTIALS env var to your service account key path,
  // or provide FIREBASE_PROJECT_ID env var.
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY) as ServiceAccount;
    return initializeApp({
      credential: cert(serviceAccount),
    });
  }

  // Auto-initialization for App Hosting / Cloud environments
  return initializeApp();
}

const app = getFirebaseAdmin();
export const db = getFirestore(app);
