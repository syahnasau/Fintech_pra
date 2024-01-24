import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import Colors from '../../constants/Color';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '../../constants/URL'
import { Ionicons } from '@expo/vector-icons';

const ProductCard = ({  name, photo, price, role, stand, stock, id, navigation}) => {
     const [quantity, setQuantity] = useState(1);

     // const fetchData = async () => {
     //      const token = await AsyncStorage.getItem('token');
     //      const name = await AsyncStorage.getItem('name');
     //      const role = await AsyncStorage.getItem("role");
     //      const response = await axios.get(`${API_URL}bank`, { headers: { Authorization: `Bearer ${token}` } });
     //      console.log(response.data);
     //      setData(response.data);
     //      setRoleAuth(role);
     //      setName(name);
     // };

     // useEffect(() => {
     //      fetchData();
     // }, []);

     const handleAddToCart = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               setQuantity("1");
               Alert.alert(
                    "Success",
                    "Check your cart!",
                    [
                         {
                              text: "OK",
                              onPress: () => {
                                   navigation.navigate("Cart", {
                                        successCart: [quantity.toString(), price, id],
                                   });
                              },
                         },
                    ],
                    { cancelable: false }
               );
               await axios.post(
                    `${API_URL}addcart`,
                    {
                         products_id: id,
                         price: price,
                         quantity: parseInt(quantity),
                    },
                    {
                         headers: {
                              Authorization: `Bearer ${token}`,
                         },
                    }
               );
          } catch (e) {
               console.log(e);
          }
     };


     return (
               
               <View style={styles.container}>
                    <Image source={{ uri: photo }} style={styles.image} />
                    <View style={styles.detailsContainer}>
                         <Text style={styles.title}>{name}</Text>
                         <Text style={styles.subtitle}>Stock: {stock}</Text>
                         <Text style={styles.price}>Price: Rp{price}</Text>
                         <View style={styles.addToCartContainer}>

                              <View style={styles.quantityContainer}>
                                   <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                   >
                                        <Text style={styles.quantityButtonText}>-</Text>
                                   </TouchableOpacity>
                                   <Text style={styles.quantityText}>{quantity}</Text>
                                   <TouchableOpacity
                                        style={styles.quantityButton}
                                        onPress={() => setQuantity(quantity + 1)}
                                   >
                                        <Text style={styles.quantityButtonText}>+</Text>
                                   </TouchableOpacity>
                              </View>
                              <TouchableOpacity
                                   style={styles.addToCartButton}
                                   onPress={handleAddToCart}
                              >
                                   <Text style={styles.addToCartButtonText}>Add Cart</Text>
                              </TouchableOpacity>
                         </View>
                    </View>
               </View>
     );
};

export default ProductCard;

const styles = StyleSheet.create({
     container: {
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
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
     },
     image: {
          width: 130,
          height: 150,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
     },
     detailsContainer: {
          flex: 1,
          padding: 15,
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
          fontSize: 15,
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
          padding: 10,
          borderRadius: 5,
          marginRight: 10,
          borderWidth: 1,
          borderColor: Colors.green,
          marginStart: 15

     },
     addToCartButtonText: {
          color: Colors.green,
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
});
