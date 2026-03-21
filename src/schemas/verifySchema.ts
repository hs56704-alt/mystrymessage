import {z} from 'zod';


export const verifySchema = z.object({
    code : z.string().length(6, {message: "VerifyCode must be exactly 6 characters long"})
}) ;