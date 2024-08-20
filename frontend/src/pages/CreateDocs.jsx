import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';

const CreateDocs = () => {
    let {docsId}=useParams;
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default CreateDocs
