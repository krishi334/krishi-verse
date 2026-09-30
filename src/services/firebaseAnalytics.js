import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const analyticsEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.measurementId);

export async function initFirebaseAnalytics() {
  if (!analyticsEnabled || typeof window === "undefined") {
    return null;
  }

  const supported = await isSupported().catch(() => false);

  if (!supported) {
    return null;
  }

  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  return getAnalytics(app);
}
