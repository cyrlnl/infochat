import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Card, Button } from 'react-native-elements';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { Dialogflow_V2 } from 'react-native-dialogflow';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { dialogflowConfig } from '../env';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by
LogBox.ignoreAllLogs();//Ignore all log notifications

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const botAvatar = require('../assets/logo.png')

const BOT = {
  _id: 2,
  name: 'GC Bot',
  avatar: botAvatar
}

class Chatbot extends Component {

  state = {
    messages: [],
    id: 1,
    name: ''
  };

  // STORE CONVERSATION
  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );

    const { name, id } = this.props.route.params;

    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .orderBy('createdAt', 'desc')
      .limit(15)
      .get()
      .then((snapshot) => {

        let messages = snapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: doc.text,
            createdAt: new Date().getTime(),
            ...firebaseData
          }

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.name
            }
          }
          return data;
        })

        if (messages.length > 0) {
          this.setState({ name, id, messages });
        } else {
          this.setState({
            name,
            id,
            messages: [
              {
                _id: 3,
                text: 'Here are the Curricular Programs Available in Gordon College.',
                createdAt: new Date().getTime(),
                user: BOT,
                categoryOption: true,
                data: [
                  {
                    title: 'FAQs',
                    text: 'Frequently Asked Questions\n \n1. What are your Curricular Program Offerings?\n \n2. Where could I send an inquiry or concern?\n \n3. Where is GC Satellite Office located to request for documents or pay my dues?'
                  },
                  {
                    title: 'General',
                    text: 'General Queries\n \n1. Calendar of Activities for Second Semester A.Y. 2021-2022.\n \n2. Gordon College Curricular Program Offerings.\n \n3. GC SSC Concern.\n \n4. How to request an appointment to visit the GC Satellite Office?',
                  },
                  {
                    title: 'Records and Classes',
                    text: "Student Records and Classes\n \n1. Adding/Dropping of Classes via GC Student Portal.\n \n2. Online Request for Student Records.\n \n3. Adding/Dropping of Classes.\n \n4. Application for Permit for Leave of Absence.\n \n5. Application for Discontinuance of Studies/Withdrawal from the Institution.\n \n6. How to Activate my GC Domain Email?"
                  },
                  {
                    title: 'Finance',
                    text: 'Finance Queries\n \n1. Alternative Modes of Payment (Wire Transfer/Bank Deposit).'
                  },
                  {
                    title: 'Enrollment & Admission',
                    text: 'Enrollment & Admission Queries\n \n1. Enrollment 2021-2022'
                  },
                  {
                    title: 'Education',
                    text: 'Education Queries\n \n1. Certificate of Registration (COR for Academic Year 2021-2022)'
                  }
                ]
              },
              {
                _id: 2,
                // text: `Hello, ${this.props.route.params.name}. My name is GC Bot`,
                text: `Hello my name is GC Bot`,
                createdAt: new Date().getTime(),
                user: BOT,
              },
              {
                _id: 1,
                text: 'Welcome to Gordon College Infochat!',
                createdAt: new Date().getTime(),
                user: BOT,
              },
            ],
          });
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  // GOOGLE RESPONSE
  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  // BOT RESPONSE
  sendBotResponse(text) {

    let msg;

    if (text == 'programs') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Do you want to browse each department available courses?',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else if (text == 'show programs') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Sample Message',
        createdAt: new Date().getTime(),
        user: BOT,
        programOptions: true,
        data: [
          {
            title: 'Institute of Graduate\nStudies Department',
            image: 'https://i.ibb.co/Swt3gZP/gclogo.png',
            text: 'Institute of Graduate Studies\n \n1. Master of Arts in Nursing (MAN)\n \n2. Major in Administration of Nursing Schools & Services\n \n3. Master in Business Management (MBM)\n \n4. Master in Public Administration (MPA)\n \n5. Master of Arts in Education (MAEd) Major in Educational Management',

          },
          {
            title: 'College of Computer\nStudies',
            image: 'https://i.ibb.co/4M5wmLV/css.png',
            text: "College of Computer Studies\n \n1. Bachelor of Science in Computer Science (BSCS)\n \n2. Bachelor of Science in Information Technology (BSIT)\n \n3. Bachelor of Science in Entertainment and Multimedia Computing (BSEMC)\n \n4. Associate in Computer Technology (ACT)"
          },
          {
            title: 'College of Hospitality\nand Tourism Management',
            image: 'https://i.ibb.co/CKBJDWv/chtm.png',
            text: 'College of Hospitality and Tourism Management\n \n1. Bachelor of Science in Hospitality Management (BSHM)\n \n2. Bachelor of Science in Tourism Management (BSTM)'
          },
          {
            title: 'College of Education,\nArts and Sciences',
            image: 'https://i.ibb.co/gwB85dB/ceas.png',
            text: 'College of Education, Arts and Sciences\n \n1. Bachelor of Elementary Education(BEEd)\n \n2. Bachelor of Early Childhood Education(BECEd)\n \n3. Bachelor of Secondary Education - Major in English(BSEd - E)\n \n4. Bachelor of Secondary Education - Major in Filipino(BSEd - FIL)\n \n5. Bachelor of Secondary Education - Major in Math(BSEd - M)\n \n6.Bachelor of Secondary Education - Major in Science(BSEd - SCI)\n \n7. Bachelor of Secondary Education - Major in Social Studies(BSEd - SOC)\n \n8. Bachelor of Physical Education(BPEd)\n \n9. Bachelor of Cultural and Arts Education(BCAEd)\n \n10. Bachelor of Arts in Communication(BACOM)\n \n11. Teacher Certificate Program(TCP)'
          },
          {
            title: 'College of Business\nand Accountancy',
            image: 'https://i.ibb.co/jb3Fd4n/cba.png',
            text: 'College of Business and Accountancy\n \n1. Bachelor of Science in Customs Administration (BSCA)\n \n2. Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)\n \n3. Bachelor of Science in Business Administration - Major in Human Resource Management(BSBA-HRM)\n \n4. Bachelor of Science in Business Administration - Major in Marketing Management(BSBA-MKT)\n \n5. Bachelor of Science in Accountancy (BSA)'
          },
          {
            title: 'College of Allied\nHealth Studies',
            image: 'https://i.ibb.co/ydmSSzP/cahs.png',
            text: 'College of Allied Health Studies\n \n1. Bachelor of Science in Nursing (BSN)\n \n2. Bachelor of Science in Midwifery (BSM)\n \n3.Graduate in Midwifery (GM)'
          },
          {
            title: 'Senior High School\nDepartment',
            image: 'https://i.ibb.co/Y3bNsv5/shs.png',
            text: 'Senior High School Department\n \n1. Information Communication Technology (ICT)\n \n2. Home Economics (HE)\n \n3. Science, Technology, Engineering, and Mathematics(STEM)\n \n4. Accountancy and Business Management(ABM)\n \n5. Humanities and Social Sciences(HUMMS)'
          }]
      };
    } else if (text == 'bye') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Good Bye! Thank you for asking!',
        createdAt: new Date().getTime(),
        user: BOT,
      };
    } else {
      msg = {
        // _id: this.state.messages.length + 1,
        text,
        createdAt: new Date().getTime(),
        user: BOT,
      };
    }


    if (text == 'categories') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Here are the Curricular Programs Available in Gordon College.',
        createdAt: new Date().getTime(),
        user: BOT,
        categoryOption: true,
        data: [
          {
            title: 'FAQs',
            text: 'Frequently Asked Questions\n \n1. What are your Curricular Program Offerings?\n \n2. Where could I send an inquiry or concern?\n \n3. Where is GC Satellite Office located to request for documents or pay my dues?'
          },
          {
            title: 'General',
            text: 'General Queries\n \n1. Calendar of Activities for Second Semester A.Y. 2021-2022.\n \n2. Gordon College Curricular Program Offerings.\n \n3. GC SSC Concern.\n \n4. How to request an appointment to visit the GC Satellite Office?',
          },
          {
            title: 'Records and Classes',
            text: "Student Records and Classes\n \n1. Adding/Dropping of Classes via GC Student Portal.\n \n2. Online Request for Student Records.\n \n3. Adding/Dropping of Classes.\n \n4. Application for Permit for Leave of Absence.\n \n5. Application for Discontinuance of Studies/Withdrawal from the Institution.\n \n6. How to Activate my GC Domain Email?"
          },
          {
            title: 'Finance',
            text: 'Finance Queries\n \n1. Alternative Modes of Payment (Wire Transfer/Bank Deposit).'
          },
          {
            title: 'Enrollment & Admission',
            text: 'Enrollment & Admission Queries\n \n1. Enrollment 2021-2022'
          },
          {
            title: 'Education',
            text: 'Education Queries\n \n1.Certificate of Registration (COR for Academic Year 2021-2022)'
          }
        ]
      }
    }

    console.log(this.state.messages);
    console.log(msg);

    const { id } = this.props.route.params;

    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .add(msg);

    msg._id = this.state.messages.length + 1;

    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, [msg]),
    }));
  }

  // ON SEND MESSAGE
  onSend(messages = []) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages)
    }));

    let text = messages[0].text;

    const { id, name } = this.props.route.params;

    firestore()
      .collection('CHATBOT_HISTORY')
      .doc(id)
      .collection('MESSAGES')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: 1,
          name: name,
        },
      });

    Dialogflow_V2.requestQuery(
      text,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  // QUICK REPLY
  onQuickReply(quickReply) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, quickReply)
    }))

    let message = quickReply[0].value;

    Dialogflow_V2.requestQuery(
      message,
      (result) => this.handleGoogleResponse(result),
      (error) => console.log(error)
    )
  }

  // BUBBLE CHAT
  renderBubble = (props) => {

    if (props.currentMessage.programOptions) {
      return (
        <ScrollView
          style={{ backgroundColor: '#f2f2f2' }}
          horizontal={true}
        >
          {props.currentMessage.data.map((item) => (
            <Card containerStyle={{
              padding: 0,
              borderRadius: 30,
              paddingBottom: 7,
              overflow: 'hidden'
            }} key={item.title}>

              <Card.Image
                style={{ width: 200, height: 100 }}
                resizeMode="cover" source={{ uri: item.image }}
              />
              <Card.Divider style={{ padding: 0 }} />
              <Card.Title style={{ fontFamily: 'Poppins-Medium', marginTop: -10, marginBottom: 0 }}>{item.title}</Card.Title>
              <Button
                title="SELECT"
                style={{ height: 20 }}
                onPress={() => this.sendBotResponse(item.text)}
              />
            </Card>
          ))}

        </ScrollView>
      )
    }

    if (props.currentMessage.categoryOption) {
      return (
        <ScrollView style={{ backgroundColor: '#f2f2f2' }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }} horizontal={true}>
          {props.currentMessage.data.map((item) => (
            <Button
              key={item.title}
              title={item.title}
              // icon={{
              //   name: 'arrow-right',
              //   type: 'font-awesome',
              //   size: 15,
              //   color: 'white',
              // }}
              // iconContainerStyle={{ left: -5 }}
              // iconRight
              titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 16 }}
              buttonStyle={{
                backgroundColor: '#235b93',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 210,
                marginHorizontal: 10,
                marginVertical: 10,
              }}
              onPress={() => this.sendBotResponse(item.text)}
            />
          ))}
        </ScrollView>
      )
    }

    return (
      <Bubble
        {...props}
        textStyle={{ right: { fontFamily: 'Poppins-Light', color: 'black' }, left: { fontFamily: 'Poppins-Light', color: 'white' } }}
        wrapperStyle={{
          right: { backgroundColor: '#e6e6e6' },
          left: { backgroundColor: '#1f75cc' },
        }}
        timeTextStyle={{ left: { fontSize: 12, color: '#e6e6e6' }, right: { fontSize: 12, color: 'black' } }}
      />
    )
  }

  // TOOLBAR
  renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: '#e6e6e6',
          borderColor: '#999',
          // borderTopWidth: 1,
          borderWidth: 1,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 3,
          borderRadius: 30,
        }}
      />
    )
  }

  // SEND ICON BUTTON
  renderSend = (props) => {
    const { text, messageIdGenerator, user, onSend } = props;
    if (props.text.trim().length > 0) {
      return (
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 3,
            marginHorizontal: 10,
          }}

          onPress={() => {
            if (text && onSend) {
              onSend(
                {
                  text: text.trim(),
                  user,
                  _id: messageIdGenerator(),
                },
                true
              );
            }
          }}
        >
          {/* <Image source={require('../assets/send.png')} /> */}
          <Icon
            name="send-circle"
            style={{ marginBottom: 1, marginRight: 1 }}
            size={40}
            color="#1f75cc"
          />
        </TouchableOpacity>
      );
    }
    return null;
  }


  render() {
    return (

      <View style={{ flex: 1, backgroundColor: '#f2f2f2' }}>
        <GiftedChat messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          user={{ _id: 1 }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: 200,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    borderRadius: 10
  },
  text: {
    color: "#097ded",
    fontSize: 17,
    fontFamily: 'Poppins-Medium'
  }
})

export default Chatbot;
