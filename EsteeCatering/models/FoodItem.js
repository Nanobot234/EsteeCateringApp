// Purpose: Model for FoodItem object
// This model will be used to create FoodItem objects that will be used to display individual food item details in the app.

import { v4 as uuidv4 } from 'uuid';

export default class FoodItem {
    constructor({id = uuidv4().slice(0,6), imageURL, price, foodName, description, quantitySelected = 0}) {
        this.id = id;
        this.imageURL = imageURL;
        this.price = price;
        this.foodName = foodName;
        this.description = description;
        this.quantitySelected = quantitySelected;

    }
}
