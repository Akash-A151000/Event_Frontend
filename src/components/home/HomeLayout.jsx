import React, { useState } from 'react';
import Title from './Title';
import AddNewTask from './AddNewTask';
import { useSelector } from 'react-redux';
import Tasks from './Tasks';
import TaskModal from '../utils/TaskModal';
const HomeLayout = ({ title, tasks }) => {
  const isLoading = useSelector((state) => state.task.isLoading);
  const [taskToUpdate, setTaskToUpdate] = useState(null);
  const handleUpdateTask = (task) => {
    setTaskToUpdate(task);
  };
  return (
    <>
      <div className='h-full md:col-span-7 lg:col-span-8 bg-card-bg rounded-lg border-2 border-border-color p-2 md:p-8  scrollbar-container'>
        <div className='flex flex-col'>
          <Title title={title} onUpdateTask={handleUpdateTask} />
          <div className='grid grid-cols-1 md:grid-cols-2  2xl:grid-cols-4 xl:grid-cols-3 gap-2 my-8 overflow-y-auto '>
            {!isLoading && (
              <Tasks tasks={tasks} onUpdateTask={handleUpdateTask} />
            )}
            <AddNewTask onUpdateTask={handleUpdateTask} />
          </div>
        </div>
      </div>
      <TaskModal
        mode={taskToUpdate ? 'update' : 'create'}
        taskToUpdate={taskToUpdate}
      />
    </>
  );
};

export default HomeLayout;
