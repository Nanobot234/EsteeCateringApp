import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute} from '@react-navigation/native';
import { saveVendorItem, updateVendorItem } from '../../Utils/storage';
import FoodItem from '../../models/FoodItem';
import { uploadImageToStorage } from '../../FirebaseManager';
import { addVendorIteminFirestore, updateVendorItemFeildsInFirestore } from '../../FirebaseManager';

const UploadOrEditItemScreen = () => {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemImageURL, setitemImageURL] = useState(null);
  const [isEditing, setIsEditing] = useState(false); //variable that determines whether the user is editing an item or uploading a new item
  const [originalImage, setOriginalImage] = useState(null); //variable that stores the original image of the item when editing
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  
  useEffect(() => {
    if (route.params?.item) {
      const { foodName, price, description, imageURL } = route.params.item;
      setItemName(foodName);
      setItemPrice(price.toString());
      setItemDescription(description);
      setitemImageURL(imageURL);
      setOriginalImage(imageURL); // Store the original image for comparison

      setIsEditing(true)
    }
  }, [route.params?.item]);


  const requestCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Camera permissions are required to take a photo.');
      return false;
    }
    return true;
  };

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
      setitemImageURL(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
  };
};
//need to get the following working
  const takePhoto = async () => {
  const hasPermission = await requestCameraPermissions();

  if (!hasPermission) return;
  try {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setitemImageURL(result.assets[0].uri);
    }
  } catch (error) {
    console.log(error);
  }
};


  // Function to create a new food item
const createFoodItem = async () => {
   setLoading(true); // Set loading to true while uploading
  try  {
    const foodItem = new FoodItem({imageURL: itemImageURL, price: itemPrice, foodName: itemName, description: itemDescription});

    saveVendorItem(foodItem); // Save the new food item to local storage


     const imageURLInFBStorage = await uploadImageToStorage(itemImageURL, `${itemName}_${Date.now()}`);
    
    const items = {id: foodItem.id, imageURL: imageURLInFBStorage, price: itemPrice, foodName: itemName, description: itemDescription};
    
    await addVendorIteminFirestore(items); // Save the new food item to Firebase
    console.log('New item id: ', foodItem.id);

    Alert.alert('Item uploaded', `Name: ${itemName}, Price: ${itemPrice}, Description: ${itemDescription}`);
  navigation.navigate('My Items');
  }
  catch (error) {
    console.error('Error uploading item: ', error);
    Alert.alert('Error', 'Failed to upload the item. Please try again.');
  } finally {
    setLoading(false); // Set loading to false after uploading
  }
};


const updateFoodItem = async () => {
  setLoading(true); // Set loading to true while uploading

  try  {
  if (itemImageURL !== originalImage) {
    // If the image hasn't changed, don't update it
    const imageName = `${itemName}_${Date.now()}`;
    imageURL = await uploadImageToStorage(itemImageURL, imageName);

    const updatedItemFeilds = {imageURL: imageURL, price: itemPrice, foodName: itemName, description: itemDescription};
     await updateVendorItemFeildsInFirestore(route.params.item.id, updatedItemFeilds);

    const updatedFoodItem = new FoodItem({id: route.params.item.id,imageURL: itemImageURL, 
      price: itemPrice, 
      foodName: itemName, description: itemDescription});
      await updateVendorItem(updatedFoodItem);
  }

  // Update the item fielfds in firesotre
  const updatedItemFeilds = {price: itemPrice, foodName: itemName, description: itemDescription};
 
  updateVendorItemFeildsInFirestore(route.params.item.id, updatedItemFeilds);

  const updatedFoodItem = new FoodItem({id: route.params.item.id,imageURL: itemImageURL, 
    price: itemPrice, 
    foodName: itemName, description: itemDescription});

    updateVendorItem(updatedFoodItem);

    
    Alert.alert('Item updated', `Name: ${itemName}, Price: ${itemPrice}, Description: ${itemDescription}`);
    navigation.goBack();
  } catch (error) {
    console.error('Error updating item: ', error);
    Alert.alert('Error', 'Failed to update the item. Please try again.');
  }
  finally {
    setLoading(false); // Set loading to false after uploading
  }
};

  const handleUpload = () => {
    // Handle the upload logic here
    if (!itemName || !itemPrice || !itemDescription || !itemImageURL) {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
        <View style={styles.imageContainer}>
     {!itemImageURL ? <Text>No Image</Text> : <Image source={{ uri: itemImageURL }} style={{ width: 200, height: 200, alignSelf: 'center' }} />}

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

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007BFF" />
        </View>
      )}
     
    </View>
    </TouchableWithoutFeedback>
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
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 10,
  },

  //might use the following
  // image: {
  //   width: '100%',
  //   height: '100%',
  //   resizeMode: 'contain',
  // },
});

export default UploadOrEditItemScreen;