import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
export default function TopBar() {
    return (
        <div className="flex min-w-full justify-between mb-[40px]">
            <div className=" text-[28px]">
                <span>⚡</span><span className=" font-bold">New In</span>
            </div>

            <div className="flex justify-between">
                <div className="flex text-[14px] font-bold items-center px-5 py-3 cursor-pointer gap-5 mr-[20px] border-2 rounded-[10px] grow">
                    <span><HiOutlineBars3BottomLeft strokeWidth={2}></HiOutlineBars3BottomLeft></span>
                    <span>Sort</span>

                </div>
                <div className="flex text-[14px] cursor-pointer font-bold items-center px-5 py-3 gap-5 border-2 rounded-[10px]">
                    <div className="w-[32px] h-[32px] rounded-full bg-black text-white flex items-center justify-center">
                        <span>0</span>
                    </div>
                    <span>Filter</span>

                </div>

            </div>
        </div>
    )
}
