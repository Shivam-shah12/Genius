import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import Replicate from "replicate";
import { increaseApiLimit,checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
export async function POST(req: Request) {
  try {
    const {userId}=auth();
    const body=await req.json();
    const {prompt}=body.body;
    // console.log(body);
    // console.log(body.body);
    if(!userId)
      return new NextResponse("Unauthorized",{status:401});
    if(!prompt)
      return new NextResponse("Unauthorized",{status:401});

    const freeTrial=await checkApiLimit();
    const isPro=await checkSubscription();

    if(!freeTrial && !isPro)
      {
        return new NextResponse("Free Trial has expired",{status:403});
      }

    const response = await replicate.run(
      "stability-ai/stable-diffusion:ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
      {
        input: {         
          prompt: prompt,
        }
      }
    );
    if(!isPro)
    await increaseApiLimit();
    // console.log(response);
   return  NextResponse.json(response);
  } catch (error) {
    console.log(error)
    return new NextResponse("MUSIC ERRORS",{status:500});
  }
}
