import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setcompletedTasks } from '../../state/tasks/tasksSlice';
import HomeLayout from '../../components/home/HomeLayout';
import axios from 'axios';
import Spinner from '../../components/utils/Spinner';
const index = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const completedTasks = useSelector((state) => state.task.completedTasks);
  const isLoading = useSelector((state) => state.task.isLoading);
  useEffect(() => {
    getCompletedTasks();
  }, []);

  const getCompletedTasks = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_API_URL}/user/tasks/completed`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setcompletedTasks(res.data));
      dispatch(setLoading());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {isLoading ? (
        <div className='h-full md:col-span-7 lg:col-span-8 bg-card-bg rounded-lg border-2 border-border-color p-2 md:p-8  scrollbar-container'>
          <Spinner />
        </div>
      ) : (
        <HomeLayout title={'Completed'} tasks={completedTasks} />
      )}
    </>
  );
};

export default index;
