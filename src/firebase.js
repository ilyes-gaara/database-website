import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"

var firebaseConfig = {
  apiKey: "AIzaSyD6S5HbmNmyuXvMrniKBdtTLK3I7SR2S7w",
  authDomain: "ilyes-project-production.firebaseapp.com",
  databaseURL: "https://ilyes-project-production.firebaseio.com",
  projectId: "ilyes-project-production",
  storageBucket: "ilyes-project-production.appspot.com",
  messagingSenderId: "366428900950",
  appId: "1:366428900950:web:b2dbf37bcd85c8b87cb5f7"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth()
export default app
