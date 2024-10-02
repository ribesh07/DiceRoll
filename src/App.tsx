/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
import { Animated, Image, ImageSourcePropType, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react';
import DiceOne from './assets/img/dice-six-faces-one.png';
import DiceTwo from './assets/img/dice-six-faces-two.png';
import DiceThree from './assets/img/dice-six-faces-three.png';
import DiceFour from './assets/img/dice-six-faces-four.png';
import DiceFive from './assets/img/dice-six-faces-five.png';
import DiceSix from './assets/img/dice-six-faces-six.png';
import DiceFire from './assets/img/dice-fire.png';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Quiz, { ChildComponentRef } from './ApiCallBack';

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

  const [diceState,setdiceState] = useState<ImageSourcePropType>(DiceFire)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showComponent, setShowComponent] = useState(false);

  //Ref to access child
  const myComponentRef = useRef<ChildComponentRef>(null);
  const handleTrigger = () => {
    if(myComponentRef.current){
      myComponentRef.current.handleButtonPress()
    }
  }

const { width, height } = useWindowDimensions();
const [modeScreen , setmodeScreen] = useState(true);
useEffect(() => {
  console.log(`Width: ${width}, Height: ${height}`);
  (height > width) ? setmodeScreen(true) : setmodeScreen(false)
  console.log(modeScreen)
}, [width, height,modeScreen]);


//roll dice
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
    setShowComponent(true);
    //handle trigger from parent
    // handleTrigger();
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
      {showComponent ?
      <>
        <View style={styles.contaner}>
          {/* Passing Ref to child */}
          <Quiz ref = {myComponentRef}/>
          {/* <Button title="Trigger myFunction" onPress={handleTrigger} /> */}
        </View>
      </>  :
      <>
        <View style={{
          height: '40%',
          width : '100%',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#8395A7',
        }}>
          <Text style={{
            fontSize: 20,
            padding : 10,
            margin: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
          }}>
            Press the button to roll the dice !
          </Text>
        </View>
      </>
    }
      <View style={styles.contaner}>
        <View style={styles.diceContainer}>
        {/* <Text style={{
            fontSize: 20,
            padding : 10,
            margin: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            color: 'white',
          }}>
            {dicevalue}
          </Text> */}
        <Animated.View style={[
          animatedStyle,
        ]}>
            <Dice imageUrl={diceState} />
          </Animated.View>
          <Pressable
            onPress={()=>{
              handleTrigger();
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
    marginTop: '11%',
  },
  rollButtonText :{
    marginTop: 80,
    marginBottom :'33%',
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
