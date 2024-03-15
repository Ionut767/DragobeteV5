"use client";
import { signIn, signOut, useSession } from "next-auth/react";
export default function ProfileButton() {
  const { data: session } = useSession();
  return (
    <>
      {session && session.user?.image ? (
        <img
          src={session.user?.image}
          alt={session.user.name as string}
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => signOut()}
        />
      ) : (
        <button
          className="cursor-pointer block py-2 px-3 text-gray-700 rounded hover:bg-gray-300"
          onClick={() => signIn("google")}
        >
          Join
        </button>
      )}
    </>
  );
}
