import React, { useState, useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet} from "react-native";
import {FoodContext} from "../../Providers/FoodProvider";
import ProductDetailsSection from "../../customComponents/ProductDetails";
import {resolveLocalImage} from "../../Utils/images";



const FoodDetailScreen = ({ route }) => {
  const { item } = route.params;
  const { addItemToCart, cartItems } = useContext(FoodContext);
  const [quantity, setQuantity] = useState(1);
  const isRemoteImage = item.imageURL && item.imageURL.startsWith('http');
  const localImage = !isRemoteImage ? resolveLocalImage(item.imageURL) : null;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  const addToCart = () => {
    console.log('Adding cart with quantity: ', quantity);
    addItemToCart({ ...item, quantitySelected: quantity });
    console.log('Cart quantity now: ', cartItems.length); // log the cart items length
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.name}</Text>
      </View>

      {/* Product Image, remote or local */}
      {item.imageURL ? (
        isRemoteImage ? (
          <Image source={{ uri: item.imageURL }} style={styles.image} />
        ) : (
          localImage && <Image source={localImage} style={styles.image} />
        )
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}

      {/* Render Details Section */}
      <ProductDetailsSection
        item={item}
        quantity={quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        addToCart={addToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    width: '100%', // Ensure the container takes up the full width
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%', // Ensure the header takes up the full width
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: '100%', // Ensure the image takes up the full width
    height: 250,
    resizeMode: 'contain',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  noImageText: {
    width: '100%', // Ensure the text takes up the full width
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
    textAlign: 'center',
    lineHeight: 250,
    backgroundColor: '#f0f0f0',
    color: '#888',
  },
});

export default FoodDetailScreen;