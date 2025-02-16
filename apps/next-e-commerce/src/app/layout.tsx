import SessionWrapper from "@/components/SessionWrapper"
import "./globals.css"
import { AppContextProvider } from "@/context/AppContext"
import { Toaster } from "sonner"
export default function layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <SessionWrapper>
                    <AppContextProvider>
                        {children}
                        <Toaster />
                    </AppContextProvider>
                </SessionWrapper>
            </body>
        </html>
    )
}
