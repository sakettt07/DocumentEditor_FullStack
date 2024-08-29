import React, { useState } from "react";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { Api_Url } from "../helper";
import { useNavigate } from "react-router-dom";

const Docs = ({ docs }) => {
  const navigate = useNavigate();
  const [isDeleteModelShow, setIsDeleteModelShow] = useState(false);
  const [error, setError] = useState("");

  const docID = `doc-${docs._id}`;

  const deleteDoc = (id, docID) => {
    let doc = document.getElementById(docID);
    fetch(Api_Url + "/deleteDoc", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        docId: id,
        userId: localStorage.getItem("userId"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === false) {
          setError(data.message);
        } else {
          setIsDeleteModelShow(false);
          setTimeout(() => {
            alert(data.message);
          }, 100);
          doc.remove();
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        setError("An error occurred while deleting the document.");
      });
  };

  return (
    <div>
      {/* Main container */}
      <div
        id={docID}
        onClick={() => {
          navigate(`/createDocs/${docs._id}`);
        }}
        className="w-76 cursor-pointer rounded-md min-h-44 p-4 hover:bg-zinc-800 shadow-lg bg-black"
      >
        <div className="flex pr-12 items-center justify-between">
          <img
            className="w-[60px]"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
            alt=""
          />
          <p title="Doc name" className="text-white text-[1.3vw]">{docs.title} </p>
        </div>
        <p title="Doc description" className="mt-3 ml-6 text-white">Desc :{docs.desc}</p>
        <div className="flex px-3 mt-8 justify-between items-center">
          <p className="text-[10px] text-white">
            Created : {new Date(docs.date).toDateString()} <br />
            Updated : {new Date(docs.lastUpdate).toDateString()}
          </p>
          {/* Delete icon with stopPropagation to prevent bubbling */}
          <RiDeleteBin2Fill
          title="Delete doc"
            className="text-3xl text-white"
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigation click from firing
              setIsDeleteModelShow(true);
            }}
          />
        </div>
      </div>

      {/* Delete modal */}
      {isDeleteModelShow && (
        <>
          <div className="deletedocs fixed top-0 left-0 right-0 bottom-0 bg-[rgb(0,0,0,.3)] w-screen h-screen flex flex-col items-center justify-center">
            <div className="deletedocs p-[15px] bg-[#fff] rounded-lg w-[30vw] h-[32.5vh]">
              <h3 className="text-[20px]">Create New Document</h3>
              <div className="flex items-center gap-4">
                <img
                  className="w-32 p-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGLSjLAMnGscaCUwALmd4XpY1WitkDklmFHw&s"
                  alt=""
                />
                <div>
                  <h3>Do you want to delete ?</h3>
                  <p>Delete/cancel</p>
                </div>
              </div>
              <div className="flex -mt-2 items-center gap-2 justify-between w-full">
                <button
                  onClick={() => {
                    deleteDoc(docs._id, docID);
                  }}
                  className="btnBlue p-[10px] rounded-lg bg-orange-300 !min-w-[49%]"
                >
                  Delete Document
                </button>
                <button
                  onClick={() => {
                    setIsDeleteModelShow(false);
                  }}
                  className="p-[10px] bg-[#D1D5DB] text-black rounded-lg border-0 cursor-pointer min-w-[49%]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Docs;
