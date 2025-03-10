import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import axios from "axios";
import { storage } from "@/config/firebaseConfig";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { db } from "@/config/db";
import { AiGeneratedImage } from "@/config/schema";

const replicate = new Replicate({
    auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN
});

export async function POST(req) {
    try {
        const { imageUrl, roomType, designType, additionalReq } = await req.json();
        console.log("Received input:", { imageUrl, roomType, designType, additionalReq }); 

        if (!imageUrl || !roomType || !designType) {
            throw new Error("Missing required fields.");
        }

        const user = await currentUser();
        const userEmail = user?.emailAddresses?.[0]?.emailAddress || "unknown_user";

        const prompt = `A ${roomType} with a ${designType} style interior ${additionalReq || ''}`;

        console.log("Generating AI image with:", { imageUrl, prompt });

        const outputUrl = await generateAiImage(imageUrl, prompt);

        if (!outputUrl) {
            throw new Error("No output image URL from Replicate API.");
        }

        console.log("AI Generated Image URL:", outputUrl);

        const base64Image = await convertImageToBase64(outputUrl);

        const fileName = `${Date.now()}.png`;
        const storageRef = ref(storage, `room-redesign/${fileName}`);
        await uploadString(storageRef, base64Image.split(",")[1], "base64");
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Saved to Firebase:", downloadURL);

        await db.insert(AiGeneratedImage).values({
            roomType,
            designType,
            orgImage: imageUrl,
            aiImage: downloadURL,
            userEmail
        });
        console.log("Data inserted in DB");

        return NextResponse.json({ success: true, result: downloadURL });
    } catch (e) {
        console.error("API Error:", e);
        return NextResponse.json({ error: e.message || e.toString() }, { status: 500 });
    }
}

async function generateAiImage(imageUrl, prompt) {
    try {
        const response = await replicate.run(
            "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
            {
                input: {
                    image: imageUrl,
                    prompt,
                    guidance_scale: 15,
                    negative_prompt: "lowres, watermark, banner, logo, contactinfo, text, deformed, blurry, blur, out of focus, out of frame, surreal, extra, ugly, upholstered walls, fabric walls, plush walls, mirror, mirrored, functional, realistic",
                    prompt_strength: 0.8,
                    num_inference_steps: 30
                }
            }
        );

        let output = [];
        for await (const chunk of response) {
            output.push(chunk);
        }
        return output.length > 0 ? output[0] : null;
    } catch (error) {
        console.error("AI Image Generation Error:", error.message);
        throw new Error("Failed to generate AI image.");
    }
}

async function convertImageToBase64(imageInput) {
    try {
        if (imageInput instanceof Uint8Array) {
            console.log("Converting Uint8Array to Base64...");
            const base64String = Buffer.from(imageInput).toString("base64");
            return `data:image/jpeg;base64,${base64String}`;
        } 

        if (!imageInput || typeof imageInput !== "string" || !imageInput.startsWith("http")) {
            console.error("Invalid image input:", imageInput);
            throw new Error("Invalid image input.");
        }

        console.log("Fetching image from:", imageInput);
        const response = await axios.get(imageInput, {
            responseType: "arraybuffer",
            headers: { "Accept": "image/*" }
        });

        if (response.status !== 200) {
            console.error("Failed to fetch image, status:", response.status);
            throw new Error(`Failed to fetch image, status: ${response.status}`);
        }

        const contentType = response.headers["content-type"] || "image/png";
        const base64String = Buffer.from(response.data).toString("base64");

        console.log("Image successfully converted to Base64.");
        return `data:${contentType};base64,${base64String}`;
    } catch (error) {
        console.error("Image Conversion Error:", error.message);
        throw new Error("Failed to convert image to Base64.");
    }
}



