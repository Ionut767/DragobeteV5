"use client";
import { useEffect, useState } from "react";
import PostStructure from "./components/poststructure";
import Comments from "./components/comments";

export default function Home() {
  const [content, setContent] = useState<any[]>([]);
  const [page, setPage] = useState<number>(0);
  const [openComments, setOpenComments] = useState<boolean>(false);
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
      console.error("Couldn't load more posts!");
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
        <div className="w-full flex justify-center" key={index}>
          <PostStructure
            openComments={openComments}
            setOpenComments={setOpenComments}
            type="Popular"
            imageSrc={item.download_url}
            description="@Inorog is the #best robotic team ever! Tech Stuff, programming, etc!"
          />
        </div>
      ))}

      <Comments openComments={openComments} setOpenComments={setOpenComments} />

      <div className="w-full h-4" />
      <div id="scroll-anchor" className="h-4 w-full text-center">
        Loading...
      </div>
    </div>
  );
}
