//import * as firebase from 'firebase'
import firebase from '@/services/firebase'

export default {
  state: {
    user: null,
    login: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload;
      state.login = payload.email;
      console.log("user.mutations: ant: "+localStorage.getItem('user_uid_anterior')+" atual: "+localStorage.getItem('user_uid'));
      localStorage.setItem('user_uid_anterior', localStorage.getItem('user_uid'));
      localStorage.setItem('user_id', payload.id);
      localStorage.setItem('user_uid', payload.uid);
      localStorage.setItem('user_email', payload.email);
      localStorage.setItem('user_database', payload.uid);
      localStorage.getItem('page_reloaded', 0);
    },
    clearUser (state, payload) {
      state.user = null;
      state.login = null;
    }
  },
  actions: {
    init ({commit}, payload) {
      firebase.getAuth().onAuthStateChanged((user) => {
        console.log('/user/index onAuthStateChanged')
        if (user) {
          console.log('/user/index onAuthStateChanged user '+user.email)
          commit('setUser', user)
        }
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGoogle ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().signInWithPopup(new firebase.getAuth().GoogleAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInFacebook ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().signInWithPopup(new firebase.getAuth().FacebookAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInGithub ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().signInWithPopup(new firebase.getAuth().GithubAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserInTwitter ({commit}) {
      commit('setLoading', true)
      commit('clearError')
      firebase.getAuth().signInWithPopup(new firebase.getAuth().TwitterAuthProvider())
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              uid: user.uid,
              name: user.displayName,
              email: user.email,
              photoUrl: user.photoURL
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        uid: user.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
    },
    logout ({commit}) {
      console.log('logout action')
      commit('clearUser', null);
      localStorage.removeItem('user_email');
      localStorage.removeItem('user_id');
      localStorage.removeItem('toNext');
      localStorage.removeItem('page_realoaded');
      firebase.getAuth().signOut()
      //commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    login (state) {
      return state.login
    }
  }
}
