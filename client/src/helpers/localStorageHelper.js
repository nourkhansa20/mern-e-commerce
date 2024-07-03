export function getAllCartItemsFromLocalStorage() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart;
}

export function addProductToLocalStorageCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item._id === product._id);

    if (productIndex !== -1) {
        cart[productIndex].quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart

}

export function removeProductToLocalStorageCart(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item._id === product_id);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        } else {
            cart.splice(productIndex, 1);
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart
}

export function deleteProductFromLocalStorageCart(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item._id === product_id);
    cart.splice(productIndex, 1);

    localStorage.setItem('cart', JSON.stringify(cart));
    return cart
}

export function checkIfProductInLocalStorageCart(product_id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.some(item => item._id === product_id);
}

export function getProductQuantityFromLocalStorage(product_id) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = cart.find(item => item._id === product_id);
    return product ? product.quantity : 0;
}

export function addItemToLocalStorage(place, item) {
    localStorage.setItem(place, item);
}

export function getItemToLocalStorage(place) {
    return localStorage.getItem(place);
}

