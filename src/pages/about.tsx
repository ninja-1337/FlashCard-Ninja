import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

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

          Welcome to FlashCard Ninja!

Create and Master FlashCards with our innovative app. Whether you `&apos;`re a student, a language learner, or just someone looking to expand your knowledge, FlashCard Ninja is the perfect tool to enhance your learning experience. With our user-friendly interface and powerful features, you can easily create custom flashcards, organize them into different groups, and test your knowledge with an engaging game.
          </p>
    
        </div>
      </main>
    </>
  );
};

export default Home;
