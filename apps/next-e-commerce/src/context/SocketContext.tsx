import { io, Socket } from "socket.io-client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { getCurrentUser } from "@/utils/Chat";

interface User {
  id: string;
  name: string | null;
  email: string | null;
  password: string | null;
  emailVerified: Date | null;
  image: string | null;
}

export const SocketContext = createContext<Socket | undefined>(undefined);

export default async function SocketProviderContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const session = useSession();
  const handleUser = async (id: string) => {
    const fetchUser = await getCurrentUser({ usermail: id });
    setUser(fetchUser);
  };

  const value = {
    socket: socketRef.current,
  };
  useEffect(() => {
    if (session.status === "authenticated") {
      handleUser(session.data.user?.email as string);
      const socket = io("http://localhost:5000", {
        query: {
          userId: user?.id,
        },
      });
      socketRef.current = socket;
      return () => {
        socket.close();
        socketRef.current = null;
      };
    } else if (session.status === "unauthenticated") {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    }
  }, [session]);
  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export const useSocketContext = async () => {
  const context = useContext(SocketContext);
  if (typeof context === "undefined") {
    throw new Error("context undefined");
  }
  return context;
};
