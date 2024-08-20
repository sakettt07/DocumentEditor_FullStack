import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Docs from '../components/Docs'
import Loader from '../components/Loader';
import { BsPlusLg } from "react-icons/bs";
import { MdOutlineTitle } from "react-icons/md";
import {RiFileAddFill} from "react-icons/ri"
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate=useNavigate();
  const [isCreateModelShow,setIsCreateModelShow]=useState(false);
  const [title,setTitle]=useState("")
  const createDoc=()=>{

  }
  return (
    <div>
      <Navbar />
      <div className='w-full bg-slate-900 p-12 flex justify-between items-center'>
        <h2 className='text-white text-[2vw]'>All Documents</h2>
        <button onClick={()=>setIsCreateModelShow(true)} className='flex items-center p-2 gap-3 py-4 rounded-md bg-red-600'>
          <RiFileAddFill />
          <h3>Add new</h3>
        </button>
      </div>
      {/* displaying the docs */}
      <Docs />

      {
        isCreateModelShow ?
          <>
            <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
              <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg w-[30vw] h-[26.5vh]">
                <h3 className='text-[20px]'>Create New Document</h3>

                <div className='inputCon mt-3'>
                  <p className=' text-[14px] text-[#808080]'>Title</p>
                  <div className="inputBox w-[100%]">
                    <i><MdOutlineTitle /></i>
                    <input onChange={(e)=>{setTitle(e.target.value)}} value={title} type="text" placeholder='Title' id='title' name='title' required />
                  </div>
                </div>

                <div className="flex -mt-2 items-center gap-2 justify-between w-full">
                  <button onClick={createDoc} className='btnBlue !min-w-[49%]'>Create New Document</button>
                  <button onClick={() => { setIsCreateModelShow(false) }} className='p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%]'>Cancel</button>
                </div>
              </div>
            </div>
          </> : ""
      }
    </div>
  )
}

export default Home
