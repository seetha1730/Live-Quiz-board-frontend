import React, { useEffect, useContext ,useState} from 'react';
import { AuthContext } from '../context/auth.context';
import ThemeSwitcher from './ThemeSwitcher';
import { NavLink } from "react-router-dom";
import { Collapse } from 'flowbite';

const Navbar = () => {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

 

  useEffect(() => {
    const $triggerEl = document.getElementById('user-menu-button');
    const $targetEl  = document.getElementById('user-dropdown');


    const $navbarEl = document.getElementById('navbar-user');


      const instanceOptions = {
        id: 'targetEl',
        override: true,
      };

      const collapse = new Collapse($targetEl, $triggerEl, $navbarEl, instanceOptions);

     
    collapse.expand();
    
 
  }, []);
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-[#008489] dark:text-white">Live Quiz</span>
        </a>
       
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button 
            type="button"
            className="flex text-sm  p-0 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="user photo" />
          </button>
          {/* Dropdown menu */}
         
          <div
            className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
            id="user-dropdown"
          > {isLoggedIn && (
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">{user && user.name}</span>
              <span className="block text-sm text-gray-500 truncate dark:text-gray-400">{user && user.email}</span>
            </div>
          )}
       
           
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
              <NavLink to="/profile" 
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Profile
                </NavLink>
              </li>
              <li>
              <NavLink to="/settings"
                 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </NavLink>
              </li>
              <li>
                <NavLink to="/score"
                
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Score
                </NavLink>
              </li>
              <li>
                <NavLink onClick={logOutUser}
                 
                
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </NavLink>
              </li>
              
            </ul>
        
            
        
 
          </div>
        
          {!isLoggedIn && (<>
  <NavLink to="/signup" className=" text-white  px-3 py-2 mr-3 text-sm font-medium"> <button>Sign Up</button> </NavLink>
  <NavLink to="/login" className=" text-white  px-3 py-2 text-sm font-medium"> <button>Login</button> </NavLink>
  </>)} 
          <ThemeSwitcher/>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
       
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <NavLink to="/"
            
                className="block py-2 px-3 text-white bg-[#008489] rounded md:bg-transparent md:text-[#008489] md:p-0 md:dark:text-[#008489]"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/question-answers"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#008489] md:p-0 dark:text-white md:dark:hover:text-[#008489] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Question
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#008489] md:p-0 dark:text-white md:dark:hover:text-[#008489] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#008489] md:p-0 dark:text-white md:dark:hover:text-[#008489] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink
                href="#"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#008489] md:p-0 dark:text-white md:dark:hover:text-[#008489] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </div>

      
      </div>
    </nav>
  );
};

export default Navbar;
