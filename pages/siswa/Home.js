import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from '../../constants/URL';

const HomeSiswa = ({ navigation, route }) => {
     const [data, setData] = useState([]);
     const [refresh, setRefresh] = useState(false);
     const { getDataSiswaCallBack } = route.params || {};
     const { username } = route.params || {};
     const [roleAuth, setRoleAuth] = useState("");
     const [name, setName] = useState("");

     const fetchData = async () => {
          const token = await AsyncStorage.getItem("token");
          const role = await AsyncStorage.getItem("role");
          const name = await AsyncStorage.getItem("name");
          const response = await axios.get(`${API_URL}get-product-siswa`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log(response.data);
          setData(response.data);
          setRoleAuth(role);
          setName(name);
     };

     useEffect(() => {
          fetchData();
          console.log(getDataSiswaCallBack);
          if (getDataSiswaCallBack) {
               fetchData();
          }
     }, [getDataSiswaCallBack]);

     const onRefresh = async () => {
          setRefresh(true);
          await fetchData();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
     };

     const handleLogout = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               await axios.post(
                    `${API_URL}logout`,
                    {},
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
               await AsyncStorage.multiRemove(["token", "role"]);
               navigation.navigate("Login");
          } catch (e) {
               console.log(e);
          }
     };

     return (
          <SafeAreaView style={styles.container}>
               <View style={styles.paymentDetails}>
                    <Text style={styles.paymentType}>Cordpay</Text>
                    <Text style={styles.cardNumber}>2457 3569 2547 6893</Text>
                    <Text style={styles.cardHolder}>Rose Glory</Text>
               </View>
               <View style={styles.quickFeatures}>
                    <Text style={styles.feature}>Transactions</Text>
                    <Text style={styles.feature}>Request</Text>
                    <Text style={styles.feature}>cordpay</Text>
                    <Text style={styles.feature}>Check</Text>
                    <Text style={styles.feature}>conce</Text>
               </View>
               
               <Text style={styles.expiryDate}>Expiry: 10/26</Text>
          </SafeAreaView>
     )
}

export default HomeSiswa

const styles = StyleSheet.create({
     container: {
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 16,
          shadowColor: 'black',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
     },
     paymentDetails: {
          marginBottom: 16,
     },
     paymentType: {
          fontSize: 16,
          fontWeight: 'bold',
          textTransform: 'uppercase',
     },
     cardNumber: {
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 8,
     },
     cardHolder: {
          fontSize: 16,
          marginTop: 8,
     },
     quickFeatures: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
     },
     feature: {
          backgroundColor: '#f2f2f2',
          borderRadius: 10,
          padding: 8,
          fontSize: 12,
          textAlign: 'center',
          width: '20%',
     },
     recentActivity: {
          marginBottom: 16,
     },
     activity: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
     },
     activityUser: {
          fontSize: 14,
          width: '30%',
     },
     activityTime: {
          fontSize: 12,
          width: '40%',
     },
     activityAmount: {
          fontSize: 14,
          fontWeight: 'bold',
          width: '30%',
          textAlign: 'right',
     },
     expiryDate: {
          fontSize: 14,
          textAlign: 'right',
     },
})