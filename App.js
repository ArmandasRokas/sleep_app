import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet,StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { human, material, materialColors, robotoWeights } from 'react-native-typography'
import { SafeAreaView } from 'react-native-web';
import Sleeper from './Sleeper';
import { Button} from 'react-native-elements';

// const stages = ['Awake', 'Type 2', 'Type 1']



export default function App() {

  const [isBtnPressed, setBtnPressed ]= useState(false)

  if (isBtnPressed) {
    return (
      <View style={styles.container}>
      <StatusBar
      barStyle="light-content"
    />
      <Sleeper></Sleeper>
  </View>
    )
  }

  return (
    
    <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
      />
      <Button  titleStyle={styles.btnTitleStyle} buttonStyle={styles.buttonStyle} title="Sleep" onPress={() => setBtnPressed(true)} />
      {/* <Button title="Stop Sound" onPress={stopSound} /> */}
    </View>
  );
}






















// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import React, {useEffect} from 'react';
// import dings from './assets/sound.mp3';



// export default function App() {

//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to staart working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: {
    //  ...material.display4,
      ...robotoWeights.thin,
    //  color: materialColors.blackPrimary,
    //  fontSize: 120,
      fontSize: 60 ,
   //   textDecorationLine: 'underline',
      color:'#fff',
    },
    hr: {
      //  ...material.display4,
        ...robotoWeights.light,
      //  color: materialColors.blackPrimary,
      //  fontSize: 120,
        fontSize: 32 ,
     //   textDecorationLine: 'underline',
        color:'#fff',
      },

      buttonStyle:{
        backgroundColor: "#fff",
        borderRadius: 60,
        height: 60,
        width: 160,
        marginBottom: 20,  
      },
      btnTitleStyle: {
        //  ...material.display4,
        // ...robotoWeights.medium,
          color: "black",
          fontSize: 24,
        },
});
