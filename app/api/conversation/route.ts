import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

// Initialize Google's AI model (ensure that your API key and initialization are correctly configured)
const genAi = new GoogleGenerativeAI(JSON.stringify(process.env.GENAI_KEY));

export async function POST(
    req: Request
) {
    try {
        const body=await req.json();
        const {history,message}=body.body;
        // console.log(body);
        // console.log(history,message);
        if(!history || !message)
            {
                return new NextResponse("Data are not getting",{status:401});
            }
        // const { message } = req.json();
        // console.log(message)
        // if (!message) {
        //     // Check if both history and message are provided in the request body
        //     return new NextResponse("Missing data",{status:400});
        // }
    const freeTrial=await checkApiLimit();
    const isPro=await checkSubscription();
    if(!freeTrial && !isPro)
      {
        return new NextResponse("Free Trial has expired",{status:403});
      }
        // // Fetch the generative model and start a chat session
        const model = genAi.getGenerativeModel({ model: "gemini-pro" });
        const chat =  model.startChat({ history: history });
        const result = await chat.sendMessage(message);
        const response =  result.response;  // Assuming this API call returns a response object correctly
        const text=response.text();
        if(!isPro)
        await increaseApiLimit();
        // // // Send back the generated text response
        return new NextResponse(text);
    } catch (error) {
        return new NextResponse("CONVERSATION ERROR",{status:500});
    }
}
