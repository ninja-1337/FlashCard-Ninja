import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";
import { trpc } from "../../utils/trpc";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import FlashcardView from "../../components/FlashcardView";
interface FormData {

  flashcardName:string;
  flashcardType:string;
  flashcardGroup:string;
  flashcardDescription:string;
  flashcardAnswer:string;
  flashcardFrequency:string;
}

const Home: NextPage = () => {
 
  const router = useRouter();
  const { data: session, status } = useSession();
  // {((formData.pricePerKg*formData.alivekg)+formData.slaugherPrice+formData.transferPrice)/formData.revievedNetKG}

 
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Perform any necessary form submission logic here
   
  };

  const slug=router.query.inventory?.toString()
 
  const { data: ArrivalData, isFetched, isFetching } =  trpc.auth.getFlashCardById.useQuery({ text: slug?.toString()});

  const updateFlashCard = trpc.auth.updateFlashCard.useMutation();
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Head>
        <title>FlashCard</title>
        <meta name="description" content="Verbal Agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
 
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
           <span className="text-[hsl(280,100%,70%)]"> Flash </span> Card
          </h1>
          <FlashcardView id={slug}  />
       
      </main>
    </>
  );
};

export default Home;
