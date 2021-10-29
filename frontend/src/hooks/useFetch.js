import { useEffect, useState } from 'react'

export default function useFetch(url='', options=null) {
    const [Data, setData] = useState(null)
    const [Error, setError] = useState(null)
    const [Loading, setLoading] = useState(false)
    useEffect(() => {
        let isMounted=true
        setLoading(true)
        fetch(url, options)
        .then(res=>{
        if(isMounted){
         setData(res.json())
         setError(null)   
        }   
        })
        .catch(err =>{
        if(isMounted){
         setError(err)
         setData(null)
        }  
        })
        .finally(()=>isMounted&&setLoading(false))
        return () =>isMounted=false
    }, [url,options])
    return [Loading,Data,Error]
}
