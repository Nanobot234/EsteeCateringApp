import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart_items"; //key for the cart items


/**
 * Saves the cart items to AsyncStorage.
 *
 * @param {Array} cartItems - The array of cart items to be saved.
 * @returns {Promise<void>} A promise that resolves when the cart items have been saved.
 * @throws Will log an error message if saving the cart items fails.
 */
export const saveCartItems = async (cartItems) => {
    try {
        await AsyncStorage.setItem(CART_KEY, JSON.stringify(cartItems)); //save the cart items as a string
    } catch (error) {
        console.log("Error saving cart items: ", error);
    }
    };

    //get the cart items from the storage
export const getCartItems = async () => {
    try {
        const cartItemsJSON = await AsyncStorage.getItem(CART_KEY); //get the cart items
        return cartItemsJSON != null ? JSON.parse(cartItemsJSON) : []; //parse the cart items
    } catch (error) {
        console.log("Error getting cart items: ", error);
        return [];
    }
}

//clear the cart items
export const clearCart = async () => {
    try {
        await AsyncStorage.removeItem(CART_KEY); //remove the cart items
    } catch (error) {
        console.log("Error clearing cart items: ", error);
    }
}