import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import {Message} from "@/model/User";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST (request:Request){
    await dbConnect()

    const{ username , content } = await request.json()

    const result = messageSchema.safeParse({ content })
    if (!result.success) {
        return Response.json({
        success: false,
        message: result.error.format().content?._errors[0] ?? "Invalid message"
        }, { status: 400 })
    }

    try {
        const user = await UserModel.findOne({username})
        if(!user){
            return Response.json({
                success: false,
                message: "user not found"
            },
        {status : 404})
        }

        // is user accepting the message
        if(!user.isAcceptingMessage){
             return Response.json({
                success: false,
                message: "user is not accepting messages"
            },
        {status : 403})
        
        }
        const newMessage = { content , createdAt:new Date()}
        user.messages.push(newMessage as Message)
        await user.save()

        return Response.json({
            success :true,
            message: "message sent successfully"
        },{status : 201})

    } catch (error) {
        console.log("Error adding messages",error)
        return Response.json({
            success:false,
            message:"Internal server Error"
        },{status:500})
        
    }
}