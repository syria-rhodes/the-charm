import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        pickupDate: '',
        items: []    
    },
    reducers: {
        updateInfo: (state, action) => {
            state.firstname = action.payload.firstname;
            state.lastname = action.payload.lastname;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.pickupDate = action.payload.pickupDate;
            state.items = action.payload.items;
        },
    }
}); 

export const { updateInfo, cardInfo } = customerSlice.actions;
export default customerSlice.reducer;