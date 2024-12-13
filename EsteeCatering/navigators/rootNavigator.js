import * as React from "react"
import CartScreen from "../screens/CartScreen"
import FoodItemsScreen from "../screens/foodItemsGridScreen"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FoodDetailScreen from "../screens/foodDetailScreen";


const OrderCreationStack = createNativeStackNavigator(); //initlaizing the stack navigator that wil be used
const foodItemsScreenStack = createNativeStackNavigator()
const cartStack = createNativeStackNavigator()
const AppTab = createBottomTabNavigator();

function OrderStackScreen() {
    return (
        <OrderCreationStack.Navigator>
            <OrderCreationStack.Screen name="Make Order" component={CartScreen}/>
        </OrderCreationStack.Navigator>
    )
}

function FoodItemStackScreen() {
    return (
        <foodItemsScreenStack.Navigator>
            <foodItemsScreenStack.Screen name="Food Items" component={FoodItemsScreen} /> 
            <foodItemsScreenStack.Screen name= "Details" component={FoodDetailScreen} />
            {/* placing the screen detail here */}
        </foodItemsScreenStack.Navigator>
    )
}

function CartStackScreen() {
    return (
        <cartStack.Navigator>
            <cartStack.Screen name="Cart" component={CartScreen} />
        </cartStack.Navigator>
    )
}

function AppTabNavigation() {
    return (
        <AppTab.Navigator screenOptions={{headerShown: false}}>
        <AppTab.Screen name="Foods" component={FoodItemStackScreen} />
       <AppTab.Screen name="CartItems" component={CartStackScreen} />
        </AppTab.Navigator>
    )
}

//export the tab

export default AppTabNavigation
//return it all here.

//



//function fo