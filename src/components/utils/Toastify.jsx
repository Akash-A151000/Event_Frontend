import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Toastify = () => {
  const notify = () => toast.success('Wow so easy!');
  return (
    <div>
      <button onClick={notify}>Notify!</button>
      <ToastContainer />
    </div>
  );
};

export default Toastify;
