import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,StatusBar } from 'react-native';
import { Audio } from 'expo-av';
import { human, material, materialColors, robotoWeights } from 'react-native-typography'
import { SafeAreaView } from 'react-native-web';

// const stages = ['Awake', 'Type 2', 'Type 1']



export default function App() {

  const stages_tracks = [
    {stage: 'Awake', track:playSoundAwake, minHR: 70, maxHR:80 },
    {stage: 'Light sleep', track: playSoundLight,minHR: 60, maxHR:65},
    {stage: 'Deep sleep', track: playSoundDeep, minHR: 50, maxHR:60},
    {stage: 'REM sleep', track: playSoundLight, minHR: 65, maxHR:70},
    {stage: 'Alarm', track: playSoundAlarm, minHR: 80, maxHR:90}
  ]
  
  const stages = [
    stages_tracks[0],
    stages_tracks[1],
    stages_tracks[2],
    stages_tracks[3],
    stages_tracks[2],
    stages_tracks[1],
    stages_tracks[4]
  ]
  console.log("bla")
  let counter = 0;
  const [sound, setSound] = useState();
  // const [stage, setStage] = useState("REM");
  const [currStage, setStage] = useState(stages_tracks[0]);
  const [currHR, setHR] = useState(80);

  const MINUTE_MS = 10000;

    useEffect(() => {
      playSoundAwake();
      const interval = setInterval(() => {
        // stopSound()
        // if (typeof sound !== 'undefined'){
        //   await sound.stopAsync(); 
        // }
      
        if(counter < stages.length)
        {
          console.log(stages[counter])
          setStage(stages[counter])
        //  stages[counter].track()
          //play()
        }
        counter++;
      }, MINUTE_MS);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    useEffect(() => { currStage.track()  }, [currStage])

    useEffect(() => {
      const interval = setInterval(() => {
        setHR(getRndInteger(currStage.minHR, currStage.maxHR))
      }, 1000);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [currStage])
    
  // async function playSound() {

  //   console.log('Loading Sound');
  //    const { sound } = await Audio.Sound.createAsync(
  //     require('./assets/sound.mp3')
  //     // require(stage.track)
  //   );
  //   setSound(sound);
  //   console.log('Playing Sound');
  //   await sound.playAsync(); }

  // async function stopSound() {
  //   await sound.stopAsync();
  // }


  async function playSoundAwake() {

    console.log('Loading Sound');
     const { sound } = await Audio.Sound.createAsync(
      require('./assets/awake.wav')
      // require(stage.track)
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync(); }



  async function playSoundLight() {

    console.log('Loading Sound Light');
     const { sound } = await Audio.Sound.createAsync(
      require('./assets/light_sleep.wav')
      // require(stage.track)
    );
    setSound(sound);
    console.log('Playing Sound Light');
    await sound.playAsync(); }

  async function playSoundDeep() {

      console.log('Loading Sound Light');
       const { sound } = await Audio.Sound.createAsync(
        require('./assets/deep_sleep.wav')
        // require(stage.track)
      );
      setSound(sound);
      console.log('Playing Sound Light');
      await sound.playAsync(); }

  async function playSoundAlarm() {

    console.log('Loading Sound Light');
      const { sound } = await Audio.Sound.createAsync(
      require('./assets/loop.wav')
      // require(stage.track)
    );
    setSound(sound);
    console.log('Playing Sound Light');
    await sound.playAsync(); }


  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  return (
    
    <View style={styles.container}>
        <StatusBar
        barStyle="light-content"
      />

      <Text style={styles.hr}>HR: {currHR}</Text>
      <Text style={styles.stage}>{currStage.stage}</Text>
      {/* <Button title="Play Sound" onPress={playSound} /> */}
      {/* <Button title="Stop Sound" onPress={stopSound} /> */}
    </View>
  );
}


function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
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
});
