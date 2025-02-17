import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
interface IOSocket {
  onlineUsers: string[];
  socket: Socket;
}

export const SocketContext = createContext<IOSocket | null>(null);

export default function SocketProviderContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const socketRef = useRef<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;
    socket.on("getOnlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });
    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);
  return (
    <SocketContext.Provider
      value={{ socket: socketRef.current as Socket, onlineUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocketContext = async (): Promise<IOSocket> => {
  const context = useContext(SocketContext);
  if (typeof context === undefined) {
    throw new Error("context is undefined");
  }
  return context as IOSocket;
};
