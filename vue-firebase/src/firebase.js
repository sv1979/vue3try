import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const firebaseConfig = {
  apiKey: 'AIzaSyDNrsLx7WVZSU4Oofq2NfQ_HfdkGywBF8E',
  authDomain: 'vue3experiment.firebaseapp.com',
  projectId: 'vue3experiment',
  storageBucket: 'vue3experiment.appspot.com',
  messagingSenderId: '1089510047119',
  appId: '1:1089510047119:web:4d69ea380cdd6537235ffa'
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

const db = firebaseApp.firestore()
const userCollection = db.collection('users')

export const createUser = user => {
  return userCollection.add(user)
}

export const getUser = async id => {
  const user = await userCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return userCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return userCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = userCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
