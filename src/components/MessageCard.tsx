import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Alert,
  
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "./ui/button"
import { AlertTriangle, X } from 'lucide-react'
import { Message } from "@/model/User"
import axios from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { toast } from "sonner"

type MessageCardProps = {
    message : Message;
    onMessageDelete : (messageId : string) => void 
}


const MessageCard = ({message , onMessageDelete} : MessageCardProps) => {

    const handleDeleteConfirm = async () => {
       const response = await axios.delete<ApiResponse>(`/api/delete-message/{message._id}`)
       toast(response.data.message)

       onMessageDelete(message._id.toString())
    }

    return(
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                    <AlertTriangle />
                    <AlertTitle>Are you absolutely sure?</AlertTitle>
                    <Button variant='destructive'><X className="w-5 h-5" /></Button>
                    <AlertDescription>
                        
                    </AlertDescription>
                </Alert>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter>
                <Button>Cancel</Button>
                <Button onClick={handleDeleteConfirm}>Continue</Button>
            </CardFooter>
        </Card>
    )
}

export default MessageCard