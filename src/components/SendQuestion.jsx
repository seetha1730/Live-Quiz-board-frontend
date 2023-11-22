import React, { useState, useEffect } from "react";
import { socket } from "../services/socket.service";
import axios from "axios";
import { useParams } from "react-router-dom";

function SendQuestion() {
  const { roomName } = useParams();
  const [questions, setQuestions] = useState("");
  console.log(questions);
  const [sentQuestion, setSentQuestion] = useState([]);
  const [category, setCategory] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/question-answers/allQuestionAnswer"
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };
  useEffect(() => {
    // Fetch questions when the component mounts
    fetchQuestions();
    socket.on("question", (question) => {
      console.log(question);
    });
  }, []);

  useEffect(() => {
    questions.length && questions.forEach((item) => {
      if (!category.includes(item.category)) {
        setCategory([...category, item.category]);
      }
    });
  }, [questions, category]);

  const sendQuestion = (question, index) => {
    socket.emit("sendQuestion", { question, roomName });
    setSentQuestion([...sentQuestion, index]);
  };
  return (
    <>
      {questions.length ? (
        questions.map((question, index) => (
          <div
            key={index}
            className={`flex flex-col p-5 m-5 bg-white rounded-lg text-gray-700 ${
              sentQuestion.includes(index) ? "grayscale -inset" : ""
            }`}
          >
            <select>
              {category.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>

            <h3 className=" p-3 bg-[#83c5be]">
              <span>{index + 1} </span>
              {question.questionText}
            </h3>
            <ul>
              <li className="p-3 text-left ">
                <span className="mr-5">A </span> {question.options[0]}
              </li>
              <li className="p-3 text-left  border-2 border-t-green-900 border-x-0  ">
                <span className="mr-5">B </span> {question.options[1]}
              </li>
              <li className="p-3 text-left  border-2 border-t-green-900 border-x-0 ">
                <span className="mr-5">C </span> {question.options[2]}
              </li>
              <li className="p-3 text-left  border-2 border-y-green-900 border-x-0 ">
                <span className="mr-5">D </span> {question.options[3]}
              </li>
            </ul>
            <button
              onClick={() => sendQuestion(question, index)}
              className="relative inline-flex items-center justify-center mt-4 p-4 px-6 py-3 overflow-hidden bg-[#464857]  font-medium text-white transition duration-300 ease-out border-2 border-blue-500 rounded-lg shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#212E3D]  group-hover:translate-x-0 ease">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                Send Question
              </span>
              <span className="relative invisible">Send Question</span>
            </button>
          </div>
        ))
      ) : (
        <p>Waiting for the questions...</p>
      )}
    </>
  );
}

export default SendQuestion;
