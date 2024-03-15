import { configureStore } from '@reduxjs/toolkit';
import mentorSlice from './mentorSlice';
import studentSlice from './studentSlice';
import loadingSlice from './loadingSlice';

export const store = configureStore({
  reducer: {
    mentorSlice,
    studentSlice,
    loadingSlice
  },
})