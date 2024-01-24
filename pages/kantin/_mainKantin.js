import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeKantin from './Home';
import ReportKantin from './Report';

const _mainKantin = () => {
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
                    component={HomeKantin}
                    options={{
                         tabBarLabel: "Home",
                         tabBarIcon: ({ color, size }) => (
                              <Ionicons name="home-outline" size={size} color={color} />
                         ),
                         headerShown: false,
                         headerTitleAlign: 'center',
                    }}
               />
               <Tab.Screen
                    name="Report"
                    component={ReportKantin}
                    options={{
                         tabBarLabel: "Home",
                         tabBarIcon: ({ color, size }) => (
                              <Ionicons name="home-outline" size={size} color={color} />
                         ),
                         headerShown: true,
                         headerTitleAlign: 'center',
                    }}
               />
          </Tab.Navigator>
     )
}

export default _mainKantin

const styles = StyleSheet.create({})