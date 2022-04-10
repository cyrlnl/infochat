import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  Image
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';

// service
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormButton from '../components/Button';


const EditProfile = () => {

  const user = auth().currentUser;
  // console.log(user);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState(null);
  
  const isFocused = useIsFocused();

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log('User Data', documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      })
  }

  const pickImageFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  }

  const handleUpdate = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        department: userData.department,
        course: userData.course,
        status: userData.status,
        organization: userData.organization,
        userImg: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          "Profile Updated!",
          "Thank you " + user.displayName + "\nYour profile has been successfully updated.",
        );
      })
  }
  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
        100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);

      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };


  useEffect(() => {
    getUser();
  }, [isFocused])

  return (
    <ScrollView style={styles.container}>
      <View style={{ margin: 20 }}>

        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => pickImageFromGallery()}>
            <View style={{
              height: 100,
              width: 100,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <ImageBackground
                source={{
                  uri: image
                    ? image
                    : userData
                      ? userData.userImg ||
                      'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938'
                      : 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=BrflGRbo6QAAX-SHglx&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-Pk6FxXdw7wPRLATTg-jxmuFlAVu1Lm4D2-OWMccy8yw&oe=62488938',
                }}
                style={{ height: 100, width: 100 }}
                imageStyle={{ borderRadius: 15, borderWidth: 1, borderColor: '#999' }}
              >
                <View style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon
                    name='camera'
                    size={35}
                    color="#333"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderColor: '#999',
                      borderWidth: 1,
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>

          <Text style={{ marginTop: 10, fontSize: 24, fontWeight: 'bold', color: 'black' }}>
            {userData ? userData.fullName : ''}
          </Text>

        </View>

        <View style={styles.action}>
          <FontAwesome name='user-o' size={23} color='#235b93' />
          <TextInput
            // onChangeText={(txt) => setUserData({ ...userData, fullName: txt })}
            placeholder='Full Name'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.fullName : ''}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Icon name='email-outline' size={23} color='#235b93' />
          <TextInput
            placeholder='E-mail address'
            keyboardType='email-address'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.email : ''}
            // onChangeText={(txt) => setUserData({ ...userData, email: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Icon name='list-status' size={23} color='#235b93' />
          <TextInput
            placeholder='Status "Student" or "Guest"'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.status : ''}
            // onChangeText={(txt) => setUserData({ ...userData, status: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Feather name='phone' size={23} color='#235b93' />
          <TextInput
            placeholder='Contact No.'
            keyboardType='number-pad'
            maxLength={11}
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.phone : ''}
            onChangeText={(txt) => setUserData({ ...userData, phone: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Icon name='office-building-marker-outline' size={23} color='#235b93' />
          <TextInput
            placeholder='Department'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.department : ''}
            onChangeText={(txt) => setUserData({ ...userData, department: txt })}
            style={styles.textInput}
          />
        </View>

        <View style={styles.action}>
          <Ionicons name='book-outline' size={23} color='#235b93' />
          <TextInput
            placeholder='Course'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.course : ''}
            onChangeText={(txt) => setUserData({ ...userData, course: txt })}
            style={styles.textInput}
          />
        </View>



        <View style={styles.action}>
          <FontAwesome5 name='school' size={20} color='#235b93' />
          <TextInput
            placeholder='Organization'
            placeholderTextColor='#666666'
            autoCorrect={false}
            value={userData ? userData.organization : ''}
            onChangeText={(txt) => setUserData({ ...userData, organization: txt })}
            style={styles.textInput}
          />
        </View>

        {uploading ? (
          <View style={styles.statusWrapper}>
            <Text>{transferred} % Completed!</Text>
            <ActivityIndicator size="large" color="#235b93" />
          </View>
        ) : (
          <TouchableOpacity style={styles.commandButton} onPress={handleUpdate}>
            <Text style={styles.panelButtonTitle}>Update</Text>
          </TouchableOpacity>
        )}


      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  statusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#235b93',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    width: '100%',
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#2e64e5',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#bababa',
    paddingBottom: -1,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginBottom: -10,
    marginTop: Platform.OS === 'ios' ? 0 : -10,
    paddingLeft: 15,
    color: '#333333',
  },
});


export default EditProfile