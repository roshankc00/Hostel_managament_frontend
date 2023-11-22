import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const SideIcons = ({name , link, icon}) => {
    // console.log(link)
    const finalLink = "/users/"+ link
    
    
  return (

    <NavLink  className={`w-[100%] pl-5 mb-5 h-[3rem] `} to={link}>
    <div  className={`w-[90%] pl-2 md:pl-5 mb-5 h-[3rem] duration-150 flex items-center rounded-sm hover:bg-gray-200 hover:text-black hover:w-full ${ useLocation().pathname == finalLink && " bg-[#f3f3f3] w-full text-black "}`}> 
    
        {icon}
        
        <div className=' pl-3 text-[.9rem] md:text-[1rem]'>
            {name}
        </div>
    </div>
    </NavLink>
  );
};

export default SideIcons;
