import { StyleSheet, Text, View, Dimensions, Button, Animated, Easing} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function App() {

  let SearchValues = {
    0: {"Suomessa_kulutus" : "193",
        "Suomessa_tuotanto" : "192",
        "Tuulivoima_tuotanto" : "181",
        "Vesivoima_tuotanto" : "191",
        "Ydinvoima_tuotanto" : "188",
        "Kaukolampo_tuotanto" : "201",
        "Varavoima laitokset" : "205"
    }
}

let titleValue = {
  0: {"193" : "Suomessa kulutus",
      "192" : "Suomessa tuonto",
      "181" : "Tuulivoiman tuotanto Suomessa",
      "191" : "Vesivoiman tuotanto Suomessa",
      "Ydinvoima_tuotanto" : "188",
      "Kaukolampo_tuotanto" : "201",
      "Varavoima laitokset" : "205"
  }
}

const time = [
  "", 
  "/events/json?start_time=2022-1-1T18%3A32%3A00Z&end_time=2022-1-1T18%3A35%3A00Z", 
  "/events/json?start_time=2022-2-1T18%3A32%3A00Z&end_time=2022-2-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-3-1T18%3A32%3A00Z&end_time=2022-3-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-4-1T18%3A32%3A00Z&end_time=2022-4-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-5-1T18%3A32%3A00Z&end_time=2022-5-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-6-1T18%3A32%3A00Z&end_time=2022-6-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-7-1T18%3A32%3A00Z&end_time=2022-7-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-8-1T18%3A32%3A00Z&end_time=2022-8-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-9-1T18%3A32%3A00Z&end_time=2022-9-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-10-1T18%3A32%3A00Z&end_time=2022-10-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-11-1T18%3A32%3A00Z&end_time=2022-11-1T18%3A35%3A00Z",
  "/events/json?start_time=2022-12-1T18%3A32%3A00Z&end_time=2022-12-1T18%3A35%3A00Z",
 ]

 const [dataArray, setDataArray] = useState([])

  let avgyearlydata = []
  const [isLoaded, setIsLoaded] = useState();
  const [seachTitle, setSearchTitle] = useState(SearchValues[0].Suomessa_kulutus)
  const urlyear = "https://api.fingrid.fi/v1/variable/"+ seachTitle

  

  const SearchConditions = {
    'method' : 'GET', 
    'Accept' : 'application/json',
    'Content-Type' : 'application/json',
    'X-API-KEY' : 'QPZ8F4mEaW2GHtxuFbkle5qtTVkET5DQ4jabOACk' ,
    'mode' : 'cors',  
  }

  let months = [
    "tammikuu", 
    "helmikuu",
    "maaliskuu",
    "huhtikuu",
    "toukokuu",
    "kesäkuu",
    "heinäkuu",
    "elokuu",
    "syyskuu",
    "lokakuu",
    "marraskuu",
    "joulukuu"  
  ]

  let HalfYear = [
    "tammikuu", 
    "helmikuu",
    "maaliskuu",
    "huhtikuu",
    "toukokuu",
    "kesäkuu",  
  ]

  const [timeFrame, setTimeFrame] = useState(HalfYear)
  //monthski vois ottaa 0. 4 tai täys tms

  useEffect(() => { 
    YearlyData()
    spinAnim()
  },[urlyear])

  const YearlyData = async () => {
    for(let i = 1; i <= 13 ;i++){
      if(dataArray.length === timeFrame.length) { setIsLoaded(true)}
      if(time[i] !== undefined){
      try {                
          const response = await fetch(urlyear + time[i],{
          'method' : 'GET', 
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
          'X-API-KEY' : 'QPZ8F4mEaW2GHtxuFbkle5qtTVkET5DQ4jabOACk' ,
          'mode' : 'cors',  
        })
          const json = await response.json()
          if(json[0] !== undefined) {
            dataArray.push(json)
          }
          else {
            dataArray.push([{'value' : 0}])
          }
        }
    catch(error){
          console.log(error)
        }
      } else {
        dataArray.push([{'value' : 0}])
      }
    }
    console.log(dataArray)
   }

   const spin = useRef(new Animated.Value(0)).current;

   function spinAnim() {
    Animated.loop(
        Animated.timing(spin, {
          toValue: 1,
          duration: 700,
          easing: Easing.linear,
          useNativeDriver: false,
        }
      )
      ).start();
   };

   if(!isLoaded) {
    return (
      <View style={StyleSheet.container}> 
          <Animated.View
          style={[
            styles.fadingContainer,
            {
              transform: [{
                rotate: spin.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                })
              }], 
            }
          ]}
          >
          <MaterialCommunityIcons name="loading" size={24} color="black" />
        </Animated.View>         
      </View>
    )
  } else {
  return (
        <View>
          <Text>{titleValue[0][seachTitle]}</Text>
          <Button title="kulutus Suomessa" onPress={() => [ 
            dataArray.splice(0,dataArray.length),
            setIsLoaded(false),
            setSearchTitle(SearchValues[0].Suomessa_kulutus)]}>
          </Button>
          <Button title="Sähkön tuotanto Suomessa" onPress={() => [
            dataArray.splice(0, dataArray.length),
            setIsLoaded(false), 
            setSearchTitle(SearchValues[0].Suomessa_tuotanto)]}>
          </Button>
          <Button title="Tuulivoiman tuotanto Suomessa" onPress={() => [
            dataArray.splice(0, dataArray.length), 
            setIsLoaded(false), 
            setSearchTitle(SearchValues[0].Tuulivoima_tuotanto)]}>
          </Button>
          <Text>Aikamäääre</Text>
          <Button title="Vuosi" onPress={() => setTimeFrame(months)}></Button>
          <Button title="Puoli vuotta" onPress={() => setTimeFrame(HalfYear)}></Button>
          <Text></Text>
          <LineChart
            data={{
              labels: timeFrame,
              datasets: [
                {
                data :  dataArray.slice(0, timeFrame.length).map(item => {
                  return(item[0]['value']) 
                })
                }
              ]
            }}
            
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726"
              }
            }}
            bezier
            style={{
              marginTop: 250,
              marginVertical: 8,
              borderRadius: 16
            }}
          />
        </View>
      );
    }
  }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      fadingContainer: {
        alignSelf: 'center',
        width: "1%",
        marginTop: 350
      },  
    });
    
