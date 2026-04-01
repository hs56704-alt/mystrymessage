import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";
import mongoose from "mongoose";

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        return Response.json(
            { success: false, message: "Not Authenticated" },
            { status: 401 }
        );
    }

    try {
        const sessionUser = session.user as User;

        // ✅ FIX 1: Moved inside try/catch — crashes here if _id is missing/malformed
        if (!sessionUser._id) {
            return Response.json(
                { success: false, message: "Invalid user session" },
                { status: 400 }
            );
        }

        const userId = new mongoose.Types.ObjectId(sessionUser._id);

        // ✅ FIX 2: Renamed to `dbUser` to avoid shadowing the session `user`
        const dbUser = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: { path: '$messages', preserveNullAndEmptyArrays: true } },
            { $sort: { 'messages.createdAt': -1 } },
            { $group: { _id: '$_id', messages: { $push: '$messages' } } }
        ]);

        if (!dbUser || dbUser.length === 0) {
            return Response.json(
                { success: false, message: "User not found" },
                { status: 404 }  // ✅ FIX 3: 404 is more correct than 401 here
            );
        }

        const messages = (dbUser[0].messages ?? []).filter(Boolean);

        return Response.json(
            { success: true, messages },
            { status: 200 }
        );

    } catch (error) {
        console.error("Failed to fetch messages:", error);
        return Response.json(
            { success: false, message: "An unexpected error occurred" },
            { status: 500 }
        );
    }
}