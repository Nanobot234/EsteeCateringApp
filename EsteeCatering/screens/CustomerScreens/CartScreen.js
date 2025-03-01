import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FoodContext } from '../Providers/FoodProvider';
import CartItem from '../customComponents/CartItem';
import OrderPlacementScreen from '../screens/OrderPlacementScreen';

const CartScreen = () => {
  const { cartItems, removeItemFromCart, decreaseCartItemQuantity, increasCartItemQuantity } = useContext(FoodContext);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const renderCartItem = ({ item }) => (
    <CartItem
      item={item}
      onDecrease={decreaseCartItemQuantity}
      onIncrease={increasCartItemQuantity}
      onRemove={removeItemFromCart}
    />
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty.</Text>
      ) : (
        <View>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity style={styles.checkOutButton} onPress={() => setIsModalVisible(true)}>
            <Text>Create Order</Text>
          </TouchableOpacity>
          <OrderPlacementScreen
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
  checkOutButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderRadius: 4,
  },
});

export default CartScreen;