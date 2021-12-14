
export default function useLocalStorage<T>(initData:T,name:string) {
    if(!localStorage.getItem(name))
       localStorage.setItem(name, JSON.stringify(initData instanceof Function?initData():initData));
    const data:T=JSON.parse(localStorage.getItem(name)||"")||initData
    const setData=(newValue:T)=>{localStorage.setItem(name, JSON.stringify(newValue))}
    return [data,setData]
}
