import React, { useState } from 'react';
import Header from './Header';

const Flashcards = ({ quiz }) => {
  const [flipped, setFlipped] = useState(Array(quiz.length).fill(false)); // Track the flipped state for each card

  const handleFlip = (index) => {
    const newFlipped = [...flipped]; // Copy the current flipped state
    newFlipped[index] = !newFlipped[index]; // Toggle the flipped state for the clicked card
    setFlipped(newFlipped); // Update the state
  };

  return (
    <div>
        <Header/>
        <div className='w-[900px] mx-auto flex justify-between flex-wrap'>
    <div className="flex justify-center mt-10 gap-4 flex-wrap">
      {quiz && quiz.length > 0 ? (
        quiz.map((item, index) => (
          <div
            key={index}
            className=" mx-4 my-4 flex justify-center items-center"
          >
            <div
              className={`flashcard-card w-[400px] h-[300px] border text-white rounded-lg p-5 relative ${
                flipped[index] ? 'flipped' : ''
              }`}
              onClick={() => handleFlip(index)} // Flip card on click
            >
              <div className="front p-5 cursor-pointer rounded-lg">
                <p className="text-center font-mono text-xl font-medium">
                  {item.question}
                </p>
              </div>
              <div className="back p-5 cursor-pointer rounded-lg">
                <p className="text-center font-Lato text-xl ">
                  {item.correctAnswer}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No flashcards available.</p>
      )}
      </div>
    </div>
    </div>
  );
};

export default Flashcards;
