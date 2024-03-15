"use client";
import { signIn } from "next-auth/react";
export default function Main() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex justify-center items-center h-full flex-row pt-32 ">
        <h1
          className="scroll-m-20 h-full text-center text-6xl font-extrabold tracking-tight bg-gradient-to-r bg-clip-text p-5 text-transparent 
              from-indigo-500 via-purple-500 to-indigo-500 
              animate-text lg:text-8xl lg:leading-loose"
        >
          Dragobete Inorog{" "}
        </h1>
      </div>
      <div>
        <button
          onClick={() => signIn("google")}
          className="bg-gradient-to-r bg-indigo-500 hover:bg-indigo-600 text-white font-bold m-10 py-4 px-8 rounded text-lg"
        >
          Join Now!
        </button>
      </div>
    </main>
  );
}
