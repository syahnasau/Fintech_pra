import { SafeAreaView, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../constants/URL'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import Colors from '../../constants/Color';
import { Picker } from '@react-native-picker/picker'


const WithDraw = ({ navigation, route }) => {
     const [debit, setDebit] = useState("");
     const [selectSiswa, setSelectSiswa] = useState(0);
     const [data, setData] = useState([]);

     const fetchData = async () => {
          const token = await AsyncStorage.getItem('token');
          const response = await axios.get(`${API_URL}bank`, { headers: { Authorization: `Bearer ${token}` } });
          console.log(response.data);
          setData(response.data);
     };

     useEffect(() => {
          fetchData();
     }, []);

     const handeWithDraw = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               await axios.post(`${API_URL}withdraw`, {
                    users_id: selectSiswa,
                    debit: debit
               }, {
                    headers: {
                         Authorization: `Bearer ${token}`
                    }
               });
               setDebit("");
               Alert.alert("Withdraw succcessfully");
               navigation.navigate('_mainBank');
          } catch (e) {
               console.log(e);
          }
     };

     return (
          <SafeAreaView style={styles.container}>

               {/* <Image ssource={require('../../assets/img/topup.png')} style={styles.image} /> */}

               <View style={styles.form}>
                    <Text style={styles.h1}>With Draw</Text>
                    {/* <Text style={styles.label}>Nominal:</Text> */}
                    <Picker style={styles.picker}
                         selectedValue={selectSiswa}
                         onValueChange={(item) => setSelectSiswa(item)}
                    >
                         {data && data.siswa ? data.siswa.map((siswa, index) => (
                              <Picker.Item
                                   key={index}
                                   label={siswa.name}
                                   value={siswa.id}
                              />
                         )) : null}
                    </Picker>
                    {/* <Text style={styles.label}>Nominal:</Text> */}
                    <TextInput
                         style={styles.input}
                         value={debit}
                         onChangeText={(text) => setDebit(text)}
                         placeholder="Enter value"
                         keyboardType='numeric'
                    />

                    <TouchableOpacity style={styles.button} onPress={handeWithDraw}>
                         <Text style={styles.buttonText}>Continue</Text>
                    </TouchableOpacity>

               </View>
          </SafeAreaView>
     )
}

export default WithDraw

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
     picker: {
          borderWidth: 1
     }
})