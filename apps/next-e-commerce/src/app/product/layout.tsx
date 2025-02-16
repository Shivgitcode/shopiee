import Navbar from "@/components/Navbar";
import SideBar from "@/components/SideBar";


export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-[65%] mx-auto h-full font-mont">
            <Navbar></Navbar>
            <div className="w-full mx-auto mt-[50px] flex justify-start items-start">
                <SideBar></SideBar>
                {children}
            </div>
        </div>
    )
}
