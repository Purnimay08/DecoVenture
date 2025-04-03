import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { user } = await req.json();

    try {
        // Check if user already exists
        const userInfo = await db
            .select()
            .from(Users)
            .where(eq(Users.email, user?.primaryEmailAddress.emailAddress));

        console.log("User", userInfo);

        // If user does NOT exist, insert them
        if (userInfo.length === 0) {
            const [newUser] = await db
                .insert(Users)
                .values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress.emailAddress,
                    imageUrl: user?.imageUrl,
                    credits: 3, // Set default credits
                })
                .returning(); // Return inserted user

            return NextResponse.json({ result: newUser });
        }

        // Return existing user with correct structure
        return NextResponse.json({ result: userInfo[0] });
    } catch (e) {
        return NextResponse.json({ error: e.message });
    }
}
