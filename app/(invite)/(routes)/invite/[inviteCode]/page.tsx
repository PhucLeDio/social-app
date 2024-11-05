import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface InviteCodePageProps {
    params: {
        inviteCode: string;
    };
};

const InviteCodePage = async ({ params }: InviteCodePageProps) => {
    const profile = await currentProfile();

    if (!profile) {
        return <RedirectToSignIn />;
    }

    if (!params.inviteCode) {
        return redirect("/");
    }

    // Check if the server exists and if the profile is already a member
    const existingServer = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    });

    if (existingServer) {
        return redirect(`/servers/${existingServer.id}`);
    }

    // Find the server by the invite code
    const server = await db.server.findFirst({
        where: {
            inviteCode: params.inviteCode,
        },
    });

    // If no server is found, you may want to handle this case
    if (!server) {
        return redirect("/"); // Redirect or handle the error appropriately
    }

    const updatedServer = await db.server.update({
        where: {
            id: server.id,
        },
        data: {
            members: {
                create: [
                    {
                        profileId: profile.id,
                    }
                ]
            }
        }
    });

    return(`/servers/${server.id}`);
}
 
export default InviteCodePage;