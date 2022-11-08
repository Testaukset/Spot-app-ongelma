import { NavigationContainer } from '@react-navigation/native';
import {AntDesign} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
import { PricesScreen} from './PricesScreen';
import { PriceLimitsScreen } from './PriceLimitsScreen';
import { AlarmsScreen } from './AlarmsScreen';
import { ElCarScreen } from './ElCarScreen';
import { ContactScreen } from './ContactScreen';
import { HomeScreen } from './HomeScreen';
import {SettingsScreen} from './SettingsScreen';

import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();


export default function DrawerNavigation(){

    return (
        <NavigationContainer>
        <Drawer.Navigator>
        <Drawer.Screen 
          name="Koti"
          component= {HomeScreen} 
          options={{drawerIcon: () => <AntDesign name="home" size={20}/>}}
        />
        <Drawer.Screen 
        name ="Sähkönhinnat" 
        component={PricesScreen} 
        options={{drawerIcon: () => <AntDesign name="linechart" size={20}/>}}
        />
        <Drawer.Screen 
        name ="Hintarajat" 
        component={PriceLimitsScreen}
        options={{drawerIcon: () => <FontAwesome name="sliders" size={20}/>}} 
        />
        <Drawer.Screen 
        name ="Hälytykset" 
        component={AlarmsScreen}
        options={{drawerIcon: () => <AntDesign name="notification" size={20}/>}} 
        />
        <Drawer.Screen 
        name ="Sähköauto" 
        component={ElCarScreen}
        options={{drawerIcon: () => <MaterialCommunityIcons name="car-electric" size={20}/>}} 
        />
        <Drawer.Screen 
        name ="Ota yhteyttä" 
        component={ContactScreen}
        options={{drawerIcon: () => <MaterialCommunityIcons name="email" size={20}/>}} 
        />
        <Drawer.Screen 
        name ="Asetukset" 
        component={SettingsScreen}
        options={{drawerIcon: () => <AntDesign name="setting" size={20}/>}} 
        />

      </Drawer.Navigator>
        </NavigationContainer>
    );
}

