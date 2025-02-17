import SessionWrapper from "@/components/SessionWrapper";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "sonner";
import SocketProviderContext from "@/context/SocketContext";
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <SessionWrapper>
          <AppContextProvider>
            <SocketProviderContext>{children}</SocketProviderContext>
            <Toaster />
          </AppContextProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
