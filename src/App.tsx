/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View, ViewStyle } from 'react-native';
import React, { PropsWithChildren, useRef, useState } from 'react';
import DiceOne from './assets/img/dice-six-faces-one.png';
import DiceTwo from './assets/img/dice-six-faces-two.png';
import DiceThree from './assets/img/dice-six-faces-three.png';
import DiceFour from './assets/img/dice-six-faces-four.png';
import DiceFive from './assets/img/dice-six-faces-five.png';
import DiceSix from './assets/img/dice-six-faces-six.png';
import DiceFire from './assets/img/dice-fire.png';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

type DiceProps = PropsWithChildren<{
  imageUrl : ImageSourcePropType
}>

//HapticOptions
const options = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

const Dice = ({ imageUrl }: DiceProps) => {
  return (
    <Image
      source={imageUrl}
      style={styles.diceImage}
    />
  );
};


export default function App() {
  const [diceState,setdiceState] = useState<ImageSourcePropType>(DiceFire);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  //Roll function
  const rollDice = () => {
    fadeAnim.setValue(0);   //setting fade to 0

    let random = Math.floor(Math.random() * 6) + 1;
    console.log(random);
    switch (random) {
      case 1 :
        setdiceState(DiceOne);
        break;
      case 2:
        setdiceState(DiceTwo);
        break;
      case 3:
        setdiceState(DiceThree);
        break;
      case 4:
        setdiceState(DiceFour);
        break;
      case 5:
        setdiceState(DiceFive);
        break;
      case 6:
        setdiceState(DiceSix);
        break;
      default :
        setdiceState(DiceFire);
    }
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    ReactNativeHapticFeedback.trigger('impactLight', options);
    console.log('impactLight-FeedBack');
  };

  const rotateInterpolate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: rotateInterpolate,
      },
    ],
  };

  return (
    <>
      <View style={{
                alignItems : 'center',
                justifyContent: 'center',
                backgroundColor : 'grey',
      }}>
      <Text style={styles.textHeading}>Dice Roll</Text>
      </View>
      <View style={styles.contaner}>
        <View style={styles.diceContainer}>
        <Animated.View style={[
          animatedStyle,
        ]}>
            <Dice imageUrl={diceState} />
          </Animated.View>
          <Pressable
            onPress={()=>{
            rollDice();
          }}>
          <Text style={styles.rollButtonText}>Roll</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#8395A7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceImage : {
    width: 150,
    height: 150,
    elevation : 10,
  },
  diceContainer : {
    justifyContent: 'center',
    marginTop: -34,
  },
  rollButtonText :{
    marginTop: 50,
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding : 10,
    borderWidth : 2 ,
    borderRadius :12,
    borderColor : '#fff',
    textTransform : 'uppercase',
  },
  textHeading :{
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding : 10,
    textTransform : 'uppercase',
  },
});
