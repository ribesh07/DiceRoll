import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import DiceOne from './assets/img/dice-six-faces-one.png';
import DiceTwo from './assets/img/dice-six-faces-two.png';
import DiceThree from './assets/img/dice-six-faces-three.png';
import DiceFour from './assets/img/dice-six-faces-four.png';
import DiceFive from './assets/img/dice-six-faces-five.png';
import DiceSix from './assets/img/dice-six-faces-six.png';
import DiceFire from './assets/img/dice-fire.png';


export default function App() {
  return (
    <>
      <View style={styles.contaner}>
        <View style={styles.diceContainer}>
          <Image
            source={{uri : DiceFire}}
            style={styles.diceImage}
          />
          <Text style={styles.rollButtonText}>Roll</Text>
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
    width: 200,
    height: 200,
  },
  diceContainer : {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 14,
  },
  rollButtonText :{
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
});
