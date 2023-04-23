import { NextResponse } from "next/server";
import { prismaClient } from "../../../../prisma/prisma-client";

type BodyType = {
    message: string
}

export const GET = async (req: Request) => {
    const allChats = await prismaClient.chat.findMany()

    return NextResponse.json(allChats)
}

export const POST = async (req: Request) => {
    const error = 'message is required.'

    const body = <BodyType>await req.json() || null;

    if (!body.message)
        return NextResponse.json({ error }, { status: 400 })

    const newMessage = await prismaClient.chat.create({
        data: {
            message: body.message
        },
    })

    return NextResponse.json(newMessage, { status: 201 })
}