"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { messageSchema } from "@/schemas/messageSchema"
import { z } from "zod"
import axios from "axios"
import { useParams } from "next/navigation"

type MessageFormData = z.infer<typeof messageSchema>

export default function UserProfilePage() {
  const { username } = useParams()

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),  // 👈 plugs your schema in
    defaultValues: {
      content: ""
    }
  })

  const onSubmit = async (data: MessageFormData) => {
    try {
      await axios.post("/api/send-message", {
        username,
        content: data.content
      })
      form.reset()
      alert("Message sent!")
    } catch (error) {
      alert("Failed to send message")
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <textarea
        {...form.register("content")}
        placeholder="Type your anonymous message..."
      />

      {/* ✅ shows error automatically from schema */}
      {form.formState.errors.content && (
        <p style={{ color: "red" }}>
          {form.formState.errors.content.message}
        </p>
      )}

      <button type="submit" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? "Sending..." : "Send Anonymously"}
      </button>
    </form>
  )
}