import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setClear } from '../../state/tasks/tasksSlice';
import { setLogout } from '../../state/auth/authSlice';

const SideBar = () => {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [active, setActive] = useState('home');

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClick = () => {
    dispatch(setLogout());
    dispatch(setClear());
    navigate('/register', { replace: true });
  };

  return (
    <>
      <div
        className={`${
          isSmallScreen ? (sideBarOpen ? 'slideToRight' : 'slideToLeft') : ''
        } absolute w-3/5 h-full md:w-full md:relative md:block md:col-span-3 lg:col-span-2   bg-card-bg rounded-lg border-2 border-border-color`}
      >
        <div className='flex flex-col justify-between h-full'>
          <div>
            <div className='p-4 flex flex-col justify-center items-center bg-black-bg rounded-lg m-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-10 h-10 text-label-color'
              >
                <path
                  fillRule='evenodd'
                  d='M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z'
                  clipRule='evenodd'
                />
              </svg>
              <p className='text-title-color text-lg font-serif '>{`${user.firstname} ${user.lastname}`}</p>
              <div className='md:hidden flex justify-end w-full relative left-20 h-5'>
                <div
                  className='w-12 h-12 flex justify-center items-center bg-card-bg border-r-2 border-t-2 border-b-2 rounded-r-md  border-border-color'
                  onClick={() => setSideBarOpen(!sideBarOpen)}
                >
                  {sideBarOpen ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6  text-label-color'
                    >
                      <path
                        fillRule='evenodd'
                        d='M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      fill='currentColor'
                      className='w-6 h-6 text-label-color'
                    >
                      <path
                        fillRule='evenodd'
                        d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
                        clipRule='evenodd'
                      />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <ul>
              <li
                className={`flex hover:cursor-pointer ${
                  active === 'home'
                    ? 'bg-border-color border-r-4 border-green-400'
                    : ''
                } p-2 `}
                onClick={() => navigate('/home')}
              >
                <div className='flex items-center justify-center w-40'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6 text-label-color'
                  >
                    <path d='M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z' />
                    <path d='m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z' />
                  </svg>
                </div>
                <div className='w-60 '>
                  <p className='text-label-color'>All Tasks</p>
                </div>
              </li>
              <li
                className={`flex hover:cursor-pointer ${
                  active === 'completed'
                    ? 'bg-border-color border-r-2 border-green-400'
                    : ''
                } p-2 `}
                onClick={() => navigate('/completed')}
              >
                <div className='flex items-center justify-center w-40'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className='w-6 h-6 text-label-color'
                  >
                    <path
                      fillRule='evenodd'
                      d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                <div className='w-60  '>
                  <p className='text-label-color'>Completed</p>
                </div>
              </li>
            </ul>
          </div>
          <div className='flex m-4 hover:cursor-pointer' onClick={handleClick}>
            <div className='flex items-center justify-center w-40'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-6 h-6 text-label-color'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25'
                />
              </svg>
            </div>
            <div className='w-60  '>
              <p className='text-label-color'>Sign Out</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;
