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
    <div
      className={
        id != "bot" ? "float-right clear-both" : "float-left clear-both"
      }
    >
<>{id.id}</>
<>{FlashCard?.CreatedAt.toDateString()||<>ggtgg</>}</>




<div onClick={toggleState}>
      {isFront ? <FrontContent /> : <BackContent />}
    </div>



    </div>
  );
}
function FrontContent() {
  return <h1>Front</h1>;
}

function BackContent() {
  return <h1>Back</h1>;
}