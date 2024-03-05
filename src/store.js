import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/state/auth/authSlice';
import taskReducer from '../src/state/tasks/tasksSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export default store;
