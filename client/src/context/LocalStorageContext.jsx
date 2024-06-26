import { createContext, useContext, useState } from "react";
import { addProductToLocalStorageCart, checkIfProductInLocalStorageCart, deleteProductFromLocalStorageCart, getAllCartItemsFromLocalStorage, getProductQuantityFromLocalStorage, removeProductToLocalStorageCart } from "../helpers/localStorageHelper";

const LocalStorageContext = createContext({
  products: null,
  removeProduct: () => { },
  addProduct: () => { },
  isProductExist: () => { },
  getProductQuantity: () => { },
  deleteProduct: () => { },
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

  return (
    <LocalStorageContext.Provider value={{
      products,
      removeProduct,
      addProduct,
      isProductExist,
      getProductQuantity,
      deleteProduct,
    }}>
      {children}
    </LocalStorageContext.Provider>
  )
}

export const useLocalStorageContext = () => useContext(LocalStorageContext)
