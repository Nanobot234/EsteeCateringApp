
import React, { createContext, useEffect, useState } from 'react';
import Order from '../models/Order';
import { FoodContext } from './FoodProvider';

export const OrderContext = createContext(); // Create the Order context to store the current order
export const OrderProvider = ({ children }) => {

    const {cartItems} = useContext(FoodContext);


    // the current order the user will place. User can make only one order at a time, but this order can be edited
        const [currentOrders, setCurrentOrder] = useState([Order]); //max orders of 3
        //the order history of the user
        const [pastOrders, setPastOrders] = useState([Order]); //intializes the array of orders past that will be used
        

        //will get the items from local Storage as well



        //Add cart from the foodContext  to the order and calculate the total
        const placeNewOrder = (orderNotes, name, address) => {

            if(currentOrders.length < 4){
            const newOrder = new Order({ items: [...cartItems], notes: orderNotes, name:name, address:address });
            setCurrentOrder((prevOrders) => [...prevOrders, newOrder]); // Add the new order to the current orders
        };
    };

        //this will update the currrent Order that the user makes it needs to find the order by id tho and update it
        const updateOrder = (orderId, updatedFields) => {
            setCurrentOrder((prevOrders) =>
              prevOrders.map((order) =>
                order.id === orderId ? { ...order, ...updatedFields } : order
              )
            );
          };


        //this will delete the order from the current orders
        const deleteOrder = (orderId) => {
            setCurrentOrder((prevOrders) => prevOrders.filter((order) => order.id !== orderId));
        }

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
            <OrderContext.Provider value={{ currentOrders, pastOrders, setCurrentOrder, placeNewOrder, updateOrder}}>
                {children}
            </OrderContext.Provider>
        );
    };