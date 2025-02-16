import useMyContext from "@/context/AppContext";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("");
    const { type, setType } = useMyContext()



    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()




        const response = await fetch("http://localhost:3000/api/register", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        })
        setEmail("")
        setName("")
        setPassword("")


        if (response.ok) {
            const data = await response.json();
            setType("login")
            toast.success("successfully registered", { position: "top-center", richColors: true })

        }
        else {
            const data = await response.json();
            console.log(data)
            toast.error(data, { position: "top-center", richColors: true })

        }



    }
    return (
        <div className="flex flex-col items-center">

            <div className="flex items-center justify-center  w-full">
                <div className="h-[1px] bg-gray-400 w-full"></div>
                <p className="w-full p-[15px] text-center font-start text-[16px] whitespace-nowrap font-mont">Register with social media</p>
                <div className="h-[1px] w-full bg-gray-400"></div>
            </div>
            <div>
                <button className="flex jusfity-between px-[40px] py-[20px] items-center border-[1px] rounded-2xl gap-4"><FcGoogle fontSize={24}></FcGoogle><span>Google</span></button>
            </div>
            <div className="flex items-center justify-center  w-full">
                <div className="h-[1px] bg-gray-400 w-full"></div>
                <p className="w-full p-[15px] text-center font-start text-[16px] whitespace-nowrap font-mont">Register with credentials</p>
                <div className="h-[1px] w-full bg-gray-400"></div>
            </div>
            <form className="flex flex-col items-center w-full" onSubmit={handleRegister}>
                <input type="text" placeholder="Name" className=" p-[18px] rounded-2xl bg-[#f6f6f6] w-full" onChange={(e) => setName((e.target as HTMLInputElement).value)} />
                <input type="text" placeholder="E-mail" className=" p-[18px] rounded-2xl bg-[#f6f6f6] mt-[20px] w-full" onChange={(e) => setEmail((e.target as HTMLInputElement).value)} />
                <input type="password" placeholder="Password" className=" p-[18px] rounded-2xl bg-[#f6f6f6] mt-[20px] w-full" onChange={(e) => setPassword((e.target as HTMLInputElement).value)} />
                <button className=" p-[20px] my-10 bg-black text-white font-medium rounded-2xl w-full">Register</button>

            </form>

            <p>
                By clicking Register, you agree to use out Terms and that you have read our Data Use Policy, including our Cookie Use
            </p>


        </div>
    )
}
