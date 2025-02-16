import { categories } from "@/utils"
// import { products } from "@/utils"

import { productsData } from "@/utils/data"
import ItemCard2 from "@/components/ItemCard2"
import Link from "next/link"

export default async function Categories({ params }: { params: { slugs: string[] } }) {
    console.log(params)
    const products = await productsData(params.slugs[0])


    return (
        <div className="w-full flex flex-wrap gap-20 justify-between">
            {products.map(el => (
                <Link key={el.id} href={`/product/${el.id}`}><ItemCard2 el={el} key={el.id} ></ItemCard2></Link>
            ))}
        </div>
    )
}
