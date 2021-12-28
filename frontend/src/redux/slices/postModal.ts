import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
interface state{
  value:boolean
}
const initialState:state ={
  value: false
}

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    toggle: (state) =>{state.value =!state.value}
  }
})

export const { toggle } = postModalSlice.actions
export const selectCount = (state:RootState) => state.postModal.value
export default postModalSlice.reducer