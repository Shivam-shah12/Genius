"use client"
import { Zap } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import axios from "axios"

interface SubscriptionButtonProps{
    isPro:boolean
}

export const SubscriptionButton=({
    isPro=false
}:SubscriptionButtonProps)=>{
    const onClick=async()=>{
      try {
        // setloading(true);
        const response=await axios.get(
            "/api/stripe"
        )
        window.location.href=response.data.url;
      } catch (error) {
         console.log("BILLING ERROR",error);
      }finally{
        // setloading(false);
      }
    }
    
   return ( <Button variant={isPro ? "default":"premium"} onClick={onClick}>
      {isPro ? "Manage Subscription": "Upgrade"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-white"/>}
    </Button>
   );
}


