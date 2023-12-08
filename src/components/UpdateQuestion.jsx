import React from 'react'
import { useState } from 'react';
import axios from 'axios';
function UpdateQuestion({ updateQuestion, question, close }) {


  const [formData, setFormData] = useState({
    category: question.category,
    questionText: question.questionText,
    options: question.options.slice(),
    correctOption: question.correctOption,

  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
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


  return (
    <>

      <div id="select-modal" tabIndex="-1" aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative p-4 w-full max-w-md max-h-full">

          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-2xl font-bold text-[#008489] dark:text-white">
                Update Question and Answers
              </h3>
              <button type="button" onClick={close} className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Close menu</span>

                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

            </div>

            <div className="p-4 md:p-5 text-left ">


              <form >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#008489] dark:text-[#008489]">
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
                        Options:{index + 1}
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
                <button onClick={(e) => { e.preventDefault(); updateQuestion(question._id, formData); }}
                  type="submit"
                  className="bg-[#008489] mx-auto flex hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Update Question
                </button>
              </form>


            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default UpdateQuestion