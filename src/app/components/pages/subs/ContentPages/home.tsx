"use client";
import { useEffect, useState } from "react";
import PostStructure from "./poststructure";

export default function Home() {
  const [content, setContent] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchMoreContent();
      }
    });
    const scrollAnchor = document.querySelector("#scroll-anchor");
    if (scrollAnchor) {
      observer.observe(scrollAnchor);
    } else {
      console.error("Scroll anchor not found");
    }
    return () => observer.disconnect();
  }, [fetchMoreContent]);
  async function fetchMoreContent() {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=${page}&limit=10`
    );
    setContent([...content, ...(await response.json())]);
    setPage(page + 1);
  }
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">
      {content.map((item, index) => (
        <div key={index}>
          <PostStructure imageSrc={item.download_url} />
        </div>
      ))}
      <div id="scroll-anchor" className="h-4 w-full text-center">
        Loading...
      </div>
    </div>
  );
}
