import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, RefreshControl, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Colors from '../../constants/Color';
import ProductCard from './CardProduct';
import { API_URL } from '../../constants/URL';
import { Ionicons } from '@expo/vector-icons';

const Cart = ({ navigation, route }) => {
     const [data, setData] = useState([]);
     const [refresh, setRefresh] = useState(false);
     const currentTime = new Date();
     const seconds = currentTime.getSeconds();
     const { successCart } = route.params || {};

     const [quantity, setQuantity] = useState(1);


     const fethDataHistory = async () => {
          const token = await AsyncStorage.getItem("token");

          const response = await axios.get(`${API_URL}history`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log("response.data", response.data);
          setData(response.data);
     };

     const handleCancelCart = async (id) => {
          const token = await AsyncStorage.getItem("token");
          await axios.delete(`${API_URL}keranjang/delete/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          Alert.alert("Cancel Success");
          fethDataHistory();
     };

     const handelPayment = async () => {
          const token = await AsyncStorage.getItem("token");
          await axios.put(`${API_URL}pay-product`, {}, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          Alert.alert("Successfully payment")
          fethDataHistory();
          navigation.navigate('_mainSiswa', { getDataSiswaCallBack: seconds })
     }

     useEffect(() => {
          fethDataHistory();
          if (successCart === successCart || successCart !== successCart) {
               fethDataHistory();
          }
     }, [successCart]);

     const onRefresh = async () => {
          setRefresh(true);
          await fethDataHistory();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
     };

     return (
          <SafeAreaView style={styles.container}>
               <ScrollView refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
               }>

                    <View style={styles.cardContainer}>
                         <View style={styles.cardPayment}>
                              <View style={styles.totalPay}>
                                   <Text>Balance</Text>
                                   <Text style={styles.balanceText}>Rp{data.totalPrice}</Text>
                              </View>
                              <View style={styles.buttonContainer}>
                                   <TouchableOpacity style={styles.button} onPress={handelPayment}>
                                        <Text style={styles.buttonText}>Pay Now</Text>
                                   </TouchableOpacity>
                              </View>
                         </View>
                    </View>

                    <View>
                         {data.transactionsKeranjang?.map((item, index) => {
                              return (

                                   <View key={index} style={styles.container2}>

                                   <View  style={styles.detailsContainer} >

                                        <View >

                                             <Text style={styles.title}>{item?.products.name}</Text>
                                             <Text style={styles.subtitle}>Quantity:  {item?.quantity}</Text>
                                             <Text style={styles.price}>Price: Rp{item?.products.price}</Text>
                                        </View>
                                        <View style={styles.addToCartContainer}>
                                             <TouchableOpacity
                                                  style={styles.addToCartButton}
                                                  onPress={() => handleCancelCart(item.id)}
                                             >
                                                  <Text style={styles.addToCartButtonText}>Delete</Text>
                                             </TouchableOpacity>
                                        </View>
                                   </View>

                                   </View>
                              )
                         })}

                         {/* {data.transactionsKeranjang?.map((item, index) => {
                              return (
                                   <View key={index} style={styles.detailsContainer}>
                                        <View>
                                             <Text style={{ fontWeight: 700, fontSize: 15 }}>{item?.products.name}</Text>
                                             <Text>Qty: {item?.quantity}</Text>
                                             <Text>Rp. {item?.products.price}</Text>
                                        </View>

                                        <View style={styles.cardRight}>
                                             <TouchableOpacity onPress={() => cancelCart(item.id)}>
                                                  <Ionicons name="trash-outline" size={24} color="black" />
                                             </TouchableOpacity>
                                        </View>
                                   </View>
                              )
                         })} */}

                         
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}

export default Cart

const styles = StyleSheet.create({
     container: {
          borderRadius: 10,
          padding: 16,

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

     },
     cardPayment: {
          flexDirection: 'row',
          justifyContent: 'space-between'
     },
     button: {
          flex: 2,
          backgroundColor: Colors.green,
          borderRadius: 13,
          padding: 10,
          alignItems: 'center',
          margin: 5,
     },
     buttonText: {
          color: Colors.white,
          fontWeight: 'bold',
          fontSize: 12,
     },
     buttonContainer: {
          // justifyContent: 'space-between',
     },
     balanceText: {
          fontSize: 20,
          fontWeight: 'bold',
     },

     image: {
          width: 130,
          height: 150,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
     },
     detailsContainer: {
          flexDirection: 'row',
          padding: 15,
          alignContent: 'space-between'
     },
     title: {
          fontSize: 16,
          fontWeight: 'bold',
          marginBottom: 2,
     },
     subtitle: {
          fontSize: 12,
          marginBottom: 5,
          color: '#555',
     },
     price: {
          fontSize: 14,
          fontWeight: 'bold',
          color: Colors.green
     },
     addToCartContainer: {
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
     },
     addToCartButton: {
          // backgroundColor: Colors.green,
          padding: 7,
          borderRadius: 5,
          marginRight: 10,
          borderWidth: 1,
          borderColor: Colors.red,
          marginStart: 150

     },
     addToCartButtonText: {
          color: Colors.red,
          fontWeight: 'bold',
          fontSize: 12,
     },
     quantityContainer: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     quantityButton: {
          // backgroundColor: Colors.grey,
          padding: 8,
          borderRadius: 5,
     },
     quantityButtonText: {
          fontSize: 18,
          color: '#555',
     },
     quantityText: {
          fontSize: 16,
          marginHorizontal: 10,
     },
     container2: {
          backgroundColor: '#fff',
          // borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 10,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          width: '100%',
          //     maxWidth: 300,
          marginVertical: 2,
          flexDirection: 'row',
          alignItems: 'center',
     },
})