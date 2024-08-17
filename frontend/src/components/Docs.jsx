import React, { useState } from 'react';

const Docs = () => {
  // Example documents data
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Document 1', description: 'Description for Document 1' },
    { id: 2, name: 'Document 2', description: 'Description for Document 2' },
    // Add more documents as needed
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter documents based on search term
  const filteredDocuments = documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Documents</h2>

      {/* Search input */}
      <input
        className="p-3 rounded-lg bg-transparent outline-none mb-4"
        type="text"
        placeholder="Search documents..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display filtered documents */}
      <ul>
        {filteredDocuments.map(doc => (
          <li key={doc.id}>
            <h3>{doc.name}</h3>
            <p>{doc.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Docs;
