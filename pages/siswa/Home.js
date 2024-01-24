import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, RefreshControl, Alert } from 'react-native';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from '../../constants/URL';
import Colors from '../../constants/Color';
import ProductCard from './CardProduct';

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
          fetchData();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
     };

     const handleLogout = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               await axios.post(`${API_URL}logout`, {},
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
               await AsyncStorage.multiRemove(["token", "role"]);
               navigation.navigate('WelcomePage');
          } catch (e) {
               console.log(e);
          }
     };

     return (
          <SafeAreaView style={styles.container}>
          <ScrollView refreshControl={
               <RefreshControl refreshing={refresh} onRefresh={onRefresh}/>
          }>

                    <View style={styles.viewUser}>
                         <Text style={styles.textName}>Hi, {username ?? name}!</Text>
                         <TouchableOpacity onPress={handleLogout}>
                              <Ionicons name="log-out-outline" size={26} color="black" />
                         </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>
                         <Text >Balance</Text>
                         <Text style={styles.balanceText}>Rp{data.difference}</Text>
                         <View style={styles.buttonContainer}>
                              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('TopUp')} >
                                   <Text style={styles.buttonText}>Top Up</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.button} >
                                   <Text style={styles.buttonText}>Withdraw</Text>
                              </TouchableOpacity>
                         </View>
                    </View>

                    <View>
                         {data.products?.map((item, index) => (

                         <ProductCard
                              name={item.name}
                              photo={`${item.photo}`}
                              price={item.price}
                              role={roleAuth}
                              stand={item.stand}
                              stock={item.stock}
                              id={item.id}
                              navigation={navigation}
                         />

                         ))}
                    </View>

               {/* <View>
                         <View style={style.cardProduct}>
                              <Image/>
                              <Text>{data.price}</Text>
                              <Text></Text>
                              <Text></Text>
                              <TouchableOpacity>
                                   <Text>Add Cart</Text>
                              </TouchableOpacity>
                         </View>
               </View> */}
          </ScrollView>

               {/* <Text style={styles.expiryDate}>Expiry: 10/26</Text> */}
          </SafeAreaView>
     )
}

export default HomeSiswa

const styles = StyleSheet.create({
     viewUser: {
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginBottom: 20
     },
     textName: {
          fontSize: 16,
          fontWeight: 'bold',
     },
     container: {
          // backgroundColor: Colors.white,
          borderRadius: 10,
          padding: 16,
          
          paddingTop: 30
     },
     cardContainer: {
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: 16,
          marginBottom: 20,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          height: 150
     },
     balanceText: {
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 15,
     },
     buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     button: {
          flex: 1,
          backgroundColor: Colors.green, // Adjust the color to your preference
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          margin: 5,
     },
     buttonText: {
          color: Colors.white, // Adjust the color to your preference
          fontWeight: 'bold',
     },

})

