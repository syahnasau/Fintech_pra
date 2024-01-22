import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../constants/Color'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from '../../constants/URL';
import axios from "axios";


const Login = ({ navigation }) => {
     const [name, setname] = useState("");
     const [password, setpassword] = useState("");

     const navigateToPage = (role) => {
          if (role === "admin") {
               navigation.navigate("_mainAdmin");
          } else if (role === "kantin") {
               navigation.navigate("_mainKantin");
          } else if (role === "bank") {
               navigation.navigate("_mainBank");
          } else {
               navigation.navigate("_mainSiswa");
          }
     };

     const saveTokenRole = async (token, role, name) => {
          await AsyncStorage.setItem("token", token);
          await AsyncStorage.setItem("role", role);
          await AsyncStorage.setItem("name", name);
     };

     const handleLogin = async () => {
          try {
               const response = await axios.post(`${API_URL}login`, {
                    name: name,
                    password: password,
               });
               const token = response.data.token;
               const role = response.data.message;
               saveTokenRole(token, role, name);
               setname("");
               setpassword("");
               navigateToPage(role);
          } catch (error) {
               ToastAndroid.show(error.message, ToastAndroid.LONG);
          }
     };

     return (
          <SafeAreaView style={styles.container}>

               <View style={styles.form}>
                    <Text style={styles.h1}>LOGIN</Text>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                         style={styles.input}
                         value={name}
                         onChangeText={(text) => setname(text)}
                         placeholder="Enter username"
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                         style={styles.input}
                         value={password}
                         onChangeText={(text) => setpassword(text)}
                         placeholder="Enter password"
                         secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={ handleLogin }>
                         <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnReg} onPress={() => navigation.navigate('Register')}>
                         <Text style={{ color: Colors.green }}>Don't have account? Register here</Text>
                    </TouchableOpacity>

               </View>
          </SafeAreaView>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',

     },
     h1: {
          fontSize: 20,
          paddingTop: 100,
          paddingBottom: 30,
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 'bold',
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
          marginTop: 50,
          alignItems: 'center',
     },
     buttonText: {
          color: '#fff',
          fontSize: 16,
          fontWeight: 'bold',
     },
     btnReg: {
          fontSize: 12,
          color: Colors.green,
          paddingTop: 10
     }
})

export default Login