import { createSlice } from '@reduxjs/toolkit';

const postModalSlice = createSlice({
  name: "postModal",
  initialState: {
    value: false
  },
  reducers: {
    toggle: (state) =>{console.log('toggling');state.value =!state.value}
  }
})

export const { toggle } = postModalSlice.actions
export default postModalSlice.reducer
