import Cookies from 'js-cookie'
import { useCallback, useState } from 'react'

export default function useCookie(key, defaultValue) {
    const [value, setValue] = useState(()=>{
        Cookies.set(key, defaultValue)
        return defaultValue
    })
    const updateCookies =useCallback((newValue,options) => {
            Cookies.set(key, newValue, options)
            setValue(newValue)
    },[key])
    const deleteCookies=useCallback(()=>{
    Cookies.remove(key)
    setValue(null)
    },[key])
    
    return [value,updateCookies,deleteCookies]
}
