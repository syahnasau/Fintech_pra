import { SafeAreaView, StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import axios from "axios";
import { API_URL } from '../../constants/URL';

const ListTopUp = ({navigation, route }) => {
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
          await fetchData();
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
          <SafeAreaView>
               <View>
                         <Text style={styles.textName}>List Transaction</Text>

                         {/* {data && data.transactions ? data.transactions.map((transaction, index) => (

                    )) : null} */}

                         <View style={styles.cardWrap}>
                              {data.wallets?.map((item, index) => {
                                   return (
                                        <View style={styles.card}>
                                             <View style={styles.cardLeft}>
                                                  <Text style={{ fontWeight: 700, fontSize: 16 }}>{item.user?.name}</Text>
                                                  <Text>Credit: {item.credit}</Text>
                                                  <Text>Debit: {item.debit}</Text>
                                                  <Text>Status: <Text style={{ fontWeight: 600 }}>{item.status}</Text>
                                                  </Text>
                                             </View>
                                             {
                                                  item.status != 'selesai' ?
                                                       (
                                                            <View style={styles.cardRight}>

                                                                 <TouchableOpacity onPress={() => {
                                                                      console.log(item.id)
                                                                      handleAcceptTopUp(item.id)
                                                                 }} style={styles.pressable}>
                                                                      <Text>Accept</Text>
                                                                 </TouchableOpacity>
                                                            </View>
                                                       ) : ("")
                                             }
                                        </View>
                                   )
                              })}
                         </View>
                    </View>
          </SafeAreaView>
     )
}

export default ListTopUp

const styles = StyleSheet.create({})