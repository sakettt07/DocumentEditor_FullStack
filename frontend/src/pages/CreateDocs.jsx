import React, { useState, useRef, useEffect } from 'react';
import JoditEditor from "jodit-pro-react";
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import "../App.css";
import { Api_Url } from '../helper';

const CreateDocs = () => {
    let { docsId } = useParams(); // Retrieve docId from the URL parameters
    const editor = useRef(null);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const updateDoc = () => {
        const userId = localStorage.getItem("userId");
        console.log("Updating document with userId:", userId, "and docId:", docsId); 

        fetch(Api_Url + "/updateDoc", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                docId: docsId,
                content: content
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success === false) {
                setError(data.message);
                setSuccessMessage("");
                console.error("Error from server:", data.message); // Debug log
            } else {
                setError("");
                setSuccessMessage("Document saved successfully!");
                console.log("Document updated successfully:", data); // Debug log
            }
        })
        .catch((error) => {
            console.error("Error updating document:", error);
            setError("An error occurred while updating the document.");
        });
    };

    // Function to get the document content
    const getContent = () => {
        const userId = localStorage.getItem("userId");
        console.log("Fetching content with userId:", userId, "and docId:", docsId); // Debug log

        fetch(Api_Url + "/getDoc", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: userId,
                docId: docsId,
            }),
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.success === false) {
                setError(data.message);
                console.error("Error fetching document:", data.message); 
            } else {
                setContent(data.doc.content);
                console.log("Document content fetched successfully:", data.doc.content); 
            }
        })
        .catch((error) => {
            console.error("Error fetching document:", error);
            setError("An error occurred while fetching the document.");
        });
    };

    useEffect(() => {
        getContent();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='px-10 mt-4'>
                <JoditEditor
                    ref={editor}
                    value={content}
                    tabIndex={1} // tabIndex of textarea
                    onChange={(newContent) => setContent(newContent)}
                />
                <button onClick={updateDoc} className="save-button bg-blue-600 text-white p-2 mt-3 rounded px-5">Save</button>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
            </div>
        </div>
    );
}

export default CreateDocs;
