import React from 'react';
import { useDispatch } from 'react-redux';
import { setOpenModal } from '../../state/tasks/tasksSlice';
import TaskModal from '../utils/TaskModal';

const Title = ({ title, onUpdateTask }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    onUpdateTask(null);
    dispatch(setOpenModal());
  };
  return (
    <>
      <div className='flex  justify-between'>
        <div className='flex flex-col'>
          <h1 className='h1-style text-title-color text-2xl sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-2xl font-bold'>
            {title}
          </h1>
          <div className='line-after-h1'></div>
        </div>
        <div>
          <button
            onClick={() => handleClick()}
            className='text-white font-bold flex justify-center items-center w-10 h-10  bg-add-color border-border-color border-2 rounded-full'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='w-6 h-6'
            >
              <path
                fillRule='evenodd'
                d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
                clipRule='evenodd'
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Title;
