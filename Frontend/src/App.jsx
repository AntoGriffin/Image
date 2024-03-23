import { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);
    try {
      await axios.post('http://localhost:5001/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Task uploaded successfully');
      // Reset form fields
      setName('');
      setImage(null);
    } catch (err) {
      console.error('Error uploading task:', err);
    }
  };

  return (
    <div>
      <h1>Task Upload</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={handleNameChange} />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <button type="submit">Upload Task</button>
      </form>
    </div>
  );
};

export default App;
