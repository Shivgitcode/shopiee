"use client";

import LoginPage from "@/components/LoginPage";
import Register from "@/components/RegisterPage";
import useMyContext from "@/context/AppContext";
import { useEffect, useRef, useState } from "react";

export default function Login() {
    const { type, setType } = useMyContext()








    return (
        <div className="w-full min-h-screen">
            <h1 className="text-center font-swashed text-[32px] mt-[30px] mb-[50px] font-medium">Shopping</h1>
            <div className="flex-col justify-between items-center p-[70px] border-2 rounded-[16px] max-w-[493px] mx-auto">
                <div className="flex justify-between border-2 rounded-[16px] bg-[#f6f6f6] mb-[20px]">
                    <button className={` py-[20px] px-[40px] font-bold text-[16px]  bg-transparent rounded-2xl w-full ${type === "login" && "bg-white"} `} onClick={() => setType("login")}>Login</button>
                    <button className={` py-[20px] px-[40px] font-bold text-[16px]  bg-transparent rounded-2xl w-full ${type === "register" && "bg-white"}`} onClick={() => setType("register")}>Register</button>
                </div>
                <>
                    {type === "login" ? <LoginPage></LoginPage> : <Register></Register>}
                </>

            </div>

        </div>
    )
}
