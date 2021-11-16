import React, { useState } from 'react';

export const AlertContext=React.createContext(undefined);

const AlertState=(props)=>{
    const [showCheck,setShowCheck]=useState<boolean>(false);
    const [text,setText]=useState<string>('');
    const [onComplete,setOnComplete]=useState<()=>any>(()=>()=>null);
    const [timeToDisappear,setTimeToDisappear]=useState<number>(0);
    const [Undo, setUndo] = useState<boolean>(false)
    const [Close, setClose] = useState<boolean>(false)
    const setUndoFalse=()=>setUndo(false)
    const state={
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