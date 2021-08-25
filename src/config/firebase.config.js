import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ9iRz7Lrre8Et6eEwAU2UEOyBdwEixo8',
  authDomain: 'image-api-2021.firebaseapp.com',
  projectId: 'image-api-2021',
  storageBucket: 'image-api-2021.appspot.com',
  messagingSenderId: '302526371180',
  appId: '1:302526371180:web:b331efc52f609c774d0f49',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
