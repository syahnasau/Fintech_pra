import React, { useEffect, useState } from 'react';
import { PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import _mainSiswa from './pages/siswa/_mainSiswa';
import _mainBank from './pages/bank/_mainBank';
import _mainKantin from './pages/kantin/_mainKantin';
import _mainAdmin from './pages/admin/_mainAdmin';
import TopUp from './pages/siswa/TopUp';
import WithDraw from './pages/bank/WithDraw';
import WelcomePage from './pages/Welcome';
import EditProduct from './pages/kantin/product/EditProduct';
import Category from './pages/kantin/category/Category';
import CreateProduct from './pages/kantin/product/CreateProduct';

// import { AppRegistry } from 'react-native';
// AppRegistry.registerComponent(appName, () => App);

export default function App() {
     const Stack = createNativeStackNavigator();
     const navigationRef = React.useRef();

     const Authentication = async () => {
          const role = await AsyncStorage.getItem('role');
          const token = await AsyncStorage.getItem('token');
          console.log(role, token);

          if (token && role !== null) {
               switch (role) {
                    case "admin":
                         navigationRef.current?.navigate("_mainAdmin");
                         break;
                    case "kantin":
                         navigationRef.current?.navigate("_mainKantin");
                         break;
                    case "bank":
                         navigationRef.current?.navigate("_mainBank");
                         break;
                    default:
                         navigationRef.current?.navigate("_mainSiswa");
                         break;
               }
          }
     }

     useEffect(() => {
          Authentication();
     }, []);


     return (
          // <View className="flex-1 items-center justify-center bg-white text-sky-800">
          //      <Text>Tailwind Sudah ada</Text>
          //      <StatusBar style="auto" />
          // </View>

          <PaperProvider>
               <NavigationContainer >
                    <Stack.Navigator>

                         <Stack.Screen name="WelcomePage" component={WelcomePage} options={{ headerShown: false }} />

                         <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                         <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />

                         <Stack.Screen name="_mainSiswa" component={_mainSiswa} options={{ headerShown: false }} />
                         <Stack.Screen name="_mainBank" component={_mainBank} options={{ headerShown: false }} />
                         <Stack.Screen name="_mainKantin" component={_mainKantin} options={{ headerShown: false }} />
                         <Stack.Screen name="_mainAdmin" component={_mainAdmin} options={{ headerShown: false }} />

                         <Stack.Screen name="TopUp" component={TopUp} options={{ headerShown: false }} />
                         <Stack.Screen name="WithDraw" component={WithDraw} options={{ headerShown: false }} />

                         <Stack.Screen name="CreateProduct" component={CreateProduct} options={{ headerShown: false }} />
                         <Stack.Screen name="EditProduct" component={EditProduct} options={{ headerShown: false }} />

                         <Stack.Screen name="Category" component={Category} options={{ headerShown: false }} />

                         {/* <Stack.Screen name="CardProduct" component={ProductCard} options={{ headerShown: false }} /> */}

                    </Stack.Navigator>
               </NavigationContainer>
          </PaperProvider>

     );
}


