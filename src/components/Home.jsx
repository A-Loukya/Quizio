"use client";
import React from "react";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import Header from "./Header";
import CardStackPeek from "./Cards";
import Features from "./Features";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <div
        className="relative h-[130vh] overflow-hidden bg-background m-5 rounded-[50px]"
        style={{
          background: "linear-gradient(to top, #3E5080, transparent 50%)",
        }}
      >
        <div className=" flex items-center flex-col">
          <h3 className="text-white mt-28 font-Fredoka text-7xl z-10 mb-10">Quizio-Learn Your Way</h3>
          <p className="text-white font-light  font-Lato text-xl w-4/12 text-center mb-8 z-10">Explore personalized quizzes on your favorite topics! Enter your topic, choose your format, and enjoy customized quizzes tailored just for you</p>
          <Link to='/login'>
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full text-center p-px text-xs font-semibold leading-6 text-white inline-block w-[150px]">
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex items-center justify-center z-10 rounded-full bg-[#070916] ring-1 ring-white/10 text-xl p-4">
              Try now
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
          </Link>

          <CardStackPeek />
        </div>
        <AnimatedGridPattern
          numSquares={20}
          maxOpacity={0.2}
          duration={2}
          repeatDelay={1}
          className={cn("absolute inset-0")}
        />
      </div>
      {/* <Features /> */}
    </div>
  );
};

export default Home;
