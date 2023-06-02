import clsx from "clsx";
import { Button } from "./Button";
import React, { useState } from "react";
import { trpc } from "../utils/trpc";
import { useTheme as useNextTheme } from 'next-themes'

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


<div className="card h-60vh w-2/3 h-2/3 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500" onClick={toggleState}>
      {isFront ? <FrontContent card={FlashCard}/> : <BackContent card={FlashCard}/>}
     
    </div>



  );
}
function FrontContent(card :any) {
  return    <div className="card w-full h-60vh p-16 rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-purple-500">
      {/* Add the content of the card here */}
      <h1>Name {card.card.Name}</h1>
      <div>Question : {card.card.Description}</div>
      <div>Points : {card.card.points}</div>

    </div>;
}

function BackContent(card :any) {
  return    <div className="card h-full p-16 w-full h-60vh rounded-lg shadow-lg bg-gradient-to-r from-red-500 to-purple-500">
      {/* Add the content of the card here */}
      <h1>Back</h1>
    </div>;
}