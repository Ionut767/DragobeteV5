"use client";

import { useSession } from "next-auth/react";
import { FaRegBookmark } from "react-icons/fa6";
import { TbGridScan } from "react-icons/tb";

export default function Profile() {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <div className=" w-full bg-white flex flex-col">
        <div className="flex flex-row m-4 mb-6">
          <img
            src={session.user?.image as string}
            alt={session.user?.name as string}
            className="rounded-full size-24 mr-7"
          />
          <div className=" flex justify-center flex-col w-full">
            <p className="font-semibold text-xl mb-2">{session.user?.name}</p>
            <div className=" flex flex-row">
              {["Edit Profile", "Settings"].map((item) => (
                <button
                  key={item}
                  className="mr-3 bg-[#363636] bg-opacity-50 rounded-md py-1 px-2 text-white "
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full px-4 pb-6">
          <p className="font-semibold text-xl">
            {(session.user.name as string).toLowerCase()}
          </p>
          <p className="text-sm text-gray-500 whitespace-pre-wrap">
            Nulla proident aliquip nostrud velit excepteur enim.
          </p>
          {/* To Do: Add a <br> system */}
        </div>
        <div className="w-full py-4 flex flex-row justify-around border-y border-y-gray-300">
          {["posts", "followers", "following"].map((item: string) => (
            <p
              key={item}
              className="font-semibold flex flex-col items-center text-sm"
            >
              <span>0</span> {item}
            </p>
          ))}
        </div>
        <div className="w-full py-4 flex flex-row justify-around border-b border-y-gray-300">
          {[<TbGridScan size={25} />, <FaRegBookmark size={20} />].map(
            (item, index) => (
              <p
                key={index}
                className="font-semibold text-sm flex flex-row items-center"
              >
                <span className=" sm:mr-1">{item}</span>
                <span className="sm:block text-lg font-bold hidden">Name</span>
              </p>
            )
          )}
        </div>
      </div>
    );
  else return <p>You are not logged in!</p>;
}
