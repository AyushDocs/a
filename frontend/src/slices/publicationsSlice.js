import { createSlice } from '@reduxjs/toolkit';

const publications = createSlice({
  name: "publications",
  initialState: {
    value: []
  },
  reducers: {
    getThree:async(state)=>{
        const res=await fetch()
        const data=await res.json()
        state.data=data
        return state.data
    }
  }
})

export const { toggle } = publications.actions
export default publications.reducer
