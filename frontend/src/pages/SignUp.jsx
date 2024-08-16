import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaUserAlt, FaUserAstronaut } from "react-icons/fa";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { Api_Url } from "../helper";

const SignUp = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const createUser=(e)=>{
    e.preventDefault();

    fetch(Api_Url+"/signup",{
      mode:"cors",
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        username:username,
        name:name,
        email:email,
        phone:phone,
        password:pwd
      }),
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data.success===false){
        setError(data.message)
      }
      else{
        navigate("/login");
      }
    })
  }
  return (
    <>
      <div className="w-full h-screen bg-[#F0F0F0]">
        <div className="grid grid-cols-2 w-full h-full items-center">
          <div className="left justify-center items-center  w-full h-full flex flex-col">
            <div className="flex items-center mb-5">
              <img
                className="w-[50px]"
                src="https://cdn.icon-icons.com/icons2/570/PNG/512/document_9_icon-icons.com_54619.png"
                alt=""
              />
              <h2 className="text-[2vw]">Edit-Smart</h2>
            </div>

            <form className="pl-3 mt-3" onSubmit={createUser}>
              {/* username */}
              <div className="inputCon mb-[8px]">
                <p className=" text-[14px] text-[#808080]">Username</p>
                <div className="inputBox border-2 rounded-md text-black flex items-center w-[100%]">
                  <i className="text-[20px] mr-[7px] ml-[5px]">
                    <FaUser />
                  </i>
                  <input
                    className="flex-1 bg-transparent p-4 px-28 border-5 pl-0 outline-0 border-0"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                    type="text"
                    placeholder="Username"
                    id="username"
                    name="username"
                    required
                  />
                </div>
              </div>
              {/* name */}
              <div className="inputCon mb-[6px]">
                <p className=" text-[14px] text-[#808080]">Name</p>
                <div className="inputBox border-2 rounded-md text-black flex items-center w-[100%]">
                  <i className="text-[20px] mr-[7px] ml-[5px]">
                    <FaUserAstronaut />
                  </i>
                  <input
                    className="flex-1 bg-transparent p-4 px-28 border-5 pl-0 outline-0 border-0"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="Name"
                    id="name"
                    name="name"
                    required
                  />
                </div>
              </div>

              {/* email */}
              <div className="inputCon mb-[4px]">
                <p className=" text-[14px] text-[#808080]">Email</p>
                <div className="inputBox border-2 rounded-md text-black flex items-center w-[100%]">
                  <i className="text-[20px] mr-[7px] ml-[5px]">
                    <MdEmail />
                  </i>
                  <input
                    className="flex-1 bg-transparent p-4 px-28 border-5 pl-0 outline-0 border-0"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    required
                  />
                </div>
              </div>
              {/* phone */}
              <div className="inputCon mb-[2px]">
                <p className=" text-[14px] text-[#808080]">Phone</p>
                <div className="inputBox border-2 rounded-md text-black flex items-center w-[100%]">
                  <i className="text-[20px] mr-[7px] ml-[5px]">
                    <FaPhone />
                  </i>
                  <input
                    className="flex-1 bg-transparent p-4 px-28 border-5 pl-0 outline-0 border-0"
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    value={phone}
                    type="phone"
                    placeholder="phone"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
              </div>
              
              {/* password */}
              <div className="inputCon mb-[2px]">
                <p className=" text-[14px] text-[#808080]">Password</p>
                <div className="inputBox border-2 rounded-md text-black flex items-center w-[100%]">
                  <i className="text-[20px] mr-[7px] ml-[5px]">
                    <MdPassword />
                  </i>
                  <input
                    className="flex-1 bg-transparent p-4 px-28 border-5 pl-0 outline-0 border-0"
                    onChange={(e) => {
                      setPwd(e.target.value);
                    }}
                    value={pwd}
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    required
                  />
                </div>
              </div>
              <p className="text-red-500 text-[14px] my-2">{error}</p>
              <p>
                Already have an account{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>

              <button className="p-[10px] bg-green-500 transition-all hover:bg-green-600 text-white rounded-lg px-8 border-0 mt-3">
                Sign Up
              </button>
            </form>
          </div>
          <div className="right flex w-full h-full bg-yellow-600">
            <img
              className="h-full object-cover"
              src="https://paytmblogcdn.paytm.com/wp-content/uploads/2021/07/FixedDeposit_31_List-of-documents-required-for-Fixed-Deposits-800x500.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
