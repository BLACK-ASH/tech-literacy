"use server";

import connectDB from "@/lib/Database/connection";
import Participation, { ParticipationType } from "@/lib/Database/Models/participation.model";

export const eventRegister = async (data: ParticipationType) => {
    await connectDB();

    try {
        // -------------------------------------
        // 1. Check if any member already registered for the same event
        // -------------------------------------
        const memberEmails = data.members.map(m => m.email);

        const existingMember = await Participation.findOne({
            eventId: data.eventId,
            "members.email": { $in: memberEmails }
        });

        if (existingMember) {
            return {
                status: "error",
                message: "One or more members are already registered for this event."
            };
        }

        // -------------------------------------
        // 2. Check if team name already exists for this event (only for teams)
        // -------------------------------------
        if (data.type === "team") {
            const teamExists = await Participation.findOne({
                eventId: data.eventId,
                name: data.name
            });

            if (teamExists) {
                return {
                    status: "error",
                    message: "A team with this name already registered for this event."
                };
            }
        }

        // -------------------------------------
        // 3. Create the registration
        // -------------------------------------
        const res = await Participation.create(data);

        return {
            status: "success",
            message: "Registration successful",
            data: JSON.parse(JSON.stringify(res))
        };

    } catch (e) {
        console.error("Registration error:", e);
        return { status: "error", message: "Registration failed" };
    }
};
