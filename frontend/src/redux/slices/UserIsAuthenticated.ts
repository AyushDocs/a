import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
interface state{
  isAuth:boolean
}
const initialState:state= {
  isAuth:false
}

const isUserAuthenticatedSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setUserAuthenticated:(state,action)=>{
      state.isAuth=action.payload
    }
  }
})

export const { setUserAuthenticated } = isUserAuthenticatedSlice.actions
export const selectCount = (state:RootState) => state.IsUserAuthenticated.isAuth;
export default isUserAuthenticatedSlice.reducer;