import React, { useState } from 'react';

interface TypeOfExport{
    showCheck:boolean
    setShowCheck:React.Dispatch<React.SetStateAction<boolean>>
    text:string
    setText:React.Dispatch<React.SetStateAction<string>>
    onComplete:()=>any
    setOnComplete:React.Dispatch<React.SetStateAction<() => any>>
    timeToDisappear:number
    Close:boolean
    setClose: React.Dispatch<React.SetStateAction<boolean>>
    setTimeToDisappear:React.Dispatch<React.SetStateAction<number>>
    Undo:boolean
    setUndo:React.Dispatch<React.SetStateAction<boolean>>
    setUndoFalse:()=>void
}

export const AlertContext=React.createContext<TypeOfExport|null>(null);

const AlertState:React.FC=props=>{
    const [showCheck,setShowCheck]=useState<boolean>(false);
    const [text,setText]=useState<string>('');
    const [onComplete,setOnComplete]=useState<()=>any>(()=>()=>null);
    const [timeToDisappear,setTimeToDisappear]=useState<number>(0);
    const [Undo, setUndo] = useState<boolean>(false)
    const [Close, setClose] = useState<boolean>(false)
    const setUndoFalse=()=>setUndo(false)
    const state:TypeOfExport={
        showCheck,setShowCheck,text,setText,onComplete,setOnComplete,
        timeToDisappear,Close, setClose,setTimeToDisappear,Undo, setUndo,setUndoFalse
    }
    return(
    <AlertContext.Provider value={state}>
        {props.children}
    </AlertContext.Provider>
    )
}
 
export default AlertState;