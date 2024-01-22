import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../constants/Color';

const WelcomePage = ({ navigation }) => {
     return (
          <View style={styles.container}>
               <StatusBar style="auto" />
               <Image
                    source={require('../assets/img/welcome.png')}
                    style={styles.image}
               />
               <Text style={styles.heading}>Made easy with Payten!</Text>
               <Text style={styles.subHeading}>Start your safe finance</Text>
               <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Login')}
               >
                    <Text style={styles.buttonText}>Get Started</Text>
               </TouchableOpacity>
          </View>
     );
};

export default WelcomePage;

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
     },
     image: {
          width: 250,
          height: 250,
          borderRadius: 50,
          marginBottom: 20
     },
     heading: {
          fontSize: 20,
          fontWeight: 'bold',
     },
     subHeading: {
          fontSize: 16,
          color: 'gray',
     },
     button: {
          backgroundColor: Colors.green,
          paddingHorizontal: 80,
          paddingVertical: 10,
          borderRadius: 20,
          marginTop: 80,
     },
     buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
     },
});