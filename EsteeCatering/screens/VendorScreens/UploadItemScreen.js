import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute} from '@react-navigation/native';
import { saveVendorItem, updateVendorItem } from '../../Utils/storage';
import FoodItem from '../../models/FoodItem';

const UploadOrEditItemScreen = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImage, setItemImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //variable that determines whether the user is editing an item or uploading a new item

  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    if (route.params?.item) {
      const { foodName, price, description, imageURL } = route.params.item;
      setItemName(foodName);
      setItemPrice(price.toString());
      setItemDescription(description);
      setItemImage(imageURL);

      setIsEditing(true)
    }
  }, [route.params?.item]);


  const pickImage = async () => {
    try {
    let result = await ImagePicker.launchImageLibraryAsync({
      options: {
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      },
      
    });

    
    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
  };
};
//need to get the following working
  const takePhoto = async () => {
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setItemImage(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
  }
};


  // Function to create a new food item
const createFoodItem = () => {
  const foodItem = new FoodItem({imageURL: itemImage, price: itemPrice, foodName: itemName, description: itemDescription});

  saveVendorItem(foodItem);

  // Log the item upload details (replace with a proper logging mechanism for production)
  Alert.alert('Item uploaded', `Name: ${itemName}, Price: ${itemPrice}, Description: ${itemDescription}`);
  navigation.navigate('My Items');
};

const updateFoodItem = () => {
  console.log('Old item id: ', route.params.item.id);
  const updatedFoodItem = new FoodItem({id: route.params.item.id,imageURL: itemImage, 
    price: itemPrice, 
    foodName: itemName, description: itemDescription});
    
    console.log('Updated item id: ', updatedFoodItem.id);
    updateVendorItem(updatedFoodItem);

    Alert.alert('Item updated', `Name: ${itemName}, Price: ${itemPrice}, Description: ${itemDescription}`);
    navigation.goBack();
  }

  const handleUpload = () => {
    // Handle the upload logic here
    if (!itemName || !itemPrice || !itemDescription || !itemImage) {
      Alert.alert(' Error', 'Please make sure to enter the name, price, and description of the item.');
      return;
    } else {

      if(isEditing) {
        updateFoodItem();
      } else {        
    createFoodItem();
      }
   
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.imageContainer}>
     {!itemImage ? <Text>No Image</Text> : <Image source={{ uri: itemImage }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}

     </View>
      {/* <Text style={styles.title}>Upload New Item</Text>
      */}

<View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
      <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
        <Text style={styles.imagePickerText}>Choose Photo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={takePhoto} style={styles.buttonStyle}>
        <Text style={styles.uploadButtonText}>Take Photo</Text>
      </TouchableOpacity>
      </View>


      <TextInput
        style={styles.input}
        placeholder="Item Name"
        value={itemName}
        onChangeText={setItemName}

      />
      <TextInput
        style={styles.input}
        placeholder="Item Price"
        value={itemPrice}
        onChangeText={setItemPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Item Description"
        value={itemDescription}
        onChangeText={setItemDescription}
        multiline={true}
        height={100}
      />

      <TouchableOpacity onPress={handleUpload} style={styles.buttonStyle}>
        <Text style={styles.uploadButtonText}>Upload Item</Text>
      </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',

  },
  imageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 25,
    paddingHorizontal: 8,
  },
    buttonStyle: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 12,
  },
  imagePickerText: {
    color: '#fff',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 16,
  },

  //might use the following
  // image: {
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'contain',
  // },
});

export default UploadOrEditItemScreen;