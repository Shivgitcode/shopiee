import prisma from "@/PrismaInitialize";
import bcrypt from "bcrypt";

type Data = {
    username: string,
    email: string,
    password: string

}

export async function POST(req: Request) {
    const data: Data = await req.json();
    console.log(data.email,)
    const hashPass = await bcrypt.hash(data.password, 12);
    const findUser = await prisma.user.findFirst({
        where: {
            email: data.email
        }
    })
    if (findUser) {
        return Response.json("User already exist", { status: 405 })
    }
    const createUser = await prisma.user.create({
        data: {
            name: data.username,
            email: data.email,
            password: hashPass
        }
    })




    return Response.json(createUser);





}   