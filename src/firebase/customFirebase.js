import {getAuth} from "firebase/auth"
import config from "./config";
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database";
import { getStorage } from "firebase/storage";


const app = initializeApp(config.firebaseConfig)

export const auth = getAuth(app);
export const db = getDatabase(app);

export const storage = getStorage();

export default app;