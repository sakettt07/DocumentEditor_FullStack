import React,{useState,useEffect} from "react";
import Avatar from "react-avatar";
import {RiSearchLine} from "react-icons/ri"
import { Link,useNavigate } from "react-router-dom";
import { Api_Url } from "../helper";

const Navbar = () => {

  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const getUser = () => {
    fetch(Api_Url + "/getUser", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success == false) {
        setError(data.message)
      }
      else {
        setData(data.user)
      }
    })
  };

  const logout = () => {
    fetch(Api_Url + "/logout", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId")
      })
    }).then(res => res.json()).then(data => {
      if (data.success == false) {
        setError(data.message)
      }
      else {
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
      }
    })

  }

  useEffect(() => {
    getUser();
  }, [])
  return (
    <>
      <div className="navbar flex items-center px-[100px] h-[90px] justify-between bg-[#F4F4F4]">
        {/* <img src={logo} alt="" /> */}
        <Link to="/home" className="text-[1.6vw]">DocumentMender</Link>

        <div className="right flex items-center justify-end gap-2 ">
          <div className="inputBox w-[20vw] flex items-center p-3 justify-end gap-2">
            <i><RiSearchLine /></i>
            <input className="p-3 rounded-lg bg-transparent outline-none" type="text" placeholder='Search Here... !' />
          </div>

          <button onClick={logout}  className='p-[10px] min-w-[120px] bg-red-500 text-white rounded-lg border-0 transition-all hover:bg-red-600'>Logout</button>

          <Avatar name={data ? data.name : ""} className='cursor-pointer' size="40" round="50%" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
