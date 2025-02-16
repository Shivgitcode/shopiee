"use client";

import { SetStateAction, createContext, useContext, useState } from "react";
import { Cart } from "@/utils";

type Value = {
    type: string,
    setType: React.Dispatch<SetStateAction<string>>,
    cart: Cart[] | undefined,
    setCart: React.Dispatch<SetStateAction<Cart[] | undefined>>

}


export const AppContext = createContext<undefined | Value>(undefined)



export function AppContextProvider({ children }: { children: React.ReactNode }) {
    const [type, setType] = useState<string>("login")
    const [cart, setCart] = useState<Cart[] | undefined>(undefined)

    const value: Value = {
        type,
        setType,
        cart,
        setCart

    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>

}

export default function useMyContext() {
    const context = useContext(AppContext);
    if (typeof context === "undefined")
        throw new Error("undefined context")
    return context
}