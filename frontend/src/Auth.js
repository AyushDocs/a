import Cookies from 'js-cookie'
const storeInStorage=(toStore)=>Cookies.set('login',toStore)
const retrieveFromStorage=()=>Cookies.get('login')
const ServerFetch=async(url,body)=>{
   const storage=retrieveFromStorage()
   let jwt=storage?.token ||''
    if(new Date(storage?.timeOfExpiration)>new Date()) jwt=''
   const headers={ "Content-Type": "application/json",Authorization:jwt}
   const options = {method: "POST",headers,body:JSON.stringify(body)}
   const res=await fetch(`http://localhost:8080/api/users/${url}`,options)
   const data=await res.json()
   return data;
}

export const login=async(email, password)=>{
   const body=[{password: password, email: email}]
   const data=await ServerFetch('login',body)
   return new Promise((resolve, reject)=>{
     if(data.hasError===true)resolve(false)
     storeInStorage({email,token:data.jwt,timeOfExpiration:data.timeOfExpiration})
     resolve(true)
   })  
}
export const isAuthenticated =async()=>{
  const loginStorage=retrieveFromStorage()
  return new Promise((resolve, reject)=>{
      if(loginStorage==null) resolve(false)
      if(loginStorage.token==null)resolve(false)
      if(new Date(loginStorage?.timeOfExpiration)<new Date()) resolve(false)
      ServerFetch('exists',{})
      .then(data=>resolve(data.exists))
  })
}