import { categories } from "@/utils";
import Link from "next/link";

export default function SideBar() {

    return (
        <div className="w-[23%]">
            <h2 className=" text-[28px] font-bold capitalize mb-[12px]">Explore</h2>
            <ul className="flex flex-col items-start">
                {categories.map(el => (
                    <li key={el.id} className="py-[18px]">
                        <div className="flex">
                            <Link href={`${el.path}`}>
                                <span className="mr-[14px]">{el.img}</span><span>{el.name}</span>
                            </Link>
                        </div>
                    </li>
                ))}


            </ul>

        </div>
    )
}
