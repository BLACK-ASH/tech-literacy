"use server";

import { auth } from "@/lib/Auth/auth";
import { User } from "@/lib/Auth/auth-client";
import { ParticipationType } from "@/lib/Database/Models/participation.model";
import { headers } from "next/headers";


export const hasPermissionToUpdateParticipation = async (
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
                participation: ["update"],
            },
        },
    })

    const isAdmin = permissionResult.success === true;

    // Return true only if admin OR member
    return isAdmin || isMember;
};
