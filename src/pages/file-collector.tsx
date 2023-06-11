import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const collector: NextPage = () => {

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0b3bd6] to-[#f8a221]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            About <span className="text-[hsl(280,100%,70%)]">FlashCard</span> Ninja
          </h1>
          <h1 className="text-5xl font-extrabold leading-normal text-white md:text-[5rem]">
            <span className="text-2xl font-bold text-white"></span>
          </h1>

          <p className="text-2xl font-bold ">

          Welcome to FlashCard Ninja Share Target!

Create and Master FlashCards easily through sharing links and text through other apps on your phone</p>
    
        </div>
      </main>
    </>
  );
};

export default collector;
