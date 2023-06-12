
import formidable from 'formidable';

import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
   api: {
    bodyParser: false
  }
  },
}

const filecollector = async (req : NextApiRequest, res : NextApiResponse) => {
  // let data = req.body;
  // let names;
  // let url;
  // let resp;
  // if (req.method === "PUT") {
  //   data="Put: "+data
  // }
  // if (req.method === "GET") {
  //   data="GET: "+data
  // }
  // if (req.method === "POST") {
  // console.log(req.body)
  //  names=data.title
  //  url=data.url
  //  resp="Post: "+data
  // }
  

  const form = formidable({ multiples: true });

  let inputFields = {};
  
  form.parse(req.body, (err, fields, files) => {
    if (err) {
    
      return;
    }
    console.log(files)
    console.log(fields)
    inputFields = fields;
    res.status(200).json({ fields, files })
  });
  res.status(200).json(inputFields);
};

export default filecollector;
