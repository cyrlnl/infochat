import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation, NavigationContainer } from '@react-navigation/native';


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
      Alert.alert('GOOGLE_SIGN_IN_CANCELLED');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('GOOGLE_SIGN_IN_PROGRESS');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
      Alert.alert('Something went wrong', error.toString());
      this.setState({
        error,
      });
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
            phone: '',
            course: '',
            department: '',
            organization: '',
            createdAt: firestore.Timestamp.fromDate(new Date()),
            userImg: auth().currentUser.photoURL,
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
      Alert.alert('GOOGLE_SIGN_UP_CANCELLED');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      Alert.alert('GOOGLE_SIGN_UP_PROGRESS');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      Alert.alert('PLAY_SERVICES_NOT_AVAILABLE');
    } else {
      Alert.alert('Something went wrong', error.toString());
      this.setState({
        error,
      });
    }
  }

}

const createUserDb = (uid, fullName, email, phone, department, course, organization) => {
  return firestore().collection('users').doc(uid).set(
    {
      uid,
      fullName,
      email,
      phone,
      department,
      course,
      organization,
      status: 'Guest',
      createdAt: firestore.Timestamp.fromDate(new Date())
    }
  )
}

// SIGNUP handling
const signUp = (fullName, email, password, phone, department, course, organization) => {
  try {
    return auth().createUserWithEmailAndPassword(email, password)
      .then(cred => {
        const { uid } = cred.user;

        auth().currentUser.updateProfile({
          displayName: fullName
        })

        return uid
      })
      .then(uid => createUserDb(uid, fullName, email, phone, department, course, organization))
      .then(() => {
        auth().currentUser.sendEmailVerification();
        auth().signOut();
        Alert.alert(
          'SUCCESSFULLY REGISTERED',
          'Thank you for registering. We sent a verification link to your registered e-mail address.\n\nPlease, check you inbox and verify yourself to continue.'
        );
      })


  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      Alert.alert('That email address is already in use!');
      console.log('That email address is already in use!');
    }
    if (error.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
      console.log('That email address is invalid!');
    }
    console.error(error);
  }
}


// LOGIN
const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          Alert.alert('There is no user record. The user may have been deleted. Try again.');
          console.log('There is no user record. The user may have been deleted.');
        }
        if (error.code === 'auth/invalid-email') {
          Alert.alert('That email address is invalid!');
          console.log('That email address is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          Alert.alert('The password is invalid or the user does not have a password.');
          console.log('The password is invalid or the user does not have a password.');
        }
        if (error.code === 'auth/too-many-requests') {
          Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later.');
          console.log('We have blocked all requests from this device due to unusual activity. Try again later.');
        }
        console.error(error);
      });
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      Alert.alert('There is no user record. The user may have been deleted. Try again.');
      console.log('There is no user record. The user may have been deleted.');
    }
    if (error.code === 'auth/invalid-email') {
      Alert.alert('That email address is invalid!');
      console.log('That email address is invalid!');
    }
    if (error.code === 'auth/wrong-password') {
      Alert.alert('The password is invalid or the user does not have a password.');
      console.log('The password is invalid or the user does not have a password.');
    }
    if (error.code === 'auth/too-many-requests') {
      Alert.alert('We have blocked all requests from this device due to unusual activity. Try again later.');
      console.log('We have blocked all requests from this device due to unusual activity. Try again later.');
    }
    console.error(error);
    // return Alert.alert(err.code, err.message)
  }
}

const forgotPassword = async (email) => {
  if (!email) {
    Alert.alert('Error', 'Please enter email')
  }

  console.log("reset email sent to " + email);
  try {
    await auth().sendPasswordResetEmail(email, null);
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
  } catch (e) {
    console.log(e);
  }
}

// const signOut = async () => {
//   await auth().signOut();
//   Alert.alert(
//     'Logging out...',
//     'Your are now signed out.'
//   );
// }

const signOut = async () => {
  try {
    // await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    auth()
      .signOut()
      .then(() => {
        Alert.alert(
          'LOGGING OUT... ',
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