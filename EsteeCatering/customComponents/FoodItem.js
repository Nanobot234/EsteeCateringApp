import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// FoodItem component to display individual food item details
const FoodItem = ({ imageUrl, price, foodName, description, quantitySelected }) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
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