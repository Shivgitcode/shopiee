"use client";

import Products from "@/components/Products";
import TopBar from "@/components/TopBar";

export default function Home() {

    return (
        <div className="w-full h-full">
            <TopBar></TopBar>
            <div className="w-full h-full">
                <Products num={1}></Products>
                <Products num={2} direction="flex-row-reverse"></Products>
                <Products num={3}></Products>
            </div>

        </div>
    )
}
