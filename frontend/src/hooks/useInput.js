import { useState } from 'react'
export default function useInput(initialValue) {
    const [state, setState] = useState(initialValue)
    const bind={        
      onChange:e=>setState(e.target.value),
      value:state
    }
    const reset=()=>setState(initialValue)
    return [state,bind,reset]
}
