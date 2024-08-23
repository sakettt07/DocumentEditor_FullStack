import React, {useState, useRef,useEffect} from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import "../App.css";
import { Api_Url } from '../helper';


const CreateDocs = () => {
    let {docsId}=useParams;
    const editor=useRef(null);
    const [content,setContent]=useState("");
    const [error,setError]=useState("");

    const updateDoc = () => {
      fetch(Api_Url + "/updateDoc", {
        mode: "cors",
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          docId: docsId,
          content: content
        })
      }).then(res => res.json()).then(data => {
        if (data.success === false) {
          setError(data.message)
        }
        else {
          setError("");
        }
      })
    }
    // const getContent = () => {
    //   fetch(Api_Url + "/getDoc", {
    //     mode: "cors",
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       userId: localStorage.getItem("userId"),
    //       docId: docsId,
    //     }),
    //   })
    //     .then((res) => res.json())
    //     .then((data) => {
    //       if (data.success === false) {
    //         setError(data.message);
    //       } else {
    //         setContent(data.doc.content);
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching document:", error);
    //       setError("An error occurred while fetching the document.");
    //     });
    // };
  
    // useEffect(() => {
    //   getContent();
    // }, [])
    
  return (
    <div>
      <Navbar />

      <div className='px-10 mt-4'>
      <JoditEditor
			ref={editor}
			value={content}
			tabIndex={1} // tabIndex of textarea
			onChange={(e)=>{setContent(e);
        updateDoc();
      }}
		/>
      </div>
    </div>
  )
}

export default CreateDocs
