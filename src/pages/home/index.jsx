import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/utils/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks, setLoading } from '../../state/tasks/tasksSlice';
import toast from 'react-hot-toast';

import HomeLayout from '../../components/home/HomeLayout';

const Home = () => {
  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.task.tasks);
  const isLoading = useSelector((state) => state.task.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      dispatch(setLoading());
      const tasks = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/user/tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTasks(tasks.data));

      dispatch(setLoading());
    } catch (error) {
      dispatch(setLoading());
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className='h-full md:col-span-7 lg:col-span-8 bg-card-bg rounded-lg border-2 border-border-color p-2 md:p-8  scrollbar-container'>
          <Spinner isHome={true} />
        </div>
      ) : (
        <HomeLayout title={'All Tasks'} tasks={tasks} />
      )}
    </>
  );
};

export default Home;
