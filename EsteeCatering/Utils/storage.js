import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CART_KEY = "cart_items"; //key for the cart items
const Orders_KEY = "order_items"; //key for the order items
const VENDOR_ITEMS_KEY = "vendor_items"; //key for the vendor items
const FIRST_TIME_USER_KEY = "firstTimeUser"; //key for the first time user


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
/**
 * Retrieves the cart items from AsyncStorage.
 *
 * @async
 * @function getCartItems
 * @returns {Promise<Array>} A promise that resolves to an array of cart items. If there are no items, an empty array is returned.
 * @throws Will log an error message to the console if there is an issue retrieving the cart items.
 */
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

export const saveOrders = async (orderItems) => {
    try {
        await AsyncStorage.setItem(Orders_KEY, JSON.stringify(orderItems)); //save the order items
    } catch (error) {
        console.log("Error saving order items: ", error);
    }
}

export const getOrders = async () => {
    try {
        const ordersJSON = await AsyncStorage.getItem(Orders_KEY); //get the orders
        return ordersJSON != null ? JSON.parse(ordersJSON) : []; //parse the orders
    } catch (error) {
        console.log("Error getting orders: ", error);
        return [];
    }
}


export const saveVendorItems = async (vendorItems) => {
    try {
        await AsyncStorage.setItem(VENDOR_ITEMS_KEY, JSON.stringify(vendorItems)); // save the vendor items array
    } catch (error) {
        console.log("Error saving vendor items: ", error);
    }
};
  //saves new item to the vendor items
export const saveVendorItem = async (vendorItem) => {
    try {
        const existingVendorItemsJSON = await AsyncStorage.getItem(VENDOR_ITEMS_KEY); // get existing vendor items
        const existingVendorItems = existingVendorItemsJSON != null ? JSON.parse(existingVendorItemsJSON) : []; // parse existing vendor items
        const updatedVendorItems = [...existingVendorItems, vendorItem]; // add new vendor item to the array
        await AsyncStorage.setItem(VENDOR_ITEMS_KEY, JSON.stringify(updatedVendorItems)); // save the updated vendor items array
    } catch (error) {
        console.log("Error saving vendor items: ", error);
    }
};

/**
 * Retrieves vendor items from AsyncStorage.
 *
 * @async
 * @function getVendorItems
 * @returns {Promise<Array>} A promise that resolves to an array of vendor items. If there are no items or an error occurs, an empty array is returned.
 * @throws Will log an error message to the console if an error occurs during retrieval.
 */
export const getVendorItems = async () => {
    try {
        const vendorItemsJSON = await AsyncStorage.getItem(VENDOR_ITEMS_KEY); // get the vendor items
        return vendorItemsJSON != null ? JSON.parse(vendorItemsJSON) : []; // parse the vendor items array
    } catch (error) {
        console.log("Error getting vendor items: ", error);
        return [];
    }
};

// Update a specific vendor item in AsyncStorage. Will be of type food item//(COntinue here??)
export const updateVendorItem = async (updatedItem) => {
    try {
        const vendorItems = await getVendorItems(); //get the current vendor items
        const updatedVendorItems = vendorItems.map(item =>
            item.id === updatedItem.id ? updatedItem : item
        );


        await saveVendorItems(updatedVendorItems); //save the updated vendor items
    } catch (error) {
        console.log("Error updating vendor item: ", error);
    }
};

//Check here!!
// Delete a specific vendor item from AsyncStorage
export const deleteVendorItem = async (itemId) => {
    try {
        const vendorItems = await getVendorItems(); //get the current vendor items
        const updatedVendorItems = vendorItems.filter(item => item.id !== itemId);
        await saveVendorItems(updatedVendorItems); //save the updated vendor items
        console.log("Item deleted successfully!!");
    } catch (error) {
        console.log("Error deleting vendor item: ", error);
    }
};


//check if the user is a first time 

export const isFirstTimeUser = async () => {
    try {
        const firstTimeUser = await AsyncStorage.getItem(FIRST_TIME_USER_KEY); //get the first time user
        return firstTimeUser === null ? true : false;
    } catch (error) {
        console.log("Error checking if first time user: ", error);
        return false;
    }
}

//set the user as not a first time user after they have successfully logged in once...
export const setFirstTimeUser = async () => {
    try {
        await AsyncStorage.setItem('firstTimeUser', 'false');
    } catch (error) {
        console.log("Error setting first time user: ", error);
    }
}


/**
 * Checks if the user is signed in by retrieving the 'signedIn' value from AsyncStorage.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if the user is signed in, otherwise false.
 * @throws Will log an error message and return false if there is an issue accessing AsyncStorage.
 */
export const UserSignedIn = async () => {
    try {
        const signedIn = await AsyncStorage.getItem('signedIn');
        return signedIn === null ? false : true;
    } catch (error) {
        console.log("Error checking if signed in: ", error);
        return false;
    }
}

/**
 * Sets the signed-in state in AsyncStorage.
 *
 * @param {boolean} signedIn - The signed-in state to be saved.
 * @returns {Promise<void>} A promise that resolves when the state is saved.
 * @throws Will log an error message if saving the state fails.
 */


export const setSignedInState = async (signedIn) => {
    try {
        await AsyncStorage.setItem('signedIn', JSON.stringify(signedIn));
    } catch (error) {
        console.log("Error saving signed in state: ", error);
    }
}
