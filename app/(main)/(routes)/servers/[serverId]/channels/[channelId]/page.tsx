import { ChatHeader } from "@/components/chat/chat-header";
import { ChatInput } from "@/components/chat/chat-input";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { RedirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps {
    params: Promise<{
        serverId: string;
        channelId: string;
    }>
}


const ChannelIdPage = async (props: ChannelIdPageProps) => {
    const params = await props.params;
    const profile = await currentProfile();

    if (!profile) {
        return <RedirectToSignIn />;
    }

    const channel = await db.channel.findUnique({
        where: {
            id: params.channelId,
        }
    })

    const member = await db.member.findFirst({
        where: {
            serverId: params.serverId,
            profileId: profile.id,
        }
    });

    if (!channel || !member) {
        redirect("/")
    }

    return(
        <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
            <ChatHeader 
            serverId={channel.serverId}
            name={channel.name} 
            type="channel" 
            />
            <div className="flex-1">
                Future Mess
            </div>
            <ChatInput 
            name={channel.name}
            type="channel"
            apiUrl={"/api/socket/messages"} 
            query={{
                channelId: channel.id,
                serverId: channel.serverId,
            }} 
    
            />
        </div>
    );
}

export default ChannelIdPage;