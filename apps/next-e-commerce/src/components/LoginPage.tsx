"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { signIn, signOut, useSession } from "next-auth/react"
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const session = useSession();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        signIn("credentials", {
            username: email,
            password: password
        })
        toast.success("successfully Logged In", { position: "top-center", richColors: true })

    }


    useEffect(() => {
        if (session.status === "authenticated") {
            router.push("/")

        }

    }, [session])

    return (
        <div className="flex flex-col items-center w-full">
            <form className="flex flex-col mt-[20px] w-full" onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" className=" p-[18px] rounded-2xl bg-[#f6f6f6]" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="password" className=" p-[18px] rounded-2xl bg-[#f6f6f6] mt-[20px]" onChange={(e) => setPassword(e.target.value)} />
                <button className=" p-[20px] my-10 bg-black text-white font-medium rounded-2xl">Login</button>
                <Link href={"/"} className=" text-[16px] font-bold mb-[25px]">Forgot Password?</Link>
            </form>
            <div className="flex flex-col items-center w-full">
                <div className="flex items-center justify-center  w-full">
                    <div className="h-[1px] bg-gray-400 w-full"></div>
                    <p className="w-full p-[15px] text-center font-start text-[16px] whitespace-nowrap font-mont">Login with social media</p>
                    <div className="h-[1px] w-full bg-gray-400"></div>
                </div>
                <button className="flex jusfity-between px-[40px] py-[20px] items-center border-[1px] rounded-2xl gap-4" onClick={() => signIn("google")}><FcGoogle fontSize={24}></FcGoogle><span>Google</span></button>
            </div>

        </div>
    )
}
