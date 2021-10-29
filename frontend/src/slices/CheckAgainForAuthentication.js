import { createSlice } from '@reduxjs/toolkit'
export const checkForAuthSlice = createSlice({
  name: 'checkForAuth',
  initialState: {
    value: false,
  },
  reducers: {
    setTrue: (state) => {
      state.value = true
    },
    setFalse: (state) => {
      state.value = false
    }
  },
})

export const { setTrue, setFalse} = checkForAuthSlice.actions

export default checkForAuthSlice.reducer