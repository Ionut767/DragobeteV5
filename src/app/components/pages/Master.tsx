"use client";

import Content from "./subs/content";
import ControlBar from "./subs/controlbar";

export default function Master() {
  return (
    <main className="flex md:flex-row flex-col-reverse ">
      <ControlBar />
      <Content />
    </main>
  );
}
