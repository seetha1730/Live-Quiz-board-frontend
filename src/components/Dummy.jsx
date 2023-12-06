import { useEffect, useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import ThemeSwitcher from './ThemeSwitcher';
import { NavLink } from "react-router-dom";
import { Collapse } from 'flowbite';
import { ThemeContext } from '../context/theme.context';

const Navbar = () => {
  const { theme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  useEffect(() => {
    const $triggerEl = document.getElementById('user-menu-button');
    const $targetEl = document.getElementById('user-dropdown');
    const $navbarEl = document.getElementById('navbar-user');

    const instanceOptions = {
      id: 'targetEl',
      override: true,
    };

    new Collapse($targetEl, $triggerEl, $navbarEl, instanceOptions);

  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`bg-${theme === 'dark' ? 'gray-800' : 'gradient-main'} p-4`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <div className="flex items-center space-x-3">
          <NavLink to="/" className="flex items-center space-x-3">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Live Quiz</span>
          </NavLink>
        </div>

        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <span>&times;</span>
            ) : (
              <span className="text-2xl">&#9776;</span>
            )}
          </button>
        </div>

        <div className={`md:flex items-center space-x-8 ${isMobileMenuOpen ? 'flex' : 'hidden'}`}>
          <div className="hidden md:flex items-center space-x-3">
            {/* User menu button */}
            <button
              type="button"
              className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
            >
              <span className="sr-only">Open user menu</span>
              {isLoggedIn ? (
                <img className="w-12 h-12 rounded-full" src={user && user.image} alt="user photo" />
              ) : (
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
              )}
            </button>

            {/* User dropdown */}
            <div
              className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
              id="user-dropdown"
            >
              {isLoggedIn && (
                <div className="px-4 py-3">
                  <span className="block text-sm text-gray-900 dark:text-white">{user && user.name}</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user && user.email}</span>
                </div>
              )}

              <ul className="py-2" aria-labelledby="user-menu-button">
                {isLoggedIn && (
                  <>
                    <li>
                      <NavLink to={`/profile/${user._id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
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

                {!isLoggedIn && (
                  <>
                    <li>
                      <NavLink to="/signup"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Signup
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Theme switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
