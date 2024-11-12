import React, { useState } from 'react';
import '../styles/ContentManagement.css';

function ContentManagement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [contentList, setContentList] = useState([]);

  const handleUpload = () => {
    const newContent = { title, description, date };
    setContentList([...contentList, newContent]);
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <div className="content-management-container">
      <h2>Content Management</h2>
      <div className="upload-form">
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Schedule Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <button onClick={handleUpload}>Upload</button>
      </div>
      <h3>Scheduled Content</h3>
      <ul className="content-list">
        {contentList.map((content, index) => (
          <li key={index}>
            <h4>{content.title}</h4>
            <p>{content.description}</p>
            <p>Scheduled for: {content.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentManagement;