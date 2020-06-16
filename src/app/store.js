import { configureStore } from '@reduxjs/toolkit';
import main from '../features/counter/counterSlice';

export default configureStore({
  reducer: {
    main
  },
});
