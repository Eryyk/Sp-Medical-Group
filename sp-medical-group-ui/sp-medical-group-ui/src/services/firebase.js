import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBMpwTVQwrVJbNLqAfmb1G6CC1EamnrXls",
    authDomain: "sp-medical-group-eryk.firebaseapp.com",
    databaseURL: "https://sp-medical-group-eryk.firebaseio.com",
    projectId: "sp-medical-group-eryk",
    storageBucket: "sp-medical-group-eryk.appspot.com",
    messagingSenderId: "945811702109",
    appId: "1:945811702109:web:c5ad560d5f3406ea"
};

firebase.initializeApp(firebaseConfig);

export default firebase;