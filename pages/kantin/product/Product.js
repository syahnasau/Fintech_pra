import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { API_URL } from '../../../constants/URL';
import Colors from '../../../constants/Color';
import { Ionicons } from '@expo/vector-icons';


const ProductKantin = ({ name, photo, price, role, stand, stock, id, navigation }) => {
    const [quantity, setQuantity] = useState(1);
    const [data, setData] = useState("");


    const fetchData = async () => {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${API_URL}kantin`, { headers: { Authorization: `Bearer ${token}` } });
        console.log(response.data);
        setData(response.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteProduct = async (id) => {
        const token = await AsyncStorage.getItem("token");
        await axios.delete(`${API_URL}delete-product-url/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        Alert.alert("Delete Success");
        fetchData();
    };

    const handleEditProduct = async (id) => {
        const token = await AsyncStorage.getItem("token");
        await axios.put(`${API_URL}product-update-url/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        navigation.navigate('');
    };



    return (

        <View style={styles.container}>
            <Image source={{ uri: photo }} style={styles.image} />
            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>Stock: {stock}</Text>
                <Text style={styles.price}>Price: Rp{price}</Text>
                <View style={styles.addToCartContainer}>


                    <TouchableOpacity
                        style={styles.HapusButton}
                        onPress={handleEditProduct}
                    >
                        <Text style={styles.HapusButtonText}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.EditButton}
                        onPress={ ()=> handleDeleteProduct(item.id)}
                    >
                        {/* <Ionicons name="pencil" size={20} color="black"/> */}
                        <Text style={styles.EditButtonText}>Edit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default ProductKantin;

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
    HapusButton: {
        // backgroundColor: Colors.green,
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.red,
        marginStart: 15

    },
    EditButton: {
        // backgroundColor: Colors.green,
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
        borderWidth: 1,
        borderColor: Colors.oren,
        marginStart: 15

    },
    HapusButtonText: {
        color: Colors.red,
        fontWeight: 'bold',
        fontSize: 12,
    },
    EditButtonText: {
        color: Colors.oren,
        fontWeight: 'bold',
        fontSize: 12,
    },
});
