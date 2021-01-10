import {useCallback, useState, useEffect} from 'react'

const storageName = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((jwtToken, id) => {
        console.log("login...")
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({userId: id, token: jwtToken}))
    }, [])

    const logout = useCallback(() => {
        console.log("logout...")
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    }, [])

    useEffect(()=>{
        console.log("storage name: ", storageName)
        const data = JSON.parse(localStorage.getItem(storageName))
        console.log("data from storage: ", data)
        console.log("data.token from storage: ", data.token)
        if(data && data.token){
            login(data.token && data.userId)
        }
        setReady(true)
    }, [login])

    return {login, logout, token, userId, ready}
}
