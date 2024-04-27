import { UserAvatar } from "../ui/user-avatar";
import { BotAvatar } from "../ui/bot-avatar";
import Markdown from 'react-markdown';

interface ChatMessage {
    message: string;
    role: string;
}

export const ChatContainer = ({ message, role }: ChatMessage) => {
    return (
        <div className="w-full p-4 bg-black/10 flex space-x-2 items-start rounded-md">
            <div>
                {role === "model" ? <BotAvatar/> : <UserAvatar/>}
            </div>
            <div className="w-full text-sm tracking-wide flex flex-col">
                <Markdown
                    components={{
                        p: ({ node, ...props }) => (
                            <p className="mb-2 ml-4" {...props} />
                        ),
                        strong:({node,...props})=>(
                             <strong className="text-sm" {...props}/>
                        ),
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc space-y-2 list-inside ml-8 mb-3" {...props} />
                        ),
                        pre: ({ node, ...props }) => (
                            <div className=" w-full my-2 overlflow-auto bg-black/80 text-white p-2 rounded-lg gap-y-1">
                                <pre {...props} />
                            </div>
                        ),
                        code: ({ node, ...props }) => (
                            <code className="bg-black/10 rounded-lg p-1" {...props} />
                        )
                    }}
                >
                    {message}
                </Markdown>
            </div>
        </div>
    );
};
