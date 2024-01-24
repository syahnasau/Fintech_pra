import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '../../constants/URL'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Color'

const HomeBank = ({ navigation, route }) => {
     const [data, setData] = useState([]);
     const [refresh, setRefresh] = useState(false);
     const [name, setName] = useState("");
     const { username } = route.params || {};
     const [roleAuth, setRoleAuth] = useState("");
     const { getDataBankCallBack } = route.params || {};

     const fetchData = async () => {
          const token = await AsyncStorage.getItem('token');
          const name = await AsyncStorage.getItem('name');
          const role = await AsyncStorage.getItem("role");
          const response = await axios.get(`${API_URL}bank`, { headers: { Authorization: `Bearer ${token}` } });
          console.log(response.data);
          setData(response.data);
          setRoleAuth(role);
          setName(name);
     };

     useEffect(() => {
          fetchData();
          console.log(getDataBankCallBack);
          if (getDataBankCallBack) {
               fetchData();
          }
     }, [getDataBankCallBack]);

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
          fetchData();
          setTimeout(() => {
               setRefresh(false);
          }, 2000);
     };

     const handleAcceptTopUp = async (id) => {
          const token = await AsyncStorage.getItem("token");
          await axios.put(`${API_URL}topup-success/${id}`, {}, {
               headers: {
                    Authorization: `Bearer ${token}`,
               }
          })
     }


     return (
          <SafeAreaView style={styles.container}>

               <ScrollView refreshControl={
                    <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
               }>

                    <View style={styles.viewUser}>
                         <Text style={styles.textName}>Hi, {username ?? name}!</Text>
                         <TouchableOpacity onPress={handleLogout}>
                              <Ionicons name="log-out-outline" size={26} color="black" />
                         </TouchableOpacity>

                    </View>

                    <View style={styles.cardContainer}>
                         <View style={styles.cardHome}>
                              <View>
                                   <Text>Balance</Text>
                                   <Text style={styles.balanceText}>Rp{data.balanceBank}</Text>
                              </View>
                              <View style={{ marginLeft: 30 }}>
                                   <Text>Nasabah</Text>
                                   <Text style={styles.balanceText}>{data.nasabah}</Text>
                              </View>
                              <View style={{ marginLeft: 45 }}>
                                   <Text>Transaction</Text>
                                   <Text style={styles.balanceText}>{data.walletCount}</Text>
                              </View>
                         </View>
                         <View style={styles.buttonContainer}>
                              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('WithDraw')} >
                                   <Text style={styles.buttonText}>With Draw</Text>
                              </TouchableOpacity>
                         </View>
                    </View>

                    <View>
                         <Text style={styles.textName}>List Transaction</Text>

                         {/* {data && data.transactions ? data.transactions.map((transaction, index) => (

                    )) : null} */}

                         <View style={styles.cardWrap}>
                              {data.wallets?.map((item, index) => {
                                   return (
                                        <View style={styles.cardReport}>
                                             <View style={styles.cardLeft}>
                                                  <Text style={styles.txtName}>{item.user?.name}</Text>
                                                  <Text>Credit: {item.credit}</Text>
                                                  <Text>Debit: {item.debit}</Text>
                                                  <Text>Status: <Text style={{ fontWeight: 600 }}>{item.status}</Text>
                                                  </Text>
                                             </View>
                                             {
                                                  item.status != 'selesai' ?
                                                       (
                                                            <View style={styles.cardRight}>

                                                                 <TouchableOpacity onPress={() => {console.log(item.id)
                                                                      handleAcceptTopUp(item.id)}} style={styles.status}>
                                                                      <Text style={{ color:Colors.white }}>Accept</Text>
                                                                 </TouchableOpacity>
                                                            </View>
                                                       ) : ("")
                                             }
                                        </View>
                                   )
                              })}
                         </View>
                    </View>
               </ScrollView>

          </SafeAreaView>
     )
}

export default HomeBank




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
          borderRadius: 10,
          padding: 16,

          paddingTop: 30
     },
     cardHome: {
          flexDirection: 'row',
          // alignItems: 'center',
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
          height: 140
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
     cardReport: {
          backgroundColor: Colors.white,
          borderRadius: 10,
          padding: 10,
          marginBottom: 10,
          shadowColor: 'black',
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          flexDirection: 'row',
          // alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
     },
     txtDate: {
          fontSize: 12,
          color: Colors.grey,
          marginTop: 5
     },
     txtName: {
          fontSize: 14,
          fontWeight: "bold",
     },
     txtDetail: {
          fontSize: 14,
          fontWeight: "bold",
          color: Colors.green
     },
     status: {
          // flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 5,
          padding: 10,
          alignItems: 'center',
          margin: 5,
          backgroundColor: Colors.green,
     }

})

