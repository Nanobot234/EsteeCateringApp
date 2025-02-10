import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
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
  Alert,
} from 'react-native';
import { OrderContext } from '../Providers/OrderProvider';
import { useNavigation } from '@react-navigation/native';
// import Modal from 'react-native-modal';
import { FoodContext } from '../Providers/FoodProvider';
import styles from '../styles/orderPlacementScreenStyles'; // Import the styles
import { OrderItem } from '../customComponents/Orderitem&PlacedOrderItem';
// Import common styles

const OrderPlacementScreen = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [address, setAddress] = useState('');
  const [isFormValid, setIsFormValid] = useState(false); // Check if the form is valid or not

  const { cartItems, clearCart} = useContext(FoodContext); // Get the cart items from the context

  // gert the order context to access the place order function, and more!!

  const { placeNewOrder } = useContext(OrderContext);


const renderOrderItems = ({ item }) => {
  return <OrderItem item={item} />
};


  const navigation = useNavigation();

  useEffect(() => {
  if (name.trim() !== '' && phoneNumber.trim() !== '' && /^\d+$/.test(phoneNumber)) {
    setIsFormValid(true);
  } else {
    setIsFormValid(false);
  }
}, [name, phoneNumber]);

  console.log('Cart Items: ', cartItems); // Log the cart items, check if its there

  //reused component may possibly be moved to a new file!!

  const renderHeader = () => (
    <View>
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
          keyboardType="number-pad"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        {!/^\d+$/.test(phoneNumber) && phoneNumber !== '' && (
          <Text style={{ color: 'red' }}>Please enter a valid phone number</Text>
        )}
      </View>
    </View>
  );

  const renderFooter = () => (
    <View>
      {/* Address */}
      <View style={{ width: '100%' }}>
        <Text style={styles.label}>Address:</Text>
  <TextInput
  style={styles.input}
  placeholder="Enter your address"
  multiline={true}
  autoCorrect={false}
  value={address}
  onChangeText={setAddress}
/>
<Text style={{ color: 'gray', fontSize: 12 }}>
  Only enter address if you want the order to be delivered to you
</Text>
</View>

{/* Special Instructions */}
<View style={{ width: '100%' }}>
<Text style={styles.label}>Special Instructions:</Text>
<TextInput
  style={styles.largeInput}
  placeholder="Enter any special instructions"
  autoCorrect={false}
  value={specialInstructions}
  onChangeText={setSpecialInstructions}
/>
</View>

{/* Place Order Button */}
<TouchableOpacity
style={[
  styles.placeOrderButton,
  { backgroundColor: isFormValid ? '#0000FF' : '#D3D3D3' },
]}
onPress={() => {
  if (isFormValid) {
    placeNewOrder(name, phoneNumber, specialInstructions, address);
    onClose(); // Close the modal
    navigation.navigate('My Orders', { screen: 'Orders' }); // Navigate to the orders screen
    clearCart(); // Clear the cart
  } else {
    Alert.alert('Please make sure you have included your name and phone number for the order');
  }
}}
>
<Text style={styles.placeOrderButtonText}>Place Order</Text>
</TouchableOpacity>
</View>
);



  return (
  
    <Modal
      visible={visible}
      animationType='slide'
      presentationStyle='pageSheet'
      onRequestClose={onClose}
    >
    
       
            <Text style={styles.title}>Place Your Order</Text>

           
            

            {/* Ordered Items */}
            <View style={styles.modalContainer}>
              <Text style={styles.label}>Your Items</Text>
              <FlatList
                data={cartItems}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderOrderItems}
                ListHeaderComponent={renderHeader}
                ListFooterComponent={renderFooter}
                contentContainerStyle={{ flexGrow: 1 }}
              />
            </View>    
    </Modal>
  
  );
};

export default OrderPlacementScreen;
