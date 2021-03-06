// import React from 'react';
import app from '../../../../node_modules/firebase/app';
import '../../../../node_modules/firebase/auth';
import '../../../../node_modules/firebase/database';
import API from "../../utils/API";
 
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};
console.log(config);
 
class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

    // *** Auth API ***
 
    doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password).then(function(createdUser) {
      //console.log(createdUser.user.email)
      API.insertUser({
        userid: createdUser.user.email
      })
      .then(res => {       
        console.log(res)
        if (res.data.status === "error") {
            throw new Error(res.data.message);
        }   
      })
      .catch(err => console.log(err)); 
    });

    doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
 
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
    
          // *** User API ***
  
    user = uid => this.db.ref(`users/${uid}`);
  
    users = () => this.db.ref('users');
}
 
export default Firebase;