import React, { useContext, useEffect } from 'react';
import { AlertContext } from '../../context/AlertContext';
export default function Check() {
    const context = useContext(AlertContext);
    useEffect(() => {
    let id: NodeJS.Timeout|undefined=undefined;
    if(!context?.Undo &&!context?.Close){
        //open and not undo
        id=setTimeout(() =>{
            context?.setShowCheck(false)
            context?.onComplete();
        },context?.timeToDisappear)
    }
    if(context?.Close && id!==undefined){
       clearTimeout(id)
       context?.setShowCheck(false)
       context?.onComplete();
    }
    if(context?.Undo && id!==undefined){
        clearTimeout(id)
        context?.setShowCheck(false)
    }
    return()=>{
        context?.setClose(false)
        if(id!==undefined)clearTimeout(id)
    }
    },[context])
    if (!context?.showCheck) return null;
    return (
        <div className='are-you-sure py-2'>
            <span className='mx-2'>{context?.text}</span>
            <button className='btn btn-sm check-btn text-primary'onClick={() => context?.setUndo(true)}> Undo</button>
            <button className='btn btn-sm text-light'onClick={() =>context?.setClose(true)}>X</button>
        </div>
    );
}