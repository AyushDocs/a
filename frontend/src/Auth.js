const ServerFetch=async(url,body)=>{
   const headers={ "Content-Type": "application/json"}
   const options = {method: "POST",headers,body:JSON.stringify(body)}
   const res=await fetch(`/api/users/${url}`,options)
   return res;
}

export const adminLogin=async(email, password)=>{
   const body=[{password, email}]
   const res=await ServerFetch('/admin/login',body)
   const data=await res.json()
   return new Promise((resolve, reject)=>{
     if(data.hasError===true)resolve(false)
     resolve(true)
   })  
}
export const login=async(email, password,username)=>{
   const body={password, email,username}
   const res=await ServerFetch('/login',body)
   return new Promise((resolve, reject)=>res.status==403?resolve(false):resolve(true))  
}
export const signup=async(email, password)=>{
   const body={password, email}
   const res=await ServerFetch('/signup',body)
   return new Promise((resolve, reject)=>res.status==403?resolve(false):resolve(true))
}