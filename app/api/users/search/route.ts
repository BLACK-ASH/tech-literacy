// app/api/users/search/route.ts
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";

    if (!query) return NextResponse.json([]);

    const client = new MongoClient(process.env.MONGODB_URI as string);
    const db = client.db();

    const users = await db
        .collection("user") // Better Auth default
        .find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } },
            ],
        })
        .limit(10)
        .toArray();

    return NextResponse.json(users);
}
