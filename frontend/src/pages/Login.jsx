import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdEmail, MdPassword } from "react-icons/md";
import { Api_Url } from "../helper";


const Login = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    fetch(Api_Url + "/login", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: pwd,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server response data:", data); // Debug log
        if (data.success) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("userId", data.userID);
          console.log("User ID set in localStorage:", data.userID); // Debug log
          setTimeout(() => {
            navigate("/home");
          }, 100);
        } else {
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Login error:", error); // Debug log
        setError("An error occurred during login.");
      });
  };
  return (
    <>
      <div className="w-full h-screen bg-[#0d1a22]">
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

            <form onSubmit={loginUser} className="pl-3 mt-3" action="">

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
                Don't have an account{" "}
                <Link to="/signup" className="text-blue-500">
                  SignUp
                </Link>
              </p>

              <button className="p-[10px] bg-green-500 transition-all hover:bg-green-600 text-white rounded-lg px-8 border-0 mt-3">
                Login
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

export default Login;
