import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IsUserAuthenticatedState {
   isAuth: boolean
}

const initialState: IsUserAuthenticatedState = {
  isAuth:false
}

const isUserAuthenticatedSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setUserAuthenticated:(state,action: PayloadAction<boolean>)=>{
      state.isAuth=action.payload
    }
  }
})

export const { setUserAuthenticated } = isUserAuthenticatedSlice.actions
export const selectCount = (state: RootState) => state.IsUserAuthenticated.isAuth;
export default isUserAuthenticatedSlice.reducer;
