import { CiPaperplane } from "react-icons/ci";

export default function Comments({
  openComments,
  setOpenComments,
}: {
  openComments: boolean;
  setOpenComments: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`md:w-1/2 w-full bottom-0 ${
        openComments ? "translate-y-0" : "translate-y-full"
      } z-50 bg-white transition duration-150 ease-in-out absolute border-t border-gray-200`}
    >
      <button
        className="w-full font-extrabold border-b border-gray-300 text-[#6366f1]"
        onClick={() => setOpenComments(false)}
      >
        Close
      </button>
      <div className="flex flex-col justify-start max-h-[70vh] items-start h-2/4 overflow-y-auto p-4 w-full">
        {[...Array(100)].map((item, index) => (
          <div key={index} className="flex items-start mb-2 w-full">
            <div className="size-12 rounded-full mr-2 flex items-center overflow-hidden">
              <img
                src="https://picsum.photos/id/237/200/300"
                alt="Profile"
                className="object-cover rounded-full size-full"
              />
            </div>
            <div className="text-sm flex flex-col w-4/5">
              <strong>Username</strong>
              <p className=" break-words"> Lorem ipsum dolor</p>
              <div className="mb-1 text-gray-600 font-semibold text-xs">
                <span className="mr-2">5 min</span>
                <span>5 likes</span>
                <span className="ml-2">Reply</span>
              </div>
              {/* Add a reply system with the username tag! */}
              <button className="flex flex-row items-center font-bold">
                <div className="w-6 h-[1px] mr-2 bg-gray-600 " />
                <span className="text-gray-600 font-semibold text-xs">
                  View replies (1)
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <form className="border-t border-gray-400 p-2 flex flex-row">
        <input
          className="w-full py-2 px-4 border rounded-md"
          type="text"
          placeholder="Add a comment for ..."
        />
        <button type="submit" className="p-2">
          <CiPaperplane size={25} />
        </button>
      </form>
    </div>
  );
}
