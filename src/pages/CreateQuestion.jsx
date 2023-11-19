
import React, { useState } from 'react'
//import { useNavigate } from "react-router-dom";
import axios from 'axios';
function CreateQuestion () {
   // const navigate = useNavigate();
  
      const [formData, setFormData] = useState({
        category: '',
        questionText: '',
        options: ['', '', '', ''],
        correctOption: 0,
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleOptionChange = (index, e) => {
        const newOptions = [...formData.options];
        newOptions[index] = e.target.value;
        setFormData((prevData) => ({
          ...prevData,
          options: newOptions,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
       
          const response = await axios.post('http://localhost:3000/question-answers/create', formData);
    
        
          console.log('Response:', response.data);
    
          
          setFormData({
            category: '',
            questionText: '',
            options: ['', '', '', ''],
            correctOption: 0,
          });
        } catch (error) {
          console.error('Error submitting the form:', error.message);
        }
      };

  return (
    <div>
      <h2>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Question Text:</label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Options:</label>
          {formData.options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Correct Option:</label>
          <select
            name="correctOption"
            value={formData.correctOption}
            onChange={handleInputChange}
          >
            {formData.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Create Question</button>
      </form>
    </div>
  );
}

export default CreateQuestion;
