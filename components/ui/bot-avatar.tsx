import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@clerk/nextjs"

export const BotAvatar=()=>{
    const {user}=useUser();
    return (
        <Avatar className="h-8 w-8">
           <AvatarImage src="/logo.png"/>
        </Avatar>
    )
}