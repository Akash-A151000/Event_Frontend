import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import {
  setTask,
  setDeleteTask,
  setOpenModal,
} from '../../state/tasks/tasksSlice';
import toast from 'react-hot-toast';

const Task = ({
  _id,
  user,
  title,
  description,
  end,
  completed,
  onUpdateTask,
}) => {
  const dateObject = new Date(end);
  const formattedDate = format(dateObject, 'dd/MM/yyyy');
  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const handleUpdateClick = () => {
    onUpdateTask({ _id, user, title, description, end, completed });
    dispatch(setOpenModal());
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_REACT_API_URL}/user/tasks/task/${_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      dispatch(setDeleteTask({ id: _id }));
      toast.error(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleClick = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/user/task/complete/${_id}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setTask(res.data));
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className='border-2 border-task-card-border rounded-md p-2 h-44 bg-task-card-color'>
        <div>
          <p className='text-title-color max-lines-1 text-2xl font-sans font-semibold'>
            {title}
          </p>
        </div>
        <div>
          <p className='max-lines-3 font-serif h-16 text-des-color font-thin text-sm'>
            {description}
          </p>
        </div>
        <div className='text-title-color font-sans font-semibold text-sm'>
          {formattedDate}
        </div>
        <div className='flex justify-between mt-1'>
          <div>
            {completed ? (
              <>
                <button
                  className='h-7 px-3 text-sm text-com-incom-color bg-completed-color rounded-full'
                  onClick={() => handleClick()}
                >
                  completed
                </button>
              </>
            ) : (
              <>
                <button
                  className='h-7 px-3 text-sm text-com-incom-color bg-incomplete-color rounded-full'
                  onClick={() => handleClick()}
                >
                  incomplete
                </button>
              </>
            )}
          </div>
          <div className='flex gap-3 justify-center items-center'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                className='w-5 h-5 text-icon-color hover:cursor-pointer'
                onClick={handleUpdateClick}
              >
                <path d='m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z' />
                <path d='M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z' />
              </svg>
            </div>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                onClick={handleDelete}
                className='w-5 h-5 text-icon-color hover:text-incomplete-color hover:cursor-pointer'
              >
                <path
                  fillRule='evenodd'
                  d='M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;
