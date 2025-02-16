"use client";
import { createChat, getCurrentUser, getMessages } from "@/utils/Chat";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { toast } from "sonner";
interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  role: "customer" | "agent";
}

// export interface Message {
//   id: string;
//   content: string;
//   sender: "customer" | "agent";
//   timestamp: Date;
// }

// export interface ChatSession {
//   id: string;
//   customerName: string;
//   status: "active" | "resolved";
//   messages: Message[];
// }

interface Message {
  id: string;
  senderId: string;
  body: string;
  createdAt: Date;
  conversationId: string;
}
interface User {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
}
const initialSession: ChatSession = {
  id: "1",
  customerName: "John Doe",
  status: "active",
  messages: [
    {
      id: "1",
      content: "Hello, I need help with my recent order",
      sender: "customer",
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: "2",
      content:
        "Hi John! I'd be happy to help. Could you please provide your order number?",
      sender: "agent",
      timestamp: new Date(Date.now() - 240000),
    },
  ],
};

export function ChatWindow() {
  const [newMessage, setNewMessage] = useState("");
  const role = "customer";
  const session = useSession();
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [conversation, setConversation] = useState([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  const handleMessages = async ({ id }: { id: string }) => {
    console.log("inside handlesubmit", id);

    const allMessages = await getMessages({
      senderId: id,
    });
    console.log(allMessages);

    setConversation(allMessages.getMessages as never);
    setMessages((prev) => {
      return [...prev, ...allMessages.getMessages.messages];
    });
  };
  useLayoutEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser({
        usermail: session.data?.user?.email as string,
      });
      handleMessages({ id: user?.id as string });

      setUser((prev) => {
        return { ...prev, ...user };
      });
    };
    fetchUser();
  }, []);

  const handleSubmit = async () => {
    try {
      const newChat = await createChat({
        senderId: user?.id as string,
        body: newMessage,
      });
      console.log(newChat.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  console.log(messages);

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b bg-indigo-600">
        <h2 className="text-xl font-semibold text-white">
          {role === "customer" ? "Customer Support" : "Support Dashboard"}
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {conversation.length === 0 ? (
          <div>enter your query</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  message.senderId === user?.id
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.body}</p>
                <span className="text-xs opacity-75">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <BsSend></BsSend>
          </button>
        </div>
      </form>
    </div>
  );
}
