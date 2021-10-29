import { createSlice } from '@reduxjs/toolkit'

const authModalSlice = createSlice({
  name: 'authModal',
  initialState: {
    value: false
  },
  reducers: {
    toggle: state => {
      state.value =!state.value
    }
  }
})

export const { toggle } = authModalSlice.actions
export default authModalSlice.reducer
