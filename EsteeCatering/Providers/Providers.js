import React from 'react';
import { FoodProvider } from './FoodProvider'
import { OrderProvider } from './OrderProvider';
//import { AuthProvider } from './AuthProvider'

//encapuslate all providers here.
const Providers = ({ children }) => {
    return (
      
            <FoodProvider>
                <OrderProvider>
                {children}
                </OrderProvider>
            </FoodProvider>
       // </AuthProvider>
    );
};

export default Providers;

