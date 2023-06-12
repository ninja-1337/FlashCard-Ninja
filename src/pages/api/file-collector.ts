
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
  const promise = new Promise((resolve, reject) => {

    const form = new formidable.IncomingForm();
  
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields, files});
    })
  
   })
  
   return promise.then(({fields, files}:any) => {
      res.status(200).json({ fields, files })
   })
};

export default filecollector;
