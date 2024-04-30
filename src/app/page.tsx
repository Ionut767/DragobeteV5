"use client";

import { useSession } from "next-auth/react";
import Main from "./components/pages/Main";
import Master from "./components/pages/Master";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <p>Loading...</p>;
  }
  return <>{session && status === "authenticated" ? <Master /> : <Main />}</>;
}
