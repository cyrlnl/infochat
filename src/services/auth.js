import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const googleSignIn = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then((user) => {
      console.log(user);
    })
      .catch((error) => {
        console.log(error);
      })
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('Cancel');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
    }
  }

}

const googleSignUp = async () => {
  try {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);

    user_sign_in.then((user) => {
      console.log(user);
    })
      .then(() => {
        //   //Once the user creation has happened successfully, we can add the currentUser into firestore
        //   //with the appropriate details.
        console.log('current User', auth().currentUser);
        firestore().collection('users').doc(auth().currentUser.uid)
          .set({
            fullName: auth().currentUser.displayName,
            status: 'Guest',
            email: auth().currentUser.email,
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: null,
          })
          //ensure we catch any errors at this stage to advise us if something does go wrong
          .catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
          })
      })
      //we need to catch the whole sign up process if it fails too.
      .catch(error => {
        console.log('Something went wrong with sign up: ', error);
      });
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      alert('Cancel');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      alert('Signin in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      alert('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
    }
  }

}

const createUserDb = (uid, fullName, email, status) => {
  return firestore().collection('users').doc(uid).set(
    {
      uid,
      fullName,
      email,
      status,
      createdAt: firestore.Timestamp.fromDate(new Date())
    }
  )
}

// SIGNUP handling
const signUp = (fullName, status, email, password) => {
  if (!fullName || !status || !email || !password) {
    Alert.alert('Error', 'Please enter all fields')
  }

  return auth().createUserWithEmailAndPassword(email, password)
    .then(cred => {
      const { uid } = cred.user;

      auth().currentUser.updateProfile({
        displayName: fullName
      })

      return uid
    })
    .then(uid => createUserDb(uid, fullName, email, status))
    .catch(
      err => Alert.alert(err.code, err.message)
    )
}


// LOGIN
const signIn = (email, password) => {
  if (!email || !password) {
    Alert.alert('Error', 'Please enter all fields')
  }

  return auth().signInWithEmailAndPassword(email, password)
    .then(() => { })
    .catch(
      err => Alert.alert(err.code, err.message)
    )
}

const forgotPassword = (email) => {
  if (!email) {
    Alert.alert('Error', 'Please enter email')
  }

  console.log("reset email sent to " + email);
  return auth().sendPasswordResetEmail(email, null)
    .then(() => {
      Alert.alert(
        "Password Reset",
        "Password reset email sent to " + '"' + email + '"' + "\nPlease check your registered E-mail. Thank you.",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirm", onPress: () => console.log("Confirm Pressed") }
        ]
      );
    })
    .catch(function (e) {
      console.log(e);
    });
}

// const signOut = () => {
//   return auth().signOut()
// }

const signOut = async () => {
  try {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => {
        Alert.alert(
          'Logging out...',
          'Your are now signed out.'
        )
      });
  } catch (error) {
    console.error(error);
  }
};

const Auth = {
  signUp,
  signIn,
  forgotPassword,
  signOut,
  googleSignIn,
  googleSignUp
}

export default Auth