'use client';
import { useState } from "react"
import { X, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

// interface MessageComponentProps {
//     onClose: () => void
// }

export default function MessageComponent() {
    const [message, setMessage] = useState("")

    return (
        <Card className="fixed right-4 top-20 w-1/4 h-[500px] flex flex-col p-4 shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Chat with Seller</h2>
                <Button variant="ghost" size="icon">
                    <X className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex-1 overflow-auto mb-4 space-y-4">
                {/* Sample messages - replace with actual message history */}
                <div className="bg-secondary text-background p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm">Hello, I&#39;m interested in the John Deere 8R 410. Is it still available?</p>
                </div>
                <div className="bg-primary text-primary-foreground p-3 rounded-lg max-w-[80%] ml-auto">
                    <p className="text-sm">Yes, it&#39;s available! Would you like to know more about its features?</p>
                </div>
            </div>

            <div className="flex gap-2">
                <Input
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                />
                <Button className={"bg-primary"}>
                    <Send className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    )
}