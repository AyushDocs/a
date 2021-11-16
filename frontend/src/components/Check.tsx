import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../context/AlertContext';
export default function Check() {
    const {showCheck,text,onComplete,timeToDisappear,setShowCheck,Undo,Close,setUndo,setClose} = useContext(AlertContext);
    useEffect(() => {
    let id: NodeJS.Timeout;
    if(!Undo &&!Close){
        console.log('negative executed');
        
        id=setTimeout(() =>{
            setShowCheck(false)
            onComplete();
        },timeToDisappear)
    }
    if(Close){
        console.log('close executed');
        clearTimeout(id)
        setShowCheck(false)
        onComplete();
    }
    if(Undo){
        console.log('undo executed');
        clearTimeout(id)
        setShowCheck(false)
    }
    return()=>{
        setClose(false)
        clearTimeout(id)
    }
    },[Close, Undo, onComplete, setClose, setShowCheck, setUndo, timeToDisappear])
    if (!showCheck) return null;
    return (
        <div className='are-you-sure py-2'>
            <span className='mx-2'>{text}</span>
            <button className='btn btn-sm check-btn text-primary'onClick={() => setUndo(true)}> Undo</button>
            <button className='btn btn-sm text-light'onClick={() => setClose(true)}>X</button>
        </div>
    );
}