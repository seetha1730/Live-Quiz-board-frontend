import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import ThemeSwitcher from './ThemeSwitcher';
import { NavLink } from "react-router-dom";
import { Collapse } from 'flowbite';
import { ThemeContext } from '../context/theme.context';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [hamburgerMenuStatus, setHMState] = useState(false)
  const [userMenuStatus, setUserMState] = useState(false)
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const options = {
    onCollapse: () => {
      console.log('element has been collapsed');
    },
    onExpand: () => {
      console.log('element has been expanded');
    },
    onToggle: () => {
      console.log('element has been toggled');
    },
  };

  const $triggerEl = document.getElementById('user-menu-button');
  const $targetEl = document.getElementById('user-dropdown');
  const instanceOptions = {
    id: 'user-dropdown',
    override: true
  };
  const hamInstanceOptions = {
    id: 'navbar-user',
    override: true
  };


  const $hamburgerEl = document.getElementById('hamburger');
  const $navbarEl = document.getElementById('navbar-user');
  const userMenuCollapse = new Collapse($targetEl, $triggerEl, options, instanceOptions);
  const hamburgerCollapse = new Collapse($navbarEl, $hamburgerEl, options, hamInstanceOptions)

  const handleHMclick = () => {
    if (hamburgerMenuStatus) {
      hamburgerCollapse.collapse()
    } else {
      hamburgerCollapse.expand()
    }
    setHMState(!hamburgerMenuStatus)
  }

  const handleUserMclick = () => {
    if (userMenuStatus) {
      userMenuCollapse.collapse()
    } else {
      userMenuCollapse.expand()
    }
    setUserMState(!userMenuStatus)
  }

  useEffect(() => {
  }, [theme])

  return (
    <nav className={theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-main border-gray-200'}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <NavLink to="/" className="flex items-center space-x-3">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Live Quiz</span>
        </NavLink>

        <div className="flex items-center mr-2 sm:mr-4  md:order-2 space-x-1 sm:space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            onClick={() => handleUserMclick()}
            className="flex text-sm relative p-0 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            {isLoggedIn ? (

              <img className="w-8 sm:w-10 h-8 sm:h-10 rounded-full" src={user && user.image} alt="user photo" />
            ) : (
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                <svg className=" absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
            )}
          </button>

          <div
            className="z-50  hidden absolute  top-[1rem] my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          > {isLoggedIn && (
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{user && user.name}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user && user.email}</span>
            </div>
          )}


            <ul className="py-2" aria-labelledby="user-menu-button">
              {isLoggedIn && (<>
                <li>
                  <NavLink to={`/profile/${user._id}`}

                    className="block px-4 py-2 text-sm text-gray-700   hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </NavLink>
                </li>


                <li>
                  <NavLink onClick={logOutUser}


                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Sign out
                  </NavLink>
                </li>
              </>
              )}

              {!isLoggedIn && (<>
                <li>
                  <NavLink to="/signup"

                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    signup
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login"

                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    login
                  </NavLink>
                </li>
              </>
              )}


            </ul>




          </div>

          <ThemeSwitcher />
          <button
            id='hamburger'
            onClick={() => handleHMclick()}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-200 rounded-lg md:hidden hover:bg-white-800 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

        </div>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >

          <ul className="flex  flex-col text-white font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700">
            <li>
              <NavLink to="/"

                className="block py-2 px-3  text-white rounded "
                aria-current="page"
              >
                Home
              </NavLink>

            </li>
            <li>
              <NavLink to="/room"

                className="block py-2 px-3  text-white rounded "
                aria-current="page"
              >
                Rooms
              </NavLink>

            </li>
            <li>
              <NavLink
                to="/question-answers"
                className="block py-2 px-3  text-white rounded"
              >
                Question
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/history/${user?._id}`}
                className="block py-2 px-3 text-white rounded"
              >
                History
              </NavLink>
            </li>
            <li>
              <NavLink to="/feedback"

                className="block py-2 px-3  text-white rounded "
                aria-current="page"
              >
                Feedback Blog
              </NavLink>

            </li>


          </ul>
        </div>


      </div>
    </nav>
  );
};

export default Navbar;
