import React from "react";


export const burgerImage = '../assets/images/burger.jpeg';
export const pizzaImage = '../assets/images/pizza.jpeg';
export const saladImage = '../assets/images/salad.jpeg';

export const resolveLocalImage = (imageUrl) => {
    switch (imageUrl) {
      case '../assets/images/burger.jpeg':
        return require('../assets/images/burger.jpeg');
      case '../assets/images/pizza.jpeg':
        return require('../assets/images/pizza.jpeg');
      case '../assets/images/salad.jpeg':
        return require('../assets/images/salad.jpeg');
      // Add more cases as needed
      default:
        return null;
    }

  };