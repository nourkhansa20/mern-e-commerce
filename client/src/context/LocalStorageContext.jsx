import { createContext, useContext, useState } from "react";
import { addProductToLocalStorageCart, checkIfProductInLocalStorageCart, deleteProductFromLocalStorageCart, getAllCartItemsFromLocalStorage, getProductQuantityFromLocalStorage, removeProductToLocalStorageCart, clearProductCartFromLocalStorage } from "../helpers/localStorageHelper";

const LocalStorageContext = createContext({
  products: null,
  removeProduct: () => { },
  addProduct: () => { },
  isProductExist: () => { },
  getProductQuantity: () => { },
  deleteProduct: () => { },
  clearCart: () => { },
})

export const LocalStorageContextProvider = ({ children }) => {

  const [products, setProducts] = useState(
    getAllCartItemsFromLocalStorage()
  )

  const removeProduct = (product_id) => {
    const cartProduct = removeProductToLocalStorageCart(product_id)
    setProducts(cartProduct)
  }

  const deleteProduct = (product_id) => {
    const cartProduct = deleteProductFromLocalStorageCart(product_id)
    setProducts(cartProduct)
  }

  const addProduct = (product) => {
    const cartProduct = addProductToLocalStorageCart(product)
    setProducts(cartProduct)
  }

  const getProductQuantity = (product_id) => {
    return getProductQuantityFromLocalStorage(product_id)
  }

  const isProductExist = (product_id) => {
    return checkIfProductInLocalStorageCart(product_id)
  }

  const clearCart = () => {
    clearProductCartFromLocalStorage()
  }

  return (
    <LocalStorageContext.Provider value={{
      products,
      removeProduct,
      addProduct,
      isProductExist,
      getProductQuantity,
      deleteProduct,
      clearCart
    }}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export const useLocalStorageContext = () => useContext(LocalStorageContext)
