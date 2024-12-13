//screen where a user can see current and past orders

// Compare this snippet from screens/CartScreen.js:
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const OrderPlacementScreen = ({ visible, onClose, cartItems }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');

  return (
    <Modal
      visible={visible}
      animationType="slide"
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.modalBackground}>
        <View style={styles.container}>
          <Text style={styles.title}>Place Your Order</Text>

          {/* Name Field */}
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          {/* Phone Number Field */}
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />

          {/* Ordered Items */}
          <Text style={styles.label}>Your Items:</Text>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            numColumns={3}
            renderItem={({ item }) => (
              <View style={styles.gridItem}>
                <Text style={styles.gridText}>{item.foodName}</Text>
                <Text style={styles.gridText}>x{item.quantitySelected}</Text>
              </View>
            )}
          />

          {/* Special Instructions */}
          <Text style={styles.label}>Special Instructions:</Text>
          <TextInput
            style={styles.largeInput}
            placeholder="Enter any special instructions"
            multiline={true}
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
          />

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OrderPlacementScreen;
