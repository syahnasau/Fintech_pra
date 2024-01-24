import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView, RefreshControl} from 'react-native'
import React, { useState, useEffect } from 'react'
import { API_URL } from '../../constants/URL';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Profile = ({ navigation, route }) => {
     const [walletSelesai, setWalletSelesai] = useState([]);
     const [walletProcess, setWalletProcess] = useState([]);
     const [historyBeli, setHistoryBeli] = useState([]);
     const [refreshing, setRefresh] = useState(false);
     const [dataSiswa, setDataSiswa] = useState([]);
     const { successTopUp } = route.params || {};
     const [data, setData] = useState([])

     const getDataHistory = async () => {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(`${API_URL}history`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          console.log("response.data", response.data);
          setWalletSelesai(response.data.walletSelesai);
          setWalletProcess(response.data.walletProcess);
          setHistoryBeli(response.data.transactionsBayar);
     };

     const getDataSiswa = async () => {
          const token = await AsyncStorage.getItem("token");
          const response = await axios.get(`${API_URL}getsiswa`, {
               headers: {
                    Authorization: `Bearer ${token}`,
               },
          });
          setDataSiswa(response.data);
     };

     useEffect(() => {
          getDataHistory();
          getDataSiswa();
          if (successTopUp) {
               getDataSiswa();
          }
     }, [successTopUp]);

     const onRefresh = async () => {
          setRefresh(true);
          getDataHistory();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
     };

     return (
          <SafeAreaView style={styles.container}>
          <ScrollView
               refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
               }
          >
               {walletProcess && walletProcess.length > 0 && (
                    <View style={styles.walletProcessContainer}>
                         <Text style={styles.title}>Top up process</Text>
                         {walletProcess?.map((item, index) => (
                              <View
                                   key={index}
                                   style={[
                                        styles.walletItem,
                                        item.credit === 0 || item.credit === null ? styles.hidden : null
                                   ]}
                              >
                                   <View>
                                        <Text style={styles.credit}>Rp{item.credit}</Text>
                                        <Text style={styles.date}>{(item.created_at)}</Text>
                                   </View>
                                   <Text style={[styles.status, styles.textYellow]}>{item.status}</Text>
                              </View>
                         ))}
                    </View>
               )}
               {walletSelesai && walletSelesai.length > 0 && (
                    <View style={styles.walletSelesaiContainer}>
                         <Text style={styles.title}>Top up success </Text>
                         {walletSelesai?.map((item, index) => (
                              <View
                                   key={index}
                                   style={[
                                        styles.walletItem,
                                        item.credit === 0 || item.credit === null ? styles.hidden : null
                                   ]}
                              >
                                   <View>
                                        <Text style={styles.credit}>Rp{item.credit}</Text>
                                        <Text style={styles.date}>{(item.created_at)}</Text>
                                   </View>
                                   <Text style={[styles.status, styles.textGreen]}>{item.status}</Text>
                              </View>
                         ))}
                    </View>
               )}
               <View style={styles.historyBeliContainer}>
                    <Text style={styles.title}>History Transaction</Text>
                    {historyBeli?.map((item, index) => (
                         <View
                              key={index}
                              style={[
                                   styles.historyItem,
                                   item.credit === 0 || item.credit === null ? styles.hidden : null
                              ]}
                         >
                              <Text style={styles.orderCode}>{item.order_code}</Text>
                              <Text style={styles.productName}>{item.products.name}</Text>
                              <Text style={styles.date}>{(item.created_at)}</Text>
                         </View>
                    ))}
               </View>
          </ScrollView>
     </SafeAreaView>
     )
}

export default Profile

const styles = StyleSheet.create({})