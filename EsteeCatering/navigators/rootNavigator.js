import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../FirebaseManager";
import { NavigationContainer } from "@react-navigation/native";
import CartScreen from "../screens/CustomerScreens/CartScreen";
import FoodItemsScreen from "../screens/CustomerScreens/foodItemsGridScreen";
import FoodDetailScreen from "../screens/CustomerScreens/foodDetailScreen";
import OrderPlacementScreen from "../screens/CustomerScreens/OrderPlacementScreen";
import CurrentPastOrdersScreen from "../screens/CustomerScreens/CurrentPlacedAndPastOrdersScren";
import VendorItemsScreen from "../screens/VendorScreens/VendorItemsScreen";
import UploadOrEditItemScreen from "../screens/VendorScreens/UploadItemScreen";
import PhoneAuthScreen from "../screens/AuthLoginScreens/PhoneAuthenticationScreen";
import EnterVerificationCodeScreen from "../screens/AuthLoginScreens/PhoneNumberVerificationScreen";
import { useState, useEffect} from "react";
import { Text } from "react-native";
import { isFirstTimeUser, UserSignedIn, setSignedInState } from "../Utils/storage";
import CurrentCustomerOrdersScreen from "../screens/VendorScreens/CustomerOrdersScreen";
// Initialize stack navigators
const OrderCreationStack = createNativeStackNavigator();
const FoodItemsScreenStack = createNativeStackNavigator();
const CartStack = createNativeStackNavigator();
const UserAuthStack = createNativeStackNavigator();
const CustomerOrdersStack = createNativeStackNavigator();
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

//the screen stack ther vendor will use to see the customer orders
function CustomerOrderStackScreen() {
  <FoodItemsScreenStack.Screen name="CustomerOrders" component={CurrentCustomerOrdersScreen} />
}

function AuthStackScreen() {
  return (
    <UserAuthStack.Navigator>
      {/* Add screens to the OrderCreationStack here if needed */}
      <UserAuthStack.Screen name="PhoneEntryScreen" component={PhoneAuthScreen} />
      <UserAuthStack.Screen name="EnterVerificationCode" component={EnterVerificationCodeScreen} />
      </UserAuthStack.Navigator>
  );
}


function AppTabNavigation() {
  return (
    <AppTab.Navigator screenOptions={{ headerShown: false }}>
      {/* <AppTab.Screen name="FoodItems" component={FoodItemStackScreen} /> */}
      <AppTab.Screen name="VendorItems" component={VendorItemsStackScreen} />
      <AppTab.Screen name="CustomerOrders" component={CustomerOrderStackScreen} />
      {/* <AppTab.Screen name="My Orders" component={OrderStackScreen} /> */}

      {/* Place the next navigator here */}
    </AppTab.Navigator>
  );
}




const RootNavigator = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [loading, setLoading] = useState(true);
  const [testAuth, setTestAuth] = useState(false); //variable for testing the auth flow for now

  const checkAuthState = async () => {
    const signedIn = await UserSignedIn(); //gets the saved signed in state
    setIsSignedIn(signedIn);
    setLoading(false);
  };

  useEffect(() => {
    checkAuthState();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsSignedIn(true)
        await setSignedInState(true); 
      } else {
      setIsSignedIn(false);
     await setSignedInState(false); 
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>; // You can replace this with a loading spinner
  }

  return (
    <>
      {isSignedIn ? <AppTabNavigation /> : <AuthStackScreen />}
      {/* {isSignedIn && !isFirstTime ? <AppTabNavigation /> : <AuthStackScreen />} */}
    </>
  );
};




// Main app tab navigator


export default RootNavigator;