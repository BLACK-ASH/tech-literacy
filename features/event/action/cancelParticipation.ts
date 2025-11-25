"use server"

import { auth } from "@/lib/Auth/auth";
import { User } from "@/lib/Auth/auth-client";
import connectDB from "@/lib/Database/connection";
import Participation, { ParticipationType } from "@/lib/Database/Models/participation.model";
import { headers } from "next/headers";


export const hasPermissionToCancleParticipation = async (
    participation: ParticipationType
): Promise<boolean> => {
    const seheaders = await headers();
    const user: User | undefined = await auth.api.getSession({ headers: seheaders }).then((res) => res?.user);

    if (!user) return false;

    // Check if user is a member
    const isMember = participation.members.some(
        (m) => m.email === user.email
    );

    // Check admin permission
    const permissionResult = await auth.api.userHasPermission({
        body: {
            userId: user.id,
            permissions: {
                participation: ["delete"],
            },
        },
    })

    const isAdmin = permissionResult.success === true;

    // Return true only if admin OR member
    return isAdmin || isMember;
};

export const cancelParticipation = async (participation: ParticipationType): Promise<boolean> => {
    if (!participation) return false;
    if (!hasPermissionToCancleParticipation(participation)) return false;
    await connectDB()
    try {
        const res = await Participation.deleteOne(participation);
        return res.acknowledged
    } catch (error) {
        console.error(error);
        return false
    }
}