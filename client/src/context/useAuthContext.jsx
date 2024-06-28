import { createContext, useContext, useEffect, useState } from "react";
import { checkToken, login, logout as _logout } from "../api/authApi";
import { useMutation } from 'react-query'
import { addItemToLocalStorage, getItemToLocalStorage } from "../helpers/localStorageHelper";

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    loginMutation: () => { },
    logout: () => { },
    isAuth: null,
    loadingAuth: null,
})

export const AuthContextProvider = ({ children }) => {
    const [user, _setUser] = useState(() => {
        const userLocalStorage = getItemToLocalStorage('USER')
        return JSON.parse(userLocalStorage);
    })

    const [isAuth, setIsAuth] = useState()
    const [loadingAuth, setLoadingAuth] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingAuth(true)
                const response = await checkToken()
                setIsAuth(true)
            } catch (error) {
                setIsAuth(false)
            } finally {
                setLoadingAuth(false)
            }
        }
        fetchData()
    }, [user])

    const logout = () => {
        _logout()
        setIsAuth(false)
    }

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
            loginMutation,
            logout,
            isAuth,
            loadingAuth,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
