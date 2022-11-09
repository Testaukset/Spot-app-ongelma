import { Text, View, Dimensions, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Col, Grid } from 'react-native-easy-grid'
import moment from 'moment';
import styles from '../styles/styles';

const URL = 'https://web-api.tp.entsoe.eu/api?'
const TOKEN = 'securityToken=419b446b-122c-414f-8586-fc7d6ff39def'
const DOCTYPE = '&documentType=A44'
const OUT_BIDD_ZONE = '&outBiddingZone_Domain=10YFI-1--------U'
const IN_DOM = '&in_Domain=10YFI-1--------U'
const OUT_DOM = '&out_Domain=10YFI-1--------U'

const PricesScreen = () => {

    const [answer, setAnswer] = useState();
    const [currentDate, setCurrentDate] = useState('');
    const [hour, setHour] = useState();

    useEffect(() => {
        let curDate = moment()
            .utcOffset('+02:00')
            .format('YYYYMMDDHH00')
        setCurrentDate(curDate)
        setHour(curDate.substring(8, 10))
        fetch(URL + TOKEN + DOCTYPE + OUT_BIDD_ZONE + '&periodStart=' + curDate + '&periodEnd=' + curDate + IN_DOM + OUT_DOM)
            .then(resp => resp.text())
            .then(data => {
                let XMLParser = require('react-xml-parser');
                const xml = new XMLParser().parseFromString(data);
                // price tai point!!!
                console.log(xml.getElementsByTagName('price'));
                setAnswer(xml.getElementsByTagName('price'))

            })
            .catch(e => console.log(e))



        /*     let dateEnd = moment()
                .utcOffset('+24:00')
                .format('YYYYMMDDHH00');
            setCurrentDate(dateEnd);
            //sethour(dateEnd.substring(8, 10)) //Kellosta tunti arvo talteen
    
            let dateStart = moment()
                .utcOffset('-24:00')
                .format('YYYYMMDDHH00');
            //setCurrentDate(dateEnd);
            fetch(URL + TOKEN + DOCTYPE + OUT_BIDD_ZONE + '&periodStart=' + dateStart + '&periodEnd=' + dateEnd + IN_DOM + OUT_DOM)
                .then(resp => resp.text())
                .then(data => {
                    let XMLParser = require('react-xml-parser');
                    const xml = new XMLParser().parseFromString(data);
                    // price tai point!!!
                    console.log(xml.getElementsByTagName('price'));
                    setAnswer(xml.getElementsByTagName('price'))
                })
                .catch(e => console.log(e)) */
    }, [])

    if (!answer) {
        return null;
    }
    const today = answer.slice(0, 24).map(val => val.value);


    let sum = ''
    //for (let i = 0; i < today.length; i++)
        if (hour === '01') {
            sum = today[0]
        } if (hour === '02') {
            sum = today[1]
        } if (hour === '03') {
            sum = today[2]
        } if (hour === '04') {
            sum = today[3]
        } if (hour === '05') {
            sum = today[4]
        } if (hour === '06') {
            sum = today[5]
        } if (hour === '07') {
            sum = today[6]
        } if (hour === '08') {
            sum = today[7]
        } if (hour === '09') {
            sum = today[8]
        } if (hour === '10') {
            sum = today[9]
        } if (hour === '11') {
            sum = today[10]
        } if (hour === '12') {
            sum = today[11]
        } if (hour === '13') {
            sum = today[12]
        } if (hour === '14') {
            sum = today[13]
        } if (hour === '15') {
            sum = today[14]
        } if (hour === '16') {
            sum = today[15]
        } if (hour === '17') {
            sum = today[16]
        } if (hour === '18') {
            sum = today[17]
        } if (hour === '19') {
            sum = today[18]
        } if (hour === '20') {
            sum = today[19]
        } if (hour === '21') {
            sum = today[20]
        } if (hour === '20') {
            sum = today[19]
        } if (hour === '21') {
            sum = today[20]
        }

    
    const todayMax = Math.max(...answer.slice(0,24).map(val => val.value));
    const todayMin = Math.min(...answer.slice(0,24).map(val => val.value));
    console.log(todayMax)
    console.log(todayMin)
    console.log(currentDate)
    console.log(hour)


    const dataDay = {
        //labels: ["Kuluva viikko", "Edellinen viikko", "Edellinen kuukausi"], // optional
        data: [todayMax, todayMin]
    };
    const data = {
        //labels: ["Kuluva viikko", "Edellinen viikko", "Edellinen kuukausi"], // optional
        data: [0.1]
    };

    const chartConfig = {
        backgroundGradientFrom: "#1E2923",
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#08130D",
        backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(16, 16, 16, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                <View width={Dimensions.get("window").width} >
                    <Grid >
                        <Col>
                            <Text>Edellinen viikko ylin/alin</Text>
                            <ProgressChart
                                data={data}
                                width={130}
                                height={130}
                                strokeWidth={16}
                                radius={32}
                                chartConfig={chartConfig}
                                hideLegend={true}
                            />
                            <Text style={styles.text}>{((100 + 24) / 100 * answer[3].value * 0.1).toFixed(2)} snt/kWh</Text>
                        </Col>
                        <Col>
                            <Text>Edellinen kuukausi ylin/alin</Text>
                            <ProgressChart
                                data={data}
                                width={130}
                                height={130}
                                strokeWidth={16}
                                radius={32}
                                chartConfig={chartConfig}
                                hideLegend={true}
                            />
                            <Text style={styles.text}>{((100 + 24) / 100 * answer[3].value * 0.1).toFixed(2)} snt/kWh</Text>
                        </Col>
                        <Col>
                            <Text>Tämä päivä ylin/alin</Text>
                            <ProgressChart
                                data={dataDay}
                                width={130}
                                height={130}
                                strokeWidth={16}
                                radius={32}
                                chartConfig={chartConfig}
                                hideLegend={true}
                            />
                            <Text style={styles.text}>Ylin: {((100 + 24) / 100 * todayMax * 0.1).toFixed(2)} snt/kWh</Text>
                            <Text style={styles.text}>Alin: {((100 + 24) / 100 * todayMin * 0.1).toFixed(2)} snt/kWh</Text>
                        </Col>
                    </Grid>
                </View>
                <View>
                    <Col>
                        <Text>Hinta nyt</Text>
                        <ProgressChart
                            data={data}
                            width={130}
                            height={130}
                            strokeWidth={16}
                            radius={32}
                            chartConfig={chartConfig}
                            hideLegend={true}
                        />
                        <Text style={styles.text}>{((100 + 24) / 100 * sum * 0.1).toFixed(2)} snt/kWh</Text>
                    </Col>
                </View>
            </ScrollView>
        </View>
    );
}

export { PricesScreen };