// Purpose: Model for FoodItem object
// This model will be used to create FoodItem objects that will be used to display individual food item details in the app.

import { v4 as uuidv4 } from 'uuid';


/**
 * Represents a food item.
 * @class
 */
export default class FoodItem {
    /**
     * Creates an instance of FoodItem.
     * @param {Object} params - The parameters for the food item.
     * @param {string} [params.id=uuidv4().slice(0,6)] - The unique identifier for the food item.
     * @param {string} params.imageURL - The URL of the food item's image.
     * @param {number} params.price - The price of the food item.
     * @param {string} params.foodName - The name of the food item.
     * @param {string} params.description - The description of the food item.
     * @param {number} [params.quantitySelected=0] - The quantity of the food item selected.
     */

    constructor({id = uuidv4().slice(0,6), imageURL, price, foodName, description, quantitySelected = 0}) {
        // constructor implementation
        this.id = id;
        this.price = price;
        this.foodName = foodName;
        this.imageURL = imageURL;
        this.description = description;
        this.quantitySelected = quantitySelected;

    }
}  
