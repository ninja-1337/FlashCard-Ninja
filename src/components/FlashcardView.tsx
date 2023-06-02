import clsx from "clsx";
import Balancer from "react-wrap-balancer";
import { Button } from "./Button";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { useTheme as useNextTheme } from 'next-themes'
// wrap Balancer to remove type errors :( - @TODO - fix this ugly hack
const BalancerWrapper = (props: any) => <Balancer {...props} />;

export type Message = {
  who: "bot" | "user" | undefined;
  message?: string;
  theme?:any;
};


export default function ChatLine( id :any ) {
  const [isFront, setIsFront] = useState(true);
  const toggleState = () => {
    setIsFront(!isFront);
  };

  if (!id) {
    return null;
  }
  const { data: FlashCard, isFetched, isFetching } =  trpc.auth.getFlashCardById.useQuery({ text: id.id});

  return (


<div className="card sm:h-screen w-2/3 h-2/3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500" onClick={toggleState}>
      {isFront ? <FrontContent /> : <BackContent />}
    </div>



  );
}
function FrontContent() {
  return    <div className="card w-full h-full p-16 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
      {/* Add the content of the card here */}
      <h1>Front</h1>
    </div>;
}

function BackContent() {
  return    <div className="card h- p-16 w-full h-full rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-purple-500">
      {/* Add the content of the card here */}
      <h1>Back</h1>
    </div>;
}