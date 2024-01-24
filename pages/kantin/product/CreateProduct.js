import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, TextInput, ScrollView, RefreshControl, TextBase } from 'react-native'
import React, { useState, useEffect } from 'react'
import Colors from '../../../constants/Color';

const CreateProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [photo, setPhoto] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState(0);
    const [stand, setStand] = useState("");

    const storeCategory = async () => {
        const token = await AsyncStorage.getItem("token");
        await axios.post(`${API_URL}create-product-url`, {
            name: name,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        Alert.alert("Success Create");
        navigation.navigate("_mainKantin", { storeCategoryCallback: name });

    }

    
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>

                <View style={styles.form}>
                    <Text style={styles.h1}>Create Product</Text>

                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Enter title product"
                    />
                    <Text style={styles.label}>Price:</Text>
                    <TextInput
                        style={styles.input}
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                        placeholder="Enter price"
                    />
                    <Text style={styles.label}>Photo:</Text>
                    <TextInput
                        style={styles.input}
                        value={photo}
                        onChangeText={(text) => setPhoto(text)}
                        placeholder="Enter url"
                    />
                    <Text style={styles.label}>Stock:</Text>
                    <TextInput
                        style={styles.input}
                        value={stock}
                        onChangeText={(text) => setStock(text)}
                        placeholder="Enter stock"
                    />
                    <Text style={styles.label}>Category:</Text>
                    <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        placeholder="Enter category"
                    />
                    <Text style={styles.label}>Stand:</Text>
                    <TextInput
                        style={styles.input}
                        value={stand}
                        onChangeText={(text) => setStand(text)}
                        placeholder="Enter category"
                    />

                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        style={styles.input}
                        value={desc}
                        onChangeText={(text) => setDesc(text)}
                        placeholder="Enter description"
                    />


                    <TouchableOpacity style={styles.button} onPress={storeCategory}>
                        <Text style={styles.buttonText}>Create Category</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreateProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

    },
    h1: {
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    form: {
        padding: 25,
        borderRadius: 5,
        boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
    },
    label: {
        marginTop: 20,
        fontSize: 12,
    },
    input: {
        width: '100%',
        padding: 10,
        marginTop: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        boxSizing: 'border-box',
        // fontSize: 14
    },
    button: {
        backgroundColor: Colors.green,
        color: '#fff',
        borderRadius: 20,
        padding: 12,
        marginTop: 50,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    btnReg: {
        fontSize: 12,
        color: Colors.green,
        paddingTop: 10
    }
})