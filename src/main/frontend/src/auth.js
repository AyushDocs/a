class Auth {
  login(email, password, cb){
  const body =JSON.stringify([{password: password, email: email}])
  const headers={ "Content-Type": "application/json"}
  const config = {method: "post",headers,body}
   fetch("/api/users/firstLogin", config)
   .then(res=>res.json())
   .then(data=>{
     if(data.hasOwnProperty("hasError"))return cb(true)
    const toStore={email:email,token:data.jwt,timeOfExpiration:data.timeOfExpiration}
    localStorage.setItem("login",JSON.stringify(toStore))
    cb(false)
   })
  }

  isAuthenticated() {
    const login=JSON.parse(localStorage.getItem("login"))
    if (!login || login.timeOfExpiration<Date.now()) return false
    const token = login.token;
    const headers={ "Content-Type": "application/json" ,Authorization:token}
    const config = {method: "post",headers}
    const exists=fetch('/api/users/exists',config)
    .then(res => res.json())
    .then(data=>data.exists)
    return exists
  }
}
export default new Auth();
