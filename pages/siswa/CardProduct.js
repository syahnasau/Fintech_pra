// import React, {useState} from 'react';
// import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
// import Colors from '../../constants/Color';

// const ProductCard = ({ }) => {
//      const [quantity, setQuantity] = useState(1);
//      const handleAddToCart = () => {
//           // Implement the logic to add the product to the cart with the selected quantity
//           console.log(`Added to Cart: ${quantity} item(s)`);
//         };
//      return (
//           <View style={styles.container}>
//                <Image source={{ uri: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" }} style={styles.image} />
//                <View style={styles.detailsContainer}>
//                     <Text style={styles.title}>Headphone</Text>
//                     <Text style={styles.subtitle}>Stock: 12</Text>
//                     <Text style={styles.price}>Price: $300</Text>
//                     <View style={styles.addToCartContainer}>
//                          <TouchableOpacity
//                               style={styles.addToCartButton}
//                               onPress={handleAddToCart}
//                          >
//                               <Text style={styles.addToCartButtonText}>Add Cart</Text>
//                          </TouchableOpacity>
//                          <View style={styles.quantityContainer}>
//                               <TouchableOpacity
//                                    style={styles.quantityButton}
//                                    onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
//                               >
//                                    <Text style={styles.quantityButtonText}>-</Text>
//                               </TouchableOpacity>
//                               <Text style={styles.quantityText}>{quantity}</Text>
//                               <TouchableOpacity
//                                    style={styles.quantityButton}
//                                    onPress={() => setQuantity(quantity + 1)}
//                               >
//                                    <Text style={styles.quantityButtonText}>+</Text>
//                               </TouchableOpacity>
//                          </View>
//                     </View>
//                </View>
//           </View>
//      );
// };

// export default ProductCard;

// const styles = StyleSheet.create({
//      container: {
//           backgroundColor: '#fff',
//           borderWidth: 1,
//           borderColor: '#ddd',
//           borderRadius: 10,
//           overflow: 'hidden',
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.2,
//           shadowRadius: 5,
//           width: '100%',
//           //     maxWidth: 300,
//           marginVertical: 10,
//           flexDirection: 'row',
//           alignItems: 'center',
//      },
//      image: {
//           width: 130,
//           height: 150,
//           borderTopLeftRadius: 10,
//           borderBottomLeftRadius: 10,
//      },
//      detailsContainer: {
//           flex: 1,
//           padding: 15,
//      },
//      title: {
//           fontSize: 16,
//           fontWeight: 'bold',
//           marginBottom: 2,
//      },
//      subtitle: {
//           fontSize: 14,
//           marginBottom: 5,
//           color: '#555',
//      },
//      price: {
//           fontSize: 15,
//           fontWeight: 'bold',
//           color: Colors.green
//      },
//      addToCartContainer: {
//           flexDirection: 'row',
//           marginTop: 10,
//           alignItems: 'center',
//      },
//      addToCartButton: {
//           // backgroundColor: Colors.green,
//           padding: 10,
//           borderRadius: 5,
//           marginRight: 10,
//           borderWidth: 1,
//           borderColor: Colors.green
//      },
//      addToCartButtonText: {
//           color: Colors.green,
//           fontWeight: 'bold',
//           fontSize: 12,
//      },
//      quantityContainer: {
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginStart: 15
//      },
//      quantityButton: {
//           // backgroundColor: Colors.grey,
//           padding: 8,
//           borderRadius: 5,
//      },
//      quantityButtonText: {
//           fontSize: 18,
//           color: '#555',
//      },
//      quantityText: {
//           fontSize: 16,
//           marginHorizontal: 10,
//      },
// });
