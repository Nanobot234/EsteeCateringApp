// Purpose: Model for FoodItem object
// This model will be used to create FoodItem objects that will be used to display individual food item details in the app.


export default class FoodItem {
    constructor({id, imageURL, price, foodName, description, quantitySelected = 0}) {
        this.id = id;
        this.imageURL = imageURL;
        this.price = price;
        this.foodName = foodName;
        this.description = description;
        this.quantitySelected = quantitySelected;

    }
}
