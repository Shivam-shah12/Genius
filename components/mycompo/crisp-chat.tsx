"use client";

import { useEffect } from "react";
import {Crisp} from 'crisp-sdk-web';

export const CrispChat=()=>{
    useEffect(()=>{
      Crisp.configure("ac89b369-dc25-4eec-a58f-cf1d661a0f0d");
    },[]);
    return null;
}
























