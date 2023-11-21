import React, { useState } from 'react';
import axios from 'axios';

function CreateQuestion() {
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
      const response = await axios.post(
        'http://localhost:3000/question-answers/create',
        formData
      );

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
    <div className="max-w-lg mx-auto w-11/12 my-8 p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-[#008489] dark:text-[#008489]">Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#008489] dark:text-white">
            Category:
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
            Question Text:
          </label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          
          {formData.options.map((option, index) => (
            <>
            <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
            Options:{index+1}
          </label>
            <div key={index} className="mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                className="p-2 w-full border rounded-md"
              />
            </div>
            </>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium  text-[#008489] dark:text-[#008489]">
            Correct Option:
          </label>
          <select
            name="correctOption"
            value={formData.correctOption}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {formData.options.map((_, index) => (
              <option key={index} value={index}>
                Option {index + 1}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-[#008489] mx-auto flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Create Question
        </button>
      </form>
    </div>
  );
}

export default CreateQuestion;
