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
import { useContext } from 'react';
import { useEffect } from 'react';
import {Order} from '../customComponents/Orderitem&PlacedOrderItem'; // Import the OrderItem component
import PlacedOrderStyles from '../styles/PlacedOrdersScreenStyles';

const CurrentPastOrdersScreen = () => {

  //will use the OrderContext to get the present and past orders
  const [selectedIndex, setSelectedIndex] = useState(0);

  const {currentOrders, pastOrders} = useContext(OrderContext);
  
  const orders = selectedIndex === 0 ? currentOrders : pastOrders;

    // Add more past orders here
    useEffect(() => {
      console.log(`Number of orders: ${orders.length}`);
    }, [orders]);

    //folloewing fucntion is an explicit return of the JSX, thats why no parenthesis

    const renderOrder = ({ item }) => (
      <Order item={item} />
    );

  return (
    <View style={PlacedOrderStyles.container}>
      <SegmentedControl
        values={['Present Orders', 'Past Orders']}
        selectedIndex={selectedIndex}
        onChange={(event) => {
          setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        style={PlacedOrderStyles.segmentedControl}
      />


  {orders.length !== 0 ? (
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        contentContainerStyle={PlacedOrderStyles.listContent}
      />
    ) : (
      <Text style={PlacedOrderStyles.noOrdersText}>No orders available.</Text>
    )}
    </View>
  );
};



export default CurrentPastOrdersScreen;