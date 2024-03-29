"use client";
import { useState } from "react";
import { GoSearch } from "react-icons/go";

export default function Explore() {
  const [search, setSearch] = useState<string>("");
  return (
    <div className="w-full mt-2">
      <form className="w-full bg-gray-300 py-2 px-4 border border-gray-400 rounded-md flex flex-row">
        <GoSearch
          className={`text-2xl mr-2 ${search.length > 0 && "hidden"}`}
        />
        <input
          type="text"
          placeholder="Search..."
          className="w-full bg-gray-300 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
    </div>
  );
}
