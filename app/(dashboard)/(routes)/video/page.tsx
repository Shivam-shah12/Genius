"use client";
import axios from "axios";
import { Code, Music,VideoIcon } from "lucide-react";
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
import { useProModal } from '@/hooks/user-pro-modal';
import { Empty } from "@/components/mycompo/Empty";
import { Loader } from "@/components/mycompo/Loader";
import toast from "react-hot-toast";



// Updated component function with types
const page = () => {
  const proModal=useProModal();
  const router = useRouter();
  const [video, setVideo] = useState<string>(); // Step 2: Use the ChatMessage interface
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });


  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      // console.log(values.prompt)
      const response=await axios.post("/api/video", {
        method: "POST",
        body: { prompt:values.prompt },
        headers: {
          "Content-Type": "application/json",
        },
      });
      setVideo(response.data[0])
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
        title="Video Generation"
        description="turn your prompt into video"
        icon={VideoIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
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
                        placeholder="write some piece of code ??"
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
          {!video && !isLoading && (
            <div>
              <Empty label="No Content Found" />
            </div>
          )}
          {
            video && (
              <video controls className="w-full  aspect-video mt-8 rounded-lg border">
                <source src={video}/>
              </video>
            )
          }
          
        </div>
      </div>
    </div>
  );
};

export default page;
