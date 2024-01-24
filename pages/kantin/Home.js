import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL } from '../../constants/URL';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Color';
import ProductCard from '../siswa/CardProduct';
import ProductKantin from './product/Product';

const HomeKantin = ({ navigation, route }) => {
     const [data, setData] = useState("");
     const [name, setName] = useState("");
     const [refresh, setRefresh] = useState(false);
     const { username } = route.params || {};
     const [roleAuth, setRoleAuth] = useState("");
     const [transaction, setTransactioin] = useState("")

     const fetchData = async () => {
          const token = await AsyncStorage.getItem("token");
          const name = await AsyncStorage.getItem("name");
          const role = await AsyncStorage.getItem("role");
          const response = await axios.get(`${API_URL}kantin`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log(response.data);
          setData(response.data);
          setName(name);
          setRoleAuth(role);
     }

     useEffect(() => {
          fetchData();
          fethDataTransaction();
     }, []);

     

     const fethDataTransaction = async () => {
          const response = await axios.get(`${API_URL}transaction-kantin`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log(response.transaction);
     }

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

     const onRefresh = async () => {
          setRefresh(true);
          await fetchData();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
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
                    {/* <Text>Order</Text>
                    <Text style={styles.balanceText}>rt</Text>
                    <Text>Produk</Text>
                    <Text style={styles.balanceText}>rt</Text> */}
                    <View style={styles.buttonContainer}>
                         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateProduct')} >
                              <Text style={styles.buttonText}>Product</Text>
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Category')} >
                              <Text style={styles.buttonText}>Category</Text>
                         </TouchableOpacity>
                    </View>
               </View>

               <View>
               <View>
                         {data.products?.map((item, index) => (

                         <ProductKantin
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
               </View>
          </ScrollView>
          </SafeAreaView>
     )
}

export default HomeKantin

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
          height: 80
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
          backgroundColor: Colors.green, 
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          margin: 5,
     },
     buttonText: {
          color: Colors.white,
          fontWeight: 'bold',
     },
})