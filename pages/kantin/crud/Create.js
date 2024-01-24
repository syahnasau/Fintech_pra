import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CreateProduct = ({ navigation, route }) => {
     const [data, setData] = useState("");
     const [refresh, setRefresh] = useState(false);

     const createProduct = async () => {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.post(`${API_URL}create-product`, {
               headers: { Authorization: `Bearer ${token}`}
          });
          console.log(response.data);
          setData(response.data);
     };

     return (
          <View>
               <Text>CreateProduct</Text>
          </View>
     )
}

export default CreateProduct

const styles = StyleSheet.create({})