import { NavigationContainer } from "@react-navigation/native";
import AppTabNavigation from "./navigators/rootNavigator";
//import RootNavigat

export default function App() {
    return (
        <NavigationContainer>
            <AppTabNavigation />
        </NavigationContainer>
    )
}

// const App = () => {
// return <AppTabNavigation />
// } 

