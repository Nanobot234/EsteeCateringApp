// Create a foodProvider component that will store and update foods in this project
//uCreating contect here
import React, { createContext, useEffect, useState } from 'react';
import { saveCartItems, getCartItems, clearCart } from '../Utils/storage';
import FoodItem from '../models/FoodItem'
import { burgerImage, pizzaImage, saladImage, resolveLocalImage} from '../Utils/images';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
    //array of available food items to order from, will be updated only be admin or Esther  in this case

    // const burgerImage = '../assets/images/burger.jpeg';
    // const pizzaImage = '../assets/images/pizza.jpeg';
    // const saladImage = ('../assets/images/salad.jpeg');

    const [foodItems, setFoodItems] = useState([
      new FoodItem({id:'23', imageURL: pizzaImage, price:10.49, foodName:'Pizza', description:'Delicious pizza', quantitySelected:0}),
      new FoodItem({id: '5', imageURL: burgerImage, price: 12, foodName: 'Burger', description: 'Juicy burger', quantitySelected: 0}),
      new FoodItem({id: '6', imageURL: '', price: 15, foodName: 'Salad', description: 'Healthy Salad', quantitySelected: 0}),
    ]);
    //the above array will be a an array of Food items too, need to fix that
    
    const [cartItems, setCartItems] = useState([FoodItem]); // Initialize the cartItems state
    //why never here!!

    // Load the cart items from storage when the component mounts
    useEffect(() => {
      getCartItems().then((items) => setCartItems(items)); // Load the cart items from storage
      console.log('Cart items loaded: ', cartItems.length);
  }, []);  // Run only once when the component mounts



    //add items to the cart, and checks for duplicates. If the item is already in the cart, it will update the quantity.
    /**
     * Adds an item to the cart. If the item already exists in the cart, it updates the quantity.
     * Otherwise, it adds the new item to the cart.
     *
     * @param {Object} item - The item to be added to the cart.
     * @param {number} item.id - The unique identifier of the item.
     * @param {number} item.quantitySelected - The quantity of the item to be added.
     */
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
    

      /**
       * Clears the cart by setting the cart items to an empty array and 
       * calling the clearCart function to clear the cart in storage.
       */
      const clearCart = () => {
        setCartItems([]); // Clear the cart items
      };

      //add new food item to the food array
    const addNewFoodItem = (newItem) => {
        setFoodItems((prevItems) => [...prevItems, newItem]); // Append the new item to the array
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