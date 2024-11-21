// const foodItem = (foodName, image, description, price) =({
//     name: Str,
//     image: image,
//     description: description, 
//     price: price
// })

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const FoodItem = ({ imageUrl, price, foodName, description, quantitySelected}) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.price}>${price}</Text>
      <Text style={styles.name}>{foodName}</Text>
      <Text style={styles.name}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
  },

  // name: {
  //   fontSize: 10,
  //   marginTop: 5
  // },

  name: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default FoodItem;


//wrapping object in parenthesis since im returning from it
// const order = (foodItem, personName, eventDate, orderPrice, instructions) = ({
//     foodItem:foodItem,
//     personName: personName,
//     eventDate:  eventDate,
//     orderPrice: orderPrice, 
//     instructions: instructions
// })



