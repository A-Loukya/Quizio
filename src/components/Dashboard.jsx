import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";

const dummyQuiz = [
  {
      "question": "OOP stands for ______-Oriented Programming.",
      "correctAnswer": "Object"
  },
  {
      "question": "In OOP, ______ are the blueprints for creating objects.",
      "correctAnswer": "Classes"
  },
  {
      "question": "Encapsulation, Inheritance, and Polymorphism are the three main ______ of OOP.",
      "correctAnswer": "Principles"
  },
  {
      "question": "The ______ keyword is used to control access to class members in many OOP languages.",
      "correctAnswer": "Access"
  },
  {
      "question": "Overriding methods in subclasses allows for ______ behavior.",
      "correctAnswer": "Customized"
  }
]
// [
//   {
//     "question": "What is Java?",
//     "options": ["Programming Language", "Food", "Country", "City"],
//     "correctAnswer": "A"
//   },
//   {
//     "question": "What is HTML?",
//     "options": ["Programming Language", "Markup Language", "Software", "Hardware"],
//     "correctAnswer": "B"
//   },
//   {
//     "question": "What is HTML?",
//     "options": ["Programming Language", "Markup Language", "Software", "Hardware"],
//     "correctAnswer": "C"
//   },
//   {
//     "question": "What is HTML?",
//     "options": ["Programming Language", "Markup Language", "Software", "Hardware"],
//     "correctAnswer": "D"
//   },
//   {
//     "question": "What is HTML?",
//     "options": ["Programming Language", "Markup Language", "Software", "Hardware"],
//     "correctAnswer": "A"
//   },
// ];

const Dashboard = () => {
  const userInfo = useSelector((store) => store.users.users);
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedQuiz, setGeneratedQuiz] = useState("");
  const [error, setError] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [textpromt,setTextPrompt]=useState(null);
  const navigate = useNavigate(); // Use navigate for programmatic navigation

  // Log quizData whenever it changes
  useEffect(() => {
    console.log("quizData updated:", quizData);
  }, [quizData]);


  if (!userInfo) {
    return (
      <>
        <Header />
        <div className="text-white">User not logged in.</div>
      </>
    );
  }

  const inputs = [
    { type: "text" },
    // { type: "ppt" },
  ];

  const quizzes = [
    { type: "mcqs" },
    { type: "blanks" },
    { type: "T/F" },
    { type: "flashcards" },
  ];

  const handleInputClick = (type) => {
    setSelectedInput(type);
    if (type === "text") {
      setShowPopup(true); // Show popup when 'text' is selected
    } else {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = type === "photo" ? "image/*" : type === "pdf" ? ".pdf" : ".ppt";
      input.click();
    }
  };

  const handleQuizClick = (type) => {
    if(type==="mcqs"){
      setTextPrompt(`Please give me a only JSON of 5 mcqs on the topic of "${inputText}" in JSON format. Each question should include:
        - "question": The question text
        - "options": An array of four options (A, B, C, D)
        - "correctAnswer": The correct option letter (e.g., "A") (result should not contain anything but only json array not even heading)`)
    }
    else if(type==="blanks"){
      setTextPrompt(`Please generate a JSON with 5 fill-in-the-blank questions on the topic of "${inputText}". Each question should include:
  - "question": The question with blanks (e.g., "JavaScript is a ______ language")
  - "correctAnswer": The correct answer to fill in the blank (result should not contain anything but only json array not even heading)`)
    }
    else if(type==="T/F"){
      setTextPrompt(`Please generate a JSON with 5 true/false questions on the topic of "${inputText}". Each question should include:
  - "question": The true/false question text
  - "correctAnswer": The correct answer ("True" or "False") (result should not contain anything but only json array not even heading)`)
    
    }
    else{
      setTextPrompt(`Please generate a JSON with 5 flashcard-style questions on the topic of "${inputText}". Each flashcard should include:
  - "question": The question text
  - "correctAnswer": The correct answer text (result should not contain anything but only json array not even heading)`)
    }
    
    setSelectedQuiz(type);
  };

  // Uncomment and keep this function commented as per your requirement.
  const generateQuizFromAPI = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("https://api.cohere.ai/v1/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer acYHj6avauWCpDCS6LKHuNsiAGC1Uthv03n0ZLqK`, // Replace with your actual API key
        },
        body: JSON.stringify({
          model: "command-xlarge-nightly",
          prompt: textpromt,
          max_tokens: 600,
          temperature: 0.7,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch quiz. Please try again.");
      }
      
      const data = await response.json();
      const quiz = data.generations[0].text || "No quiz generated.";
      setGeneratedQuiz(quiz);
      setQuizData(data); // Store the quiz data for passing to quiz page
  
      // Automatically navigate to the quiz page
      navigate("/quiz", { state: { Data: quiz, quizType: selectedQuiz } });
  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleSubmit = () => {
    if (selectedInput === "text" && !inputText) {
      alert("Please enter a prompt for the quiz.");
      return;
    }
    if (!selectedQuiz) {
      alert("Please select a quiz type.");
      return;
    }

    console.log("Generating quiz...");
    console.log("Selected Input:", selectedInput);
    console.log("Input Text:", inputText);
    console.log("Selected Quiz Type:", selectedQuiz);

    // Instead of calling the API, set the dummy quiz for testing
    generateQuizFromAPI();
    // setGeneratedQuiz(JSON.stringify(dummyQuiz, null, 2)); // Formatting the quiz for display
    // setQuizData(dummyQuiz); // Storing dummy quiz data for navigation
  };

  return (
    <>
      <Header />
      <div className="text-white mx-40">
        <h1 className="text-center text-gray-400 text-4xl font-Fredoka">
          Welcome, {userInfo.uname}
        </h1>
        <p className="text-center text-md font-light my-4 mb-20">
          Please pick one option from both and click on generate to start the quiz.
        </p>

        <div className="flex flex-row justify-between items-center">
          {/* Input Types */}
          <div className="flex flex-col w-3/12">
            <p className="my-5">Select input type</p>
            <div className="border border-gray-400 rounded-md justify-center items-center py-6 flex flex-wrap w-[300px] h-[290px]">
              {inputs.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleInputClick(item.type)}
                  className={`border border-gray-400 rounded-md m-5 w-20 h-20 text-center transition-transform duration-300 hover:scale-110 ${
                    selectedInput === item.type ? "bg-gray-600" : ""
                  }`}
                >
                  {item.type}
                </button>
              ))}
            </div>
          </div>

          <hr className="w-40" />

          {/* Generate Button */}
          <button
            onClick={handleSubmit}
            className="px-4 py-3 rounded-lg border max-h-max hover:bg-white hover:text-black transition-transform duration-300 hover:scale-110"
          >
            {loading ? "Generating..." : "GENERATE"}
          </button>

          <hr className="w-40" />

          {/* Quiz Types */}
          <div className="flex flex-col w-3/12">
            <p className="my-5">Choose quiz type</p>
            <div className="border border-gray-400 rounded-md justify-center items-center py-6 flex flex-wrap w-[300px] h-[290px]">
              {quizzes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizClick(item.type)}
                  className={`border border-gray-400 rounded-md m-5 w-20 h-20 text-center transition-transform duration-300 hover:scale-110 ${
                    selectedQuiz === item.type ? "bg-gray-600" : ""
                  }`}
                >
                  {item.type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Popup for Text Input */}
        {showPopup && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
            <div className="bg-[#070916] text-white p-5 rounded-md shadow-md w-1/3">
              <h2 className="text-lg mb-4 font-Fredoka">Please enter the topic</h2>
              <textarea
                className="bg-[#070916] border w-full p-2 mb-4 rounded-md text-md"
                rows="3"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type..."
              ></textarea>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-black border rounded-md hover:opacity-70"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Display Generated Quiz */}
        {/* {generatedQuiz && (
          <div className="text-white mt-8">
            <h2 className="text-xl font-bold">Generated Quiz:</h2>
            <pre className="bg-gray-800 p-4 rounded-md">{generatedQuiz}</pre>
          </div>
        )} */}

        {/* Display Error Message */}
        {error && (
          <div className="text-red-500 mt-4">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Redirect Button (after quiz is generated) */}
        {generatedQuiz && (
          <button
            onClick={() =>
              navigate("/quiz", { state: { Data: generatedQuiz,quizType: selectedQuiz } })
            }
            className="px-4 py-3 rounded-lg border bg-blue-500 text-white mt-4 mx-auto"
          >
            Go to Quiz
          </button>
        )}
      </div>
    </>
  );
};

export default Dashboard;
