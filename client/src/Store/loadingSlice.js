import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'mentor',
    initialState,
    reducers: {

        setLoading: (state, action) => {
            const loading = action.payload;
            state.loading = loading;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLoading } = loadingSlice.actions

export default loadingSlice.reducer