//user can just browse the food items made and see the price wihtout making an ordr
//well the user will see the items displayed here, and cana ctually add to order.

import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import FoodItem from '../customComponents/FoodItem'; // Import the custom FoodItem component
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/images/favicon.png'
const foodData = [
  {
    id: '1',
    imageUrl: icon,
    price: '12.99',
    foodName: 'Chicken Sandwich',
    description: 'Delicious chicken sandwich crafted with all the right flavors',
  },
  {
    id: '2',
    imageUrl: icon,
    foodName: 'Vegan Salad',
    price: '8.99',
    description: 'This salad is perfect for vegans and tasts great',
  },
  {
    id: '3',
    imageUrl: icon,
    foodName: 'Steak',
    price: '14.99',
    description: 'juicy tender steak to be eaten',
  },
  {
    id: '4',
    imageUrl: icon,
    price: '9.99',
    foodName: 'Sushi',
    description: 'Fresh Sushi Platter',
  },
  // Add more food items here...
];



const FoodItemsScreen = () => {

const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
      data={foodData} //the data here!!
        renderItem={({ item }) => (

          <TouchableOpacity
          onPress={ () => navigation.navigate('Details', {item})}
          style={styles.itemContainer}
          > 
          <FoodItem
            imageUrl={item.imageUrl}
            price={item.price}
            foodName={item.foodName}
          />
            </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display items in 2 columns

        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  columnWrapper: {
    justifyContent: 'space-between'
  },
  itemContainer:{
    flex: 1, //item take  equal with in its row here
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center'
  }
});

export default FoodItemsScreen;


