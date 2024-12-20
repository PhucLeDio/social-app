import Page from "@/app/(auth)/(routes)/sign-in/[[...sign-in]]/page"
import { ChatHeader } from "@/components/chat/chat-header";
import { getOrCreateConversation } from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface MemberIdPageProps {
    params: Promise<{
        memberId: string;
        serverId: string;
    }>
}

const MemberIdPage = async (props: MemberIdPageProps) => {
    const params = await props.params;
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }

    const currentMember = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        },
        include: {
            profile: true,
        },
    });

    if(!currentMember) {
        return redirect("/")
    }

    const conversation = await getOrCreateConversation(currentMember.id, params.memberId);

    if(!conversation){
     return redirect(`/servers/${params.serverId}`);   
    }

    const { memberOne, memberTwo } = conversation;

    const otherMember = memberOne.profileId === profile.id ? memberTwo : memberOne;

    return (
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
                imageUrl={otherMember.profile.imageUrl} 
                serverId={params.serverId} 
                name={otherMember.profile.name} 
                type={"conversation"}            />
        </div>
    );
}


export default MemberIdPage;