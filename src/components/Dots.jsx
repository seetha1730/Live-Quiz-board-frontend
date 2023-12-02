import {  useContext } from "react";

import { ThemeContext } from '../context/theme.context';
function Dots() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={` ${theme === 'dark' ? ' bg-gray-700 dots-gray' :'bg-base-purple border-light-purple' } dots rounded-lg`}><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>
  )
}

export default Dots;