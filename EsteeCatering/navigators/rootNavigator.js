import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CartScreen from "../screens/CartScreen";
import FoodItemsScreen from "../screens/foodItemsGridScreen";
import FoodDetailScreen from "../screens/foodDetailScreen";
import OrderPlacementScreen from "../screens/OrderPlacementScreen";
import CurrentPastOrdersScreen from "../screens/CurrentPlacedAndPastOrdersScreen";
import VendorItemsScreen from "../screens/VendorScreens/VendorItemsScreen";
import UploadOrEditItemScreen from "../screens/VendorScreens/UploadItemScreen";

// Initialize stack navigators
const OrderCreationStack = createNativeStackNavigator();
const FoodItemsScreenStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const AppTab = createBottomTabNavigator();

// Order stack screen
function OrderStackScreen() {
  return (
    <OrderCreationStack.Navigator>
      {/* Add screens to the OrderCreationStack here if needed */}
      <OrderCreationStack.Screen name="Orders" component={CurrentPastOrdersScreen} />
    </OrderCreationStack.Navigator>
  );
}


// Food items stack screen
function FoodItemStackScreen() {
  return (
    <FoodItemsScreenStack.Navigator>
      <FoodItemsScreenStack.Screen name="Food Items" component={FoodItemsScreen} />
      <FoodItemsScreenStack.Screen name="Details" component={FoodDetailScreen} />
    </FoodItemsScreenStack.Navigator>
  );
}

// Cart stack screen
function CartStackScreen() {
  return (
    <CartStack.Navigator mode="modal">
      <CartStack.Screen name="Cart" component={CartScreen} />
      <CartStack.Screen name="MakeOrder" component={OrderPlacementScreen} />
    </CartStack.Navigator>
  );
}

function VendorItemsStackScreen() {
  return (
    <FoodItemsScreenStack.Navigator>
      <FoodItemsScreenStack.Screen name="My Items" component={VendorItemsScreen} />
      <FoodItemsScreenStack.Screen name="UploadEditItem" component={UploadOrEditItemScreen} />
    </FoodItemsScreenStack.Navigator>
  );
}



// Main app tab navigator
function AppTabNavigation() {
  return (
    <AppTab.Navigator screenOptions={{ headerShown: false }}>
      {/* <AppTab.Screen name="FoodItems" component={FoodItemStackScreen} /> */}
      <AppTab.Screen name="VendorItems" component={VendorItemsStackScreen} />
      <AppTab.Screen name="Cart" component={CartStackScreen} />
      <AppTab.Screen name="My Orders" component={OrderStackScreen} />

      {/* Place the next navigator here */}
    </AppTab.Navigator>
  );
}

export default AppTabNavigation;