import { db } from "@/config/db";
import { storage } from "@/config/firebaseConfig";
import { AiGeneratedImage } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth:process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN

});
export async function POST(req) {
    //const {user}=useUser();
    const {imageUrl,roomType,designType,additionalReq}=await req.json();

    //convert image to ai 
    try{
        const input = {
            image: imageUrl,
            prompt: 'A'+roomType+'with a '+designType+'style interior'+additionalReq
        };
        
        // const output = await replicate.run("adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38", { input });
        // console.log(output)
        // return NextResponse.json({result:output})
         const output="https://replicate.delivery/xezq/jyvsdiKBRBqRMZekw2JpVSBvwpkfnAfasIuKreZODyITrD7RB/out.png"
    
    
    // convert output url to base64 
    
    const base64Image= await ConvertImagetoBase64(output);
    
    //save base64image to firebase
    /*const fileName=Date.now()+'.png';
    const storageRef=ref(storage,'room-redesign/'+fileName);
    await uploadString(storageRef,base64Image,'data_url');
    const downloadUrl=await getDownloadURL(storageRef);
    console.log(downloadUrl);
    //return NextResponse.json({'result':downloadUrl});
    //save all to database
    const dbResult=await db.insert(AiGeneratedImage).values({
        roomType:roomType,
        designType:designType,
        orgImage:imageUrl,
        aiImage:downloadUrl,
        userEmail:''
    }).returning({id:AiGeneratedImage.id}); 
    console.log(dbResult);
    return NextResponse.json({'result':dbResult});

*/

    }

    catch (e) {
        console.error("Error in Replicate API Call:", e);
        return NextResponse.json({ error: e.message || "Unknown error occurred" }, { status: 500 });
    }


    
    
}
async function ConvertImagetoBase64(imageUrl){
    const resp=await axios.get(imageUrl,{responseType:'arraybuffer'});  
    const base64ImageRaw=Buffer.from(resp.data).toString('base64');
    
    return "data:image/png;base64,"+ base64ImageRaw;
}