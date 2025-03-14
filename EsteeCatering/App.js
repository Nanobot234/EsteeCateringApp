
import { NavigationContainer } from "@react-navigation/native";
import AppTabNavigation from "./navigators/rootNavigator";
import Providers from "./Providers/Providers";
import RootNavigator from "./navigators/rootNavigator";
//import RootNavigat

export default function App() {
    return (
        <Providers>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
        </Providers>
    )
}

// const App = () => {
// return <AppTabNavigation />
// } 

