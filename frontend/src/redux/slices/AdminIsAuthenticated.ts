import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
interface state{
  isAuth:boolean
}
const initialState:state= {
  isAuth:false
}

const isAuthenticatedSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setAdminAuthenticated:(state,action)=>{
      state.isAuth=action.payload
    }
  }
})

export const { setAdminAuthenticated } = isAuthenticatedSlice.actions
export const selectCount = (state:RootState) => state.IsAdminAuthenticated.isAuth;
export default isAuthenticatedSlice.reducer;
