export const firebaseConfig = {
  apiKey: "AIzaSyCfHLrtPMnLtfU-PvsVf5QCOXKmuZya51I",
  authDomain: "loner-hq.web.app",
  projectId: "loner-hq",
  storageBucket: "loner-hq.firebasestorage.app",
  messagingSenderId: "290842361996",
  appId: "1:290842361996:web:f1010f32a520a7148f7ba9",
  measurementId: "G-0X2Y1KQFEE"
};

export const firebaseReady = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.appId &&
    !firebaseConfig.apiKey.includes("COLE_") &&
    !firebaseConfig.appId.includes("COLE_")
);
