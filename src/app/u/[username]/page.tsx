"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { messageSchema } from "@/schemas/messageSchema"
import { z } from "zod"
import axios, { AxiosError } from "axios"
import { useParams } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { ApiResponse } from "@/types/ApiResponse"
import { Loader2 } from "lucide-react"

type MessageFormData = z.infer<typeof messageSchema>

export default function UserProfilePage() {
  const [isSending, setIsSending] = useState(false)

  const params = useParams()
  const username = Array.isArray(params.username) ? params.username[0] : params.username

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  })

  const onSubmit = async (data: MessageFormData) => {
    setIsSending(true)
    try {
      await axios.post("/api/send-message", { username, content: data.content })
      form.reset()
      toast.success("Message sent successfully!")
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      const status = axiosError.response?.status

      // ✅ 403 means user turned off messages — show UI state instead of toast
      if (status === 403) {
        toast.error("This user is not accepting messages right now.")
        return
      } else {
        toast.error(axiosError.response?.data.message || "Failed to send message.")
      }
    } finally {
      setIsSending(false)
    }
  }

  return (
    <>
   
    <div className="mb-6 text-center">
        <h1 className="text-3xl font-bold">Public Profile</h1>
    </div>
    
    <div className="flex min-h-screen justify-center pt-10 px-2">
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid w-full max-w-2xl gap-2">
        <div className="grid gap-1">
          <label htmlFor="textarea-message" className="text-sm font-medium">
            Send an anonymous message to @{username}
          </label>
          <Textarea
            id="textarea-message"
            placeholder="Type your message here."
            {...form.register("content")}
          />
          {form.formState.errors.content && (
            <p className="text-sm text-destructive">
              {form.formState.errors.content.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSending}>
          {isSending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
      </form>
    </div>
    </>
    
  )
}