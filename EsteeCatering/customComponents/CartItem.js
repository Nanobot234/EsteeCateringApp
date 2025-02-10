import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      {/* Item Image */}
      <Image source={{ uri: item.imageURL }} style={styles.image} />
      {/* Item Details */}
      <View style={styles.details}>
        <Text style={styles.name}>{item.foodName}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.quantity}>Quantity: {item.quantitySelected}</Text>

        {/* Increase and Decrease Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => onDecrease(item.id)} style={styles.iconButton}>
            <MaterialIcons name="remove" size={24} color="#ff5252" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onIncrease(item.id)} style={styles.iconButton}>
            <MaterialIcons name="add" size={24} color="#4caf50" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Remove Button */}
      <TouchableOpacity onPress={() => onRemove(item.id)} style={styles.trashButton}>
        <MaterialIcons name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 18, // Increase font size
    fontWeight: 'bold',
    marginBottom: 8, // Increase spacing between text elements
  },
  price: {
    fontSize: 16, // Increase font size
    color: '#888',
    marginBottom: 8, // Increase spacing between text elements
  },
  quantity: {
    fontSize: 16, // Increase font size
    color: '#333',
    marginBottom: 8, // Increase spacing between text elements
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  trashButton: {
    marginLeft: 12,
  },
});

export default CartItem;