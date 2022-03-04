import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-elements';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar,
} from "react-native-gifted-chat";
import { Dialogflow_V2 } from 'react-native-dialogflow';

import { dialogflowConfig } from '../env';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by
LogBox.ignoreAllLogs();//Ignore all log notifications

const botAvatar = require('../assets/logo.png')
// const css = require('../assets/gc-logos/css.png')


const BOT = {
  _id: 2,
  name: 'Mr. Bot',
  avatar: botAvatar
}

class Chatbot extends Component {

  state = {
    messages: [
      { _id: 2, text: 'Where is GC Satellite Office located?', createdAt: new Date().getTime(), user: BOT },
      { _id: 3, text: 'How could I request school records?', createdAt: new Date().getTime(), user: BOT },
      { _id: 4, text: 'What are the Curricular Program Offerings?', createdAt: new Date().getTime(), user: BOT },
      // { _id: 4, text: 'What is Gordon College?', createdAt: new Date().getTime(), user: BOT },
      // { _id: 5, text: 'Here are some FAQs', createdAt: new Date().getTime(), user: BOT },
      // { _id: 6, text: 'How can I help you?', createdAt: new Date().getTime(), user: BOT },
      { _id: 1, text: 'Hello! Im GC Bot.\n \nHere are some FAQs', createdAt: new Date().getTime(), user: BOT },
    ],
    id: 1,
    name: ''
  };

  componentDidMount() {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id,
    );
  }

  handleGoogleResponse(result) {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];

    this.sendBotResponse(text);
  }

  sendBotResponse(text) {

    let msg;

    if (text == 'programs') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'Do you want to browse each department available courses?',
        createdAt: new Date(),
        user: BOT,
      };
    } else if (text == 'show departments') {
      msg = {
        _id: this.state.messages.length + 1,
        text: 'SAMPLE 2!',
        createdAt: new Date(),
        user: BOT,
        isOptions: true,
        // image: 'dddd',
        data: [
          {
            title: 'Institute of Graduate\nStudies Department',
            image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/59456339_2239808299429161_5937533450515906560_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFRflDt2v2ogOsOyAnVlZZz2B_E7u5X9zrYH8Tu7lf3Ojdv1Kp7_TwzuWly7ET6feQCOf6G0CuODGAjj4KhkZsX&_nc_ohc=uRuXGsbLdRYAX8AXHsu&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT-B9Hqvh4-y4PdBsJISH0_3v30UAHAegtZmBps7n8Tipw&oe=6230CE38',
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
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStGw7O1PS35zhG49Y1OMJa57eabEYtS0efg_wHlx78QNGs6Nmgy0QRJsAKcQredx5QTno&usqp=CAU',
            text: 'College of Education, Arts and Sciences\n \n1.Bachelor of Elementary Education(BEEd)\n \n2.Bachelor of Early Childhood Education(BECEd)\n \n3.Bachelor of Secondary Education - Major in English(BSEd - E)\n \n4.Bachelor of Secondary Education - Major in Filipino(BSEd - FIL)\n \n5.Bachelor of Secondary Education - Major in Math(BSEd - M)\n \n6.Bachelor of Secondary Education - Major in Science(BSEd - SCI)\n \n7.Bachelor of Secondary Education - Major in Social Studies(BSEd - SOC)\n \n8. Bachelor of Physical Education(BPEd)\n \n9.Bachelor of Cultural and Arts Education(BCAEd)\n \n10.Bachelor of Arts in Communication(BACOM)\n \n11.Teacher Certificate Program(TCP)'
        },
      {
        title: 'College of Business\nand Accountancy',
        image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/117745647_105699964588436_526016872864729108_n.png?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeH8fpiabJskamj8v9ZUm7r4hXluzkt5qyGFeW7OS3mrIcpkptBFHiljahenkscSOlLCFB3RMiC4HYN1mmKQPkPV&_nc_ohc=NxlT_mJugrUAX_DdmNI&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT_evzezfWAn9VaSp7L60_q0lAPg_NjrFce5UVfE28Nh_g&oe=6233BEC0',
        text: 'College of Business and Accountancy\n \n1.Bachelor of Science in Customs Administration (BSCA)\n \n2.Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)\n \n3.Bachelor of Science in Business Administration - Major in Human Resource Management(BSBA-HRM)\n \n4.Bachelor of Science in Business Administration - Major in Marketing Management(BSBA-MKT)\n \n5.Bachelor of Science in Accountancy (BSA)'
      },
      {
        title: 'College of Allied\nHealth Studies',
        image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/135014570_102306351834926_7933799612610204623_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFWLHH0iM6W3ati88rRzTAuJz_nI47ZSAYnP-cjjtlIBudJzR8riXQxBi0lerett2DZ2bTcNknUCkaAit45eb0Z&_nc_ohc=6WXxOfS0qOoAX9GhPyN&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT9r27vz7_SI07van0b5y6pQs6pb9UCtJhvEcAt08Ah4FA&oe=6232E17D',
        text: 'College of Allied Health Studies\n \n1.Bachelor of Science in Nursing (BSN)\n \n2.Bachelor of Science in Midwifery (BSM)\n \n3.Graduate in Midwifery (GM)'
      },
      {
        title: 'Senior High School\nDepartment',
        image: 'https://scontent.fsfs2-1.fna.fbcdn.net/v/t1.6435-9/60217214_101003794475069_5161803966777917440_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFjBL5hier89ZRdsrYNTrBpSMjbIO_52qpIyNsg7_naqoryqBRDyeoZ2JKcMInb8-1eXgL9j8upeoAS-NViyT4k&_nc_ohc=TCzU61Hcr9MAX8YkIol&_nc_ht=scontent.fsfs2-1.fna&oh=00_AT_sGxjvYovVZDUaJww9CoKAgCjRCK8D-HzsjQWl5jnDdg&oe=62334D43',
        text: 'Senior High School Department\n \n1.Information Communication Technology (ICT)\n \n2.Home Economics (HE)\n \n3.Science, Technology, Engineering, and Mathematics(STEM)\n \n4.Accountancy and Business Management(ABM)\n \n5.Humanities and Social Sciences(HUMMS)'
      }]
    };
  } else if(text == 'bye') {
  msg = {
    _id: this.state.messages.length + 1,
    text: 'Good Bye! Thank you for asking!',
    createdAt: new Date(),
    user: BOT,
  };
} else {
  msg = {
    _id: this.state.messages.length + 1,
    text,
    createdAt: new Date(),
    user: BOT,
  };
}

console.log(this.state.messages);
console.log(msg);

this.setState((previouseState) => ({
  messages: GiftedChat.append(previouseState.messages, [msg]),
}));
  }

onSend(messages = []) {
  this.setState((previouseState) => ({
    messages: GiftedChat.append(previouseState.messages, messages)
  }));

  let message = messages[0].text;

  Dialogflow_V2.requestQuery(
    message,
    (result) => this.handleGoogleResponse(result),
    (error) => console.log(error)
  )
}

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

renderBubble = props => {

  if (props.currentMessage.isOptions) {
    return (
      <ScrollView style={{ backgroundColor: 'white' }} horizontal={true}>
        {props.currentMessage.data.map((item) => (
          <Card containerStyle={{ padding: 0, borderRadius: 30, paddingBottom: 7, overflow: 'hidden' }} key={item.title}>
            <Card.Image style={{ width: 200, height: 100 }} resizeMode="cover" source={{ uri: item.image }}></Card.Image>
            <Card.Divider style={{ padding: 0 }} />
            <Card.Title>{item.title}</Card.Title>
            <Button
              title="SELECT"
              style={{ height: 20 }}
              onPress={() => this.sendBotResponse(item.text)}
            />
          </Card>
        ))}
      </ScrollView>
    );
  }
  return (<Bubble
    {...props}
    textStyle={{ right: { color: 'black' }, left: { color: 'white' } }}
    wrapperStyle={{
      right: { backgroundColor: '#c0c4c4' },
      left: { backgroundColor: '#235b93' },
    }}
    timeTextStyle={{ left: { color: '#c0c4c4' }, right: { color: 'black' } }}
  />
  );
};

render() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <GiftedChat messages={this.state.messages}
        onSend={(message) => this.onSend(message)}
        onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
        renderBubble={this.renderBubble}
        user={{ _id: 1 }}

      // SEND BUTTON
      // renderSend={(props) => {
      //   const { text, messageIdGenerator, user, onSend } = props;
      //   return (
      //     <TouchableOpacity
      //       style={{
      //         height: 40,
      //         width: 40,
      //         // borderRadius: 10,
      //         // backgroundColor: "#097ded",
      //         alignItems: "center",
      //         justifyContent: "center",
      //         marginBottom: 5,
      //         marginHorizontal: 10,
      //       }}
      //       onPress={() => {
      //         if (text && onSend) {
      //           onSend(
      //             {
      //               text: text.trim(),
      //               user,
      //               _id: messageIdGenerator(),
      //             },
      //             true
      //           );
      //         }
      //       }}
      //     >
      //       {/* <Image source={require('../assets/bot.png')}/> */}
      //       <Text style={styles.text}>Send</Text>
      //     </TouchableOpacity>
      //   );
      // }}

      // TOOLBAR
      // renderInputToolbar={(props) => (
      //   <InputToolbar
      //     {...props}
      //     containerStyle={{
      //       marginLeft: 10,
      //       marginRight: 10,
      //       marginBottom: 2,
      //       // borderRadius: 20,
      //       paddingTop: 5,
      //       // top: 500
      //       // bottom: 50
      //     }}
      //   />
      // )}

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
    // fontWeight: 'bold',
  }
})

export default Chatbot;
