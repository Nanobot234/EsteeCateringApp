// Create a foodProvider component that will store and update foods in this project
//uCreating contect here
import React, { createContext, useEffect, useState } from 'react';
import { saveCartItems, getCartItems, clearCart } from '../Utils/storage';


export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    //array of available food items to order from, will be updated only be admin or Esther  in this case
    const [foodItems, setFoodItems] = useState([
      { id: '23', imageUrl: '...', price: 10.49, foodName: 'Pizza', description: 'Delicious pizza', quantitySelected: 0 },

      { id: '5', imageUrl: '...', price: 15, foodName: 'Burger', description: 'Juicy burger', quantitySelected: 0 },
      // Add more items
      { id: '6', imageUrli: '...', price: 15, foodName: 'Salad', description: 'Healthy Salad', quantitySelected: 0 }
    ]);
    
    const [cartItems, setCartItems] = useState([]); // Initialize the cartItems state
    //why never here!!

    // Load the cart items from storage when the component mounts
    useEffect(() => {
      
      getCartItems().then((items) => setCartItems(items)); // Load the cart items from storage
      console.log('Cart items loaded: ', cartItems.length);
  }, []);  // Run only once when the component mounts



    //add items to the cart, and checks for duplicates. If the item is already in the cart, it will update the quantity.
    const addItemToCart = (item) => {

    //never problem here
        //maybe look at how the following works
        setCartItems((prevCart) => {
          // Check if the item is already in the cart
          const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
          let updatedCart;
          if (existingItem) {
            // Update quantity if the item exists
            updatedCart = prevCart.map((cartItem) =>
              cartItem.id === item.id
                ? { ...cartItem, quantitySelected: cartItem.quantitySelected + item.quantitySelected }
                : cartItem
            );
          } else {
            // Add new item to the cart

            updatedCart = [...prevCart, { ...item, quantitySelected: item.quantitySelected }]; 
            //something going on here tho!! not sure!!
          }
          saveCartItems(updatedCart); // Save the updated cart to storage
          return updatedCart;
        });
      };

      
     
      const removeItemFromCart = (itemId) => {
        setCartItems((prevCart) => {
          const updatedCart = prevCart.filter((cartItem) => cartItem.id !== itemId);
          saveCartItems(updatedCart); // Save the updated cart to storage
          return updatedCart;
        });
      };

      /**
       * Increases the quantity of a cart item by 1.
       *
       * @param {string} itemId - The ID of the item to increase the quantity of.
       */
const increasCartItemQuantity = (itemId) => {
  setCartItems((prevCart) => {
    const updatedCart = prevCart.map((item) =>
      item.id === itemId
        ? { ...item, quantitySelected: item.quantitySelected + 1 }
        : item
    );
    saveCartItems(updatedCart); // Save the updated cart to storage
    return updatedCart;
  });
};

      /**
       * Decreases the quantity of a specific item in the cart by 1.
       * If the item's quantity is already 0, it will not be decreased further.
       *
       * @param {string} itemId - The unique identifier of the item to decrease the quantity of.
       */
      const decreaseCartItemQuantity = (itemId) => {
        setCartItems((prevCart) => {
          const updatedCart = prevCart.map((item) =>
            item.id === itemId && item.quantitySelected > 0
              ? { ...item, quantitySelected: item.quantitySelected - 1 }
              : item
          );
          saveCartItems(updatedCart); // Save the updated cart to storage
          return updatedCart;
        });
      }
    
      // Clear the entire cart
      const clearCart = () => {
        setCartItems([]);
        clearCart(); // Clear the cart in storage
      };

        //admin functions
    const addNewFoodItem = (newItem) => {
        setFodItems((prevItems) => [...prevItems, newItem]); // Append the new item to the array
      };

      //remove item from food array
    const removeFoodItem = (id) => {
        setFoodItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove the item with the given id
      };


    return (
        <FoodContext.Provider value={{foodItems, cartItems, setFoodItems, 
        addNewFoodItem, removeFoodItem, addItemToCart, removeItemFromCart, 
        decreaseCartItemQuantity, increasCartItemQuantity, clearCart}}>
            {children}
        </FoodContext.Provider>
    )

};