
interface User{
   email:string,password:string
}
const ServerFetch=async(url:string,body:User|User[])=>{
   const options:any = {method: "POST",credentials:'include',headers:{"Content-Type": "application/json"},body:JSON.stringify(body)}
     return  fetch(`http://localhost:8080/api/auth/users/${url}`,options)
}

export const adminLogin=async(email:string, password:string)=>{
   const body=[{password, email}]
   const res=await ServerFetch('admin/login',body)
   const data=await res.json();
   if(data.success)setTimeout(() =>{adminLogin(email,password)},15*60*1000)
   return data
}
export const login=async(email:string, password:string)=>{
   const body={password, email}
   const res=await ServerFetch('login',body)
   const data=await res.json();
   if(data.success)setTimeout(() =>{login(email,password)},15*60*1000)
   return data
}
export const signup=async(email:string, password:string)=>{
   const body={password, email}
   const res=await ServerFetch('signup',body)
   const data=await res.json();
   if(data.success)setTimeout(() =>{signup(email,password)},15*60*1000)
   return data
}
export const logout=async()=>{
   const options:any={method: "POST",credentials:'include',headers:{"Content-Type": "application/json"}}
   const res=await fetch('http://localhost:8080/api/auth/users/logout',options)
   const data=await res.json()
   if(data.success){
      window.sessionStorage.removeItem('authenticated')
      window.sessionStorage.removeItem('userAuthenticated')
   }
   return data
}
export const isAuthenticated =()=>{
   const isAdminAuthenticated=window.sessionStorage.getItem('authenticated')
   const isUserAuthenticated=window.sessionStorage.getItem('userAuthenticated')
   return isAdminAuthenticated ||isUserAuthenticated
}