
import formidable from 'formidable';
import { NextRequest, NextResponse } from "next/server";

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {

   api: {
    bodyParser: false

  },
}

const filecollector = async (req : NextRequest, res : NextApiResponse) => {
  const data = await req.formData();
  let resp;
  if (req.method === "PUT") {
  
  }
  if (req.method === "GET") {

  }
  if (req.method === "POST") {
  console.log(req)

   resp="Post: "+data
  }

  res.status(200).json(data);
};

export default filecollector;
