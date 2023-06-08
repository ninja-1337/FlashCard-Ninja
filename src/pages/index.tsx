import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";
import { trpc } from "../utils/trpc";
import React, { useState, ChangeEvent, FormEvent, useEffect  } from 'react';
import { useRouter } from 'next/router';
import { Switch, Spacer } from "@nextui-org/react";
import { useTheme as useNextTheme } from 'next-themes'
import { Fab, Action } from 'react-tiny-fab';

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
  const { systemTheme, theme, setTheme } = useNextTheme();

  const currentTheme = theme === 'system' ? systemTheme : theme;
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
    const flashcard= await NewArrival.mutateAsync({text:""})
    router.push('/flashcard/'+flashcard?.id); 
    } catch (cause) {
      console.error({ cause }, "Failed to add post");
    }
  }
  const   deleteArrival=async (id: string)=>{
    try {
    await delArrival.mutateAsync({text:id})
    window.location.reload();
    } catch (cause) {
      console.error({ cause }, "Failed to delete");
    }
  }

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
        <title>B-Inventory</title>
        <meta name="description" content="Verbal Agent" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" min-h-screen  items-center justify-center bg-gradient-to-b">
   
      <div className="items-center justify-center flex">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
           <span className="text-[hsl(280,100%,70%)]"> FlashCard</span>Ninja
          </h1>
          </div>
          <div className="items-center justify-center flex">
          <span className="pt-2"><span className="pt-0">Enable Editing</span>
          <span>
          <Switch  className="pt-2" size="xs" onChange={()=>{
          
               setEditMode(!editMode)
            
          }} preventDefault={false} checked={editMode} ></Switch></span></span>
          </div>


          <div className="overflow-auto  align-middle lg:flex items-center justify-center">
          
              
          {uniqueGroups.length > 0 ? (
            <div className="   inline-flex   overflow-x-hidden items-center justify-center ">
              <span className="w-14"></span>
               <button onClick={() => {
                    filterGroup("");
                  }} className={currentTheme=="dark" ? " min-w-fit  filter bg-gradient-to-r font-medium from-slate-500 to-sky-600 p-2 m-1 rounded-md":"min-w-fit filter bg-gradient-to-r font-medium from-slate-300 to-sky-400 p-2 m-1 rounded-md "} > Reset Filters</button>
              {uniqueGroups.map((group) => (
                <button key={group} onClick={() => {
                    filterGroup(group);
                  }}  className={currentTheme=="dark" ? " min-w-fit  filter bg-gradient-to-r font-medium from-slate-500 to-sky-600 p-2 m-1 rounded-md":" min-w-fit filter bg-gradient-to-r font-medium from-slate-300 to-sky-400 p-2 m-1 rounded-md  "}>{group}</button>
              ))}
               <span className="w-14"></span>
            </div>
          ) : (
            <p className="message">No Filters</p>
          )}
              </div>
      
          <div>
          <div className="h-55vh overflow-auto pt-2">
          {paralaves && filtered?.map((paralavi) => {
  return (
  
    <div key={paralavi.id} className="flex align-middle justify-center overflow-y-hidden">
    <div className="flex align-middle justify-center max-w-3xl  overflow-y-auto">
    <div  key={paralavi.id} className="border border-gray-500 rounded-xl m-4 p-3 w-full max-w-3xl  flex align-middle justify-center">
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
    </div>
 
 </div>

 
  );
})}
       </div>



    </div >
         <div className="items-center justify-center flex pt-4">
            <button onClick={hadnleArrival} className="rounded-full bg-orange-400 p-6  text-white">
            +  New FlashCard
            </button>
            </div>
      </main>
    </>
  );
};

export default Home;
