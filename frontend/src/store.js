import { configureStore } from '@reduxjs/toolkit'
import authModal from './slices/authModal'
import checkForAuth from './slices/CheckAgainForAuthentication'
import postModal from './slices/postModal'
export default configureStore({
  reducer: {
    authModal,checkForAuth,postModal
  },
})
