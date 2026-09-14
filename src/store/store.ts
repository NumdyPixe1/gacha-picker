import { configureStore } from '@reduxjs/toolkit'
import gachaReducer from './slices/gacha/gachaSlices'

const store = configureStore({
    reducer: { gacha: gachaReducer }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;