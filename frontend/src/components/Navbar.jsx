import React from "react";
import Avatar from "react-avatar";
import {RiSearchLine} from "react-icons/ri"

const Navbar = () => {
  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">
        {/* <img src={logo} alt="" /> */}
        <h2 className="text-[1.6vw]">DocumentMender</h2>

        <div className="right flex items-center justify-end gap-2 ">
          <div className="inputBox w-[20vw] flex items-center p-3 justify-end gap-2">
            <i><RiSearchLine /></i>
            <input className="p-3 rounded-lg bg-transparent outline-none" type="text" placeholder='Search Here... !' />
          </div>

          <button  className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600'>Logout</button>

          <Avatar className="rounded-full" name="Wim Mostmans" size="45" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
