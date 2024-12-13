import React from 'react';
import { FoodProvider } from './FoodProvider'
//import { AuthProvider } from './AuthProvider'

//encapuslate all providers here.
const Providers = ({ children }) => {
    return (
      
            <FoodProvider>
                {children}
            </FoodProvider>
       // </AuthProvider>
    );
};

export default Providers;

