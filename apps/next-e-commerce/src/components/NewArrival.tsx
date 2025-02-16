import Image from 'next/image'
import React from 'react'

export default function NewArrival() {
    return (
        <div className='w-[486px] h-[190px] bg-[#DEC8F3] overflow-hidden p-[10px] rounded-xl'>
            <div className='flex items-center w-full h-full relative pl-[30px] group'>
                <div className=" flex flex-col absolute z-[2] group-hover:scale-110 duration-[800ms] transition-all">
                    <h2 className=' text-[18.72px] font-bold whitespace-nowrap mb-[18px]'>New Jordan Series</h2>
                    <p className='text-[14px]'>Best of daily wear</p>
                </div>

                <div className='relative w-full h-[186px] z-[1] left-[80px] group-hover:scale-110 transition-all duration-[800ms]'>
                    <Image src={"/asset 2.png"} alt='hello' fill objectFit='contain'></Image>
                </div>



            </div>

        </div>
    )
}
