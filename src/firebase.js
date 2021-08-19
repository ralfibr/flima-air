import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyBYnGGcIf2xoIDO9dv2mp1nAOX25AaqUMY",
  authDomain: "flimaair.firebaseapp.com",
  projectId: "flimaair",
  storageBucket: "flimaair.appspot.com",
  messagingSenderId: "617505577104",
  appId: "1:617505577104:web:20fcade886effa5e93a015",
  measurementId: "G-4GSYZFT54H"
})

export const auth = app.auth()
export default app
