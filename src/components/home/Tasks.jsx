import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';

const Tasks = ({ tasks, onUpdateTask }) => {
  return (
    <>
      {tasks.map(({ _id, user, title, description, end, completed }) => (
        <Task
          key={_id}
          _id={_id}
          user={user}
          title={title}
          description={description}
          end={end}
          completed={completed}
          onUpdateTask={onUpdateTask}
        />
      ))}
    </>
  );
};

export default Tasks;
