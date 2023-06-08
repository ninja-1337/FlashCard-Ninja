import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";
import { trpc } from "../utils/trpc";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Switch, Spacer } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'


const Home: NextPage = () => {
const [editMode ,setEditMode]= useState(false)
  const router = useRouter();
  const { data: session, status } = useSession();
  // {((formData.pricePerKg*formData.alivekg)+formData.slaugherPrice+formData.transferPrice)/formData.revievedNetKG}
  

  const { data: paralaves }  = trpc.auth.getFlashCards.useQuery();
  const [filtered ,setFiltered]= useState(paralaves)
  const filterGroup = (group:string) => {
		setFiltered(paralaves?.filter((paralavi:any) => {
			return paralavi.Group.includes(group);
		}))
	}
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

  useEffect(() => {
    if(filtered===undefined){
      filterGroup("");
    }
  }, ); 
  const   hadnleArrival=async ()=>{
    try {
    const flashcard=await  NewArrival.mutateAsync({text:""})
    router.push('/flashcard/'+flashcard?.id); 
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
  const { systemTheme, theme, setTheme } = useNextTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
  type ObjectWithAttributes = { [key: string]: any };

function getUniqueAttributeValues(objects: any, attribute: string): any[] {
  if (!Array.isArray(objects)) {
    return [];
  }
  const valuesSet = new Set<any>();

  objects.forEach((obj:any) => {
    if (obj.hasOwnProperty(attribute)) {
      valuesSet.add(obj[attribute]);
    }
  });

  return Array.from(valuesSet);
}

  const uniqueGroups = getUniqueAttributeValues(paralaves, 'Group');

  return (
    <>
      <Head>
        <title>FlashCard-Ninja</title>
        <meta name="description" content="Verbal Agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b">
   
        
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
           <span className="text-[hsl(280,100%,70%)]"> Manual </span>View
          </h1>
          <div>
          <>
          
              
		{uniqueGroups.length > 0 ? (
			<div className="genre-filter-wrapper">
         <button onClick={() => {
							filterGroup("");
						}} className={currentTheme=="dark" ? "filter bg-gradient-to-r font-medium from-slate-500 to-sky-600 p-2 m-1 rounded-md":"filter bg-gradient-to-r font-medium from-slate-300 to-sky-400 p-2 m-1 rounded-md"} > Reset Filters</button>
				{uniqueGroups.map((group) => (
					<button key={group} onClick={() => {
							filterGroup(group);
						}}  className={currentTheme=="dark" ? "filter bg-gradient-to-r font-medium from-slate-500 to-sky-600 p-2 m-1 rounded-md":"filter bg-gradient-to-r font-medium from-slate-300 to-sky-400 p-2 m-1 rounded-md"}>{group}</button>
				))}
			</div>
		) : (
			<p className="message">No Filters</p>
		)}
        </>
          {paralaves && filtered?.map((paralavi) => {
  return (
   
    
    <div key={paralavi.id} className="border border-gray-500 rounded-xl m-4 p-3">
    <a href={`/flashcardView/${paralavi.id.toString()}`} >
        <> <div>FlashCard Name : {paralavi.Name}</div>
        {/* <div >Created At : {paralavi.CreatedAt.toDateString()}<> </>{paralavi.CreatedAt.toLocaleTimeString()}{paralavi.Name=='NaN' && <span className="ml-1  text-red-700 min-w-fit max-w-fit rounded-lg bg-red-600">🗡️</span> } {paralavi.Name=='NaN' || <span  className="ml-1 text-green-700 min-w-fit max-w-fit rounded-lg bg-green-600">🗡️</span> } </div>
      */}
      <div >Points : {paralavi.frequency}<> </>{paralavi.CreatedAt.toLocaleTimeString()}{paralavi.Name=='NaN' && <span className="ml-1  text-red-700 min-w-fit max-w-fit rounded-lg bg-red-600">🗡️</span> } {paralavi.Name=='NaN' || <span  className="ml-1 text-green-700 min-w-fit max-w-fit rounded-lg bg-green-600">🗡️</span> } </div>
      {paralavi.Type=='NaN' || <span  className="ml-0 p-1 text-green-700 min-w-fit max-w-fit rounded-lg bg-green-200 opacity-60 m-1">FlashCard Type:{" "+paralavi.Type+" "} </span> } {paralavi.Group=='NaN' || <span  className="ml-0 text-green-700 p-1 m-1 min-w-fit max-w-fit rounded-lg bg-green-200 opacity-60">Group:{" "+paralavi.Group+" "} </span> }
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
