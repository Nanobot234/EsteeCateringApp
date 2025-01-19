import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CartItem = ({ item, onDecrease, onIncrease, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      {/* Item Image */}
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      {/* Item Details */}
      <View style={styles.details}>
        <Text style={styles.name}>{item.foodName}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text>Quantity: {item.quantitySelected}</Text>

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
        <MaterialIcons name="delete" size={16} color="#ff5252" />
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
    elevation: 1, // Adds a subtle shadow on Android
    shadowColor: '#000', // Adds a shadow on iOS
    shadowOpacity: 0.1,
    shadowRadius: 5,
    
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // padding: 16,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  details: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 8,
  },
  trashButton: {
    marginLeft: 16,
  },
});

export default CartItem;