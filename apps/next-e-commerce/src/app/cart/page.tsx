"use client"
import Cart from "@/components/Cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartItems() {
    const session = useSession()
    const router = useRouter()
    if (session.status === "unauthenticated") {
        return router.push("/login")
    }



    return (
        <div className="w-full min-h-screen flex mt-[50px] justify-center">
            <Cart></Cart>
        </div>
    )
}

