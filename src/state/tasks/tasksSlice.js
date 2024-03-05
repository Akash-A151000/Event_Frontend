import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
  completedTasks: [],
  isLoading: false,
  openModal: false,
};

const tasksSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    setLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
    setOpenModal: (state) => {
      state.openModal = !state.openModal;
    },
    setTask: (state, action) => {
      const updateCompletedTasks = state.completedTasks.filter((task) => {
        return task._id !== action.payload.task._id;
      });
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action.payload.task._id) return action.payload.task;
        return task;
      });
      state.tasks = updatedTasks;
      state.completedTasks = updateCompletedTasks;
    },
    setcompletedTasks: (state, action) => {
      state.completedTasks = action.payload.completedTasks;
    },
    setCreateTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload.task];
    },
    setDeleteTask: (state, action) => {
      const updatedTasks = state.tasks.filter((task) => {
        return task._id !== action.payload.id;
      });
      state.tasks = updatedTasks;
    },
    setUpdatedTask: (state, action) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task._id === action.payload.task._id) return action.payload.task;
        return task;
      });
      state.tasks = updatedTasks;
    },
    setClear: (state) => {
      state.tasks = [];
      state.completedTasks = [];
      state.isLoading = false;
      state.openModal = false;
    },
  },
});

export default tasksSlice.reducer;
export const {
  setTasks,
  setLoading,
  setTask,
  setcompletedTasks,
  setOpenModal,
  setCreateTask,
  setDeleteTask,
  setUpdatedTask,
  setClear,
} = tasksSlice.actions;
