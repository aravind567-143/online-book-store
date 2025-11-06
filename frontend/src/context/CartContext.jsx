import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Load cart from localStorage on initial render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('bookstore-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('bookstore-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (book) => {
    const existingItem = cart.find(item => item.id === book.id);
    
    if (existingItem) {
      // If book already in cart, increase quantity
      setCart(cart.map(item =>
        item.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new book with quantity 1
      setCart([...cart, { ...book, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};
