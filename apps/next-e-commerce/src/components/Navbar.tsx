"use client";
import { CiSearch } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { cartItems } from "@/utils/data";
import useMyContext from "@/context/AppContext";


export default function Navbar() {
    const [hide, setHide] = useState(true)
    const { cart, setCart } = useMyContext()


    const session = useSession()
    useEffect(() => {
        const items = async () => {
            const cartItem = await cartItems()
            setCart(cartItem)
        }
        items()
    }, [cart])
    // console.log(session)
    return (
        <div className="w-full">
            <nav className="w-full mx-auto  flex justify-between items-center min-h-[70px]">
                <h1 className=" font-swashed text-[32px] font-medium flex-1">Shopping</h1>
                <div className="flex w-[65%] items-center justify-center  ">
                    <CiSearch className="mr-[10px]"></CiSearch>
                    <input type="text" placeholder="Search for products,brands and more..." className="w-full py-[1px] px-[2px] placeholder:text-[14px] placeholder:font-sans" />
                </div>
                <div className="flex items-center justify-between ">
                    <Link href={"/cart"} className="flex items-center gap-2 p-2">
                        <BsCart2></BsCart2>
                        <span className=" font-semibold text-[14px]">Cart:{session.status === "authenticated" ? cart?.length : 0}</span>
                    </Link>
                    <div className="flex items-center justify-center ml-[40px] gap-2 relative" >
                        <div className="flex items-center justify-center gap-2 cursor-pointer" onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)}>
                            <div className="w-[32px] h-[32px] relative ">
                                <Image src={session.data !== null ? session.data?.user?.image as string : "/zoro.png"} alt="onigiri" fill className="rounded-full"></Image>
                            </div>
                            <span className=" font-medium text-[14px]">{`Hello ${session.data !== null ? session.data?.user?.name?.toLowerCase().slice(0, 8) : "user"}`}</span>
                            <div>
                                <IoIosArrowDown></IoIosArrowDown>
                            </div>
                        </div>

                        <div className={`flex flex-col absolute top-6 ${hide && " opacity-0 translate-y-[-5px]"} transition-all duration-150 z-20`} onMouseEnter={() => setHide(false)} onMouseLeave={() => setHide(true)} >
                            <div className="shape h-7 w-[60%] mx-auto bg-slate-200 ">
                            </div>
                            <div className={` flex flex-col p-[30px] text-[14px] font-bold border-[1px] rounded-xl gap-3 bg-white items-start `}>

                                {session.data !== null ? <button onClick={() => signOut()}>logout</button> : <Link href={"/login"}>Login</Link>}
                                <Link href={"/login"}>Register</Link>
                            </div>

                        </div>

                    </div>
                </div>
            </nav>
        </div>
    )
}
