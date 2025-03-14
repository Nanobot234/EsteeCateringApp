import React, { createContext, useState, useEffect } from 'react';
import { getVendorItems, saveVendorItems, deleteVendorItem } from '../Utils/storage';

export const VendorItemsContext = createContext();

export const VendorProvider = ({ children }) => {
  const [vendorItems, setVendorItems] = useState([]);

  const fetchItems = async () => {
    try {
      const fetchedItems = await getVendorItems(); //vendor Items are stored locally!
      setVendorItems(fetchedItems);
     // console.log("Items in storage being fetched", fetchedItems.length);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };
  
  //
  // Save the vendor items to storage whenever the vendorItems state changes

  const initializeItems = () => {
    fetchItems();
  }

    useEffect(() => {
        initializeItems();
    }, []);

 return (
    <VendorItemsContext.Provider value={{ vendorItems, fetchItems, setVendorItems, initializeItems }}>
      {children}
    </VendorItemsContext.Provider>
  );
}

