import React, { useState } from "react";
import { StyleSheet, Text, View, Alert, TouchableOpacity, Keyboard, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { windowHeight, windowWidth } from '../utils/Dimensions';
import SubmitQueryInput from '../components/SubmitQueryInput';
import SubmitQueryModal from "../components/SubmitQueryModal";


const SubmitQuery = ({ navigation: { goBack } }) => {

  const user = auth().currentUser;

  const [concern, setConcern] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator
          animating={true}
          size="large"
          color="#38a67e" />
        <Text style={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 20 }}>Loading. Please wait...</Text>
      </View>

    )
  }

  const onSubmit = () => {
    setLoading(true)
    try {
      firestore()
        .collection('FAQs_SUBMITTED')
        .add({
          UID: user.uid,
          FullName: user.displayName,
          Email: user.email,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          Concern: concern,
          Status: 'PENDING'
        })
        .then(() => {
          console.log('Data added!');
          Alert.alert(
            "Submitted Successfully!",
            "Thank you " + user.displayName + " for using GC Infochat.\n\nKindly wait for our response in your registered E-mail.",
          );
        });
      setLoading(false)
    } catch (error) {
      console.error(error);
      return Alert.alert(err.code, err.message)
    }

  }

  const validate = async () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!concern) {
      handleError('Please input your concern.', 'concern');
      isValid = false;
    }

    if (concern.length < 15 || concern.length > 1000) {
      handleError('Your concern should be minimum of 15 characters', 'concern');
      isValid = false;
    }

    if (isValid) {
      onSubmit();
      setConcern("");
    }


  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  return (
    <View style={styles.container}>

      <View style={{ margin: 20 }}>
        <SubmitQueryModal />
        <Text style={{
          color: '#2c8162',
          fontSize: 21,
          fontFamily: 'Poppins-Medium',
          textTransform: 'uppercase',
        }}>
          Submit additional question
        </Text>

        <View style={styles.action}>

          <SubmitQueryInput
            onChangeText={text => setConcern(text)}
            value={concern}
            onFocus={() => handleError(null, 'concern')}
            iconName="comment-edit-outline"
            label="Enter Your Additional Concern"
            placeholder="What is your concern?"
            multiline={true}
            numberOfLines={3}
            textAlignVertical={'top'}
            error={errors.concern}
          />

        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => { validate(), setConcern("") }}>

            <Text
              style={styles.submitButtonTitle}>
              Submit
            </Text>

          </TouchableOpacity>
        </View>

        <Text
          onPress={() => goBack()}
          style={{
            color: colors.black,
            fontFamily: 'Poppins-Medium',
            textAlign: 'center',
            fontSize: 16,
            top: 20
          }}>
          BACK
        </Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingLeft: 10,
    textAlignVertical: 'top',
    color: '#000',
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
  },
  action: {
    // flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bababa',
    paddingBottom: 1,

  },
  submitButton: {
    width: windowWidth - 250,
    padding: 10,
    borderRadius: 25,
    backgroundColor: '#2c8162',
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonTitle: {
    fontSize: 17,
    fontFamily: 'Poppins-Medium',
    color: 'white',
  },
});

export default SubmitQuery;