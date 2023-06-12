
import formidable from 'formidable';
import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {

   api: {
    bodyParser: false

  },
}

const filecollector = async (req : NextRequest, res : NextApiResponse) => {
  let data = req.body;
  let names;
  let url;
  let resp;
  if (req.method === "PUT") {
  
  }
  if (req.method === "GET") {

  }
  if (req.method === "POST") {
  console.log(req.body)

   resp="Post: "+data
  }

  res.status(200).json(resp);
};

export default filecollector;
