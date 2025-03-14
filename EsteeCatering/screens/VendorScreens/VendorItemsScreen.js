import React, { useState, useEffect, useCallback, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { getVendorItems, deleteVendorItem, saveVendorItem } from '../../Utils/storage';
import { SwipeListView } from 'react-native-swipe-list-view';
import { VendorItemsContext,} from '../../Providers/VendorProvider';
import { deleteVendorItemFromFirestore } from '../../FirebaseManager';
import { use } from 'react';

const VendorItemsScreen = () => {
   
  const { vendorItems, fetchItems, setVendorItems, initializeItems } = useContext(VendorItemsContext);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  // const fetchItems = async () => {
  //   const fetchedItems = await getVendorItems();
  //   setItems(fetchedItems);
  //   console.log("Items in storage being fetched", fetchedItems.length);
  // };

  const handleDeleteItem = async (id) => {
    try {
      setVendorItems((prevItems) => prevItems.filter((item) => item.id !== id));
      await deleteVendorItem(id);
      await deleteVendorItemFromFirestore(id);
      console.log("Item deleted successfully!!");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const dependencies = useMemo(() => {
    return vendorItems.length > 0 ? [isFocused, vendorItems] : [isFocused, []];
  }, [isFocused, vendorItems]);

  // Fetch items when vendorItem changes and when the screen is focused

  // useEffect(() => {
  //  // console.log("Screen is focused");
  //   if (isFocused) {
  //     fetchItems();
  //   }
  // }, dependencies);
  // useEffect(

     useFocusEffect(
    useCallback(() => {
       console.log("Screen is focused");
      if (isFocused && vendorItems) {
        initializeItems();
      }
    }, [isFocused, vendorItems])
  );
    
  //   //fix this now!!
  //   if(isFocused && ){   
  //     fetchItems();
  //   }, [vendorItems,isFocused])
  // );

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('UploadEditItem', { item })}>
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageURL }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.foodName}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({ item }) => (
    <View style={styles.hiddenItem}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(item.id)}
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Uploaded Items</Text>
      <SwipeListView
        data={vendorItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-75}
        disableRightSwipe
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={() => navigation.navigate('UploadEditItem')}
      >
        <Text style={styles.uploadButtonText}>Upload New Item</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    color: '#888',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  uploadButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingRight: 15,
    marginBottom: 12,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: '100%',
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VendorItemsScreen;
