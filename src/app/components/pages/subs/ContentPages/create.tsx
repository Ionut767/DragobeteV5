"use client";

import { addPost } from "@/app/servercomponents/postsActions";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  BsCameraVideo,
  BsFileEarmarkArrowUp,
  BsFillCloudArrowUpFill,
} from "react-icons/bs";
// import { formatText } from "./components/poststructure"; //for preview

export default function Create() {
  const [state, formAction] = useFormState(addPost, {
    code: 0,
    error: "",
  });

  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageSize, setImageSize] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  // const [description, setDescription] = useState<string>(""); ///for preview
  const eventDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      state.code = 0;
      state.error = "";
      setSelectedFile(event.dataTransfer.files[0]);
    }
  };
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      const img = new (window as any).Image();
      img.onload = function () {
        setImageSize(parseFloat((selectedFile.size / 1024 / 1024).toFixed(2)));
        if (imageSize > 5) {
          setSelectedFile(undefined);
          state.code = 400;
          state.error =
            "Oops! The selected image doesn't meet our size requirements. Please choose another one.";
        } else {
          state.code = 0;
          state.error = "";
        }
      };
      img.src = objectUrl;
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile, imageSize]);

  function SubmitButton() {
    const { pending } = useFormStatus();
    return (
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
        disabled={pending}
      >
        {pending ? "Adding the post..." : "Add Post"}
      </button>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center bg-[#F8F8F8] md:m-10 m-0 overflow-y-auto pb-[9svh]">
      <form
        className=" md:w-11/12 w-full  bg-white shadow-xl p-5 rounded-lg "
        action={async (FormData: FormData) => {
          if (selectedFile) {
            FormData.set("source", selectedFile);
          }
          formAction(FormData);
        }}
      >
        {!selectedFile ? (
          <>
            <label
              className={`flex justify-center items-center ${
                dragging ? " bg-gray-200" : "bg-[#F8F8F8]"
              } hover:border-black border-gray-400 transition-all duration-300 border-dotted border-2 h-96 rounded-lg`}
              htmlFor="source"
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={eventDrop}
            >
              <div className="w-full h-full flex justify-center items-center flex-col">
                <BsFillCloudArrowUpFill color="gray" size={80} />
                <p className=" text-black font-bold">
                  <span
                    className="cursor-pointer font-extrabold whitespace-nowrap text-black bg-gradient-to-r bg-clip-text p-1 text-transparent 
                    from-indigo-500 via-purple-500 to-indigo-500 
                    animate-text"
                  >
                    Drag and drop
                  </span>{" "}
                  or{" "}
                  <span
                    className="cursor-pointer font-extrabold whitespace-nowrap text-black bg-gradient-to-r bg-clip-text p-1 text-transparent 
                    from-indigo-500 via-purple-500 to-indigo-500 
                    animate-text"
                  >
                    click
                  </span>{" "}
                  to upload
                </p>
                <span className="cursor-pointer bg-[#FE2C55] text-white font-bold py-2 px-6 rounded mt-2">
                  Select a video
                </span>
              </div>
            </label>
            <div className=" bg-white">
              <div className="flex items-center space-x-2 text-sm font-semibold pt-2">
                <BsCameraVideo size={16} />
                <span>Max size: 5MB</span>
                <BsFileEarmarkArrowUp size={16} />
                <span>.jpg, .png, .gif, .webp and .jpeg</span>
              </div>
            </div>
            <input
              className="hidden"
              type="file"
              name="source"
              onChange={(e) => {
                setSelectedFile(e.target.files?.[0]);
                setDragging(false);
              }}
              required
              id="source"
              placeholder="source"
              accept=".jpg, .png, .gif, .webp, .jpeg"
            />
          </>
        ) : (
          <>
            <div className="w-full flex lg:flex-row flex-col-reverse">
              <div className=" lg:w-3/5 w-full">
                <div className="mb-4">
                  <label
                    className={`${
                      state.error.toLowerCase().includes("description") &&
                      " text-red-700"
                    } block text-gray-700 text-sm font-bold mb-2`}
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    className={`${
                      state.error.toLowerCase().includes("description") &&
                      "border-red-500 border"
                    } bg-[#F8F8F8] resize-none shadow appearance-none border rounded w-full max-h-[100px] min-h-[100px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                    name="description"
                    id="description"
                    // onChange={(e) => setDescription(e.target.value)}
                    placeholder="Short description of the post..."
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sound"
                  >
                    Sound / Music
                  </label>
                  <input
                    className=" bg-[#F8F8F8] cursor-not-allowed shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    disabled
                    name="sound"
                    id="sound"
                    placeholder="Coming soon..."
                  />
                </div>
              </div>
              <div className="lg:pl-5 lg:w-2/5 lg:max-h-[30svh] flex flex-col items-center justify-center">
                <Image
                  className=" w-full h-full object-contain bg-black p-1"
                  src={URL.createObjectURL(selectedFile)}
                  alt={selectedFile.name || "Posting this image..."}
                  width={200}
                  height={200}
                />
                {imageSize && (
                  <p className="text-black font-extrabold ">{imageSize}MB</p>
                )}
              </div>
            </div>

            {state.code === 200 ? (
              <p className="text-green-500 font-extrabold">
                Post added successfully!
              </p>
            ) : (
              <div className="flex justify-start flex-row">
                <button
                  onClick={() => {
                    setSelectedFile(undefined);
                    state.code = 0;
                    state.error = "";
                    setDragging(false);
                  }}
                  className="bg-purple-700 hover:bg-purple-900 text-white font-bold py-2 px-4 mr-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Discard
                </button>
                <SubmitButton />
              </div>
            )}
          </>
        )}
      </form>
      {(() => {
        switch (state.code) {
          case 400:
            return (
              <p className="text-red-500 font-extrabold">
                Error: {state.error}
              </p>
            );
          case 401:
            return (
              <p className="text-red-500 font-extrabold">
                Error: {state.error}
              </p>
            );
          case 500:
            return (
              <p className="text-red-500 font-extrabold">
                Error: {state.error}
              </p>
            );
          default:
            return null;
        }
      })()}
    </div>
  );
}
