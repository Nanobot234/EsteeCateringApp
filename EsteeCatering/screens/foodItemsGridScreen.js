//user can just browse the food items made and see the price wihtout making an ordr
//well the user will see the items displayed here, and cana ctually add to order.

import React, {useContext} from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import FoodItem from '../customComponents/FoodItem'; // Import the custom FoodItem component
import { useNavigation } from '@react-navigation/native';
import icon from '../assets/images/favicon.png'
import {FoodContext} from "../Providers/FoodProvider";

const FoodItemsScreen = () => {

const {foodItems} = useContext(FoodContext);

const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <FlatList
      data={foodItems} //the data here!!
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


