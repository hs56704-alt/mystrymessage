'use client';

import { Message } from "@/model/User";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const page = () => {
    const [ messages , setMessages] = useState<Message[]>([])
    const [ isLoading , setIsLoading] = useState(false)
    const [ isSwitchLoading , setIsSwitchLoading] = useState(false)

    const handleDeleteMessage = (messageId : string) => {
        setMessages(messages.filter((message) => message._id.toString() !== messageId))
    }

    const { data : session } = useSession()

    const form = useForm({
        resolver : zodResolver(acceptMessageSchema)
    })

    const { register , watch , setValue } = form;

    const acceptMessages = watch('acceptMessages')

    const fetchAcceptMessage = useCallback(async () => {
        setIsSwitchLoading(true)
        try {
            const response = await axios.get<ApiResponse>('/api/accept-messages')
            setValue('acceptMessages', response.data.isAcceptingMessage ?? false)
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Failed to fetch message settiings")
        }finally{
            setIsSwitchLoading(false)
        }

    }, [setValue])


    const fetchMessages = useCallback( async (refresh : boolean = false) => {
        setIsLoading(true)
        setIsSwitchLoading(false)
        try {
            const response = await axios.get<ApiResponse>('/api/get-Messages')
            setMessages(response.data.messages || [])
            if(refresh){
                toast.success("Showing latest Messages")
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>;
            toast.error(axiosError.response?.data.message || "Failed to fetch message settiings")
        }finally{
            setIsLoading(false)
            setIsSwitchLoading(false)
       

            
        }

    } , [setIsLoading , setMessages])




    return(
        <div>Dashboard</div>
    )
}

export default page