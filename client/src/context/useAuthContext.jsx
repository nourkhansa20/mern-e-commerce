import { createContext, useContext, useState } from "react";
import { login } from "../api/authApi";
import { useMutation } from 'react-query'
import { addItemToLocalStorage, getItemToLocalStorage } from "../helpers/localStorageHelper";

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    loginMutation: () => { },
})

export const AuthContextProvider = ({ children }) => {

    const [user, _setUser] = useState(() => {
        const userLocalStorage = getItemToLocalStorage('USER')
        return JSON.parse(userLocalStorage);
    })

    const [token, _setToken] = useState(getItemToLocalStorage('ACCESS_TOKEN'))

    const loginMutation = useMutation(login)

    const setUser = (user) => {
        _setUser(user)
        const userString = JSON.stringify(user);
        addItemToLocalStorage('USER', userString)
    }

    const setToken = (token) => {
        _setToken(token)
        addItemToLocalStorage('ACCESS_TOKEN', token)
    }

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            loginMutation
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
