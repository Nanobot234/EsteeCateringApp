
import React, { createContext, useEffect, useState } from 'react';
import Order from '../models/Order';
import { FoodContext } from './FoodProvider';
import { saveOrders, getOrders } from '../Utils/storage';
import { useContext } from 'react';

export const OrderContext = createContext(); // Create the Order context to store the current order
export const OrderProvider = ({ children }) => {

    const {cartItems, clearCart} = useContext(FoodContext);


   // the current order the user will place. User can make only one order at a time, but this order can be edited
        const [currentOrders, setCurrentOrder] = useState([]); //max orders of 3
        //the order history of the user
        const [pastOrders, setPastOrders] = useState([]); //intializes the array of orders past that will be used
        

        //will get the orders from local Storage as well
        useEffect(() => {
            getOrders().then((orders) => setCurrentOrder(orders));
            console.log('Orders loaded: ', currentOrders.length);
        }, []); // Run only once when the component mounts



        //Add cart from the foodContext  to the order and calculate the total
        const placeNewOrder = (name, phoneNumber, orderNotes, address) => {

            if(currentOrders.length < 4){
            const newOrder = new Order({ items: [...cartItems], notes: orderNotes, name:name, address:address, phoneNumber: phoneNumber}); // Create a new order with the cart items
            setCurrentOrder((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the current orders

            saveOrders([...currentOrders, newOrder]); // Save the new order to the local storage
        };
    };

        //this will update the currrent Order that the user makes it needs to find the order by id tho and update it
        const updateOrder = (orderId, updatedFields) => {
            setCurrentOrder((prevOrders) =>
              prevOrders.map((order) =>
                order.id === orderId ? { ...order, ...updatedFields } : order
              )
            );
            saveOrders(currentOrders); // Save the updated order to the local storage
          };

        /**
         * Removes an item from an order by item ID.
         *
         * @param {string} orderId - The ID of the order from which the item will be removed.
         * @param {string} itemId - The ID of the item to be removed from the order.
         */
        const removeItemFromOrderByID = (orderId, itemId) => {
            const targetOrder = currentOrders.find((order) => order.id === orderId);

            if(targetOrder){
                targetOrder.removeItem(itemId); // Remove the item from the order
                updateOrder(orderId, {items: targetOrder.items}); // Update the order with the new items
                //targetOrder.removeItem(itemId);
            }

            
        };

        //this will delete the order from the current orders
        const deleteOrderByID = (orderId) => {
            setCurrentOrder((prevOrders) => prevOrders.filter((order) => order.id !== orderId)); // Remove the order from the current orders

            saveOrders(currentOrders); // Save the updated order to the local storage
        }

        //this will add the completed order to the past orders array if it doesnt already exist inside it
        const addCompletedOrder = (completedOrder) => {
            // Check if the order is already in the past orders by id
            const orderExists = pastOrders.some(order => order.id === completedOrder.id);

            if (!orderExists) {
            setPastOrders((prevOrders) => [...prevOrders, completedOrder]); // Add the completed order to the past orders
            }
        };

            //for updating order will need to get order id then update it
       

            // const placeNewOrder = (orderNotes, name, address) => {
            //     setCurrentOrder((prevOrder) => {
            //       const updatedOrder = { ...prevOrder, notes: orderNotes, name, address };
            //       updatedOrder.total = prevOrder.items.reduce((sum, item) => sum + item.price * item.quantitySelected, 0);
            //       return updatedOrder;
            //     });
            
            //     setPastOrders((prevOrders) => [...prevOrders, currentOrders]);
            //     setCurrentOrder(new Order());
            //     clearCartItems(); // Clear the cart items after placing the order
            //   };



    
        return (
            <OrderContext.Provider value={{ currentOrders, pastOrders, setCurrentOrder,
             placeNewOrder, updateOrder, addCompletedOrder, deleteOrderByID, removeItemFromOrderByID}}>
                {children}
            </OrderContext.Provider>
        );
    };