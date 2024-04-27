"use server"
import { auth } from '@clerk/nextjs';
import db from './db';
import { MAX_FREE_COUNTS } from '@/constants';

export const increaseApiLimit=async()=>{
     const {userId}=auth();

     if(!userId)
        return;
    
    const prismaData=await db.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    })

     if(prismaData)
        {
            // just update count
            await db.userApiLimit.update({
                where:{userId:userId},
                data:{count:prismaData.count+1}
            })
        }
      else{
        await db.userApiLimit.create({
            data:{userId:userId,count:1}
        });
      }
}


export const checkApiLimit=async()=>{
    const {userId}=auth();
    if(!userId)
        return false;

    const userApiLimit=await db.userApiLimit.findUnique({
        where:{
            userId:userId
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS)
        return true;
    else{
        return false;
    }
}

export const getApiLimit=async()=>{
    const {userId}=auth();
    if(!userId)
        return 0;

    const apiLimitData=await db.userApiLimit.findUnique({
        where:{userId}
    });
    if(!apiLimitData)
        return 0;
    return apiLimitData.count;
}