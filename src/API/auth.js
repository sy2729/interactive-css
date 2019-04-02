import firebase from "firebase";
import extract from '../utils/extractUserInfo';
import tokenActions from './axios/token';

var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


const getToken = ()=> {
  return firebase.auth().currentUser.getIdToken(true);
}

export const login = ()=> {
  return firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    return extract(user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

export const getUser = ()=> {
  let user = firebase.auth().currentUser; 
    //set the token for later axios request to the restful api 
    getToken().then(token=> {
      tokenActions.setToken(token)
    })
  return extract(user);
};

export const logOut = ()=> {
  return firebase.auth().signOut().then(function() {
    // Sign-out successful.
    //clear the auth token
    tokenActions.deleteToken();
  }).catch(function(error) {
    // An error happened.
  });
};

export const initGet = ()=> {
  return firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token)
    }
    // The signed-in user info.
    var user = result.user;
    console.log(user)
    
    return user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
};

export const observer = ()=> {
  return new Promise((res, rej)=> {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        //set the token for later axios request to the restful api 
        getToken().then(token=> {
          tokenActions.setToken(token)
        })
        return res(extract(user))
      } else {
        // No user is signed in.
        return undefined;
      }
    })
  })
}