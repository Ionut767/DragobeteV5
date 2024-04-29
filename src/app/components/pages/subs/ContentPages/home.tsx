"use client";
import { useEffect, useState } from "react";
import PostStructure from "./components/poststructure";
import Comments from "./components/comments";
import { showContent } from "@/app/servercomponents/contentActions";

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
    const response = await showContent(page);
    // if (response && response.content && response.code === 200) {
    //   setContent((prevContent) => [...prevContent, ...response.content]);
    //   setPage(page + 1);
    // } if( response && response.content && response.code === 204)
    //   {
    //     setContent((prevContent) => [
    //       ...prevContent,
    //       { message: "All posts have been shown. Now repeating them." },
    //     ]);
    //     setPage(0);
    //   }
    //   else {
    //   setContent((prevContent) => [
    //     ...prevContent,
    //     { message: "All posts have been shown. Now repeating them." },
    //   ]);
    //   setPage(0);
    // }
    if (response && response.code) {
      const content = response.content || [];
      switch (response.code) {
        case 200:
          setContent((prevContent) => [...prevContent, ...content]);
          setPage(page + 1);
          break;
        case 204:
          setContent((prevContent) => [
            ...prevContent,
            {
              message: "You're all caught up! No new posts to show.",
              code: 204,
            },
          ]);
          setPage(0);
          break;
        case 404:
          setContent((prevContent) => [
            ...prevContent,
            {
              message: "Oops! It seems there are no posts available.",
              code: 404,
            },
          ]);
          setPage(0);
          break;
        case 500:
          setContent((prevContent) => [
            ...prevContent,
            {
              message:
                "Something went wrong on our end. Please try again later.",
              code: 500,
            },
          ]);
          setPage(0);
          break;
      }
    }
  }
  return (
    <div className="w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center">
      {content.map((item, index) => (
        <div className="w-full flex justify-center" key={index}>
          {("message" && "code") in item ? (
            <div className="w-full text-center py-4">{item.message}</div>
          ) : (
            <PostStructure
              authorName={item.authorName}
              authorImage={item.authorImage}
              openComments={openComments}
              setOpenComments={setOpenComments}
              type="Popular"
              imageSrc={item.image}
              description={item.description}
            />
          )}
        </div>
      ))}

      <Comments openComments={openComments} setOpenComments={setOpenComments} />
      {content.some((item) => [404, 500].includes(item.code)) ? null : (
        <>
          <div className="w-full h-4" />
          <div id="scroll-anchor" className="h-4 w-full text-center">
            Loading...
          </div>
        </>
      )}
    </div>
  );
}
