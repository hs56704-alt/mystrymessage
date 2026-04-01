'use client';

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Message } from "@/model/User";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type MessageCardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <Card className="flex flex-col justify-between rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-sm font-semibold">
                            Anonymous Message
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                            {dayjs(message.createdAt).fromNow()} · {dayjs(message.createdAt).format("MMM D, YYYY · h:mm A")}
                        </CardDescription>
                    </div>

                    {/* ✅ Trash icon toggles the confirm alert */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                        onClick={() => setShowConfirm((prev) => !prev)}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>

                {/* ✅ Confirmation alert — only shown when trash is clicked */}
                {showConfirm && (
                    <Alert className="mt-3 border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Are you sure?</AlertTitle>
                        <AlertDescription>
                            This message will be permanently deleted.
                        </AlertDescription>
                    </Alert>
                )}
            </CardHeader>

            {/* ✅ Message content now displayed */}
            <CardContent>
                <p className="text-sm text-foreground leading-relaxed wrap-break-word">
                    {message.content}
                </p>
            </CardContent>

            {/* ✅ Footer buttons only show when confirming */}
            {showConfirm && (
                <CardFooter className="flex gap-2 justify-end">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowConfirm(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => onMessageDelete(message._id.toString())}
                    >
                        Delete
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
};

export default MessageCard;