import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface IsAuthenticatedState {
   isAuth: boolean
}

const initialState: IsAuthenticatedState = {
  isAuth:false
}

const isAuthenticatedSlice = createSlice({
  name: 'isAuth',
  initialState,
  reducers: {
    setAdminAuthenticated:(state,action: PayloadAction<boolean>)=>{
      state.isAuth=action.payload
    }
  }
})

export const { setAdminAuthenticated } = isAuthenticatedSlice.actions
export const selectCount = (state: RootState) => state.IsAdminAuthenticated.isAuth;
export default isAuthenticatedSlice.reducer;
