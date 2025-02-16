import { img1, img2, img3, img4, img5, img6 } from "../../public"

export const categories = [
    { id: 1, img: "⚡", name: "new", path: "/" },
    { id: 2, img: "👚", name: "clothing", path: "/category/clothing" },
    { id: 3, img: "👠", name: "shoes", path: "/category/shoes" },
    { id: 4, img: "👜", name: "Accessories", path: "/category/accessories" },
    { id: 5, img: "🤸", name: "Activewear", path: "/category/activewear" },
    { id: 6, img: "🎁", name: "Gifts & Living", path: "/category/gifts" },
    { id: 7, img: "💎", name: "Inspiration", path: "/category/inspiration" }
]



export const products = [
    { id: 1, img: "/img1.jpg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },
    { id: 2, img: "/img2.jpg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },
    { id: 3, img: "/img3.jpg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },
    { id: 4, img: "/img4.jpg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },
    { id: 5, img: "/img5.jpg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },
    { id: 6, img: "/img6.jpeg", name: "DeFacto", desc: "DeFacto Black Sweatshirt", discount: 15, mrp: 130, sale: 110 },

]



export type Product = {
    id: string,
    img: string,
    name: string,
    desc: string,
    discount: number,
    mrp: number,
    sale: number,
    categoryId: string
}

export type Cart = {
    id: string;
    quantity: number | null;
    productId: string | null;
    userId: string;
    product: Product
}
