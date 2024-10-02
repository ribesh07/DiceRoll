/* eslint-disable react-native/no-inline-styles */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
// ApiTest.js;
import axios from 'axios';
import React, { useState ,forwardRef, useImperativeHandle } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';

interface dataExpected {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
}
export interface ChildComponentRef {
  handleButtonPress: () => void;
}


const Quiz = forwardRef((props,ref) => {

  const [data, setData] = useState<dataExpected | null>(null);
  const [loading, setLoading] = useState(false);
  const [ bgcolor , setbgcolor ] = useState('#8395A7')

  //passing function to parent

  const fetchQuestion = async () => {
    console.log('inside question')
    const amount = 1;
    const mode = 'easy';
    try{
      const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&type=multiple&difficulty=${mode}`);
      if(response.status === 200){
        const dataResult = response.data.results[0];    //accessing first result
        const answers = [...dataResult.incorrect_answers,dataResult.correct_answer
        ].sort(() => Math.random() - 0.5);
        dataResult.answers = answers;
        console.log('\n')
        // console.log('Results :' + JSON.stringify(dataResult));
          console.log(dataResult.incorrect_answers);
          console.log(dataResult.correct_answer);
          console.log('Category :' + dataResult.category);
          console.log(answers);
        console.log('\n')
        setData(dataResult);
        setLoading(false)
        // console.log('Data :' + JSON.stringify(data,null,2))
        // console.log(data);
        // console.log(data?.correct_answer);
      }
      else{
        console.log('error : ' + response.status)

      }
    }catch(e){
      console.log('error : ' + e)
    }
}

const handleButtonPress = () => {
  // console.log('inside button');
  setbgcolor('#8395A7');
  setLoading(true);
  fetchQuestion();
};

  // Handle answer selection
  const handleAnswerPress = (answer : string) => {
    if (answer === data?.correct_answer) {
      setbgcolor('green')
      Alert.alert('Correct!', 'You chose the right answer.');
    } else {
      setbgcolor('red')
      Alert.alert('Wrong!', "That's not the correct answer.");
    }
  };

  // Render each answer item
  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity onPress={() => handleAnswerPress(item)} style={styles.answerButton}>
      <Text style={styles.answerText}>{item}</Text>
    </TouchableOpacity>
  );
//passing function to parent
useImperativeHandle(ref, () => ({
  handleButtonPress, // Make this function accessible to parent
}));


  return (
    <View style={[styles.container,{backgroundColor : bgcolor}]}>
      {loading ? <Text>Loading...</Text> :
      <>
      {/* <Button onPress={handleButtonPress} title="FetchData"/> */}
      {data ?
      <>
        <Text style={styles.questionText}>{data?.question}</Text>
      <FlatList
        data={data?.answers}
        renderItem={renderItem}
        keyExtractor={(item) => item}
        style={styles.answerList}
      />
      </> : <>
      {/* {setbgcolor('red')} */}
      <Text style={{
            fontSize: 20,
            padding : 10,
            margin: 30,
            fontWeight: 'bold',
            textAlign: 'center',
            // color: 'Red',
          }}>
             Oops! Please try to roll Again !
          </Text>
      </>
      }
      </>
      }
    </View>
  );
});

// Styles
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 'auto',
    width : '80%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // backgroundColor :'red'
    // margin :10,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  answerList: {
    width: '90%',
  },
  answerButton: {
    backgroundColor: '#f1f1f1',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  answerText: {
    fontSize: 16,
  },
});

export default Quiz;



