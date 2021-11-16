import { ChangeEvent, useState } from 'react'
export default function useInput(initialValue:any) {
    const [state, setState] = useState(initialValue)
    const bind={        
      onChange:(e:ChangeEvent<HTMLInputElement>)=>setState(e.target.value),
      value:state
    }
    const reset=()=>setState(initialValue)
    return [state,bind,reset]
}
