// ./src/services/firebase.js
import store from '../store'
import Firebase from 'firebase'
import firebaseConfig from './firebaseConfig'
import { isNull } from 'util';
const app = Firebase.initializeApp(firebaseConfig)
let provider = new Firebase.auth.GoogleAuthProvider()
let auth = app.auth();
let storage = app.storage()
let login = '';

export default {
  getDb () {
    console.log('getDb()');
    let db = app.database();
    db.isPersistenceEnabled = true;
    return db;
  },
  getDbUser () {
    console.log('getDbUser()');
    let dbuser = app.database();
    dbuser.isPersistenceEnabled = true;
    return dbuser;
  },
  getAuth () {
    return auth
  },
  getStorage () {
    return storage
  },
  getGoogleAuthProvider () {
    return provider
  }
}
