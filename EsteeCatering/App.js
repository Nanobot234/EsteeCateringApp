import 'react-native-get-random-values';
import { NavigationContainer } from "@react-navigation/native";
import AppTabNavigation from "./navigators/rootNavigator";
import Providers from "./Providers/Providers";
//import RootNavigat

export default function App() {
    return (
        <Providers>
        <NavigationContainer>
            <AppTabNavigation />
        </NavigationContainer>
        </Providers>
    )
}

// const App = () => {
// return <AppTabNavigation />
// } 

