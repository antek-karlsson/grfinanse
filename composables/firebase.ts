import { initializeApp, type FirebaseOptions } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export function useFirebase() {
  const config = useRuntimeConfig();
  const firebaseConfig = {
    apiKey: config.public.firebaseApiKey,
    authDomain: config.public.firebaseAuthDomain,
    projectId: config.public.firebaseProjectId,
    storageBucket: config.public.firebaseStorageBucket,
    messagingSenderId: config.public.firebaseMessagingSenderId,
    appId: config.public.firebaseAppId,
  } as FirebaseOptions;
  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);

  async function getImgUrl(imgSrc: string) {
    try {
      let downloadUrl = '';
      await getDownloadURL(ref(storage, imgSrc)).then((url) => {
        downloadUrl = url;
      });

      return downloadUrl;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  return {
    firebaseApp,
    db,
    storage,
    getImgUrl,
  };
}
