import { currentUser } from "@clerk/nextjs/server";
import { RedirectToSignIn } from "@clerk/nextjs";

import { db } from "@/lib/db";

import { Profile } from "@prisma/client"; // Assuming you're using Prisma and you have this type available

export const initialProfile = async (): Promise<Profile | null> => {
    const user = await currentUser();

    if (!user) {
        return null;
    }

    const profile = await db.profile.findUnique({
        where: {
            userId: user.id,
        },
    });

    if (profile) {
        return profile;
    }

    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}`,
            imageUrl: user.imageUrl,
            email: user.emailAddresses[0].emailAddress,
        },
    });

    return newProfile;
};
