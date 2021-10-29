import React from 'react'
import loading from '../../media/loading.gif'

const Spinner = ()=> {
   return (
       <div className="text-center">
           <img className="my-3 spinner" src={loading} alt="loading" />
       </div>
   )
}

export default Spinner