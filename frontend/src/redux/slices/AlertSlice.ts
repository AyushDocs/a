import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'


const initialState = {
    color:'none',
    message: '',
    showAlert: false
}

const AlertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
  setAll:(state,action)=>{
   state.message=action.payload.message
   state.color=action.payload.color
   state.showAlert=true
  },
  unsetAll:(state)=>{
    state.message=''
    state.color=''
    state.showAlert=false
  }
  }
})

export const {setAll,unsetAll } = AlertSlice.actions
export const Alert = (state:RootState) => state.Alert;
export default AlertSlice.reducer;
