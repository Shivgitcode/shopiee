import Image from "next/image";

export default function ItemsCard({ price, img, name }: { price: string, img: string, name: string }) {
    return (
        <div className="w-[233px] h-[400px] flex flex-col items-center justify-between p-[10px] rounded-[10px] bg-[#f6f6f6] hover:shadow-md transition-all duration-500 ">
            <div className=" w-[300px] h-[245px] relative">
                <Image src={img} alt="hello" fill objectFit="cover" objectPosition="top"></Image>
            </div>
            <div className="flex flex-col items-center justify-between">
                <h3 className="text-[14px] leading-5 mb-[18px] font-bold">{name}</h3>
                <div>
                    <p className="text-[#808080] font-bold line-through">300$</p>
                    <p className=" font-bold text-[20px]">{price}</p>
                </div>

            </div>
        </div>
    )
}
