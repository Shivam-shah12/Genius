"use client";

import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";


interface apiLimitProps{
  apiLimitCount:number,
  isPro:boolean
}


const MobileSidebar = ({apiLimitCount,isPro=false}:apiLimitProps) => {
  const [isMounted, setIsMounted] = useState(false);
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <Sidebar apiLimitCount={apiLimitCount} isPro={isPro}/>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
