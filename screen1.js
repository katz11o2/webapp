import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Screen1() {
  const initialMinutes = 25;
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [sessionType, setSessionType] = useState('Pomodoro Mode');
  const [showChatBot, setShowChatBot] = useState(true);
  const [iconPosition] = useState(new Animated.Value(0));
  let intervalRef = React.useRef();

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    const waveAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(iconPosition, {
          toValue: -5,
          duration: 500,
          useNativeDriver: false,
        }),
        Animated.timing(iconPosition, {
          toValue: 5,
          duration: 500,
          useNativeDriver: false,
        }),
      ])
    );

    if (showChatBot) {
      waveAnimation.start();
    } else {
      waveAnimation.stop();
    }

    return () => {
      waveAnimation.stop();
    };
  }, [showChatBot, iconPosition]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    if (!isActive) {
      intervalRef.current = setInterval(() => {
        if (totalSeconds === 0) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          if (sessionType === 'Pomodoro Mode') {
            setSessionType('Break');
            setTotalSeconds(5 * 60);
          } else {
            setSessionType('Pomodoro Mode');
            setTotalSeconds(initialMinutes * 60);
          }
        } else {
          setTotalSeconds((prevSeconds) => prevSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    setShowChatBot(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    clearInterval(intervalRef.current);
    setSessionType('Pomodoro Mode');
    setTotalSeconds(initialMinutes * 60);
    setShowChatBot(true);
  };

  const formatTime = (value) => String(value).padStart(2, '0');

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Use the navigation hook
  const navigation = useNavigation();

  const handleIconPress = () => {
    setShowChatBot(!showChatBot);

    // Navigate to Screen2
    navigation.navigate('Screen2');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image source={require('./assets/aes for website.jpg')} style={styles.backgroundImage} />

        <View style={styles.content}>
          <Text style={styles.title}>{sessionType}</Text>

          <Animated.View
            style={{
              ...styles.iconContainer,
              transform: [{ translateY: iconPosition }],
            }}
          >
            <TouchableOpacity onPress={handleIconPress}>
              <Image source={require('./assets/chatbot.png')} style={styles.chatIcon} />
            </TouchableOpacity>
          </Animated.View>

          <View style={styles.starLine}></View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              <Text style={styles.timerNumber}>{formatTime(minutes)}</Text>
              <Text style={styles.timerColon}>:</Text>
              <Text style={styles.timerNumber}>{formatTime(seconds)}</Text>
            </Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={isActive ? styles.buttonActive : styles.buttonInactive}
              onPress={toggleTimer}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>{isActive ? 'Pause' : 'Start'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonInactive}
              onPress={resetTimer}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',

    width: '100%',
    height: '100%',
  },
  content: {
    backgroundColor: 'transparent',
    padding: 20,
    alignItems: 'center',
    marginTop: -20,
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  timerContainer: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  timerText: {
    fontSize: 130,
    color: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerNumber: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 130,
  },
  timerColon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 110,
    marginHorizontal: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  buttonActive: {
    width: 150,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF2400', // Change to your desired color
  },
  buttonInactive: {
    width: 150,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c38b8b',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  iconContainer: {
    position: 'absolute',
    top: 495, // Adjust as needed
    right: 790, // Adjust as needed
  },
  chatIcon: {
    width: 30,
    height: 30,
  },

  // New styles for task assignment
  taskContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addTaskButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF2400',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addTaskButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
