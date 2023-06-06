import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { SocialIcon } from "react-social-icons";
import { trpc } from "../../utils/trpc";
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    console.log(formData);
  };

  const slug=router.query.inventory?.toString()
 
  const { data: ArrivalData, isFetched, isFetching } =  trpc.auth.getFlashCardById.useQuery({ text: slug+""});

  const updateFlashCard = trpc.auth.updateFlashCard.useMutation();
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState<FormData>({

    flashcardName:ArrivalData?.Name+"",
    flashcardType:ArrivalData?.Type+"",
    flashcardGroup:ArrivalData?.Group+"",
    flashcardDescription:ArrivalData?.Description+"",
    flashcardAnswer:ArrivalData?.Answer+"",
    flashcardFrequency:ArrivalData?.frequency+"",
   
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  
  };

const x=async ()=>{
 await updateFlashCard.mutateAsync({id:ArrivalData?.id+"",
  Name:formData?.flashcardName+"",
  Type:formData?.flashcardType+"",
  Group:formData?.flashcardGroup+"",
  Description:formData?.flashcardDescription+"",
  Answer:formData?.flashcardAnswer+"",
  Frequency:formData?.flashcardFrequency+"",

 })

}
useEffect(() => {
  x()
   
  }, [formData]); 

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
          <p>FlashCard ID: {router.query.inventory}</p>
          <p>Created At: {ArrivalData?.CreatedAt.toLocaleString()}</p>

          {(typeof ArrivalData?.Name === 'string' && !isFetching)&&
        <form onSubmit={handleSubmit}>
 
          <div  className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Name:</label>
        <input
          type="text"
          id="flashcardName"
          name="flashcardName"
          value={formData.flashcardName}
          onChange={handleChange}
        />
      </div>
      <div  className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Type:</label>
        <input
          type="text"
          id="flashcardType"
          name="flashcardType"
          value={formData.flashcardType}
          onChange={handleChange}
        />
      </div>
      <div  className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Group :</label>
        <input
          type="text"
          id="flashcardGroup"
          name="flashcardGroup"
          value={formData.flashcardGroup}
          onChange={handleChange}
        />
      </div>

          <div  className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Description : :</label>
        <input
          type="text"
          id="flashcardDescription"
          name="flashcardDescription"
          value={formData.flashcardDescription}
          onChange={handleChange}
        />
      </div>
      <div className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Answer :</label>
        <input
          type="text"
          id="flashcardAnswer"
          name="flashcardAnswer"
          value={formData.flashcardAnswer}
          onChange={handleChange}
        />
      </div>
      <div  className="items-center justify-center flex   ">
        <label htmlFor="name">FlashCard Frequency :</label>
        <input
          type="text"
          id="flashcardFrequency"
          name="flashcardFrequency"
          value={formData.flashcardFrequency}
          onChange={handleChange}
        />
      </div>
      {/* <h2 className="items-center justify-center flex  flex-col text-2xl font-extrabold tracking-tight ">
           <span className="text-[hsl(280,100%,70%)]">  </span> Paralavi
          </h2> */}
 
      

      <div className="items-center justify-center flex mt-3 flex-col">
      <button onClick={  ()=>{ router.push('/')}} className="rounded-3xl bg-orange-500 p-5 text-white">
            Back
            </button>
            </div>
    </form>
    
}
        {/* {!session && (
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <>
            <div className="rounded bg-orange-400 p-1" color="inherit">
              Please login to send me a message
            </div>
            <div>
              <button onClick={() => signIn("google")}>
                <SocialIcon
                  network="google"
                  style={{ height: 25, width: 25 }}
                />
              </button>
              <button onClick={() => signIn("discord")}>
                <SocialIcon
                  network="discord"
                  style={{ height: 25, width: 25 }}
                />
              </button>
            </div>
          </>
        )}{session && (
          <>

            <p className="text-black-600  bold text-3xl">Previous Messages</p>
           
          </>
        )} */}
           
      </main>
    </>
  );
};

export default Home;
