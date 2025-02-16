import { Product } from "@/utils";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";

export default function ItemCard2({ el }: { el: Product }) {
    return (
        <div className="w-fit h-[476px] flex flex-col items-center relative border-2 rounded-[10px] p-[10px] overflow-hidden">
            <div className="absolute z-10 p-[10px] rounded-full flex justify-center items-center bg-white likeShadow right-2 top-3">
                <CiHeart fontSize={20}></CiHeart>
            </div>
            <div className="relative w-[240px] h-[320px] mb-[20px]">
                <Image src={el.img} alt="" fill objectFit="cover" objectPosition="center"></Image>
            </div>
            <div className="flex flex-col items-center">
                <h2 className="text-[16px] font-bold leading-5">{el.name}</h2>
                <p className="text-[14px] font-bold leading-5 mb-[18px]">{el.desc}</p>
                <div className="flex w-full justify-center">
                    <p className="p-[10px] mr-[10px] text-white bg-[#ff0000] font-bold rounded">{el.discount}%</p>
                    <div>
                        <p className="text-[14px] text-[#808080] font-bold">{el.mrp}$</p>
                        <p className="text-[20px] font-bold ">{el.sale}$</p>
                    </div>
                </div>

            </div>


        </div>
    )
}
