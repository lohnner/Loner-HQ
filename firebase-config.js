export const firebaseConfig = {
  apiKey: "COLE_SUA_API_KEY_AQUI",
  authDomain: "loner-hq.firebaseapp.com",
  projectId: "loner-hq",
  storageBucket: "loner-hq.appspot.com",
  messagingSenderId: "290842361996",
  appId: "COLE_SEU_APP_ID_AQUI"
};

export const firebaseReady = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.appId &&
    !firebaseConfig.apiKey.includes("COLE_") &&
    !firebaseConfig.appId.includes("COLE_")
);
