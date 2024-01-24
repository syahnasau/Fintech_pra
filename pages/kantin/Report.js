import { StyleSheet, Text, View, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../constants/URL';
import { SafeAreaView } from 'react-native-safe-area-context';

const ReportKantin = ({ navigation, route }) => {
    const [data, setData] = useState("");
    const [report, setReport] = useState([])
    const [refreshing, setRefresh] = useState(false);

    getReport = async () => {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.get(`${API_URL}transaction-kantin`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log("response.data", response.data);
        setReport(response.data);
    }

    const handleAcceptPembeli = async (id) => {
        const token = await AsyncStorage.getItem("token");
        await axios.put(
            `${API_URL}transaction-kantin/${id}`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
        );
        getReport();
    };

    useEffect(() => {
        getReport();
    }, []);

    const onRefresh = () => {
        getReport();
    };



    return (
        <SafeAreaView>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View>
                    <Text> List Pembelian </Text>
                    {report.transactions?.map((item, index) => (
                        <View key={index}>
                            <View>
                                <Text>{item.order_code}</Text>
                                {item.user_transactions?.map((val, ind) => (
                                    <Text key={ind}>{val.name}</Text>
                                ))}
                                <Text>{item.products.name}</Text>
                                <Text>
                                    {item.price} | {item.quantity}x
                                </Text>
                            </View>
                            <View>
                                <Text>{item.status}</Text>
                                {item.status === "dibayar" ? (
                                    <TouchableOpacity nPress={() => handleAcceptPembeli(item.id)}>
                                        <Text>Verif</Text>
                                    </TouchableOpacity>
                                    
                                ) : (
                                    <></>
                                )}
                            </View>

                        </View>
                    ))}
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ReportKantin

const styles = StyleSheet.create({})