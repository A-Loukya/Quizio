"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

const cards = [
  {
    id: 1,
    type: "mcq",
    title: "Multiple Choice Question",
    question: "Does Quizio only let you learn in MCQs?",
    options: ["Yes", "Nope, it’s versatile!", "Only T/F", "Just Flashcards"],
    correctAnswer: 1,
  },
  {
    id: 2,
    type: "blank",
    title: "Fill in the Blank",
    question: "With Quizio, learning is always ___!",
    correctAnswer: "fun",
  },
  {
    id: 3,
    type: "tf",
    title: "True/False",
    question: "Quizio lets you scratch to reveal your score!",
    correctAnswer: true,
  },
  {
    id: 4,
    type: "flashcard",
    title: "Flashcard",
    question: "Can we pick a topic and generate quizzes in any format?",
    answer: "Absolutely!",
  },
];

export default function CardStackPeek() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const nextCard = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  }, []);

  const prevCard = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  }, []);

  const handleAnswer = (cardId, answer) => {
    setAnswers((prev) => ({ ...prev, [cardId]: answer }));
  };

  return (
    <div className="w-full max-w-md mx-auto mt-16 relative z-10">
      <div className="relative h-[450px] overflow-hidden">
        <div className="flex items-center justify-center h-full">
          <AnimatePresence>
            {cards.map((card, index) => {
              const offset = index - currentIndex;

              return (
                <motion.div
                  key={card.id}
                  initial={{
                    scale: 0.9,
                    x: offset * 360,
                  }}
                  animate={{
                    scale: index === currentIndex ? 1 : 0.9,
                    x: offset * 360,
                    zIndex: index === currentIndex ? 1 : 0,
                  }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  className="absolute w-full max-w-[350px]"
                >
                  <Card className="w-full h-[420px] bg-gradient-to-r from-[#2e3a54] to-[#404E69] text-white border border-gray-700 rounded-xl shadow-xl flex items-center justify-center">
                    <CardContent className="flex flex-col items-center justify-between h-full p-6 pt-10">
                      <div className="flex flex-col items-center justify-center">
                        <h2 className="text-2xl font-semibold mb-4 text-white font-Fredoka">
                          {card.title}
                        </h2>
                        {card.type === "mcq" && (
                          <>
                            <p className="mb-6 text-center text-gray-300">
                              {card.question}
                            </p>
                            <div className="w-[230px]">
                              {card.options.map((option, optionIndex) => {
                                const isCorrect =
                                  answers[card.id] === optionIndex &&
                                  optionIndex === card.correctAnswer;
                                const isWrong =
                                  answers[card.id] === optionIndex &&
                                  optionIndex !== card.correctAnswer;

                                return (
                                  <label
                                    key={optionIndex}
                                    className={`border block px-4 py-2 mb-3 text-center text-sm font-medium rounded-lg transition-all duration-300 cursor-pointer ${isCorrect
                                        ? "bg-green-500 text-white border border-green-500"
                                        : isWrong
                                          ? "bg-red-500 text-white border border-red-500"
                                          : " text-gray-300 hover:bg-gray-700"
                                      }`}
                                    onClick={() =>
                                      handleAnswer(card.id, optionIndex)
                                    }
                                  >
                                    {option}
                                  </label>
                                );
                              })}
                            </div>
                          </>
                        )}

                        {card.type === "blank" && (
                          <div className="flex flex-col justify-center items-center h-full mt-16">
                            <p className="mb-4 text-center text-gray-300">
                              {card.question}
                            </p>
                            <input
                              type="text"
                              className="w-full px-4 py-2 mb-4 text-gray-900 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
                              onChange={(e) =>
                                handleAnswer(card.id, e.target.value)
                              }
                              placeholder="Your answer"
                            />
                            {answers[card.id] && (
                              <p
                                className={`text-center font-bold ${answers[card.id].toLowerCase() ===
                                    card.correctAnswer.toLowerCase()
                                    ? "text-green-400"
                                    : "text-red-400"
                                  }`}
                              >
                                {answers[card.id].toLowerCase() ===
                                  card.correctAnswer.toLowerCase()
                                  ? "Correct!"
                                  : `Wrong! Answer: ${card.correctAnswer}`}
                              </p>
                            )}
                          </div>
                        )}

                        {card.type === "tf" && (
                          <>
                            <p className="mb-6 text-center text-gray-300 mt-16">
                              {card.question}
                            </p>
                            <div className="flex gap-4">
                              <button
                                onClick={() => handleAnswer(card.id, true)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${answers[card.id] === true
                                    ? card.correctAnswer === true
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                    : "bg-gray-700 hover:bg-gray-600"
                                  }`}
                              >
                                True
                              </button>
                              <button
                                onClick={() => handleAnswer(card.id, false)}
                                className={`px-6 py-2 rounded-lg font-medium transition-all ${answers[card.id] === false
                                    ? card.correctAnswer === false
                                      ? "bg-green-500"
                                      : "bg-red-500"
                                    : "bg-gray-700 hover:bg-gray-600"
                                  }`}
                              >
                                False
                              </button>
                            </div>
                          </>
                        )}

                        {card.type === "flashcard" && (
                          <div
                            className={`mt-16 w-[250px] h-full flex items-center justify-center rounded-lg text-center p-4 cursor-pointer transition-all duration-300 ease-in-out transform ${answers[card.id] === "answer" ? "bg-gray-700" : "bg-gray-800"
                              } ${answers[card.id] === "answer" ? "scale-105" : "scale-100"}`}
                            onClick={() =>
                              handleAnswer(
                                card.id,
                                answers[card.id] === "answer" ? "question" : "answer"
                              )
                            }
                          >
                            {answers[card.id] === "answer" ? card.answer : card.question}
                          </div>
                        )}


                      </div>
                      {/* Navigation Buttons */}
                      <div className="flex justify-between w-full ">
                        <Button
                          onClick={prevCard}
                          size="icon"
                          className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          onClick={nextCard}
                          size="icon"
                          className="bg-gray-800 text-white hover:bg-gray-700"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
