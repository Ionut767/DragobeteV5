"use client";
import { FaHeart } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa6";
import { FaRegPaperPlane } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

export const formatText = (text: string) => {
  let content = text.split(/((?:#|@|https?:\/\/[^\s]+)[a-zA-Z]+)/);
  let hashtag;
  let username;
  return content.map((word, index) => {
    if (word.startsWith("#")) {
      hashtag = word.replace("#", "");
      return (
        <Link href={`/hashtag/${hashtag}`} key={index}>
          <span className=" text-purple-700 font-bold">{word}</span>
        </Link>
      );
    } else if (word.startsWith("@")) {
      username = word.replace("@", "");
      return (
        <Link href={`/profile/${username}`} key={index}>
          <span className=" text-purple-950 font-extrabold">{word}</span>
        </Link>
      );
    } else if (word.includes("http")) {
      return (
        <p className="hidden" key={index}>
          {word}
        </p>
      );
    } else {
      return <span key={index}>{word}</span>;
    }
  });
};
export default function PostStructure({
  imageSrc,
  description,
  type,
  openComments,
  setOpenComments,
}: {
  imageSrc: string;
  description: string;
  type: "Suggested" | "For you" | "Popular";
  openComments: boolean;
  setOpenComments: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fullDescription, setFullDescription] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const descriptionText = formatText(description);
  return (
    <div className="flex flex-col w-full bg-white">
      <div id="profile" className="mt-2 p-2 flex flex-row items-center">
        <div className="flex justify-center rounded-full cursor-pointer size-8 mr-2">
          <Image
            src={imageSrc}
            alt={"User"}
            className=" rounded-full cursor-pointer"
            width={100}
            height={100}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-bold text-sm">Intus23</p>
          <p className=" text-xs italic">{type}</p>
        </div>
      </div>
      <div
        id="post"
        className="bg-white max-w-md w-full sm:p-4 flex flex-col items-center md:border border-y border-gray-300 rounded-lg sm:mx-0"
      >
        <div className="w-full bg-gray-300 rounded-lg h-auto max-h-[650px] relative">
          {isLoading && (
            <div
              role="status"
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
            >
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <Image
            onDoubleClick={() => setIsLiked(!isLiked)}
            src={imageSrc}
            className={`w-full h-full max-h-[650px] object-cover md:rounded-lg z-0 relative ${
              isLoading && "blur-sm"
            } transition-all duration-1000`}
            alt="Image"
            width={100}
            height={100}
            unoptimized
            loading="lazy"
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div
          id="menu"
          className="w-full bg-white flex flex-col md:p-3 py-2 px-2"
        >
          <div
            id="buttons"
            className="flex flex-row justify-between items-center"
          >
            <div className="flex flex-row">
              {[
                <FaHeart size={25} color={`${isLiked ? "red" : ""}`} />,
                <FaRegCommentDots size={25} />,
                <FaRegPaperPlane size={25} />,
              ].map((item, index) => (
                <span
                  key={index}
                  className="flex items-center justify-center px-2"
                  onClick={() =>
                    (index === 0 && setIsLiked(!isLiked)) ||
                    (index === 1 && setOpenComments(!openComments))
                  }
                >
                  {item}
                </span>
              ))}
            </div>
            <span className=" font-extrabold text-xl">...</span>
          </div>
          <div className="flex flex-col h-full pt-2">
            <p
              id="text"
              className={`w-full text-sm  ${
                !fullDescription && "truncate"
              } pb-1 pr-2`}
              onClick={() => setFullDescription(true)}
            >
              {descriptionText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
