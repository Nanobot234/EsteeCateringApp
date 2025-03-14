import React from 'react';
import { FoodProvider } from './FoodProvider'
import { OrderProvider } from './OrderProvider';
import { VendorProvider } from './VendorProvider';
//import { AuthProvider } from './AuthProvider'

//encapuslate all providers here.
const Providers = ({ children }) => {
    return (

        
            <VendorProvider>
            <FoodProvider>
                <OrderProvider>
                {children}
                </OrderProvider>
            </FoodProvider>
            </VendorProvider>
       // </AuthProvider>
    );
};

export default Providers;

