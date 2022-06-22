import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name:'state',
    initialState:{state:{}},
    reducers: {
        DEFAULT: (state, action) => {
            return {...state, data:action.payload}
        }
    }
})

export const { DEFAULT } = mainSlice.actions; 

export default mainSlice.reducer;