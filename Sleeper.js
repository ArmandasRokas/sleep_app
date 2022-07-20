import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button,StatusBar, Dimensions  } from 'react-native';
import { Audio } from 'expo-av';
import { human, material, materialColors, robotoWeights } from 'react-native-typography'
import { SafeAreaView } from 'react-native-web';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Icon } from 'react-native-elements';
import FontAwesomeIcon from 'react-native-fontawesome';
// const stages = ['Awake', 'Type 2', 'Type 1']



export default function Sleeper() {
    

    const data = {
        // labels: ["22:00", "23:00", "24:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"], // 
        labels: ["22:00", "24:00", "02:00", "04:00", "06:00", "08:00", ""], // 
        datasets: [
          {
            data: [4, 0, 0, 0, 0,0, 0 ],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
            strokeWidth: 2 // optional
          }
        ],
        legend: ["Rainy Days"] // optional
      };
      const [currData, setData] = useState(data);

      const chartConfig = {
        // backgroundGradientFrom: "#1E2923",
        // backgroundGradientFromOpacity: 0,
        // backgroundGradientTo: "#08130D",
        // backgroundGradientToOpacity: 0.5,
        // color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        backgroundGradientFrom: "#000",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#000",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(255,255,255, ${opacity})`,
        fillShadowGradient: "#00BFFF",
        fillShadowGradientOpacity: 1,
        strokeWidth: 10, // optional, default 3
        barPercentage: 1.3,
        useShadowColorFromDataset: false, // optional
        formatYLabel: (e)=> {
            String(e)
            switch (e)
                {
                case "0.00": return ""
                case "1.00": return "Deep"
                case "2.00": return "Light"
                case "3.00": return "REM"
                case "4.00": return "Awake"
                default: console.log(e)
                }
        }
      };

    // const fill = 'rgb(134, 65, 244)'
    // const data = [50, 10, 40, 95, -4, -24, 0, 35]

  const stages_tracks = [
    {stage: 'Awake', track:playSoundAwake, minHR: 70, maxHR:75, category: 4 },
    {stage: 'Light sleep', track: playSoundLight,minHR: 60, maxHR:65, category: 2},
    {stage: 'Deep sleep', track: playSoundEmpty, minHR: 56, maxHR:60, category: 1},
    {stage: 'REM sleep', track: playSoundEmpty, minHR: 65, maxHR:70, category: 3},
    {stage: 'Awake', track: playSoundAlarm, minHR: 85, maxHR:90, category: 4}
  ]
  
  const stages = [
    stages_tracks[0],
    stages_tracks[1],
    stages_tracks[2],
    stages_tracks[1],
    stages_tracks[3],
    stages_tracks[4]
  ]
  let counter = 0;
  const [sound, setSound] = useState();
  // const [stage, setStage] = useState("REM");
  const [currStage, setStage] = useState(stages_tracks[0]);
  const [currHR, setHR] = useState(80);

  const MINUTE_MS = 20000;

    useEffect(() => {
      playSoundAwake();
      const interval = setInterval(() => {
        // stopSound()
        // if (typeof sound !== 'undefined'){
        //   await sound.stopAsync(); 
        // }
      
        if(counter < stages.length)
        {
          currData.datasets[0].data[counter] = stages[counter].category
          console.log(data.datasets[0])
          console.log(stages[counter])
          setStage(stages[counter])
        //  stages[counter].track()
          //play()
        }
        // if(counter == stages.length){
        //     currData.datasets[0].data[counter] = stages[counter].category
        // }
        counter++;
      }, MINUTE_MS);

      return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
    }, [])


    useEffect(() => { currStage.track()  }, [currStage])

    useEffect(() => {
      const interval = setInterval(() => {
        setHR(getRndInteger(currStage.minHR, currStage.maxHR))
      }, 1500);

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
      require('./assets/WakeStage.wav')
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

  async function playSoundEmpty() {

      console.log('Loading Sound');
       const { sound } = await Audio.Sound.createAsync(
        require('./assets/Empty.wav')
        // require(stage.track)
      );
      setSound(sound);
      console.log('Playing Sound');
      await sound.playAsync(); }

  async function playSoundAlarm() {

    console.log('Loading Sound Light');
      const { sound } = await Audio.Sound.createAsync(
      require('./assets/Alarm.wav')
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

      
      <Text style={styles.stage}>{currStage.stage}</Text>
      
      <View style={styles.row}>
      {/* <FontAwesomeIcon icon="fas fa-heart" /> */}
      {/* <Icon name='fas fa-heart' type='font-awesome-5'  color='#FFD700' /> */}
      {/* <FontAwesomeIcon icon="fas fa-heart" /> */}
      <Text style={styles.hr}> HR:</Text>
      <Text style={styles.hr}> {currHR}</Text>
      </View>
      {/* <Button title="Play Sound" onPress={playSound} /> */}
      {/* <Button title="Stop Sound" onPress={stopSound} /> */}
      {/* <LineChart
      withHorizontalLabels={false}
  data={data}
  width={200}
//   width={Dimensions.get('window').width}
  height={220}
  chartConfig={chartConfig}
/> */}
<View style={styles.padding}>
<BarChart
//   style={graphStyle}
  data={currData}
  width={Dimensions.get('window').width-40 }
  height={220}
//   yAxisLabel="$"
  chartConfig={chartConfig}
//   verticalLabelRotation={30}
/>
  {/* <BarChart style={{ height: 200 }} data={data} svg={{ fill }} contentInset={{ top: 30, bottom: 30 }}>
                <Grid />
            </BarChart> */}
    </View>
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
    padding:10,
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

      padding: {
        padding:60    
      },
      row: {
        flexDirection: "row",
        flexWrap: "wrap",
      }
      
});
