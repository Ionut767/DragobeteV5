"use client";
import Link from "next/link";
import { GoHome } from "react-icons/go";
import { GoSearch } from "react-icons/go";
import { GoPlusCircle } from "react-icons/go";
import { GoVideo } from "react-icons/go";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { signIn, useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";

export default function ControlBar() {
  const { data: session } = useSession();

  return (
    <div className="md:relative fixed justify-center md:justify-normal flex md:flex-col flex-row bg-zinc-50 md:min-h-[91svh] md:w-72 w-full border-r-[1px] border-gray-400 z-50">
      <div className="md:px-4 m-2 flex md:flex-col flex-row md:w-auto w-full md:justify-normal justify-around">
        {[
          { name: "Home", icon: <GoHome /> },
          { name: "Explore", icon: <GoSearch /> },
          { name: "Create", icon: <GoPlusCircle /> },
          { name: "Shorts", icon: <GoVideo /> },
          { name: "Messages", icon: <BiMessageSquareDetail /> },
          { name: "Notifications", icon: <FaRegHeart /> },
          {
            name: "Profile",
            icon: (
              <>
                {session && session.user?.image ? (
                  <>
                    <img
                      src={session.user?.image}
                      alt={session.user.name as string}
                      className=" md:hidden size-6 rounded-full cursor-pointer"
                    />
                    <CgProfile className="hidden md:block size-6 rounded-full cursor-pointer" />
                  </>
                ) : (
                  <button
                    className="cursor-pointer block py-2 px-3 text-gray-700 rounded hover:bg-gray-300"
                    onClick={() => signIn("google")}
                  >
                    Join
                  </button>
                )}
              </>
            ),
          },
        ].map((item) => (
          <Link
            href={"/?section=" + item.name.toLocaleLowerCase()}
            key={item.name}
            className={`flex items-center md:flex-row md:hover:bg-gray-300 rounded-lg md:p-3 my-1 ease-in duration-100 ${
              (item.name === "Messages" && "md:flex hidden") ||
              (item.name === "Notifications" && "md:flex hidden")
            }`}
          >
            <span className="flex justify-center text-2xl md:mr-2">
              {item.icon}
            </span>
            <p
              className={`md:block hidden w-full font-extrabold transition-colors 
              `}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
