"use client";
import axios from "axios";
import { MessageSquare } from "lucide-react";
import Heading from "@/components/mycompo/Heading";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Empty } from "@/components/mycompo/Empty";
import { Loader } from "@/components/mycompo/Loader";
import { ChatContainer } from "@/components/mycompo/ChatContainer";
import { useProModal } from "@/hooks/user-pro-modal";
import toast from "react-hot-toast";

// Step 1: Define the interfaces
interface ChatPart {
  text: string;
}

interface ChatMessage {
  role: "user" | "model";
  parts: ChatPart[];
}
interface ResponseCleaning{
  text:string
}

// Updated component function with types
const page = () => {
  const proModal=useProModal();
  const router = useRouter();
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]); // Step 2: Use the ChatMessage interface
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  function cleanResponse({text}:ResponseCleaning) {
    // Remove all asterisks
    let cleanedText = text.replace(/\*/g, "");

    // Replace '* ' at the beginning of lines with '- '
    cleanedText = cleanedText.replace(/(?:^|\n)\s*\* /g, "$1- ");

    // Trim whitespace from the start and end of each line
    cleanedText = cleanedText.split('\n').map((line) => line.trim()).join('\n');

    // Ensure uniform new lines
    cleanedText = cleanedText.replace(/\n{2,}/g, "\n\n");

    return cleanedText;
}

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
     
      const response = await axios.post("/api/conversation", {
        method: "POST",
        body: { history: chatHistory, message: values.prompt },
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      // console.log(response.data);
      setChatHistory([
        ...chatHistory,
        { role: "user", parts: [{ text: values.prompt }] },
        { role: "model", parts: [{ text: data }] },
      ]);
      // console.log(chatHistory)
      form.reset();
    } catch (error: any) {
      if(error?.response?.status === 403)
        proModal.onOpen();
      else
      {
        toast.error("Something went wrong ?")
      }
    
      console.error(error);
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Conversation"
        description="Our most advanced conversation model"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border focus-within:shadow-sm grid grid-cols-12 gap-2 w-full p-4 px-3 md:px-6"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="How do I calculate the radius of a circle"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>
              <Button
                className="w-full col-span-12 lg:col-span-2"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 w-full flex items-center rounded-lg justify-center bg-muted">
              <Loader />
            </div>
          )}
          {chatHistory.length === 0 && !isLoading && (
            <div>
              <Empty label="No Content Found" />
            </div>
          )}
          <div className="flex flex-col-reverse ">
            {chatHistory.map((messages) => (
              <div key={messages.role} className="w-full my-4">
                {/* messages contain role,parts */}
                <ChatContainer
                  message={messages.parts[0].text}
                  role={messages.role}
                />
              </div>
            ))}
          </div>
          {/* <div className="flex flex-col-reverse">
            {chatHistory.map((message, index) => (
              <div key={index}>
                <div className="p-2">
                  
                </div>
                {message.parts.map((part, partIndex) => (
                  <p key={partIndex}>{part.text}</p>
                ))}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default page;
