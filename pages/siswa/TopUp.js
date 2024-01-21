import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants/URL';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TopUp = () => {
     const [credit, setCredit] = useState("");

     const handleTopUp = async () => {
          try {
               const token = await AsyncStorage.getItem("token");
               await axios.post(`${API_URL}topup`, {
                    credit: creditTopUp

               }, {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    },
               });
               setCreditTopUp("");
               Alert.alert("Top Up successfully, please wait");
               navigation.navigate("_mainSiswa");
          } catch (e) {
               console.log(e);
          }
     };
     return (
          <SafeAreaView>
               
          </SafeAreaView>
     )
}

export default TopUp

const styles = StyleSheet.create({})