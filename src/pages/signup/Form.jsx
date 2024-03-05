import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { registerSchema } from '../../schemas/auth';

const Form = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const validateField = async (name, value) => {
    try {
      await registerSchema.validateAt(name, { [name]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined }));
    } catch (error) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error.message }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (touched[e.target.name]) {
      validateField(e.target.name, e.target.value);
    }
  };

  const register = async () => {
    try {
      const registerResponse = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/auth/register`,
        formData
      );
      const res = await registerResponse.data;
      toast.success(res.message);

      setFormData({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      });
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerSchema.validate(formData, { abortEarly: false });
      register();
    } catch (validationErrors) {
      const errorsObject = {};
      validationErrors.inner.forEach((error) => {
        errorsObject[error.path] = error.message;
        setTouched((prevTouched) => ({ ...prevTouched, [error.path]: true }));
      });
      setErrors(errorsObject);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className='bg-grey-form w-full md:w-3/5 lg:w-2/5 rounded-2xl  px-10 py-5'>
        <div className='text-title-color text-center text-4xl'>Sign Up</div>
        <form onSubmit={handleSubmit} className='mt-2'>
          <div className='flex flex-col items-center gap-2'>
            <div className='w-full'>
              <label htmlFor='' className='text-title-color'>
                First Name
              </label>
              <br />
              <input
                type='text'
                className='outline-none mt-2 w-full bg-input-bg rounded-lg h-10 placeholder:text-placeholder-color text-title-color px-4'
                placeholder='Enter First Name'
                name='firstname'
                onBlur={handleBlur}
                value={formData.firstname}
                onChange={(e) => handleChange(e)}
              />
              {touched.firstname && errors.firstname && (
                <p className='text-red-500'>{errors.firstname}</p>
              )}
            </div>
            <div className='w-full'>
              <label htmlFor='' className='text-title-color'>
                Last Name
              </label>
              <br />
              <input
                type='text'
                className='outline-none mt-2 w-full bg-input-bg rounded-lg h-10 placeholder:text-placeholder-color text-title-color px-4'
                placeholder='Enter Last Name'
                name='lastname'
                value={formData.lastname}
                onBlur={handleBlur}
                onChange={(e) => handleChange(e)}
              />
              {touched.lastname && errors.lastname && (
                <p className='text-red-500'>{errors.lastname}</p>
              )}
            </div>
            <div className='w-full'>
              <label htmlFor='' className='text-title-color'>
                Email
              </label>
              <br />
              <input
                type='text'
                className='outline-none mt-2 w-full bg-input-bg rounded-lg h-10 placeholder:text-placeholder-color text-title-color px-4'
                placeholder='Enter Email'
                name='email'
                onBlur={handleBlur}
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
              {touched.email && errors.email && (
                <p className='text-red-500'>{errors.email}</p>
              )}
            </div>
            <div className='w-full'>
              <label htmlFor='' className='text-title-color'>
                Password
              </label>
              <br />
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className='outline-none mt-2 w-full bg-input-bg rounded-lg h-10 placeholder:text-placeholder-color text-title-color px-4'
                  placeholder='Enter Password'
                  name='password'
                  value={formData.password}
                  onBlur={handleBlur}
                  onChange={(e) => handleChange(e)}
                />
                {touched.password && errors.password && (
                  <p className='text-red-500'>{errors.password}</p>
                )}
                <div
                  className={`absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer ${
                    touched.password && errors.password ? 'pb-4' : 'pt-2'
                  }  `}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#727272'
                        className='w-6 h-6'
                      >
                        <path
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                        />
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='#727272'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type='submit'
                className='bg-btn-color py-2 px-5 rounded-xl mt-2'
              >
                Submit
              </button>
            </div>
          </div>
        </form>
        <div>
          <p className='text-center text-title-color'>
            Already have an account?{' '}
            <Link to={'/login'} className='text-blue-700 underline'>
              click here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Form;
