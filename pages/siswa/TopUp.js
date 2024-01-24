import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants/URL';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../../constants/Color';

const TopUp = (navigation) => {
     const [credit, setCredit] = useState("");

     const handleTopUp = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               await axios.post(`${API_URL}topup`, {
                    credit: credit

               }, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });
               console.log(credit);
               setCredit("");
               Alert.alert("Top Up successfully, please wait");
               // navigation.navigate("_mainSiswa");
          } catch (e) {
               console.log(e);
          }
     };
     return (
          <SafeAreaView style={styles.container}>

               {/* <Image ssource={require('../../assets/img/topup.png')} style={styles.image} /> */}

               <View style={styles.form}>
                    <Text style={styles.h1}>Top Up</Text>
                    {/* <Text style={styles.label}>Nominal:</Text> */}
                    <TextInput
                         style={styles.input}
                         value={credit}
                         onChangeText={(text) => setCredit(text)}
                         placeholder="Enter value"
                         keyboardType='numeric'
                    />
                    
                    <TouchableOpacity style={styles.button} onPress={ handleTopUp }>
                         <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

               </View>
          </SafeAreaView>
     )
}

export default TopUp

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: Colors.white,
     },
     h1: {
          fontSize: 20,
          paddingTop: 100,
          paddingBottom: 30,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold'
     },
     form: {
          padding: 25,

          borderRadius: 5,
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
     },
     label: {
          marginTop: 20,
          fontSize: 16,
     },
     input: {
          width: '100%',
          padding: 10,
          marginTop: 5,
          borderRadius: 8,
          borderWidth: 1,
          borderColor: '#ccc',
          boxSizing: 'border-box',
     },
     button: {
          backgroundColor: Colors.green,
          color: '#fff',
          borderRadius: 20,
          padding: 12,
          marginTop: 20,
          alignItems: 'center',
     },
     buttonText: {
          color: '#fff',
          fontSize: 16,
     },
     image: {
          width: 200,
          height: 200,
          borderRadius: 50,
     },
})