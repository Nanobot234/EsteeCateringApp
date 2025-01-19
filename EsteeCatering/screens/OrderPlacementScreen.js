import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Modal,
  ScrollView,
  Image,
} from 'react-native';
import { FoodContext } from '../Providers/FoodProvider';
import { OrderContext } from '../Providers/OrderProvider';
// import Modal from 'react-native-modal';
import styles from '../styles/orderPlacementScreenStyles'; // Import the styles
// Import common styles

const OrderPlacementScreen = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  const { cartItems } = useContext(FoodContext); // Get the cart items from the context

  // gert the order context to access the place order function, and more!!

  const { placeNewOrder } = useContext(OrderContext);

  console.log('Cart Items: ', cartItems); // Log the cart items, check if its there

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.foodName}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text>Quantity: {item.quantitySelected}</Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       
      >
       
          <View style={styles.modalContent}>
            <Text style={styles.title}>Place Your Order</Text>

            {/* Close Button */}
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>

            {/* Name Field */}
            <View style={{ width: '100%' }}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Phone Number Field */}
            <View style={{ width: '100%' }}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>

            {/* Ordered Items */}
            <View style={{ width: '100%' }}>
              <Text style={styles.label}>Your Items</Text>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrderItem}
                contentContainerStyle={{ paddingBottom: 0 }}
              />
            </View>

            {/* Special Instructions */}
            <View style={{ width: '100%' }}>
              <Text style={styles.label}>Special Instructions:</Text>
              <TextInput
                style={styles.largeInput}
                placeholder="Enter any special instructions"
                multiline={true}
                value={specialInstructions}
                onChangeText={setSpecialInstructions}
              />
            </View>

            {/* Place Order Button */}
            <TouchableOpacity style={styles.placeOrderButton} onPress={() => placeNewOrder(name, phoneNumber, specialInstructions)}>
              <Text style={styles.placeOrderButtonText}>Place Order</Text>
            </TouchableOpacity>
          </View>
       
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default OrderPlacementScreen;
