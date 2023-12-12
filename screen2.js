import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Animated,
  Image,
  Modal,
  TextInput,
  ScrollView,
} from 'react-native';

export default function Screen2() {
  const linkedInProfileUrl = 'https://www.linkedin.com/in/thiru-venkat-748328251/';
  const appreciationEmail = 'mailto:thiruvenkat.er@gmail.com?subject=Appreciation&body=Dear Thiruvenkat,';

  const openLinkedInProfile = () => {
    Linking.openURL(linkedInProfileUrl);
  };

  const sendAppreciationEmail = () => {
    Linking.openURL(appreciationEmail);
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const chatIconAnim = useRef(new Animated.Value(0)).current;
  const [chatModalVisible, setChatModalVisible] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'bot', content: 'Hi! How may I help you?' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start();

    // Start the waving animation for the chat icon
    Animated.loop(
      Animated.sequence([
        Animated.timing(chatIconAnim, { toValue: 10, duration: 500, useNativeDriver: true }),
        Animated.timing(chatIconAnim, { toValue: -10, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, [fadeAnim, chatIconAnim]);

  const openChatModal = () => {
    setChatModalVisible(true);
  };

  const closeChatModal = () => {
    setChatModalVisible(false);
    setInputMessage('');
    setUserName('');
    setChatMessages([{ id: 1, type: 'bot', content: 'Hi! How may I help you?' }]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    if (!userName) {
      setUserName(inputMessage);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, type: 'user', content: inputMessage },
        { id: prevMessages.length + 2, type: 'bot', content: `Hi ${inputMessage}! Nice to meet you! Could you be more specific about what help you need for now?` },
      ]);
    } else {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, type: 'user', content: inputMessage },
        { id: prevMessages.length + 2, type: 'bot', content: 'Contact Thiruvenkat for more info, mate!' },
      ]);

      setTimeout(() => {
        closeChatModal();
      }, 5000);
    }

    setInputMessage('');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.backgroundImage} />

      <Text style={styles.heading}>Focus Master: Your Personalized Productivity Coach</Text>
      <Text style={styles.paragraph}>
        Focus Master is a sleek and adaptable time management tool accessible on both desktop and
        mobile browsers. Built around the renowned Pomodoro Technique, Focus Master empowers you to
        conquer any task, be it studying, writing, or coding, with laser-sharp concentration. ✨
      </Text>

      <View style={styles.line} />

      <Text style={styles.heading}>Unleash the Power of the Pomodoro Technique:</Text>
      <Text style={styles.paragraph}>
        Developed by time management guru Francesco Cirillo, the Pomodoro Technique breaks down work
        into focused 25-minute intervals ⏱️, punctuated by refreshing 5-minute breaks ☕. Each
        interval is called a pomodoro, inspired by the tomato-shaped timer Cirillo used as a student.
        Focus Master seamlessly integrates this powerful method into your daily routine, boosting
        your productivity and minimizing distractions.
      </Text>

      <View style={styles.line} />

      <Text style={styles.heading}>Why is the Pomodoro Technique so effective?</Text>
      <Text style={styles.paragraph}>
        Increased Focus: ‍♀️ By prioritizing deep, uninterrupted work periods, the Pomodoro Technique
        helps you stay focused and avoid distractions. Improved Time Management: ️ Breaking down
        tasks into smaller chunks allows you to manage your time more effectively and estimate your
        workload realistically. Reduced Procrastination: The short bursts of work interspersed with
        breaks make tasks less daunting and help you overcome the urge to procrastinate. Enhanced
        Motivation: Completing Pomodoros provides a sense of accomplishment, motivating you to
        continue working and achieving your goals. Reduced Stress: The structured nature of the
        Pomodoro Technique helps to reduce stress and anxiety by providing predictable work periods
        and breaks.
      </Text>

      <View style={styles.customLine1} />

      <TouchableOpacity onPress={openLinkedInProfile}>
        <Text style={styles.footer}>MADE BY THIRUVENKAT WITH ❤️</Text>
      </TouchableOpacity>

      {/* Add the animated chat icon */}
      <Animated.View
        style={[
          styles.chatIconContainer,
          {
            transform: [
              {
                translateY: chatIconAnim,
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={openChatModal}>
          <Image source={require('./assets/chatbot.png')} style={styles.chatIcon} />
        </TouchableOpacity>
      </Animated.View>

      {/* Chat Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatModalVisible}
        onRequestClose={closeChatModal}
      >
        <View style={styles.chatModalContainer}>
          <View style={styles.chatModalContent}>
            <Text style={styles.chatHeading}>Hi! I am Jarvis</Text>
            <ScrollView style={styles.chatMessagesContainer}>
              {chatMessages.map((message) => (
                <View
                  key={message.id}
                  style={[
                    styles.chatMessage,
                    message.type === 'bot' ? styles.botMessage : styles.userMessage,
                  ]}
                >
                  <Text style={styles.chatMessageText}>{message.content}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.chatInputContainer}>
              <TextInput
                style={styles.chatInput}
                placeholder="Type your message"
                value={inputMessage}
                onChangeText={(text) => setInputMessage(text)}
              />
              <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={closeChatModal} style={styles.closeChatButton}>
              <Text style={styles.closeChatButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#003366',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Cochin',
  },
  paragraph: {
    fontSize: 18,
    color: '#003366',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    width: '80%',
    backgroundColor: '#003366',
    marginVertical: 20,
  },
  customLine1: {
    height: 2,
    width: '50%',
    backgroundColor: '#FF4500',
    marginVertical: 20,
  },
  footer: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FF6633',
    fontFamily: 'Arial',
  },
  // Chat icon styles
  chatIconContainer: {
    marginTop: 20,
    right: 10,
  },
  chatIcon: {
    width: 80,
    height: 80,
  },
  // Chat modal styles
  chatModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  chatModalContent: {
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingTop: 30,
    height: '70%',
  },
  chatHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chatMessagesContainer: {
    maxHeight: '60%',
  },
  chatMessage: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    maxWidth: '80%',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#E1EFFF',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#C5FACC',
  },
  chatMessageText: {
    fontSize: 16,
  },
  chatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  chatInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#003366',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeChatButton: {
    backgroundColor: '#FF2400',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeChatButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
