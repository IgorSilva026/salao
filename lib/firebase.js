import { initializeApp, getApp, getApps } from 'firebase/app';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {initializeAuth,getAuth,getReactNativePersistence} from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJWznsxvARwvRZWQqo_HibBBCaOE3jLeM",
  authDomain: "atividade-8564b.firebaseapp.com",
  projectId: "atividade-8564b",
  storageBucket: "atividade-8564b.firebasestorage.app",
  messagingSenderId: "208077311864",
  appId: "1:208077311864:web:9d647a39c10ea28c35828d"
};

const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApp();

let auth;

try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (error) {
  auth = getAuth(app);
}

export { auth };
export const db = getFirestore(app);