"use client"

import { useProModal } from '@/hooks/user-pro-modal';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowRight, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react'
import { Badge } from '../ui/badge';  
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Zap } from 'lucide-react';
import axios from 'axios';
import { Loader } from 'lucide-react';

const tools=[
    {
      label:"Conversation",
      icon:MessageSquare,
      color:"text-violet-500",
      bgColor:"bg-violet-500/10",
    },
    {
      label:"Music Generation",
      icon:Music,
      color:"text-emerald-500",
      bgColor:"bg-emerald-500/10",
    },
    {
      label:"Image Generation",
      icon:ImageIcon,
      color:"text-pink-500",
      bgColor:"bg-pink-500/10",
    },
    {
      label:"Video Generation",
      icon:VideoIcon,
      color:"text-orange-500",
      bgColor:"bg-orange-500/10",
    },
    {
      label:"Code Generation",
      icon:Code,
      color:"text-green-500",
      bgColor:"bg-green-500/10",
    }
  ]

export const ProModal=()=>{
    const proModal=useProModal();
    const [loading, setloading] = useState(false);
    const onSubscribe=async()=>{
      try {
        setloading(true)
        const response=await axios.get("/api/stripe");
        window.location.href=await response.data.url;
      } catch (error) {
        console.log(error,"STRIPE_CLIENT_ERROR");
      }finally{
        setloading(false);
      }
    }

   return ( 
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="flex flex-col justify-center items-center pb-2 gap-y-4">
        <div className='flex  items-center gap-x-2 font-bold py-2'>
        Upgrade to Genius
        <Badge variant="premium" className="uppercase text-sm py-1">
            pro
        </Badge>
        </div>
      </DialogTitle>
      <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
        {
            tools.map((tool)=>(
                <Card key={tool.label} className="p-3 border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <div className={cn("p-2 w-fit rounded-md",tool.bgColor)}>
                            <tool.icon className={cn("w-6 h-6",tool.color)}/>
                        </div>
                        <div className="font-semibold text-sm">
                            {tool.label}
                        </div>
                    </div>
                    <Check className="text-primary w-5 h-5"/>
                </Card>
            ))
        }
      </DialogDescription>
      <DialogFooter>
      <Button variant="premium" className="w-full" onClick={onSubscribe}>
        {
          loading ? (
            <div className="w-10 h-10 mx-auto relative origin-center animate-spin">
               <Loader/>
            </div>
          ):(
            <>
            upgrade 
            <Zap className="w-4 h-4 ml-2  border-0  fill-white"/>
            </>
          )
        }
             </Button>
      </DialogFooter>
    </DialogHeader>
  </DialogContent>
</Dialog>
    )
}