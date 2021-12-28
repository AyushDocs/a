import React, { useState } from 'react';
interface Data{
showCheck:boolean,
setShowCheck: React.Dispatch<React.SetStateAction<boolean>>,
text:string,
setText:React.Dispatch<React.SetStateAction<string>>,
onComplete:()=>any,
setOnComplete:React.Dispatch<React.SetStateAction<()=>any>>,
timeToDisappear:number,
Close:boolean, 
setClose: React.Dispatch<React.SetStateAction<boolean>>,
setTimeToDisappear: React.Dispatch<React.SetStateAction<number>>,
Undo:boolean, 
setUndo: React.Dispatch<React.SetStateAction<boolean>>,
setUndoFalse:()=>any
}
export const AlertContext=React.createContext<Data|null>(null);

const AlertState:React.FC=({children})=>{
    const [showCheck,setShowCheck]=useState(false);
    const [text,setText]=useState<string>('');
    const [onComplete,setOnComplete]=useState(()=>()=>null);
    const [timeToDisappear,setTimeToDisappear]=useState(0);
    const [Undo, setUndo] = useState(false)
    const [Close, setClose] = useState(false)
    const setUndoFalse=()=>setUndo(false)
    const state:Data={
        showCheck,setShowCheck,text,setText,onComplete,setOnComplete,
        timeToDisappear,Close, setClose,setTimeToDisappear,Undo, setUndo,setUndoFalse
    }
    return(
    <AlertContext.Provider value={state}>
        {children}
    </AlertContext.Provider>
    )
}
 
export default AlertState;