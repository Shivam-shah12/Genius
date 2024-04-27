import { Card, CardContent } from "./card"
import { MAX_FREE_COUNTS } from "@/constants"
import { Progress } from "@/components/ui/progress"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "./button"
import {Zap} from 'lucide-react'
import { useProModal } from "@/hooks/user-pro-modal"



interface apiDataProps{
    apiLimitCount:number,
    isPro:boolean
}
export const FreeCounter=({apiLimitCount=0,isPro=false}:apiDataProps)=>{
    const [mounted,setMounted]=useState(false);
    const proModal=useProModal();
    useEffect(()=>{
        setMounted(true)
    },[])
    if(!mounted)
        return null;

    if(isPro)
        return null;
    

    return (
        <div className="px-3 ">
           <Card className="border-0 bg-white/10">
             <CardContent className="py-6">
                <div className="text-center text-white text-sm mb-4 space-y-2">
                  <p>{apiLimitCount}/{MAX_FREE_COUNTS} Free Generation</p>
                  <Progress  value={(apiLimitCount/MAX_FREE_COUNTS)*100}/>
                </div>
                <Button variant="premium" className="w-full" onClick={()=> proModal.onOpen()}>
                upgrade 
                <Zap className="w-4 h-4 ml-2  border-0  fill-white"/>
             </Button>
             </CardContent>
           </Card>
        </div>
    )
}