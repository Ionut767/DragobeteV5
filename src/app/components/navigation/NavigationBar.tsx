"use client";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";

export default function NavigationBar() {
  const [open, setOpen] = useState<boolean>(false);
  let isLoggedIn = false;
  return (
    <nav className="border-gray-400 border-b-[1px] bg-zinc-50 sticky top-0 w-full h-[9vh]">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Logo />
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 "
          aria-controls="navbar-default"
          aria-expanded="false"
          onClick={() => setOpen(!open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${open ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            {["Feedback", "About"].map((bp) => (
              <li
                key={bp}
                className="cursor-pointer hover:animate-pulse font-extrabold"
              >
                <Link
                  href={"/" + bp.toLocaleLowerCase()}
                  className="block py-2 px-3 text-gray-700 rounded hover:bg-gray-300"
                >
                  {bp}
                </Link>
              </li>
            ))}
            <li className="font-extrabold">
              <ProfileButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
