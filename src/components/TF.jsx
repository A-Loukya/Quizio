import React, { useState } from 'react';
import Header from './Header';
import ScratchToReveal from './ui/scratch-to-reveal';

const TF = ({ quiz }) => {
  const [userAnswers, setUserAnswers] = useState([]); // Tracks user's selected answers
  const [isSubmit, setIsSubmit] = useState(false);
  const [score, setScore] = useState(0);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const handleOptionClick = (index, value) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[index] = value; // Update the selected answer for the question
    setUserAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    let calculatedScore = 0;

    quiz.forEach((item, index) => {
      if (item.correctAnswer.toLowerCase() === userAnswers[index]?.toLowerCase()) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setIsSubmit(true); // Show the scratch card
  };

  const handleSeeAnswers = () => {
    setShowCorrectAnswers(true); // Highlights the correct answers
    setIsSubmit(false); // Removes scratch card and buttons
  };

  const handleTryAgain = () => {
    setUserAnswers([]);
    setScore(0);
    setIsSubmit(false);
    setShowCorrectAnswers(false);
  };

  return (
    <div>
      <Header />
      <div className="flex w-8/12 flex-col mx-auto mt-10">
        {quiz && quiz.length > 0 ? (
          quiz.map((item, index) => (
            <div key={index} className="mb-6 flex justify-between items-center pb-4">
              <p className="text-gray-300 text-xl font-Lato w-7/12">
                Q) {item.question}
              </p>
              <div className="flex">
                <button
                  className={`border border-gray-300 rounded-md mx-2 w-16 h-10 ${
                    showCorrectAnswers
                      ? item.correctAnswer.toLowerCase() === 'true'
                        ? 'bg-green-500'
                        : userAnswers[index]?.toLowerCase() === 'true'
                        ? 'bg-red-500'
                        : 'bg-transparent'
                      : userAnswers[index] === 'True'
                      ? 'bg-gray-500'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleOptionClick(index, 'True')}
                  disabled={isSubmit || showCorrectAnswers}
                >
                  True
                </button>
                <button
                  className={`border border-gray-300 rounded-md mx-2 w-16 h-10 ${
                    showCorrectAnswers
                      ? item.correctAnswer.toLowerCase() === 'false'
                        ? 'bg-green-500'
                        : userAnswers[index]?.toLowerCase() === 'false'
                        ? 'bg-red-500'
                        : 'bg-transparent'
                      : userAnswers[index] === 'False'
                      ? 'bg-gray-500'
                      : 'bg-transparent'
                  }`}
                  onClick={() => handleOptionClick(index, 'False')}
                  disabled={isSubmit || showCorrectAnswers}
                >
                  False
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No True/False questions available.</p>
        )}
      </div>
      {!isSubmit && !showCorrectAnswers && (
        <button
          className="block px-4 py-3 mt-14 rounded-lg border bg-blue-500 text-white mx-auto w-[140px] hover:opacity-70"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
      {isSubmit && !showCorrectAnswers && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center">
          <p className="font-Fredoka text-2xl font-medium mb-5">Scratch the card to see the score</p>
          <ScratchToReveal
            width={250}
            height={250}
            minScratchPercentage={50}
            className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
            gradientColors={['#A97CF8', '#F38CB8', '#FDCC92']}
          >
            <p className="text-9xl text-black">{score}</p>
          </ScratchToReveal>
          <div className="mt-5 flex gap-5">
            <button
              className="px-4 py-2 rounded-lg border bg-green-500 text-white hover:opacity-80"
              onClick={handleSeeAnswers}
            >
              See Answers
            </button>
            <button
              className="px-4 py-2 rounded-lg border bg-red-500 text-white hover:opacity-80"
              onClick={handleTryAgain}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TF;
