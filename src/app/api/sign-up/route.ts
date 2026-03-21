import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
    await dbConnect();

    try {
       const{ email, username, password } = await request.json();
       const existingVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified: true
       })
       if(existingVerifiedByUsername){
        return Response.json({
            success: false,
            message: "Username is already taken. Please choose another one."   
        }, { status: 400 });
    }
        const existingUserByEmail = await UserModel.findOne({
            email
        });

        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        if(existingUserByEmail){
            if (existingUserByEmail.isVerified) {
                return Response.json({
                    success: false,
                    message: "Email is already registered and verified. Please log in or use a different email."
                }, { status: 400 });
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.password = hashedPassword;
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now 
                await existingUserByEmail.save();
            }
        }
        else{
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setHours(expiryDate.getHours() + 1);

            const newUser = new UserModel({
                email,
                username,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessages: true,
                messages: []
            });

            await newUser.save();


        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode
        );
        if (!emailResponse.success) {
            return Response.json({
                success: false,
                message: emailResponse.message || "Failed to send verification email. Please try again later."
            }, { status: 500 });
        }
        return Response.json({
            success: true,
            message: "Registration successful. Please check your email for the verification code."
        }, { status: 200 });
    }
    catch (error) {
        console.error("Error during user registration:", error);
        return Response.json({
            success: false,
            message: "An error occurred during registration. Please try again later."
        },
        { status: 500 });
    }
}