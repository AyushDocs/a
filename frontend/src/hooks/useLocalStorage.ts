
export default function useLocalStorage<T>(name:string,initData:T) {
    if(!localStorage.getItem(name))
       localStorage.setItem(name, JSON.stringify(initData instanceof Function?initData():initData));
    const data=JSON.parse(localStorage.getItem(name))||initData
    const setData=(newValue:T)=>{localStorage.setItem(name, JSON.stringify(newValue))}
    return [data,setData]
}
