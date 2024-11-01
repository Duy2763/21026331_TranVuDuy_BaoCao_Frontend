
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function useCart() {
    return useContext(CartContext);
}

export function CartProvider({children}) {
    const [carts, setCarts] = useState([])
    const [name, setName] = useState('');
    const [ accountInSession, setAccountInSession ] = useState({});
    
    const updateAccountInSession = (user) => {
        setAccountInSession(user)
    }

    const resetAccountInSession = () => {
        setAccountInSession({})
    }

    const resetQuantity = () => {
        setCarts(carts.map(cart => 
           ({...cart, sl: 0}) 
        ));
    };

    const updateQuantity = (id) => {
        setCarts(carts.map(cart => 
            cart.id === id ? { ...cart, sl: cart.sl + 1 } : cart
        ));
    };

    const decrementQuantity = (id) => {
        setCarts(carts.map(cart => 
            cart.id === id ? { ...cart, sl: Math.max(0, cart.sl - 1) } : cart
        ));
    }; 

    const addCart = (cart) => {
        setCarts([
            ...carts, cart
        ])
    }

    const deleteCart = (id) => {
        setCarts([
            carts.filter(cart => cart.id !== id)
        ])
    }

    const checkExist = (id) => {
        return carts.some(cart => cart.id === id);
    }

    return (
        <CartContext.Provider value={{carts, addCart, deleteCart, updateQuantity, decrementQuantity, checkExist, resetQuantity, accountInSession, updateAccountInSession, resetAccountInSession }}>
            {children}
        </CartContext.Provider>
    )
}