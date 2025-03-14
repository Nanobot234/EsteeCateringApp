import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert } from 'react-native';
import { OrderContext } from '../../Providers/OrderProvider';
import { MaterialIcons } from '@expo/vector-icons';
import { Order, OrderItem } from '../../customComponents/Orderitem&PlacedOrderItem';

const CurrentCustomerOrdersScreen = () => {
  const { currentOrders, pastOrders, addCompletedOrder, deleteOrderByID } = useContext(OrderContext); //mock data for now?
  const [showCurrentOrders, setShowCurrentOrders] = useState(true);
    // const sampleorder = //set example order to be used hereee

  const handleToggleOrders = () => {
    setShowCurrentOrders(!showCurrentOrders);
  };

  const handleOrderCompletion = (order) => {
    Alert.alert(
      'Complete Order',
      'Are you sure you want to mark this order as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: () => addCompletedOrder(order) },
      ]
    );
  };

  const renderOrder = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => handleOrderDeletion(item.id)} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
      <Text style={styles.cardTitle}>Order ID: {item.id}</Text>
      <Text style={styles.cardText}>Customer Number: {item.customerNumber}</Text>
      <View style={styles.cardContent}>
        {item.items.map((orderItem) => (
          <OrderItem key={orderItem.id} item={orderItem} orderID={item.id} />
        ))}
        <Text style={styles.cardText}>Total: ${item.total.toFixed(2)}</Text>
        <Text style={styles.cardText}>Notes: {item.notes}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleOrderCompletion(item)}>
        <Text style={styles.buttonText}>Mark as Completed</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendor Orders</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showCurrentOrders && styles.activeToggleButton]}
          onPress={handleToggleOrders}
        >
          <Text style={styles.toggleButtonText}>Current Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showCurrentOrders && styles.activeToggleButton]}
          onPress={handleToggleOrders}
        >
          <Text style={styles.toggleButtonText}>Past Orders</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={showCurrentOrders ? currentOrders : pastOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
  },
  activeToggleButton: {
    backgroundColor: '#007BFF',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
  },
  cardContent: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CurrentCustomerOrdersScreen;