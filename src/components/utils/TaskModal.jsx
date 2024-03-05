import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setOpenModal,
  setCreateTask,
  setUpdatedTask,
  setLoading,
} from '../../state/tasks/tasksSlice';
import { taskSchema } from '../../schemas/task';
import toast from 'react-hot-toast';
import axios from 'axios';
const TaskModal = ({ mode, taskToUpdate }) => {
  const isOpenModal = useSelector((state) => state.task.openModal);
  const token = useSelector((state) => state.auth.token);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    end: '',
    completed: false,
  });
  const modalRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    if (mode === 'update' && taskToUpdate) {
      setFormData({
        title: taskToUpdate.title || '',
        description: taskToUpdate.description || '',
        end: taskToUpdate.end
          ? new Date(taskToUpdate.end).toISOString().split('T')[0]
          : '',
        completed: taskToUpdate.completed || false,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        end: '',
        completed: false,
      });
    }
  }, [mode, taskToUpdate]);

  const createTask = async () => {
    try {
      dispatch(setLoading());
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/user/tasks`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      dispatch(setCreateTask(res.data));
      dispatch(setOpenModal());
      dispatch(setLoading());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateTask = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_API_URL}/user/task/${taskToUpdate._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(setUpdatedTask(res.data));
      toast.success(res.data.message);
      dispatch(setOpenModal());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await taskSchema.validate(formData, { abortEarly: false });
      if (mode == 'create') {
        createTask();
      } else if (mode == 'update') {
        updateTask();
      }
    } catch (error) {
      toast.error('Missing required Fields');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked);
    setFormData({
      ...formData,
      completed: event.target.checked,
    });
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      dispatch(setOpenModal());
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpenModal && (
        <div className='fixed p-4 sm:p-0 top-0 left-0 w-full h-full flex items-center justify-center z-100 bg-black bg-opacity-45'>
          <div
            ref={modalRef}
            className='flex flex-col gap-5 p-4 sm:p-8 sm:w-3/5 md:w-3/5 lg:w-5/12 bg-card-bg rounded-lg w-full h-full '
          >
            <div>
              <p className='text-2xl font-semibold text-white'>
                {mode === 'create' ? 'Create a Task' : 'Update Task'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className='flex flex-col gap-3 '>
                <div className='flex flex-col gap-2 '>
                  <label htmlFor='' className='text-lg text-white'>
                    Title
                  </label>
                  <input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={(e) => handleChange(e)}
                    placeholder='e.g,Watch a video from Fireship'
                    className='w-full font-serif placeholder:text-sm text-sm text-input-text-color outline-none  p-3 bg-input-bg rounded-lg mt-2'
                  />
                </div>

                <div className='flex flex-col gap-2 '>
                  <label htmlFor='' className='text-lg text-white'>
                    Description
                  </label>
                  <textarea
                    type='text'
                    name='description'
                    value={formData.description}
                    onChange={(e) => handleChange(e)}
                    placeholder='e.g, Watch a video from Fireship'
                    className='w-full font-serif placeholder:text-sm text-sm text-input-text-color outline-none p-3 h-36 bg-input-bg rounded-lg resize-y scrollbar-container'
                  />
                </div>
                <div className='flex flex-col gap-2 '>
                  <label htmlFor='' className='text-lg text-white'>
                    End Date
                  </label>
                  <input
                    type='date'
                    name='end'
                    value={formData.end}
                    onChange={(e) => handleChange(e)}
                    placeholder='e.g, Watch a video from Fireship'
                    className='w-full font-serif placeholder:text-sm text-sm text-input-text-color outline-none p-3  bg-input-bg rounded-lg '
                  />
                </div>
                <div className='flex flex-row justify-between'>
                  <label htmlFor='' className='text-lg text-white'>
                    Toggle Completed
                  </label>
                  <input
                    type='checkbox'
                    onChange={(e) => handleCheckboxChange(e)}
                    checked={formData.completed}
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    className='bg-create-task rounded-lg text-white p-2'
                  >
                    {mode === 'create' ? 'Create Task' : 'Update Task'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
