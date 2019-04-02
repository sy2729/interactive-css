import firebase from "firebase";
import config from './config';
import { login, getUser, logOut, observer } from './auth';
import axios from './axios';

firebase.initializeApp(config);
// firebase.auth().languageCode = 'en';



let API = {
  // auth: firebase.auth(),
  db: firebase.database(),
  auth: { login, getUser, logOut, observer }
}

API = Object.assign({}, API, axios)


export default API



// https://interactive-css.firebaseio.com/course.json?auth=tokenID