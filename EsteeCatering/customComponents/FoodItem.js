import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { resolveLocalImage } from '../Utils/images';
// FoodItem component to display individual food item details

// FInd the path value to the local image


const FoodItem = ({ imageUrl, price, foodName, description, quantitySelected }) => {
  const isRemoteImage = imageUrl && imageUrl.startsWith('http'); // Check if the image is remote or local
  const localImage = !isRemoteImage ? resolveLocalImage(imageUrl) : null;


  return (
    <View style={styles.itemContainer}>
      {imageUrl ? (
        <Image source={localImage} style={styles.image} />
      ) : (
        <Text style={styles.noImageText}>No Image Available</Text>
      )}
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.name}>{foodName}</Text>
      <Text style={styles.description}>{description}</Text>
      {/* Render quantity if provided */}
      {quantitySelected !== undefined && (
        <Text style={styles.quantity}>Quantity: {quantitySelected}</Text>
      )}
    </View>
  );
};

// Styles for the FoodItem component
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'center',
    
  },

  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  quantity: {
    fontSize: 14,
    color: '#333',
  },
});

export default FoodItem;