import {getAuth} from "firebase/auth"
import config from "./config";
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";


const app = initializeApp(config.firebaseConfig)

export const auth = getAuth(app);
export const db = getDatabase(app);
export const analytics = getAnalytics(app);
export const messaging = getMessaging(app);
export default app;