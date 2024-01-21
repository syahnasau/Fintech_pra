import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Cart = ({ navigation, route }) => {
     const [data, setData] = useState([]);
     const [refreshing, setRefresh] = useState(false);
     const currentTime = new Date();
     const seconds = currentTime.getSeconds();
     const { successCart } = route.params || {};

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

     const cancelCart = async (id) => {
          const token = await AsyncStorage.getItem("token");
          await axios.delete(`${API_URL}keranjang/delete/${id}`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          Alert.alert("Cancel Success");
          fethDataHistory();
     };

     const paymentProduct = async () => {
          const token = await AsyncStorage.getItem("token");
          await axios.put(`${API_URL}pay-product`, {}, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          Alert.alert("Successfully payment")
          fethDataHistory();
          navigation.navigate('MainUser', { getDataSiswaCallBack: seconds })
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
          <View>
               <Text>Cart</Text>
          </View>
     )
}

export default Cart

const styles = StyleSheet.create({})