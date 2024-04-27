import Image from "next/image"
import { BotAvatar } from "../ui/bot-avatar"

export const Loader=()=>{
    return (
        <div className="h-full  flex flex-col justify-center items-center gap-y-4">
             <div className="w-10 h-10 relative origin-center animate-spin">
               <BotAvatar/>
            </div>
             <p className="text-sm text-muted-foreground text-center">Genius is thinking ...</p>
        </div>
    )
}