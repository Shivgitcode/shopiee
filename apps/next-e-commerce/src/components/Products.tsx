import ItemsCard from "./ItemsCard";
import NewArrival from "./NewArrival";
import ProductCard from "./ProductCard";

export default function Products({ direction = "flex-row", num }: { direction?: string, num: number }) {
    return (
        <div className={`flex ${direction} gap-[30px] w-full mb-[20px]`}>
            <div className="flex flex-col gap-5">
                {num === 1 ? <ProductCard></ProductCard> : <NewArrival></NewArrival>}
                <NewArrival></NewArrival>
            </div>
            <div className="flex w-full justify-between ">
                <ItemsCard price="200$" img="/asset 3.png" name="Hugo Boss Leather Jacket"></ItemsCard>
                <ItemsCard price="200$" img="/asset 4.png" name="Polka-dotted slip dress"></ItemsCard>
            </div>


        </div>
    )
}
