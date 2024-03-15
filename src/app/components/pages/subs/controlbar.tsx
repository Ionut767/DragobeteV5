import Link from "next/link";

export default function ControlBar() {
  return (
    <div className="flex flex-col bg-zinc-50 h-[91vh] w-72 border-r-[1px] border-gray-400">
      <div className="mx-4">
        {[
          "Home",
          "Search",
          "Explore",
          "Shorts",
          "Messages",
          "Notifications",
          "Create",
          "Profile",
        ].map((item) => (
          <Link href={"/?section=" + item.toLocaleLowerCase()} key={item}>
            <p className="p-3 my-1 w-full hover:bg-gray-300 rounded-lg font-extrabold transition-colors ease-in duration-300">
              {item}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
