import { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorageContext } from "./LocalStorageContext";
import { useAddItemToCart, useRemoveItemFromCart, useCart } from "../hooks/useCartApi";
import { useAuthContext } from './useAuthContext';
import debounce from 'lodash.debounce';

const CartContext = createContext({
    cartProducts: null,
    setCartProducts: () => { },
    addProductToCart: () => { },
    removeProductFromCart: () => { },
    deleteProductFromCart: () => { },
    isProductInCart: () => { },
    getProductQuantity: () => { },
});

export const CartContextProvider = ({ children }) => {
    const { addProduct, removeProduct, products, deleteProduct } = useLocalStorageContext();
    const { user, isAuth } = useAuthContext();
    const { data: cartProductsFromDatabase, isLoading: isProductLoading, refetch: refetchProduct } = useCart(user?._id);

    const addItemToCartMutation = useAddItemToCart();
    const removeFromCartMutation = useRemoveItemFromCart();

    const [cartProducts, setCartProducts] = useState([]);

    useEffect(() => {
        if (isAuth && cartProductsFromDatabase) {
            setCartProducts(cartProductsFromDatabase.items);
        } else {
            console.log(products)
            setCartProducts(products);
        }
    }, [cartProductsFromDatabase, isAuth, products]);

    const addProductToCart = async (product) => {
        const productPrice = product.price - product.discount.amount;
        let formatProduct = {
            product,
            quantity: 1,
            price: productPrice,
        };

        if (isProductInCart(product._id)) {
            setCartProducts((prevCartProducts) =>
                prevCartProducts.map((prevProduct) => {
                    if (product._id === prevProduct.product._id) {
                        return {
                            ...prevProduct,
                            quantity: prevProduct.quantity + 1,
                        };
                    } else {
                        return prevProduct;
                    }
                })
            );
        } else {
            setCartProducts((prevCartProducts) => [...prevCartProducts, formatProduct]);
        }

        if (isAuth) {
            addItemToCartMutation.mutate(
                { userId: user._id, productId: product._id, quantity: 1, price: productPrice },
                {
                    onError: () => {
                        // Revert state update if mutation fails
                        setCartProducts((prevCartProducts) =>
                            prevCartProducts.map((prevProduct) => {
                                if (product._id === prevProduct.product._id) {
                                    return {
                                        ...prevProduct,
                                        quantity: prevProduct.quantity - 1,
                                    };
                                } else {
                                    return prevProduct;
                                }
                            })
                        );
                    },
                }
            );
        } else {
            addProduct(formatProduct);
        }
    };

    const removeProductFromCart = async (product) => {
        const productPrice = product.price - product.discount.amount;

        if (isProductInCart(product._id)) {
            setCartProducts((prevCartProducts) =>
                prevCartProducts.map((prevProduct) => {
                    if (product._id === prevProduct.product._id) {
                        return {
                            ...prevProduct,
                            quantity: prevProduct.quantity - 1,
                        };
                    } else {
                        return prevProduct;
                    }
                })
            );
        }

        if (isAuth) {
            addItemToCartMutation.mutate(
                { userId: user._id, productId: product._id, quantity: -1, price: productPrice },
                {
                    onError: () => {
                        setCartProducts((prevCartProducts) =>
                            prevCartProducts.map((prevProduct) => {
                                if (product._id === prevProduct.product._id) {
                                    return {
                                        ...prevProduct,
                                        quantity: prevProduct.quantity + 1,
                                    };
                                } else {
                                    return prevProduct;
                                }
                            })
                        );
                    },
                }
            );
        } else {
            removeProduct(product._id);
        }
    };

    const deleteProductFromCart = (product) => {
        if (isProductInCart(product._id)) {
            setCartProducts((prevCartProducts) => prevCartProducts.filter((item) => item.product._id !== product._id));
        }

        if (isAuth) {
            removeFromCartMutation.mutate(
                { userId: user._id, productId: product._id },
                {
                    onSuccess: () => {
                        // refetchProduct(); // Refetch the cart products
                    },
                }
            );
        } else {
            deleteProduct(product._id);
        }
    };

    const isProductInCart = (productId) => {
        if (cartProducts) {
            return cartProducts.some((item) => item.product._id === productId);
        } else {
            return false;
        }
    };

    const getProductQuantity = (productId) => {
        console.log(productId)
        let product = cartProducts.find((item) => item.product._id === productId)
        console.log(product.quantity)
        return product.quantity

    }
    
    return (
        <CartContext.Provider value={{
            cartProducts,
            setCartProducts,
            addProductToCart,
            removeProductFromCart,
            deleteProductFromCart,
            isProductInCart,
            getProductQuantity,
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);
