import React, { createContext, useState } from 'react'

export const AdminContext=createContext()

export default function AdminState(defaultProps){
const [props, setprops] = useState({})

    return (
       <AdminContext.Provider value={{props,setprops}}>
            {defaultProps.children}
       </AdminContext.Provider>
    )
}
