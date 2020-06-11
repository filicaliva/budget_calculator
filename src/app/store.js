import { configureStore } from '@reduxjs/toolkit';
import counter from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    counter
  },
});
