import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ messageid: string }> }
) {
    const { messageid: messageId } = await params;  // ✅ await params in Next.js 15

    console.log("🔴 DELETE hit");
    console.log("🔴 messageId from params:", messageId);

    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        console.log("🔴 Not authenticated");
        return Response.json({ success: false, message: "Not Authenticated" }, { status: 401 });
    }

    const sessionUser = session.user as User;
    console.log("🔴 session user _id:", sessionUser._id);

    try {
        // Check if user exists first
        const userExists = await UserModel.findById(sessionUser._id);
        console.log("🔴 user found:", !!userExists);
        console.log("🔴 user messages:", JSON.stringify(userExists?.messages?.map((m: any) => m._id)));

        const result = await UserModel.updateOne(
            { _id: sessionUser._id },
            { $pull: { messages: { _id: new mongoose.Types.ObjectId(messageId) } } }
        );

        console.log("🔴 updateOne result:", JSON.stringify(result));

        if (result.modifiedCount === 0) {
            return Response.json(
                { success: false, message: "Message not found or already deleted" },
                { status: 404 }
            );
        }

        return Response.json(
            { success: true, message: "Message deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("🔴 Delete error:", error);
        return Response.json(
            { success: false, message: "Error deleting message" },
            { status: 500 }
        );
    }
}