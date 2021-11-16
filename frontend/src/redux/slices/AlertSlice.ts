import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface AlertState  {
    Stage: string
    message: string
    showAlert: boolean
}

const initialState: AlertState = {
    Stage:'none',
    message: '',
    showAlert: false
}

const AlertSlice = createSlice({
  name: 'Alert',
  initialState,
  reducers: {
  setAll:(state,action: PayloadAction<AlertState>)=>{
   state.message=action.payload.message
   state.Stage=action.payload.Stage
   state.showAlert=action.payload.showAlert
  },
  unsetAll:(state)=>{
    state.message=''
    state.Stage=''
    state.showAlert=false
  }
  }
})

export const {setAll,unsetAll } = AlertSlice.actions
export const Alert = (state: RootState) => state.Alert;
export default AlertSlice.reducer;
