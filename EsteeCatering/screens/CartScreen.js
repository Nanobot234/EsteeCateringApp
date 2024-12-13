import React, { useContext } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodContext } from '../Providers/FoodProvider'; // Import the FoodContext
import { MaterialIcons } from '@expo/vector-icons';


const CartScreen = () => {
  const { cartItems, removeItemFromCart, decreaseCartItemQuantity, increasCartItemQuantity} = useContext(FoodContext); // Access cartItems from context

  // Render each cart item
  const renderCartItem = ({ item }) => (
    // Render each cart item
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
        <TouchableOpacity
          onPress={() => decreaseCartItemQuantity(item.id)}
          style={styles.iconButton}
        >
          <MaterialIcons name="remove" size={24} color="#ff5252" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => increasCartItemQuantity(item.id)}
          style={styles.iconButton}
        >
          <MaterialIcons name="add" size={24} color="#4caf50" />
        </TouchableOpacity>
      </View>
    </View>
        {/* Remove Button */}
      <TouchableOpacity onPress={() => removeItemFromCart(item.id)} style={styles.trashButton}>
        <MaterialIcons name="delete" size={16} color="#ff5252" />
        </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Check if cart is empty */}
      {cartItems.length == 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <View>
        <FlatList
          data={cartItems} // Use cartItems array
          renderItem={renderCartItem} // Render each item
          keyExtractor={(item) => item.id} // Ensure each item has a unique key
        />
        <TouchableOpacity style={styles.checkOutButton}>
            <Text>Create Order</Text>
        </TouchableOpacity>

       {}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
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
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  trashButton: {
    padding: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  checkOutButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CartScreen;
