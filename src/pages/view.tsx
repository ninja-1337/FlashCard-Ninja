import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";
import { trpc } from "../utils/trpc";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { Switch, Spacer } from "@nextui-org/react";


const Home: NextPage = () => {
const [editMode ,setEditMode]= useState(false)
  const router = useRouter();
  const { data: session, status } = useSession();
  // {((formData.pricePerKg*formData.alivekg)+formData.slaugherPrice+formData.transferPrice)/formData.revievedNetKG}
  

  const { data: paralaves }  = trpc.auth.getFlashCards.useQuery();
  if (paralaves) {
    paralaves.sort((a, b) => {
      const dateA = a.CreatedAt.getTime();
      const dateB = b.CreatedAt.getTime();
  
      return  dateB-dateA;
    });
  }
  const NewArrival = trpc.auth.NewFlashCard.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });
  const delArrival = trpc.auth.DeleteFlashCard.useMutation({
    async onSuccess() {
      // refetches posts after a post is added
    },
  });


  const   hadnleArrival=async ()=>{
    try {
    const id=await (await NewArrival.mutateAsync({text:""})).id
    router.push('/flashcard/'+id); 
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  }
  const   deleteArrival=async (id: string)=>{
    try {
    await (await delArrival.mutateAsync({text:id}))
    window.location.reload();
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  }
  return (
    <>
      <Head>
        <title>FlashCard-Ninja</title>
        <meta name="description" content="Verbal Agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
   
        
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
           <span className="text-[hsl(280,100%,70%)]"> FlashCard</span>Ninja
          </h1><span className="pt-2"><span className="pt-0">Enable Editing</span>
          <span>
          <Switch  className="pt-2" size="xs" onChange={()=>{
          
               setEditMode(!editMode)
            
          }} preventDefault={false} checked={editMode} ></Switch></span></span>
          <div>
          {paralaves && paralaves.map((paralavi) => {
  return (
   
    
    <div key={paralavi.id} className="border border-gray-500 rounded-xl m-4 p-3">
    <a href={`/flashcardView/${paralavi.id.toString()}`} >
        <> <div>FlashCard ID : {paralavi.id}</div>
      <div >Created At : {paralavi.CreatedAt.toDateString()}<> </>{paralavi.CreatedAt.toLocaleTimeString()}{paralavi.Name=='NaN' && <span className="ml-1  text-red-700 min-w-fit max-w-fit rounded-lg bg-red-600">🗡️</span> } {paralavi.Name=='NaN' || <span  className="ml-1 text-green-700 min-w-fit max-w-fit rounded-lg bg-green-600">🗡️</span> } </div>
      {paralavi.Type=='NaN' || <div  className="ml-0 text-green-700 min-w-fit max-w-fit rounded-lg bg-green-200 opacity-60">FlashCard Type:{" "+paralavi.Type+" "} </div> }
      </>
      </a>
      {editMode ? <button onClick={()=>{deleteArrival(paralavi.id)}}  className="rounded-lg bg-red-500  mt-0 p-1 z-0">Delete</button>:<></>}
   
    </div>
 

     
 
  );
})}
  



    </div>
         
            {/* <button onClick={hadnleArrival} className="rounded-full bg-orange-400 p-6  text-white">
            +  New FlashCard
            </button>
        */}
      </main>
    </>
  );
};

export default Home;
