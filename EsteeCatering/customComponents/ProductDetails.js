import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailsSection = ({ item, quantity, increaseQuantity, decreaseQuantity, addToCart }) => {
  return (
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
      <TouchableOpacity onPress={addToCart} style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};



const styles = StyleSheet.create({
  detailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  priceQuantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginHorizontal: 8,
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailsSection;