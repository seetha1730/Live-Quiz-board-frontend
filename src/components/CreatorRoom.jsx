import { useState, useContext,useEffect } from "react";
import { socket } from "../services/socket.service";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "./button/Button";
import DeleteButton from "./button/DeleteButton";
import EditButton from "./button/EditButton";
import UpdateQuestion from "./UpdateQuestion";
import { ThemeContext } from '../context/theme.context';
function CreatorRoom() {
  const { theme } = useContext(ThemeContext);
  const { roomName } = useParams();
  const [questions, setQuestions] = useState([]);
  const [sentQuestion, setSentQuestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const[isOpen,setIsOpen] = useState(false)
  const [selectedQuestion, setSelectedQuestion] = useState({});

  const fetchQuestions = async () => {
    try {

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL_API}/question-answers/allQuestionAnswer`
      );
      setQuestions(response.data);
      setFilteredQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleOnChange = (event) => {
    const selected = event.target.value;
  
    setSelectedCategory(selected);
  
    if (selected === "Choose a category") {
      setFilteredQuestions(questions);
    } else {
      const categoryQuestions = questions.filter((q) => q.category === selected);
      setFilteredQuestions(categoryQuestions);
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
    
    questions.length &&
      questions.forEach((item) => {
        if (!category.includes(item.category)) {
          setCategory([...category, item.category]);
        }
      });
  }, [questions, category]);

  const sendQuestion = (question, index) => {
    socket.emit("sendQuestion", { question, roomName });
    setSentQuestion([...sentQuestion, index]);
  };


    const deleteQuestion = async (id, index) => {

      try {
     
        await axios.delete(`${import.meta.env.VITE_BASE_URL_API}/question-answers/${id}/delete`);

        setSentQuestion(sentQuestion.filter((sentIndex) => sentIndex !== index));
    
        const updatedQuestions = questions.filter((ques) => ques.id !== id);
        setQuestions(updatedQuestions);
    
        setFilteredQuestions(filteredQuestions.filter((ques, idx) => idx !== index));
      } catch (error) {
        console.error("Error deleting question:", error);
        if (error.response) {
          console.log("Server response data:", error.response.data);
        }
      }
    };
    const handleEditClick = (id) => {
      setIsOpen(true);
      const  selectQuestions = questions.find((ques) => ques._id === id);
      setSelectedQuestion(selectQuestions);
    
     
    };
  
    const closeButton = () => {
      setIsOpen(false);
      setSelectedQuestion("");
      
    
    }; 
    
    const EditQuestion = async (id,formData) => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL_API}/question-answers/${id}/update`,
          formData 
        );
    
        const updatedQuestions = questions.map((ques) =>
          ques._id === id ? response.data : ques
        );
        setQuestions(updatedQuestions);
        setFilteredQuestions(filteredQuestions.filter((ques) => ques.id === id));
      
        setIsOpen(false);
       
        setSelectedQuestion("");
       
        
    

      } catch (error) {
        console.error("Error updating question:", error);
        if (error.response) {
          console.log("Server response data:", error.response.data);
        }
      }
    };
  return (
    <>

<select
  id="category"
  value={selectedCategory}
  onChange={handleOnChange}

  className={` ${theme === 'dark' ? ' bg-gray-700' :'bg-base-purple border-light-purple' } border  text-white text-lg rounded-lg  block w-full p-2.5 `}
>
  <option className="ml-2 text-gradient" value="Choose a category">
    Choose a category
  </option>
  {category.slice()
    .sort()
    .map((cat, i) => (
      <option key={i} value={cat}>
        {cat}
      </option>
    ))}
</select>

{filteredQuestions.length ? (
        filteredQuestions.map((question, index) => (
          <div
            key={index}
            className={`${theme === 'dark' ? ' bg-gray-700' :'bg-dull-purple border-light-purple' } flex flex-col p-5 mt-5 text-white rounded-lg text-gray-700 border-2 border-gray-200 ${
              sentQuestion.includes(index) ? "grayscale -inset" : ""
            }`}
          >
          
          <h2 className={` ${theme === 'dark' ? ' bg-gray-700' :'text-gradient '} text-2xl font-bold mb-4 text-center `}> <span>{index + 1} </span>
              {question.questionText}</h2>

           
            <ul>
        {question.options.map((option, i) => (
          <li key={i} className="p-3 text-left">
            <span className="mr-5">{String.fromCharCode(65 + i)} </span>
            {option}
          </li>
        ))}
      </ul>
     <div className="  grid grid-cols-5 gap-4 flex items-center justify-center">
     <div className="col-span-3">
     <Button color2="gradient-button" clickFunction={() => sendQuestion(question, index)} text="Send Question"/>
     </div>
     <div className="">
           <DeleteButton onDelete={() => deleteQuestion(question._id, index)}/>
           </div>
           
         <div className="">
         <EditButton onEdit={()=>handleEditClick(question._id,index)} />
         

           </div>
</div>
        
          </div>
        ))
      ) : (
        <p>Waiting for the questions...</p>
      )}

       { isOpen && (
          <>
         <UpdateQuestion updateQuestion={EditQuestion} question={selectedQuestion} close={closeButton}/>
         </>
         )
         }
    </>
  );
}

export default CreatorRoom;
