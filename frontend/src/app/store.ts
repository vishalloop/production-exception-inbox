import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { exceptionsApi } from '@/features/exceptions/api/exceptionsApi'
import exceptionsUiReducer from '@/features/exceptions/slices/exceptionsUiSlice'

export const store = configureStore({
  reducer: {
    exceptionsUi: exceptionsUiReducer,
    [exceptionsApi.reducerPath]: exceptionsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(exceptionsApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
