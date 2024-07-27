import { createContext, useContext, useEffect, useState } from "react";
import { checkToken, login, logout as _logout } from "../api/authApi";
import { useMutation } from 'react-query'
import { addItemToLocalStorage, getItemToLocalStorage } from "../helpers/localStorageHelper";
import { useUser } from "../hooks/useUserApi";

const AuthContext = createContext({
    user: null,
    setUser: () => { },
    token: null,
    setToken: () => { },
    loginMutation: () => { },
    logout: () => { },
    refetchUser: () => { },
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

    const { data: refetchedUser, refetch: _refetchUser } = useUser(user?._id || '')
    const [trigger, setTrigger] = useState(false);


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
        setUser('')
        setToken('')
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

    const refetchUser = async () => {
        await _refetchUser()
        setTrigger(prev => !prev);
        console.log(refetchedUser)
    }

    useEffect(() => {
        if (trigger) {
            setUser(refetchedUser)
            setTrigger(false);
        }
    }, [trigger])

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
            refetchUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)
