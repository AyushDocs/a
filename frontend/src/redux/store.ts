import { configureStore } from '@reduxjs/toolkit'
import IsAdminAuthenticated from './slices/AdminIsAuthenticated'
import Alert from './slices/AlertSlice'
import postModal from './slices/postModal'
import IsUserAuthenticated from './slices/UserIsAuthenticated'
const store=configureStore({
  reducer: {
    IsAdminAuthenticated,postModal,IsUserAuthenticated,Alert
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export default store