import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar";
import Docs from "../components/Docs";
import { MdOutlineTextFields, MdOutlineTitle } from "react-icons/md";
import { RiFileAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { Api_Url } from "../helper";

const Home = () => {
  const navigate = useNavigate();
  const [isCreateModelShow, setIsCreateModelShow] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [error, setError] = useState("");
  const [data,setData]=useState(null);


  // main function to create  a document.
  const createDoc = () => {
    if (title === "" || desc==="") {
      setError("Please enter titlem or description");
    } else {
      const userID = localStorage.getItem("userId");
  
      // Check if userId is properly retrieved from localStorage
      if (!userID) {
        setError("User ID is not found in localStorage.");
        return;
      }
  
      fetch(Api_Url + "/createDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          docName: title,
          desc:desc,
          userId: userID,
        }),
      })
        .then((res) => {
          console.log("Response status:", res.status);
          if (!res.ok) {
            throw new Error(`Network response was not ok: ${res.statusText}`);
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setIsCreateModelShow(false);
            navigate(`/createdocs/${data.docId}`);
          } else {
            setError(data.message);
          }
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setError("An error occurred while creating the document.");
        });
    }
  };
  const getData = () => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      console.error("User ID is undefined or not found in localStorage");
      return; // Exit the function if userId is undefined
    }
  
    fetch(Api_Url + "/getAllDocs", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setData(data.docs);
        } else {
          console.error("Error from server:", data.message);
          setError(data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching documents:", error);
        setError("An error occurred while fetching the documents. Please try again.");
      });
  };
  
  useEffect(() => {
    getData();
  }, []);
  
  return (
    <>
      <Navbar />
      <div className="w-full p-12 flex justify-between items-center">
        <h2 className=" text-[2vw]">All Documents</h2>
        <button
          className="flex items-center p-2 gap-3 py-4 rounded-md bg-black"
          onClick={() => {
            setIsCreateModelShow(true);
            document.getElementById("title").focus();
          }}
        >
          <RiFileAddFill className="text-white" />
          <h3 className="text-white">Add new</h3>
        </button>
      </div>
      <div className="w-full min-h-screen p-10 grid grid-cols-2 md:grid-cols-4 gap-6">
      {data && data.length > 0 ? (
                data.map((el, index) => (
                    <Docs key={el._id} docs={el} docID={`doc-${index + 1}`} />
                ))
            ) : (
                <p className="text-center text-gray-800 text-[2vw]">No document present</p>
            )}
      </div>

      {isCreateModelShow ? (
        <>
          <div className="createDocsModelCon fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
            <div className="createDocsModel p-[15px] bg-[#fff] rounded-lg w-[30vw] min-h-[26.5vh]">
              <h3 className="text-[20px]">Create New Document</h3>

              <div className="inputCon mt-3">
                <p className=" text-[14px] text-[#808080]">Title</p>
                <div className="inputBox mt-2 items-center gap-2 flex w-[100%]">
                  <i>
                    <MdOutlineTitle />
                  </i>
                  <input className="w-full border border-gray-500 p-1 rounded-md"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    value={title}
                    type="text"
                    placeholder="Title"
                    id="title"
                    name="title"
                    required
                  />
                </div>
              </div>
              <div className="inputCon mt-3">
                <p className=" text-[14px] text-[#808080]">Description</p>
                <div className="inputBox mt-2 items-center gap-2 flex w-[100%]">
                  <i>
                    <MdOutlineTextFields />
                  </i>
                  <input className="w-full border border-gray-500 p-1 rounded-md"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                    value={desc}
                    type="text"
                    placeholder="Description"
                    id="title"
                    name="title"
                    required
                  />
                </div>
              </div>

              <div className="flex mt-4 items-center gap-2 justify-between w-full">
                <button onClick={createDoc} className="btnBlue bg-blue-500 p-2 rounded-md !min-w-[49%]">
                  Create New Document
                </button>
                <button
                  onClick={() => {
                    setIsCreateModelShow(false);
                  }}
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
