import { io, Socket } from "socket.io-client";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  ReactNode,
} from "react";
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

interface SocketContextType {
  socket: Socket | null;
  user: User | null;
}

// Provide an initial value that matches the context type
const initialContext: SocketContextType = {
  socket: null,
  user: null,
};

const SocketContext = createContext<SocketContextType>(initialContext);

export function SocketProvider({ children }: { children: ReactNode }) {
  const socketRef = useRef<Socket | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const { data: session, status } = useSession();

  const handleUser = async (email: string) => {
    try {
      const fetchedUser = await getCurrentUser({ usermail: email });
      setUser(fetchedUser);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    const initializeSocket = async () => {
      if (status === "authenticated" && session?.user?.email) {
        await handleUser(session.user.email);

        if (user?.id && !socketRef.current) {
          const socket = io("http://localhost:5000", {
            query: { userId: user.id },
            reconnection: true,
            reconnectionAttempts: 5,
          });

          socket.on("connect", () => {
            console.log("Socket connected");
          });

          socket.on("connect_error", (error) => {
            console.error("Socket connection error:", error);
          });

          socketRef.current = socket;
        }
      }
    };

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [status, session, user?.id]);

  const value: SocketContextType = {
    socket: socketRef.current,
    user,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
}
