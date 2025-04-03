"use client";
import Image from "next/image";
import React, { useState } from "react";

function ImageSelection({ selectedImage }) { // Fix: Destructure prop properly
  const [file, setFile] = useState(null);

  const onFileSelected = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile);
    setFile(selectedFile);
    if (selectedImage) {
      selectedImage(selectedFile);
    }
  };

  return (
    <div>
      <label>Select Image of Your Room</label>
      <div className="mt-3">
        <label htmlFor="upload-image">
          <div
            className={`p-28 border rounded-xl border-dotted flex justify-center border-primary bg-slate-200 cursor-pointer hover:shadow-lg ${
              file ? "p-0 bg-white" : ""
            }`}
          >
            {!file ? (
              <Image src={"/upload.png"} width={70} height={70} alt="Upload Icon" />
            ) : (
              <Image
                src={URL.createObjectURL(file)}
                width={300}
                height={300}
                className="w-[300px] h-[300px] object-cover"
                unoptimized={true} // Required for blob URLs
                alt="Selected Image"
              />
            )}
          </div>
        </label>
        <input
          type="file"
          accept="image/*"
          id="upload-image"
          style={{ display: "none" }}
          onChange={onFileSelected}
        />
      </div>
    </div>
  );
}

export default ImageSelection;
