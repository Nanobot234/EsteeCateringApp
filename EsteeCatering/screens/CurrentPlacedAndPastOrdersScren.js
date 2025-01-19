import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control'; // Install this package if not already installed
import { OrderContext } from '../Providers/OrderProvider'; // Import the OrderContext from the OrderProvider



const CurrentPastOrdersScreen = () => {

  //will use the OrderContext to get the present and past orders
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {[placenew]} //finish
  const presentOrders = [
    // Sample data for present orders
    {
      id: '1',
      items: [
        { name: 'Pizza', quantity: 2 },
        { name: 'Burger', quantity: 1 },
      ],
      total: 25.99,
      notes: 'Extra cheese on the pizza',
    },
    // Add more present orders here
  ];

  const pastOrders = [
    // Sample data for past orders
    {
      id: '2',
      items: [
        { name: 'Pasta', quantity: 1 },
        { name: 'Salad', quantity: 1 },
      ],
      total: 15.99,
      notes: 'No onions in the salad',
    },
    // Add more past orders here
  ];

  const renderOrderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Order ID: {item.id}</Text>
      <View style={styles.cardContent}>
        {item.items.map((orderItem, index) => (
          <Text key={index} style={styles.cardText}>
            {orderItem.quantity} x {orderItem.name}
          </Text>
        ))}
        <Text style={styles.cardText}>Total: ${item.total.toFixed(2)}</Text>
        <Text style={styles.cardText}>Notes: {item.notes}</Text>
      </View>
    </View>
  );

  const orders = selectedIndex === 0 ? presentOrders : pastOrders;

  return (
    <View style={styles.container}>
      <SegmentedControl
        values={['Present Orders', 'Past Orders']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={styles.segmentedControl}
      />
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  segmentedControl: {
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardContent: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 4,
  },
});

export default CurrentPastOrdersScreen;