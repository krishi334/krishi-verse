import { getAnalytics, isSupported } from "firebase/analytics";
import { firebaseConfig, getFirebaseApp } from "./firebaseApp";

const analyticsEnabled = Boolean(firebaseConfig.apiKey && firebaseConfig.appId && firebaseConfig.measurementId);

export async function initFirebaseAnalytics() {
  if (!analyticsEnabled || typeof window === "undefined") {
    return null;
  }

  const supported = await isSupported().catch(() => false);

  if (!supported) {
    return null;
  }

  const app = getFirebaseApp();

  if (!app) {
    return null;
  }

  return getAnalytics(app);
}
