"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function Content() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section")?.toLowerCase();

  const content = useMemo(() => {
    switch (section) {
      case "home":
        return <p>Home</p>;
      case "search":
        return <p>Search</p>;
      case "explore":
        return <p>Explore</p>;
      case "shorts":
        return <p>Shorts</p>;
      case "messages":
        return <p>Messages</p>;
      case "notifications":
        return <p>Notifications</p>;
      case "create":
        return <p>Create</p>;
      case "profile":
        return <p>Profile</p>;
      default:
        return null; // In working, return null...
    }
  }, [section]);

  return (
    <div className="w-full h-[91vh] bg-zinc-50">
      <p>Current Section: {section}</p>
      {content}
    </div>
  );
}
