import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAM1rgIb_2SHl2dgiFh1X-xiSE2Rcthc5M",
  authDomain: "reactlinks-335e6.firebaseapp.com",
  projectId: "reactlinks-335e6",
  storageBucket: "reactlinks-335e6.appspot.com",
  messagingSenderId: "906157447045",
  appId: "1:906157447045:web:73ddd53b33892f92bb56ec"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);