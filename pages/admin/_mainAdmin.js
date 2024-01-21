import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeAdmin from './Home';

const _mainAdmin = () => {
     const Tab = createBottomTabNavigator();

     return (
          <Tab.Navigator
          initialRouteName="Feed"
          activeColor="#2c365a"
          barStyle={{ backgroundColor: "white" }}
          style={{ borderTopWidth: 1, borderTopColor: "#E2E8F0" }}
     >
          <Tab.Screen
               name="Home"
               component={HomeAdmin}
               options={{
                    tabBarLabel: "Home",
                    tabBarIcon: ({ color, size }) => (
                         <Ionicons name="home-outline" size={size} color={color} />
                       ),
                    headerShown: true,
                    headerTitleAlign: 'center',
               }}
          />
          {/* <Tab.Screen
               name="Top Up"
               component={ListTopUp}
               options={{
                    tabBarLabel: "Cart",
                    tabBarIcon: ({ color, size }) => (
                         <Ionicons name="cart-outline" size={size} color={color} /> 
                       ),
                    headerShown: true,
                    headerTitleAlign: 'center',
               }}
          />
          <Tab.Screen
               name="Report"
               component={ReportBank}
               options={{
                    tabBarLabel: "Cart",
                    tabBarIcon: ({ color, size }) => (
                         <Ionicons name="cart-outline" size={size} color={color} /> 
                       ),
                    headerShown: true,
                    headerTitleAlign: 'center',
               }}
          /> */}
     </Tab.Navigator>
     )
}

export default _mainAdmin

const styles = StyleSheet.create({})