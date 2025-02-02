import React, { useState } from 'react';
import Header from './Header';
import correct from '../assets/correct.svg';

const Mcqs = ({ quiz }) => {
  const [selectedCorrectOptions, setSelectedCorrectOptions] = useState({}); // To track selected correct answers

  const handleOptionClick = (e, correctAnswer, optionIndex, questionIndex) => {
    const labelElement = e.currentTarget; // Target the clicked label
    const inputElement = labelElement.querySelector('input');

    // Convert the correct answer ('A', 'B', 'C', 'D') to its respective index (0, 1, 2, 3)
    const correctOptionIndex = correctAnswer.charCodeAt(0) - 'A'.charCodeAt(0);

    if (optionIndex === correctOptionIndex) {
      // Add green border and rotation for the correct answer
      labelElement.classList.add('rotate-x-360', 'border-green-500');
      inputElement.checked = true; // Mark the option as selected

      // Update the selected correct options state
      setSelectedCorrectOptions((prevState) => ({
        ...prevState,
        [questionIndex]: optionIndex,
      }));
    } else {
      // Add red border for incorrect answer
      labelElement.classList.add('border-red-500');
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center">
        {quiz && quiz.length > 0 ? (
          <div>
            {quiz.map((item, questionIndex) => {
              const { question, options, correctAnswer } = item; // Destructure item
              return (
                <div key={questionIndex} className="mb-4 w-8/12 mx-auto">
                  <p className="text-gray-300 text-2xl font-Lato">
                    Q{")  "} {question}
                  </p>
                  <div className="text-white mb-20">
                    {options?.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className="relative block border border-gray-800 p-5 ml-5 my-5 w-[800px] rounded-xl hover:cursor-pointer transition-transform duration-500"
                        onClick={(e) =>
                          handleOptionClick(e, correctAnswer, optionIndex, questionIndex)
                        }
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={option}
                        // className="hidden"
                        />
                        <span className="ml-5 font-mono">{option}</span>

                        {/* Show correct image if the correct option is selected */}
                        {selectedCorrectOptions[questionIndex] === optionIndex && (
                          <img
                            src={correct}
                            alt="Correct"
                            className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6"
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-white">No MCQs available.</p>
        )}
      </div>
    </div>
  );
};

export default Mcqs;
