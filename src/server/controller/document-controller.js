 

//  import {Document} from "../schema/documentSchema.js"

   const Documnet = require('../schema/documentSchema.js')

  const getDocument= async(id)=>{
     if(id===null) return 
    const document= await Document.findById(id);

     if(document) return document;
      
     return await Document.create({_id:id, data:""});
 }

    const updateDocument= async( id, data)=>{
        return await Document.findByIdAndUpdate(id,{data});
    }

    updateDocument();
 getDocument();