import Image from "next/image";

export default function ProductCard() {
    return (
        <div className=" bg-[#BCE7F0] w-[486px] h-[190px] relative rounded-xl overflow-hidden group">
            <div className="relative w-[586px] h-[190px] group-hover:scale-125 transition-all duration-[800ms]">
                <Image src={"/asset 1.png"} alt="hello" fill objectFit="cover" ></Image>
            </div>
            <p className="absolute z-[1] text-[32px] font-bold top-[37%] left-[20%] group-hover:scale-125 transition-all duration-[800ms] ">
                Get up to 50% off
            </p>

        </div>
    )
}
