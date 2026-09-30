import { get, getDatabase, onValue, ref, set } from "firebase/database";
import { getFirebaseApp, firebaseConfig, isFirebaseConfigured } from "./firebaseApp";

const isConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId &&
    firebaseConfig.databaseURL,
);

let database = null;

if (isConfigured) {
  const app = getFirebaseApp();
  database = app ? getDatabase(app) : null;
}

function sanitizeSyncKey(syncKey) {
  return String(syncKey || "default")
    .trim()
    .replace(/[.$#[\]/]/g, "-")
    .slice(0, 80);
}

function getSyncRef(syncKey) {
  const key = sanitizeSyncKey(syncKey);
  return ref(database, `portfolio_sync/${key}`);
}

export function isCloudSyncEnabled() {
  return Boolean(database);
}

export async function fetchCloudPortfolioData(syncKey) {
  if (!database) {
    return null;
  }

  const snapshot = await get(getSyncRef(syncKey));

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.val();
}

export function subscribeCloudPortfolioData(syncKey, callback) {
  if (!database) {
    return () => {};
  }

  const dataRef = getSyncRef(syncKey);
  const unsubscribe = onValue(dataRef, (snapshot) => {
    if (!snapshot.exists()) {
      return;
    }

    callback(snapshot.val());
  });

  return unsubscribe;
}

export async function saveCloudPortfolioData(syncKey, payload) {
  if (!database) {
    return;
  }

  await set(getSyncRef(syncKey), payload);
}
