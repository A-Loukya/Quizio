import React, { useRef, useState } from 'react';
import Header from './Header';
import ScratchToReveal from './ui/scratch-to-reveal';

const Blanks = ({ quiz }) => {
    const answersRef = useRef([]); // Store the user answers
    const inputRefs = useRef([]); // Store references to input fields
    const [isSubmit, setIsSubmit] = useState(false);
    const [score, setScore] = useState(0);
    const [scratchBtns, setScratchBtns] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    const handleInputChange = (value, index) => {
        answersRef.current[index] = value.trim(); // Store the trimmed value
    };

    const handleSubmit = () => {
        let calculatedScore = 0;

        quiz.forEach((item, index) => {
            const userAnswer = answersRef.current[index]?.toLowerCase() || '';
            const correctAnswer = item.correctAnswer?.toLowerCase() || '';
            if (userAnswer === correctAnswer) {
                calculatedScore++;
            }
        });

        setScore(calculatedScore); // Update score after calculation
        console.log('User Answers:', answersRef.current);
        setIsSubmit(true); // Show the scratch card
    };

    const handleComplete = () => {
        setScratchBtns(true); // Enable buttons after scratch card is revealed
    };

    const handleTryAgain = () => {
        // Reset user answers and states
        answersRef.current = [];
        inputRefs.current.forEach((input) => {
            if (input) input.value = ''; // Clear all input fields
        });
        setScore(0);
        setIsSubmit(false);
        setScratchBtns(false);
    };

    const handleShowAnswers = () => {
        setShowAnswers(true);
        setIsSubmit(false);
        setScratchBtns(false)
    }

    return (
        <div>
            <Header />
            <div className="flex justify-center flex-col mt-20">
                {quiz && quiz.length > 0 ? (
                    quiz.map((item, index) => (
                        <div key={index} className="mb-4 flex justify-evenly">
                            <p className="text-gray-300 text-xl font-Lato w-5/12">Q) {item.question}</p>
                            <div>
                                {showAnswers ? <div className="w-[200px] h-10 px-2 py-1 rounded-md mr-9 bg-transparent border border-gray-600">{item.correctAnswer}</div> : <input
                                    type="text"
                                    placeholder="Answer"
                                    className="w-[200px] h-10 px-2 py-1 rounded-md mr-9 bg-transparent border border-gray-600"
                                    onChange={(e) => handleInputChange(e.target.value, index)}
                                    ref={(el) => (inputRefs.current[index] = el)} // Store reference to this input
                                />}


                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No blank questions available.</p>
                )}
            </div>
            {!showAnswers && (
                <button
                    className="block px-4 py-3 mt-14 rounded-lg border bg-blue-500 text-white mx-auto w-[140px] hover:opacity-70"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}
            {isSubmit && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center">
                    <p className="font-Fredoka text-2xl font-medium mb-5">Scratch the card to see the score</p>
                    <ScratchToReveal
                        width={250}
                        height={250}
                        minScratchPercentage={50}
                        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-gray-100"
                        onComplete={handleComplete}
                        gradientColors={["#A97CF8", "#F38CB8", "#FDCC92"]}
                    >
                        <p className="text-9xl text-black">{score}/5</p>
                    </ScratchToReveal>
                    {scratchBtns && (
                        <div className="mt-5 flex gap-5">
                            <button
                                className="px-4 py-2 rounded-lg border bg-red-500 text-white hover:opacity-80"
                                onClick={handleTryAgain}
                            >
                                Try Again
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg border bg-green-500 text-white hover:opacity-80"
                                onClick={handleShowAnswers}
                            >
                                See Answers
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Blanks;
