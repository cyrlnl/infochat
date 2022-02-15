import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const googleLogin = async () => {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  const user_sign_in = auth().signInWithCredential(googleCredential);

  user_sign_in.then((user)=>{
    console.log(user);
  })
  .catch((error)=>{
    console.log(error);
  })
}

const createUserDb = (uid, fullName, email) => {
  return firestore().collection('users').doc(uid).set(
    {
      uid,
      fullName,
      email
    }
  )
}

// signup handling
const signUp = (fullName, email, password) => {
  if(!fullName || !email || !password){
      Alert.alert('Error', 'Please enter all fields')
  }

  return auth().createUserWithEmailAndPassword(email, password)
  .then( cred => {
      const {uid} = cred.user;

      auth().currentUser.updateProfile({
          displayName: fullName
      })

      return uid
  })
  .then( uid => createUserDb(uid, fullName, email))
  .catch(
      err => Alert.alert(err.code, err.message)
  )
}

const signIn = (email, password) => {
  if(!email || !password){
      Alert.alert('Error', 'Please enter all fields')
  }

  return auth().signInWithEmailAndPassword(email, password)
  .then(() => {})
  .catch(
      err => Alert.alert(err.code, err.message)
  )
}

const forgetPassword = (email) => {
  if(!email){
      Alert.alert('Error', 'Please enter email')
  }

  return auth().sendPasswordResetEmail(email)
}

const signOut = () => {
  return auth().signOut()
}

const Auth = {
  signUp,
  signIn,
  forgetPassword,
  signOut,
  googleLogin
}

export default Auth