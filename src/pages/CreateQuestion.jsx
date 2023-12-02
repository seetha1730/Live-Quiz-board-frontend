import React, { useState ,useContext} from 'react';
import axios from 'axios';
import { ThemeContext } from '../context/theme.context';
function CreateQuestion() {
  const { theme } = useContext(ThemeContext);
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
        `${import.meta.env.VITE_BASE_URL_API}/question-answers/create`,
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
    <div className="flex my-screen items-center">
        <div className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } max-w-lg mx-auto w-11/12 my-8 p-6  text-white-900 shadow-lg rounded-lg `}>

   {/* </div> <div className=""> */}
      <h2 className={` ${theme === 'dark' ? ' bg-gray-700' :'text-gradient '} text-2xl font-bold mb-4 text-center `}>Create a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium  ">
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
          <label className="block text-sm font-medium ">
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
            <label className="block text-sm font-medium ">
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
          <label className="block text-sm font-medium  ">
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
          className={` ${theme === 'dark' ? ' bg-gray-800 border-white ' : 'gradient-button' }  text-white mx-auto flex   font-bold py-2 px-4 rounded-3xl focus:outline-none `}
        >
          Create Question
        </button>
      </form>
    </div>
    </div>
  );
}

export default CreateQuestion;
