"use client"
import React, { useState } from 'react'
import ImageSelection from './_components/ImageSelection'
import RoomType from './_components/RoomType'
import DesignType from './_components/DesignType'
import AdditionalReq from './_components/AdditionalReq'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { storage } from '@/config/firebaseConfig'
import { useUser } from '@clerk/nextjs'

function CreateNew() {

  const{user}=useUser();
  const [formData,setFormData]=useState({});
  const onHandInputChange=(value,fieldName)=>{
    setFormData(prev=>({
      ...prev,
      [fieldName]:value
    }))
    console.log(formData);
  }
  const GenerateAiImage=async()=>{
    const rawImageUrl=await SaveRawImageToFirebase();
    const result=await axios.post('/api/redesign-room',{
      imageUrl:rawImageUrl,
      roomType:formData?.roomType,
      designType:formData?.designType,
      additionalReq:formData?.additionalReq

    });
    console.log(result.data);
  }

  const SaveRawImageToFirebase=async()=>{
    const fileName=Date.now()+"_raw.png";
    const imageRef=ref(storage,'room-redesign/'+fileName);

    await uploadBytes(imageRef,formData.image).then(resp=>{
      console.log('File Uploaded...')

    })

    const downloadUrl=await getDownloadURL(imageRef);
    console.log(downloadUrl);
    return downloadUrl;
    

  }


  return (
    <div>
      <h2 className='font-bold text-4xl text-primary text-center'>Experience the Magic of AI Remodeling</h2>
      <p className='text-center text-gray-500'> Transform any room with a click.Select a space, choose a style, and watch as AI instantly reimagines your environment. </p>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-10 gap-10'>
        {/*Image Selection*/}
        <ImageSelection selectedImage={(value)=>onHandInputChange(value,'image')}/>
        {/*Form Input Section*/}
        <div>
          {/*Room Type*/}
          <RoomType selectedRoomType={(value)=>onHandInputChange(value,'roomType')}/>

          {/*Design Type*/}
          <DesignType selectedDesignTye={(value)=>onHandInputChange(value,'designType')}/>

          {/*Additional Requirement TextArea(Optional)*/}
          <AdditionalReq additionalRequirementInput={(value)=>onHandInputChange(value,'additionalReq')}/>

          {/*Button to Generate Image*/}
          <Button className='w-full mt-5' onClick={GenerateAiImage}>Generate</Button>
          <p className='text-sm text-gray-400 mb-52'>NOTE: 1 Credit Will Be Used To Generate The Design </p>
        </div>
      </div>
    
    </div>
  )
}

export default CreateNew