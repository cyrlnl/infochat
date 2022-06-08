import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Card, Button, FAB } from 'react-native-elements';
import {
  Actions,
  Bubble,
  GiftedChat,
  InputToolbar
} from "react-native-gifted-chat";
import uuid from 'react-native-uuid';

import { Dialogflow_V2 } from 'react-native-dialogflow';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { dialogflowConfig } from '../env';
import Modal from '../screens/ChatbotInstruction';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by
LogBox.ignoreAllLogs();//Ignore all log notifications

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const botAvatar = require('../assets/app_logo/6.png')

const BOT = {
  _id: 2,
  name: 'GC Bot',
  avatar: botAvatar
}

const theUser = {
  _id: 1,
  name: 'User',
  avatar: ''
}

class Chatbot extends Component {

  state = {
    messages: [],
    id: 1,
    name: '',
    textBtn: []
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
      .limit(50)
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
                text: 'Here are the Categories Available.',
                createdAt: new Date().getTime(),
                user: BOT,
                categoryOption: true,
                data: [
                  {
                    title: 'FAQs',
                    // text: 'Frequently Asked Questions',
                    image: 'https://i.ibb.co/cFSL25B/undraw-Questions-re-1fy7-1.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'Frequently Asked Questions',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
                  },
                  {
                    title: 'General',
                    // text: 'General Queries',
                    image: 'https://i.ibb.co/0ssXCRK/undraw-File-searching-re-3evy.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'General Queries',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
                  },
                  {
                    title: 'Records and Classes',
                    // text: 'Records and Classes',
                    image: 'https://i.ibb.co/fdXMPk3/undraw-Filing-system-re-56h6.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'Records and Classes',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
                  },
                  {
                    title: 'Finance',
                    // text: 'Finance Queries',
                    image: 'https://i.ibb.co/8K2vRtt/undraw-printing-invoices-5r4r.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'Finance',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
                  },
                  {
                    title: 'Enrollment & Admission',
                    // text: 'Enrollment & Admission Queries',
                    image: 'https://i.ibb.co/LCmFBK8/undraw-Meeting-re-i53h.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'Enrollment & Admission',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
                  },
                  {
                    title: 'Education',
                    // text: 'Education Queries',
                    image: 'https://i.ibb.co/YNVH2jH/undraw-my-files-swob.png',
                    optionData: {
                      _id: uuid.v4(),
                      text: 'Education',
                      createdAt: new Date().getTime(),
                      user: theUser
                    }
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
                text: 'Welcome to Gordon College InfoChat!',
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

    // CURRICULAR PROGRAMS
    if (text == 'programs') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Programs',
        createdAt: new Date().getTime(),
        user: BOT,
        programOptions: true,
        data: [
          {
            title: 'Institute of Graduate\nStudies Department',
            image: 'https://i.ibb.co/Swt3gZP/gclogo.png',
            text: 'Institute of Graduate Studies\n \n• Master of Arts in Nursing (MAN)\n \n• Major in Administration of Nursing Schools & Services\n \n• Master in Business Management (MBM)\n \n• Master in Public Administration (MPA)\n \n• Master of Arts in Education (MAEd) Major in Educational Management',

          },
          {
            title: 'College of Computer\nStudies',
            image: 'https://i.ibb.co/4M5wmLV/css.png',
            text: "College of Computer Studies\n \n• Bachelor of Science in Computer Science (BSCS)\n \n• Bachelor of Science in Information Technology (BSIT)\n \n• Bachelor of Science in Entertainment and Multimedia Computing (BSEMC)\n \n• Associate in Computer Technology (ACT)"
          },
          {
            title: 'College of Hospitality\nand Tourism Management',
            image: 'https://i.ibb.co/CKBJDWv/chtm.png',
            text: 'College of Hospitality and Tourism Management\n \n• Bachelor of Science in Hospitality Management (BSHM)\n \n• Bachelor of Science in Tourism Management (BSTM)'
          },
          {
            title: 'College of Education,\nArts and Sciences',
            image: 'https://i.ibb.co/gwB85dB/ceas.png',
            text: 'College of Education, Arts and Sciences\n \n• Bachelor of Elementary Education(BEEd)\n \n• Bachelor of Early Childhood Education(BECEd)\n \n• Bachelor of Secondary Education - Major in English(BSEd - E)\n \n• Bachelor of Secondary Education - Major in Filipino(BSEd - FIL)\n \n• Bachelor of Secondary Education - Major in Math(BSEd - M)\n \n• Bachelor of Secondary Education - Major in Science(BSEd - SCI)\n \n• Bachelor of Secondary Education - Major in Social Studies(BSEd - SOC)\n \n• Bachelor of Physical Education(BPEd)\n \n• Bachelor of Cultural and Arts Education(BCAEd)\n \n• Bachelor of Arts in Communication(BACOM)\n \n• Teacher Certificate Program(TCP)'
          },
          {
            title: 'College of Business\nand Accountancy',
            image: 'https://i.ibb.co/jb3Fd4n/cba.png',
            text: 'College of Business and Accountancy\n \n• Bachelor of Science in Customs Administration (BSCA)\n \n• Bachelor of Science in Business Administration - Major in Financial Management (BSBA-FM)\n \n• Bachelor of Science in Business Administration - Major in Human Resource Management(BSBA-HRM)\n \n• Bachelor of Science in Business Administration - Major in Marketing Management(BSBA-MKT)\n \n• Bachelor of Science in Accountancy (BSA)'
          },
          {
            title: 'College of Allied\nHealth Studies',
            image: 'https://i.ibb.co/ydmSSzP/cahs.png',
            text: 'College of Allied Health Studies\n \n• Bachelor of Science in Nursing (BSN)\n \n• Bachelor of Science in Midwifery (BSM)\n \n• Graduate in Midwifery (GM)'
          },
          {
            title: 'Senior High School\nDepartment',
            image: 'https://i.ibb.co/Y3bNsv5/shs.png',
            text: 'Senior High School Department\n \n• Information Communication Technology (ICT)\n \n• Home Economics (HE)\n \n• Science, Technology, Engineering, and Mathematics(STEM)\n \n• Accountancy and Business Management(ABM)\n \n• Humanities and Social Sciences(HUMMS)'
          }]
      };
    } else if (text == 'bye') {
      msg = {
        // _id: this.state.messages.length + 1,
        text: 'Thank you for asking!',
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

    // CATEGORIES
    if (text == 'categories') {
      msg = {
        _id: uuid.v4(),
        createdAt: new Date().getTime(),
        user: BOT,
        categoryOption: true,
        data: [
          {
            title: 'FAQs',
            // text: 'Frequently Asked Questions',
            image: 'https://i.ibb.co/cFSL25B/undraw-Questions-re-1fy7-1.png',
            optionData: {
              _id: uuid.v4(),
              text: 'Frequently Asked Questions',
              createdAt: new Date().getTime(),
              user: theUser
            }
          },
          {
            title: 'General',
            // text: 'General Queries',
            image: 'https://i.ibb.co/0ssXCRK/undraw-File-searching-re-3evy.png',
            optionData: {
              _id: uuid.v4(),
              text: 'General Queries',
              createdAt: new Date().getTime(),
              user: theUser
            }
          },
          {
            title: 'Records and Classes',
            // text: 'Records and Classes',
            image: 'https://i.ibb.co/fdXMPk3/undraw-Filing-system-re-56h6.png',
            optionData: {
              _id: uuid.v4(),
              text: 'Records and Classes',
              createdAt: new Date().getTime(),
              user: theUser
            }
          },
          {
            title: 'Finance',
            // text: 'Finance Queries',
            image: 'https://i.ibb.co/8K2vRtt/undraw-printing-invoices-5r4r.png',
            optionData: {
              _id: uuid.v4(),
              text: 'Finance',
              createdAt: new Date().getTime(),
              user: theUser
            }
          },
          {
            title: 'Enrollment & Admission',
            // text: 'Enrollment & Admission Queries',
            image: 'https://i.ibb.co/LCmFBK8/undraw-Meeting-re-i53h.png',
            optionData: {
              _id: uuid.v4(),
              text: 'Enrollment & Admission',
              createdAt: new Date().getTime(),
              user: theUser
            }
          },
          {
            title: 'Education',
            // text: 'Education Queries',
            image: 'https://i.ibb.co/YNVH2jH/undraw-my-files-swob.png',
            optionData: {
              _id: uuid.v4(),
              text: 'Education',
              createdAt: new Date().getTime(),
              user: theUser
            }
          }

        ]
      }
    }

    // FAQs
    if (text == 'faqs') {
      msg = {
        // text: 'Frequently Asked Questions',
        createdAt: new Date().getTime(),
        user: BOT,
        faqOption: true,
        data: [
          {
            title: 'Curricular Program Offerings',
            text: 'Please type "courses" to prepare the list of programs.'
          },
          {
            title: 'Send an inquiry or concern',
            text: '• For Admission/School Records Request queries, email registrar@gordoncollege.edu.ph\n \n• For Finance (Payment) related queries, email gcpay@gordoncollege.edu.ph\n \n• For Senior High School related queries, info.shs@gordoncollege.edu.ph\n \n• For Institute of Graduate Studies queries, email anicas.roel@gordoncollege.edu.ph\n \n• For technical support on GCLAMP or Google Domain Account, email gc.lamp@gordoncollege.edu.ph\n \n• For other concerns/inquiries you may send email to info@gordoncollege.edu.ph',
          },
          {
            title: 'GC Satellite Office address',
            text: "Thank you for messaging us.\n \nGordon College Satellite Office is located in the former Olongapo Skills Training Center at Otero Avenue, Brgy. Mabayuan (Beside Subic Water Filtration) It's open to public Mondays to Thursdays from 8am to 4pm and Fridays from 8am to 2pm.\n \nStrict Health Protocols shall be followed."
          }
        ]
      }
    }

    // GENERAL
    if (text == 'generalqueries') {
      msg = {
        // text: 'General Queries',
        createdAt: new Date().getTime(),
        user: BOT,
        generalOption: true,
        data: [
          {
            title: 'Calendar of Activities for 2nd Sem A.Y. 2021-2022',
            text: "Calendar of Activities\n\nJanuary 24: Start of Classes\nJanuary 24 - February 4: Adding/Dropping of Subjects\n\nFebruary 1: Chinese New Year’s Day\nFebruary 4: Last Day of Dropping of Subjects w/ Refund\nFebruary 23-24: 23rd Founding Anniversary Celebration\nFebruary 25: EDSA Revolution Anniversary\n\nMarch 14-20: Academic Reading/Wellness Break\nMarch 21-27: Midterm Examinations\n\nApril 9: Araw ng Kagitingan\nApril 14: Maundy Thursday\nApril 15: Good Friday\nApril 16: Black Saturday\nApril 23: Deadline for Submission of Midterm Grades\n\nMay 1: Labor Day\nMay 9 – 15: Final Examinations (Graduating Students)\nMay 16-22: Academic Reading/Wellness Break\nMay 20: Submission of Grades (Graduating Students)\nMay 23-29: Final Examinations (Non-Graduating Students)\nMay 27: Releasing of Grades (Graduating Students)\n\nJune 3: Submission of Grades (Non-Graduating Students)\nJune 10: Releasing of Grades (Non-Graduating)\nJune 12: Independence Day\nJune 6-17: Commencement Exercises"
          },
          {
            title: 'Curricular Program Offerings',
            text: 'Please type "courses" to prepare the list of programs.',
          },
          {
            title: 'GC SSC Concern',
            text: "Got concerns, grievances, queries, problems or you might wanna re-clarify something about Gordon College, School Policies, Academics, or other factors? Regardless of your needs, the GC SSC is here to give you the assistance that you deserve.\n\nHeads up GCians!\n\nWith regards to the council's aim to be with you alongside your journey this academic year, our stand to leave no student behind and our continues fight towards exercising the right of every GCian, the Gordon College Supreme Student Council open-heartedly give you the 'GC SSC Students' Help Desk'. This project aims to serve as an outlet where GCians can voice out their concerns and be heard. The council desires to ensure the safety and to protect the identity of the students, thus, all entries will be anonymous.\n\nAlways keep in mind that the council will stand by you and with you in protecting and exercising your student rights. Do not hesitate to reach out to the GC-SSC, allow us to serve and be with you because like what we've said in the beginning of our term, you are not alone, you have us. The Gordon College Supreme Student Council, by your side.\nIf you have concerns, grievances, issues, problems, or other queries, kindly fill in the link below and we will gladly give you assistance.\n\nhttps://bit.ly/Gordon-College-SSC-Students-Help-Desk"
          },
          {
            title: 'Request an appointment to visit the GC Satellite Office',
            text: "COVID-19 VISITORS PROTOCOLS FOR ENTERING\nGORDON COLLEGE SATELLITE OFFICE\n\nEffective Thursday, October 01, 2020, Gordon College Satellite Office, located at Otero Avenue, Mabayuan, Olongapo City (beside Subic Water Filtration Authority) will be opened to the public from Monday to Friday, 9:00am - 4:00pm (except Holidays). Citizens are still encouraged to use alternative methods for handling their concerns with the College, including using the mail, on-line services, or the telephone whenever possible.\n\nTo help prevent the spread of COVID-19 and reduce the potential risk of exposure to employees and visitors, the following protocol is being implemented:\n\n1. If you have COVID-19 symptoms (i.e., fever, cough, or shortness of breath), please stay home.\n2. Visitors will enter GC Satellite Office through the front gate and check in at the desk on the left. Face Masks and Face Shields shall be required for all visitors entering the building. If you do not have a mask and a shield, you will not be allowed to enter the building. Family members of visitors may not enter the building together. Children will not be permitted to enter the building during this time.\n3. Every visitor will be required to answer screening questions, fill out contact tracing slip/logbook which could result in denied entry further into the building.\n4. Every visitor will have their temperature taken at the checkpoint. If the visitor’s temperature is 37degC or higher, they may not proceed further.\n5. Every visitor will be required to use hand sanitizer before going past the check point.\n6. Employees interfacing with the public must always wear a mask and shield.\n7. All visitors and employees shall continue to practice social distancing, staying at least six (6) feet apart from each other. Floor decals will be in place down the hallway to ensure safe distancing for visitors standing in line.\n8. All surfaces in the area will be cleaned and disinfected in the morning, at lunch and at the end of the day.\n\nPlease be reminded that this is a fluid situation so there could be modifications. Your flexibility and understanding are greatly appreciated. Thank you for your continued support during this time. If you have any questions or concerns, please do not hesitate to contact us thru email, GCappointment@gordoncollege.edu.ph.\n\nYour safety remains our top priority. Please stay safe and be well."
          }
        ]
      }
    }

    // RECORDS AND CLASSES
    if (text == 'recordandclass') {
      msg = {
        // text: 'Records and Classes',
        createdAt: new Date().getTime(),
        user: BOT,
        recordOption: true,
        data: [
          {
            title: 'Adding/Dropping of Classes via GC Student Portal',
            text: "Adding/Dropping of Classes via GC Student Portal\n\nCollege students may add/drop classes for Second Semester Academic Year 2021-2022 until February 06, 2022.\n\nStep 1\nLog-on to the student portal (https://gordoncollegeccs.edu.ph/ccs/students/gces/#/login)\nClick Add/Drop Request Button under Menu Items.\n\nStep 2\nTo request for Dropping of classes, under Current Schedule section, click Drop button.\nTo request for adding of classes, under Add Subjects section, type the detail of the class (you can search by class code, subject or by description) on the search box. Click Add button of the desired class.\n\nStep 3\nYour selected subject(s) will appear under List of Subjects to Add/Drop section. Repeat step 2 to add or drop more classes.\nClick submit to finalize your request or cancel to clear selected classes.\n\nStep 4\nYour request will be evaluated by your program coordinator and will be approved by the college registrar. Regularly visit the portal for updates."
          },
          {
            title: 'Online Request for Student Records',
            text: "𝗢𝗻𝗹𝗶𝗻𝗲 𝗥𝗲𝗾𝘂𝗲𝘀𝘁 𝗳𝗼𝗿 𝗦𝘁𝘂𝗱𝗲𝗻𝘁 𝗥𝗲𝗰𝗼𝗿𝗱𝘀\nStep 1. Download and fill out the Student Request Form. (Link:https://bit.ly/StudentRequestFormGC)\nStep 2. Email to gctranscripts@gordoncollege.edu.ph with the following details:\nSUBJECT: REQUEST (Lastname, Firstname, Middle name / Student ID Number / Program/Strand)\n\nBODY:\n𝙊𝙩𝙝𝙚𝙧 𝙙𝙚𝙩𝙖𝙞𝙡𝙨 𝙤𝙛 𝙩𝙝𝙚 𝙧𝙚𝙦𝙪𝙚𝙨𝙩:\n1) Enclosed to Official Envelope (Please specify the address of the Recipient)\n2) Certified Copies (# of Copies)\n\n𝘼𝙩𝙩𝙖𝙘𝙝𝙢𝙚𝙣𝙩𝙨:\n1) Student Request Form (Scanned or Clear Copy)\n2) Valid ID/Passport (Scanned or Clear Copy)\n3) School Request Letter (For OTR/F137 requested by the school only) (Scanned or Clear Copy)\n4) For Apostille/Red Ribbon Applicants (attach Scanned/Clear Copy of Official Transcript of Records, Diploma, RLE Summary (for Nursing/Midwifery graduates/students)\nStep 3. Expect an email response within 2 to 3 days; you shall be notified if you have any unsettled accounts and obligations to the college.\nIf found cleared of all accountabilities, an email shall be received with the necessary fees to be paid including the postage fee.\nStep 4. Pay the fees through online modes of payment. (Please refer to Gordon College Advisory No. 3 - Alternative Modes of Payment)\nStep 5. Once payment has been verified, the documents will be sent through LBC. *𝑆ℎ𝑖𝑝𝑝𝑖𝑛𝑔 𝑜𝑓 𝐷𝑜𝑐𝑢𝑚𝑒𝑛𝑡𝑠 𝑤𝑖𝑙𝑙 𝑏𝑒 𝑜𝑛 𝑎 𝐶𝑂𝐷 (𝐶𝑎𝑠ℎ 𝑜𝑛 𝐷𝑒𝑙𝑖𝑣𝑒𝑟𝑦) 𝑏𝑎𝑠𝑖𝑠.\n\n𝘿𝙤𝙘𝙪𝙢𝙚𝙣𝙩 𝙁𝙚𝙚𝙨 𝙖𝙣𝙙 𝙋𝙧𝙤𝙘𝙚𝙨𝙨𝙞𝙣𝙜 𝙋𝙚𝙧𝙞𝙤𝙙\nType of Documents = Document Fee [Turnaround Time Upon Verification of Payment]\nTRANSFER CREDENTIAL (OTR, CET, GMCC) = Php1000 [7 working days]\nOFFICIAL TRANSCRIPT OF RECORDS (OTR) = Php400 [7 working days]\nSTUDENT PERMANENT RECORD (F-137) = Php150 [7 working days]\nGOOD MORAL CHARACTER CERT. (GMCC) = Php150 [3 working days]\nCERT. OF AUTHENTICATION AND VERIFICATION (CAV) = 150 [3 working days]\nCERT. OF UNITS EARNED (CUE) = Php100 [3 working days]\nCERT. OF ENROLMENT (COE) = Php150 [3 working days]\nCERT. OF GRADUATION (COG) = Php200 [3 working days]\nMEDIUM OF INSTRUCTION CERT. (MIC) = Php150 [3 working days]\nCERT. OF GRADUATION w/ GWA = Php200 [3 working days]\nCERT. OF ENROLMENT & BILLING (CEB) = Php100 [3 working days]\nDETAILED COURSE DESCRIPTION (DCD) = Php100 [5 working days]\nRELATED LEARNING EXPERIENCE SUMMARY (RLES) = Php200 [5 working days]\nOTHER CERTIFICATIONS = Php150 [-]",
          },
          {
            title: 'Adding/Dropping of Classes',
            text: "Adding/Dropping of Classes via GC Student Portal\n\nCollege students may add/drop classes for Second Semester Academic Year 2021-2022 until February 06, 2022.\n\nStep 1\nLog-on to the student portal (https://gordoncollegeccs.edu.ph/ccs/students/gces/#/login)\nClick Add/Drop Request Button under Menu Items.\n\nStep 2\nTo request for Dropping of classes, under Current Schedule section, click Drop button.\nTo request for adding of classes, under Add Subjects section, type the detail of the class (you can search by class code, subject or by description) on the search box. Click Add button of the desired class.\n\nStep 3\nYour selected subject(s) will appear under List of Subjects to Add/Drop section. Repeat step 2 to add or drop more classes.\nClick submit to finalize your request or cancel to clear selected classes.\n\nStep 4\nYour request will be evaluated by your program coordinator and will be approved by the college registrar. Regularly visit the portal for updates."
          },
          {
            title: 'Application for Permit for Leave of Absence',
            text: "Application for Permit for Leave of Absence\n\nStudents who shall not enroll for the next semester but intend to re-enroll in the College after at least two semesters shall file a Leave of Absence so that his/her records shall be kept in the active file.\n\n𝙎𝙩𝙪𝙙𝙚𝙣𝙩𝙨 𝙨𝙝𝙖𝙡𝙡 𝙪𝙨𝙚 𝙩𝙝𝙚𝙞𝙧 𝙂𝙤𝙧𝙙𝙤𝙣 𝘾𝙤𝙡𝙡𝙚𝙜𝙚 𝘿𝙤𝙢𝙖𝙞𝙣 𝙚𝙢𝙖𝙞𝙡 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 𝙛𝙤𝙧 𝙩𝙝𝙞𝙨 𝙤𝙣𝙡𝙞𝙣𝙚 𝙩𝙧𝙖𝙣𝙨𝙖𝙘𝙩𝙞𝙤𝙣. 𝙀𝙢𝙖𝙞𝙡𝙨 𝙛𝙧𝙤𝙢 𝙤𝙩𝙝𝙚𝙧 𝙚𝙢𝙖𝙞𝙡 𝙖𝙘𝙘𝙤𝙪𝙣𝙩𝙨 𝙨𝙝𝙖𝙡𝙡 𝙣𝙤𝙩 𝙗𝙚 𝙚𝙣𝙩𝙚𝙧𝙩𝙖𝙞𝙣𝙚𝙙.\n\nStep 1. Download and fill out the Student Request Form. (https://bit.ly/StudentRequestFormGC)\n\nStep 2. Email to registrar@gordoncollege.edu.ph with the following details:\nCc: College Dean (see Official Email Addresses)\nSubject: PERMIT FOR LEAVE ABSENCE (Last Name, First Name, Middle Name – Student ID # , Program, Year Level)\nBody: Letter of Intent (State the reason why not to enroll)\nAttachments:\na.Clear Copy of Valid ID/Passport or Birth Certificate\nb.Clear Copy of Student Request Form\n\nStep 3. You will be notified via email of the status of your application for leave."
          },
          {
            title: 'Application for Discontinuance of Studies/Withdrawal from the Institution',
            text: "Application for Discontinuance of Studies/Withdrawal from the Institution\n\nStudents enrolled during the current term and intend to withdraw from the College, they shall drop subjects within the scheduled period of dropping.\nIf the student shall not enroll for the next semester but intend to re-enroll in the College after at least two semesters shall file a Leave of Absence. (Please refer to the procedure for Application for Permit for Leave of Absence)\n\nStudents who intend to withdraw from the College shall request for Transfer Credentials (Please refer to the procedure for Online Request of Student Records.\n\n𝙎𝙩𝙪𝙙𝙚𝙣𝙩𝙨 𝙨𝙝𝙖𝙡𝙡 𝙪𝙨𝙚 𝙩𝙝𝙚𝙞𝙧 𝙂𝙤𝙧𝙙𝙤𝙣 𝘾𝙤𝙡𝙡𝙚𝙜𝙚 𝘿𝙤𝙢𝙖𝙞𝙣 𝙚𝙢𝙖𝙞𝙡 𝙖𝙘𝙘𝙤𝙪𝙣𝙩 𝙛𝙤𝙧 𝙩𝙝𝙞𝙨 𝙤𝙣𝙡𝙞𝙣𝙚 𝙩𝙧𝙖𝙣𝙨𝙖𝙘𝙩𝙞𝙤𝙣. 𝙀𝙢𝙖𝙞𝙡𝙨 𝙛𝙧𝙤𝙢 𝙤𝙩𝙝𝙚𝙧 𝙚𝙢𝙖𝙞𝙡 𝙖𝙘𝙘𝙤𝙪𝙣𝙩𝙨 𝙨𝙝𝙖𝙡𝙡 𝙣𝙤𝙩 𝙗𝙚 𝙚𝙣𝙩𝙚𝙧𝙩𝙖𝙞𝙣𝙚𝙙.\n\nStep 1. Download and fill out the AddDropChangeSchedule Form. (https://bit.ly/GC-AddDropSchedule)\n\nStep 2. Email to registrar@gordoncollege.edu.ph with the following details:\nCc: College Dean (see Official Email Addresses)\nSubject: WITHDRAWAL OF ENROLMENT (Last Name, First Name, Middle Name – Student ID # , Program, Year Level)\nBody: Letter of Intent (State the reason for withdrawal of enrolment)\nAttachments:\na.Clear Copy of Accomplished Add/Drop/Change/Schedule Form\nb.Clear Copy of Valid ID/Passport or Birth Certificate\n\nStep 3. You will be notified via email regarding the status of your withdrawal."
          },
          {
            title: 'Technical support on GCLAMP or Google Domain Account',
            text: "For technical support on GCLAMP or Google Domain Account\nE-mail: gc.lamp@gordoncollege.edu.ph\n\nFor Activation of GC Domain Email\nE-mail: https://tinyurl.com/GCActivateDomainEmai"
          }
        ]
      }
    }

    // FINANCE
    if (text == 'gcfinance') {
      msg = {
        // text: 'Finance',
        createdAt: new Date().getTime(),
        user: BOT,
        financeOption: true,
        data: [
          {
            title: 'Alternative Modes of Payment (Wire Transfer/Bank Deposit)',
            text: "ALTERNATIVE MODES OF PAYMENT\n\nTo adapt to the new normal as brought about by COVID-19 pandemic and ensure that everyone's safety and security are considered, Gordon College devised alternative modes of payment which may be utilized by all students this incoming First Semester Academic Year 2020-2021.\n\nAll students are advised to follow the attached infographics in settling your accounts. Should you have further inquiries, kindly send it to gcpay@gordoncollege.edu.ph.\n\nStay safe always. God bless all of you. God bless Olongapo."
          }
        ]
      }
    }

    // ENROLLMENT AND ADMISSION
    if (text == 'enrollandadmission') {
      msg = {
        // text: 'Enrollment & Admission',
        createdAt: new Date().getTime(),
        user: BOT,
        enrollOption: true,
        data: [
          {
            title: 'Enrollment 2021-2022',
            text: "Hello. We're sorry to inform you that the enrollment for the Batch 2021-2022 has been done. Please, keep yourself updated on our Batch 2022-2023 enrollment by following our Facebook page, Gordon College."
          }
        ]
      }
    }

    // EDUCATION
    if (text == 'educations') {
      msg = {
        // text: 'Education Queries',
        createdAt: new Date().getTime(),
        user: BOT,
        educationOption: true,
        data: [
          {
            title: 'Certificate of Registration (COR for Academic Year 2021-2022)',
            text: "Certificate of Registration (COR) of Academic Year 2021-2022 is now available at the Gordon College Student Portal (https://gordoncollegeccs.edu.ph/ccs/students/gces/#/login)"
          }
        ]
      }
    }

    // console.log(this.state.messages);
    // console.log(msg);

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

  // ON SEND MESSAGE BUTTON
  onSendBtn(messages) {
    this.setState((previouseState) => ({
      messages: GiftedChat.append(previouseState.messages, messages)
    }));

    let text = messages.text;

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
          style={{ backgroundColor: '#fff' }}
          horizontal={true}
        >
          {props.currentMessage.data.map((program) => (
            <Card
              key={program.id}
              title={program.title}
              containerStyle={{
                padding: 0,
                borderRadius: 30,
                paddingBottom: 7,
                overflow: 'hidden'
              }} >

              <Card.Image
                style={{ width: 200, height: 100 }}
                resizeMode="cover" source={{ uri: program.image }}
              />
              <Card.Divider style={{ padding: 0 }} />
              <Card.Title style={{ fontFamily: 'Poppins-Medium', marginTop: -10, marginBottom: 0 }}>{program.title}</Card.Title>
              <Button
                title="SELECT"
                style={{ height: 20 }}
                buttonStyle={{ backgroundColor: '#2c8162' }}
                onPress={() => this.sendBotResponse(program.text)}
              />
            </Card>
          ))}

        </ScrollView>
      )
    }

    if (props.currentMessage.categoryOption) {
      return (
        <ScrollView
          style={{ backgroundColor: '#fff' }}
          horizontal={true}
        >
          {props.currentMessage.data.map((category) => (
            <Card
              key={category.title}
              // title={value.title}
              containerStyle={{
                padding: 0,
                borderRadius: 20,
                paddingBottom: 5,
                overflow: 'hidden'
              }}>

              <Card.Image
                style={{ width: 200, height: 100 }}
                resizeMode="center" source={{ uri: category.image }}
              />
              <Button
                title={category.title}
                style={{ height: 10, color: '#fff' }}
                buttonStyle={{ backgroundColor: '#2c8162' }}
                onPress={() => this.onSendBtn(category.optionData)}
              />
            </Card>
          ))}

        </ScrollView>
      )

    }

    if (props.currentMessage.faqOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((faq) => (
              <Button
                key={faq.id}
                title={faq.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(faq.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }

    if (props.currentMessage.generalOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((gen) => (
              <Button
                key={gen.id}
                title={gen.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(gen.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }

    if (props.currentMessage.recordOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((record) => (
              <Button
                key={record.id}
                title={record.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(record.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }

    if (props.currentMessage.financeOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((finance) => (
              <Button
                key={finance.id}
                title={finance.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(finance.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }

    if (props.currentMessage.enrollOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((enroll) => (
              <Button
                key={enroll.id}
                title={enroll.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(enroll.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }

    if (props.currentMessage.educationOption) {
      return (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'flex-start' }} vertical={true}>
            {props.currentMessage.data.map((educ) => (
              <Button
                key={educ.id}
                title={educ.title}
                titleStyle={{ textAlign: 'center', fontFamily: 'Poppins-Medium', fontSize: 14 }}
                buttonStyle={{
                  backgroundColor: '#2c8162',
                  borderColor: 'transparent',
                  borderWidth: 0,
                  borderRadius: 30,
                }}
                containerStyle={{
                  width: 250,
                  marginHorizontal: 10,
                  marginVertical: 10,
                }}
                onPress={() => this.sendBotResponse(educ.text)}
              />
            ))}
          </ScrollView>
        </View>

      )
    }



    return (

      <Bubble
        {...props}
        textStyle={{ right: { fontFamily: 'Poppins-Light', color: 'white' }, left: { fontFamily: 'Poppins-Light', color: 'black' } }}
        wrapperStyle={{
          right: { backgroundColor: '#39a77f' },
          left: { backgroundColor: '#c2e5d3' },
        }}
        timeTextStyle={{ left: { fontSize: 12, color: 'black' }, right: { fontSize: 12, color: '#e6e6e6' } }}
      />
    )


  }


  // TOOLBAR
  renderInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        placeholderTextColor="#777"
        placeholder="Ask your question here..."
        containerStyle={{
          backgroundColor: '#cccccc',
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

    // if (props.text.trim().length > 0) {
    return (
      <>
        <TouchableOpacity
          style={{
            height: 40,
            width: 40,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 3,
            marginHorizontal: 10,
            left: 10
          }}

          onPress={() => {
            if (onSend) {
              onSend(
                {
                  text: 'CATEGORY',
                  user,
                  _id: messageIdGenerator(),
                },
                true
              );
            }
          }}
        >
          <Icon
            name="microsoft-xbox-controller-menu"
            style={{ marginBottom: 1, marginRight: 1 }}
            size={40}
            color="#2c8162"
          />
        </TouchableOpacity>

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
          <Icon
            name="send-circle"
            style={{ marginBottom: 1, marginRight: 1 }}
            size={40}
            color="#2c8162"
          />
        </TouchableOpacity>
      </>
    );
    // }

    return null;

  }


  renderActions = (props) => {
    <Actions
      {...props}
      containerStyle={{
        position: "absolute",
        right: 50,
        bottom: 5,
        zIndex: 9999,
      }}
      // onPressActionButton={()=>{}}
      icon={() => (
        <Icon name="camera" size={30} color='#38a67e' />
      )}
    />
  }

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <GiftedChat
          messages={this.state.messages}
          onSend={(message) => this.onSend(message)}
          onQuickReply={(quickReply) => this.onQuickReply(quickReply)}
          renderBubble={this.renderBubble}
          renderInputToolbar={this.renderInputToolbar}
          renderSend={this.renderSend}
          user={{ _id: 1 }}
          // inverted={false}
          scrollToBottom={true}
          renderLoading={() => <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color="#38a67e" /></View>}
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
