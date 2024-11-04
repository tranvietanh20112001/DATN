// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBsbVEc1SxRt7hKBEdJfVcYnwI4vBBUfuo",
    authDomain: "datn-2ae1f.firebaseapp.com",
    projectId: "datn-2ae1f",
    storageBucket: "datn-2ae1f.appspot.com",
    messagingSenderId: "219343533257",
    appId: "1:219343533257:web:79f5dc468b4f457e6d8918",
    measurementId: "G-FV2LELCJ1T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage();

const uploadFileToFirebase = async (folder: string, file: File): Promise<string> => {
  const storageRef = ref(storage, `${folder}/${file.name}`);

  return new Promise((resolve, reject) => {
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url: string) => resolve(url))
          .catch((err: string) => reject(err));
      })
      .catch((err: string) => reject(err));
  });
};

export const uploadManyFilesToFirebase = async (folder: string, files: File[]): Promise<string[]> => {
  const uploadPromises = files.map((file) =>
    new Promise<string>((resolve, reject) => {
      const storageRef = ref(storage, `${folder}/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          getDownloadURL(snapshot.ref)
            .then((url: string) => resolve(url))
            .catch((err: string) => reject(err));
        })
        .catch((err: string) => reject(err));
    })
  );

  return Promise.all(uploadPromises);
};

export default uploadFileToFirebase;
