import { StyleSheet, Text, TextInput, TouchableOpacity, View, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../constants/Color'
import { API_URL } from '../../constants/URL';
import axios from "axios";

const Register = () => {
     const [name, setName] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setConfirmPassword] = useState("");

     const handleRegister = async () => {
          try {
               if (password !== confirmPassword) {
                    Alert.alert("Passwords do not match");
                    return;
               }
               const response = await axios.post(`${API_URL}register`, {
                    name: name,
                    password: password,
               });
               console.log(response.data);
               setName("");
               setPassword("");
               setConfirmPassword("");
               navigation.navigate("Login");
          } catch (error) {
               console.log(error);
          }
     };

     return (
          <SafeAreaView style={styles.container}>

               <View style={styles.form}>
                    <Text style={styles.h1}>REGISTER</Text>
                    <Text style={styles.label}>Username:</Text>
                    <TextInput
                         style={styles.input}
                         value={name}
                         onChangeText={(text) => setName(text)}
                         placeholder="Enter username"
                    />
                    <Text style={styles.label}>Password:</Text>
                    <TextInput
                         style={styles.input}
                         value={password}
                         onChangeText={(text) => setPassword(text)}
                         placeholder="Enter password"
                         secureTextEntry
                    />
                    <Text style={styles.label}>Confirm Password:</Text>
                    <TextInput
                         style={styles.input}
                         value={confirmPassword}
                         onChangeText={(text) => setConfirmPassword(text)}
                         placeholder="Confirm password"
                         secureTextEntry
                    />
                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                         <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.btnReg} onPress={() => navigation.navigate('Login')}>
                         <Text style={{ color: Colors.green }}>Have an account? Login here</Text>
                    </TouchableOpacity>


               </View>
          </SafeAreaView>
     )
}

export default Register

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#fff',

     },
     h1: {
          fontSize: 20,
          paddingTop: 100,
          alignItems: 'center',
          justifyContent: 'center'
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
     },
     btnReg: {
          fontSize: 12,
          color: Colors.green,
          paddingTop: 10
     }
})