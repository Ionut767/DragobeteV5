"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import Home from "./ContentPages/home";
import Explore from "./ContentPages/explore";
import Profile from "./ContentPages/profile";
import Create from "./ContentPages/create";

export default function Content() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section")?.toLowerCase();

  const content = useMemo(() => {
    switch (section) {
      case "home":
        return <Home />;
      case "explore":
        return <Explore />;
      case "shorts":
        return <p>Shorts</p>;
      case "messages":
        return <p>Messages</p>;
      case "notifications":
        return <p>Notifications</p>;
      case "create":
        return <Create />;
      case "profile":
        return <Profile />;
      default:
        return <Home />;
    }
  }, [section]);

  return (
    <div className="w-full h-[91svh] bg-gray-100 flex justify-center ">
      {content}
    </div>
  );
}
