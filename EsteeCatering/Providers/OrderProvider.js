
import React, { createContext, useEffect, useState } from 'react';
import { useroOrder } from '../customComponents/Order';

export const OrderProvider = ({ children }) => {

    // the current order the user will place. User can make only one order at a time, but this order can be edited
        const [currentOrder, setCurrentOrder] = useState({});
        const [pastOrders, setPastOrders] = useState([]);
        

    
        return (
            <OrderContext.Provider value={{ currentOrder, setCurrentOrder }}>
                {children}
            </OrderContext.Provider>
        );
    };