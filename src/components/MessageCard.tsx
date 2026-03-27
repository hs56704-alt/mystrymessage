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
import AlertTriangle from "lucide-react/dist/esm/icons/alert-triangle.js";
import X from "lucide-react/dist/esm/icons/x.js";


const MessageCard = () => {
    return(
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                    <AlertTriangle />
                    <AlertTitle>Your subscription will expire in 3 days.</AlertTitle>
                    <Button variant='destructive'><X /></Button>
                    <AlertDescription>
                        Renew now to avoid service interruption or upgrade to a paid plan to
                        continue using the service.
                    </AlertDescription>
                </Alert>
                <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
            </CardContent>
            <CardFooter>
            </CardFooter>
        </Card>
    )
}

export default MessageCard