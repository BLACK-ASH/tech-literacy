"use server";

import connectDB from "@/lib/Database/connection";
import Participation from "@/lib/Database/Models/participation.model";

export const getParticipants = async (name: string) => {
    await connectDB();
    const participants = await Participation.find({ eventId: name }).populate("members").lean();
    return JSON.parse(JSON.stringify(participants));
}