import { createSlice } from "@reduxjs/toolkit";


const itemSlice = createSlice({
    name: 'itemID',
    initialState: {
        id: 0
    },
    reducers: {
        increaseID: (state) => {
            state.id += 1
        }
    }
})

export const { increaseID } = itemSlice.actions;
export default itemSlice.reducer;