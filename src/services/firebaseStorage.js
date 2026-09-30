import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { firebaseConfig, getFirebaseApp } from "./firebaseApp";

function sanitizeFileName(fileName) {
  return String(fileName || "upload")
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function getStorageInstance() {
  const app = getFirebaseApp();

  if (!app || !firebaseConfig.storageBucket) {
    return null;
  }

  return getStorage(app);
}

export async function uploadPortfolioFile(file, folder) {
  const storage = getStorageInstance();

  if (!storage) {
    throw new Error("Firebase Storage is not configured.");
  }

  const safeName = sanitizeFileName(file.name);
  const uniqueName = `${Date.now()}-${safeName}`;
  const fileRef = ref(storage, `portfolio-assets/${folder}/${uniqueName}`);

  await uploadBytes(fileRef, file, {
    contentType: file.type || undefined,
  });

  return getDownloadURL(fileRef);
}
