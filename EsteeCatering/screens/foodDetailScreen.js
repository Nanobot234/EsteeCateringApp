import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";

const FoodDetailScreen = ({ route }) => {
    const { item } = route.params;
    const [quantity, setQuanitity] = useState(1);

    const increaseQuantity = () => setQuanitity(quantity + 1)

    const decreaseQuantity = () => {
        if(quantity > 1) setQuanitity(quantity - 1)
    }


    return  (
        <View style={StyleSheet.container}>

            <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      {/* Product Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />

      {/* Product Details */}
      <View style={styles.detailsContainer}>
      <View style={styles.priceQuantityContainer}>
          <Text style={styles.price}>${item.price}</Text>
          
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          </View>
        
         {/* Description Section */}
         <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{item.description}</Text>
        </View>

         {/* Add to Cart Button */}
         <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

      </View>
        </View>
    )
}


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
    header: {
      alignItems: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
    },
    image: {
      width: '100%',
      height: 250,
      resizeMode: 'contain',
      marginBottom: 16,
    },
    detailsContainer: {
      paddingHorizontal: 16,
      paddingBottom: 16,
    },
    priceQuantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    price: {
      fontSize: 20,
      color: '#2ecc71',
      fontWeight: 'bold',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    quantityButton: {
      width: 32,
      height: 32,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dfe6e9',
      borderRadius: 4,
    },
    quantityButtonText: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    quantity: {
      fontSize: 18,
      fontWeight: 'bold',
      marginHorizontal: 8,
    },
    descriptionContainer: {
        marginTop: 30,
      marginBottom: 30,
    },
    description: {
      fontSize: 16,
      color: '#7f8c8d',
    },
    addToCartButton: {
      backgroundColor: '#27ae60',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    addToCartText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
    },
  });

  export default FoodDetailScreen;