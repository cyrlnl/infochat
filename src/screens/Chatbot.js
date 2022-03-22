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
                    title: 'FAQ',
                    text: 'Frequently Ask Questions\n \n1.Bachelor of Elementary Education(BEEd)\n \n2.Bachelor of Early Childhood Education(BECEd)\n \n3.Bachelor of Secondary Education - Major in English(BSEd - E)'
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
                    text: 'Enrollment & Admission Queries\n \n1.Enrollment 2021-2022\n \n2.Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)\n \n3.Bachelor of Science in Business Administration - Major in Human Resource Management(BSBA-HRM)'
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
            image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59515658_2239805946096063_7182580560512942080_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=174925&_nc_eui2=AeGgf2pf-2PwoxloYf8BpaIeaph3EPgWebVqmHcQ-BZ5tRMslFzzBiv6yvR6k2xBjBKDTjL0kCXsk0AMIwDm8Sgj&_nc_ohc=rbpUUrXguqQAX8dn9iA&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT8jAp7oAEBpNPcFntn4tUIf7xQN1lnGCK-6EWOOSb9yOg&oe=6257149E',
            text: 'Institute of Graduate Studies\n \n1. Master of Arts in Nursing (MAN)\n \n2. Major in Administration of Nursing Schools & Services\n \n3. Master in Business Management (MBM)\n \n4. Master in Public Administration (MPA)\n \n5. Master of Arts in Education (MAEd) Major in Educational Management'
          },
          {
            title: 'College of Computer\nStudies',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR62nkyr-rlTQEhocUP5QK9RflXDYQuZLhZjw&usqp=CAU',
            text: "College of Computer Studies\n \n1. Bachelor of Science in Computer Science (BSCS)\n \n2. Bachelor of Science in Information Technology (BSIT)\n \n3. Bachelor of Science in Entertainment and Multimedia Computing (BSEMC)\n \n4. Associate in Computer Technology (ACT)"
            // optionData: {
            //   _id: this.state.messages.length + 1,
            //   text: 'GC CCS',
            //   createdAt: new Date(), 
            //   user: BOT,
            // }
          },
          {
            title: 'College of Hospitality\nand Tourism Management',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzCDfPFUQ7iwEtjrR9RGByFvYyvt-W5lik7c0-aicg5OZ8zYEK1uPwrGnNNO5-xGQWWR0&usqp=CAU',
            text: 'College of Hospitality and Tourism Management\n \n1. Bachelor of Science in Hospitality Management (BSHM)\n \n2. Bachelor of Science in Tourism Management (BSTM)'
          },
          {
            title: 'College of Education,\nArts and Sciences',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGw7O1PS35zhG49Y1OMJa57eabEYtS0efg_wHlx78QNGs6Nmgy0QRJsAKcQredx5QTno&usqp=CAU'
          },
          {
            title: 'College of Business\nand Accountancy',
            image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/117745647_105699964588436_526016872864729108_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeH8fpiabJskamj8v9ZUm7r4hXluzkt5qyGFeW7OS3mrIcpkptBFHiljahenkscSOlLCFB3RMiC4HYN1mmKQPkPV&_nc_ohc=NxlT_mJugrUAX_DdmNI&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT_evzezfWAn9VaSp7L60_q0lAPg_NjrFce5UVfE28Nh_g&oe=6233BEC0'
          },
          {
            title: 'College of Allied\nHealth Studies',
            image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/135014570_102306351834926_7933799612610204623_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFWLHH0iM6W3ati88rRzTAuJz_nI47ZSAYnP-cjjtlIBudJzR8riXQxBi0lerett2DZ2bTcNknUCkaAit45eb0Z&_nc_ohc=6WXxOfS0qOoAX9GhPyN&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT9r27vz7_SI07van0b5y6pQs6pb9UCtJhvEcAt08Ah4FA&oe=6232E17D'
          },
          {
            title: 'Senior High School\nDepartment',
            image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/60217214_101003794475069_5161803966777917440_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFjBL5hier89ZRdsrYNTrBpSMjbIO_52qpIyNsg7_naqoryqBRDyeoZ2JKcMInb8-1eXgL9j8upeoAS-NViyT4k&_nc_ohc=TCzU61Hcr9MAX8YkIol&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT_sGxjvYovVZDUaJww9CoKAgCjRCK8D-HzsjQWl5jnDdg&oe=62334D43'
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
            title: 'FaQ',
            text: 'Frequently Ask Questions\n \n1.Bachelor of Elementary Education(BEEd)\n \n2.Bachelor of Early Childhood Education(BECEd)\n \n3.Bachelor of Secondary Education - Major in English(BSEd - E)'
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
            text: 'Enrollment & Admission Queries\n \n1.Enrollment 2021-2022\n \n2.Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)\n \n3.Bachelor of Science in Business Administration - Major in Human Resource Management(BSBA-HRM)'
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
              icon={{
                name: 'arrow-right',
                type: 'font-awesome',
                size: 15,
                color: 'white',
              }}
              iconRight
              titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 16 }}
              buttonStyle={{
                backgroundColor: '#235b93',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 30,
              }}
              containerStyle={{
                width: 150,
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
          marginBottom: 2,
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
