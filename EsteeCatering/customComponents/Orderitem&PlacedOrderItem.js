import React, {useContext} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import styles from '../styles/orderPlacementScreenStyles';
import PlacedOrderStyles from '../styles/PlacedOrdersScreenStyles';
import { OrderContext, OrderProvider } from '../Providers/OrderProvider';
import { MaterialIcons } from '@expo/vector-icons';
import confirmDelete from '../Utils/Alerts';


const OrderItem = ({ item, orderID}) => {

  const {removeItemFromOrderByID} = useContext(OrderContext); // Get the current and past orders from the OrderProvider

  const handleItemDeletion = () => {
    confirmDelete(
      'Delete Item',
      'Are you sure you want to delete this item from the order? You will have to make another order if you want to add it again',
      () => removeItemFromOrderByID(orderID, item.id)
    );
    
  };

  return (
    <View style={styles.orderItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.foodName}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text>Quantity: {item.quantitySelected}</Text>
      </View>

      <TouchableOpacity style={styles.trashButton} onPress={() => handleItemDeletion()}>
        <MaterialIcons name="delete" size={24} color="#ff5252" />
        </TouchableOpacity>
    </View>
  );

  
};
  //Maybe changubg the styling

  // Order component to display individual placed order item details
  const Order = ({ item }) => {
    const {addCompletedOrder, deleteOrderByID} = useContext(OrderContext); // Get the current and past orders from the OrderProvider

    const handleOrderDeletion = () => {
      confirmDelete(
        'Delete Order',
        'Are you sure you want to delete this order?',
        () => deleteOrderByID(item.id)
      );
    }

 return (
      <View style={PlacedOrderStyles.card}>
         <TouchableOpacity onPress={() => handleOrderDeletion()} style={styles.deleteButton}>
        <MaterialIcons name="delete" size={24} color="#ff5252" />
      </TouchableOpacity>
        <Text style={PlacedOrderStyles.cardTitle}>Order ID: {item.id}</Text>
        <View style={PlacedOrderStyles.cardContent}>
          {/* The following applies to all items in this order: */}
          {item.items.map((orderItem, index) => (
              <OrderItem key={orderItem.id} item={orderItem} orderID={item.id}/>
          ))}
          <Text style={PlacedOrderStyles.cardText}>Total: ${item.total.toFixed(2)}</Text>
          <Text style={PlacedOrderStyles.cardText}>Notes: {item.notes}</Text>
        </View>

        {/* onPress={} */}
        <TouchableOpacity style={PlacedOrderStyles.button} onPress={() => {addCompletedOrder(item)}}>
          <Text style={PlacedOrderStyles.buttonText}>Completed</Text>
        </TouchableOpacity>
      </View>
    );
  };

  export {Order, OrderItem};

 
