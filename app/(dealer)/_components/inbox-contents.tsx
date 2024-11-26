'use client'

import React, { useState, useEffect, useRef } from 'react'
import {Send, CheckCircle2, ChevronLeft} from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Message {
    id: number
    sender: 'dealer' | 'customer'
    content: string
    timestamp: Date
    status: 'sent' | 'delivered' | 'read'
}

export default function InboxContents() {
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)
    const [isMobileView, setIsMobileView] = useState(false)

    const handleBackToList = () => {
        setIsMobileView(false)
    }


    const handleSelectChat = (chatId: string) => {
        setSelectedChatId(chatId)
        setIsMobileView(true)
    }

    const chatPreviews: ChatPreview[] = [
        { id: '1', customerName: 'Alice Johnson', lastMessage: 'Thank you for your help!', timestamp: new Date(), unreadCount: 0 },
        { id: '2', customerName: 'Bob Smith', lastMessage: 'Is the product still available?', timestamp: new Date(Date.now() - 1000 * 60 * 5), unreadCount: 1 },
        { id: '3', customerName: 'Charlie Brown', lastMessage: 'Can you provide more details?', timestamp: new Date(Date.now() - 1000 * 60 * 15), unreadCount: 2 },
    ]
    return (
        <div className={`w-full h-full p-2 flex gap-2 justify-center`}>
            <div className={`flex-grow xl:flex ${isMobileView ? 'flex' : 'hidden'}`}>
                <DealerChatroom
                    onBack={handleBackToList}
                    customerName={chatPreviews.find(chat => chat.id === selectedChatId)?.customerName || 'Select a chat'}/>
            </div>
            <div className={`w-full xl:w-1/4 xl:flex ${isMobileView ? 'hidden' : 'flex'}`}>
                <ChatList
                    chats={chatPreviews}
                    onSelectChat={handleSelectChat}
                    selectedChatId={selectedChatId}
                />
            </div>
        </div>
    )
}

interface ChatPreview {
    id: string
    customerName: string
    lastMessage: string
    timestamp: Date
    unreadCount: number
}

function ChatList({chats, onSelectChat, selectedChatId }: {
    chats: ChatPreview[]
    onSelectChat: (chatId: string) => void
    selectedChatId: string | null
}) {
    return (
        <Card className="w-full h-full">
            <CardHeader>
                <CardTitle>Recent Chats</CardTitle>
            </CardHeader>
            <CardContent className={"flex-grow overflow-hidden"}>
                <ScrollArea className="h-full">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            // variant="ghost"
                            className={`w-full justify-start mb-2 p-2 cursor-pointer rounded-lg hover:bg-secondary/20  ${selectedChatId === chat.id ? 'bg-secondary text-secondary-foreground' : ''}`}
                            onClick={() => onSelectChat(chat.id)}
                        >
                            <div className="flex items-center w-full">
                                <Avatar className="h-9 w-9 mr-2">
                                    <AvatarImage src={`/placeholder-avatar-${chat.id}.jpg`} alt={chat.customerName} />
                                    <AvatarFallback>{chat.customerName[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow text-left">
                                    <div className="font-semibold">{chat.customerName}</div>
                                    <div className="text-sm text-muted-foreground truncate">{chat.lastMessage}</div>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                    {chat.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                                {chat.unreadCount > 0 && (
                                    <div className="ml-2 bg-primary text-primary-foreground rounded-full px-2 py-1 text-xs">
                                        {chat.unreadCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
        </Card>
    )
}

function DealerChatroom({ customerName = 'Select a chat', onBack }: { customerName: string, onBack: () => void }) {
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const scrollAreaRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Reset messages when customer changes
        setMessages([])
        // Simulating initial messages for the selected customer
        if (customerName !== 'Select a chat') {
            setMessages([
                { id: 1, sender: 'customer', content: 'Hi, I have a question about the product.', timestamp: new Date(Date.now() - 1000 * 60 * 5), status: 'read' },
                { id: 2, sender: 'dealer', content: 'Hello! I\'d be happy to help. What would you like to know?', timestamp: new Date(Date.now() - 1000 * 60 * 4), status: 'read' },
                { id: 3, sender: 'customer', content: 'Is this item available in blue?', timestamp: new Date(Date.now() - 1000 * 60 * 3), status: 'read' },
            ])
        }
    }, [customerName])

    useEffect(() => {
        // Scroll to bottom when messages change
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
        }
    }, [messages])

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: messages.length + 1,
                sender: 'dealer',
                content: newMessage.trim(),
                timestamp: new Date(),
                status: 'sent'
            }
            setMessages([...messages, newMsg])
            setNewMessage('')

            // Simulate message being delivered and read
            setTimeout(() => {
                setMessages(prev => prev.map(msg => msg.id === newMsg.id ? { ...msg, status: 'delivered' } : msg))
            }, 1000)
            setTimeout(() => {
                setMessages(prev => prev.map(msg => msg.id === newMsg.id ? { ...msg, status: 'read' } : msg))
            }, 2000)
        }
    }

    return (
        <Card className="w-full h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="xl:hidden mr-2" onClick={onBack}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Back to chat list</span>
                    </Button>
                    <Avatar>
                        <AvatarImage src={`/placeholder-avatar-${customerName}.jpg`} alt={customerName} />
                        <AvatarFallback>{customerName[0]}</AvatarFallback>
                    </Avatar>
                    <span>{customerName}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
                <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === 'dealer' ? 'justify-end' : 'justify-start'} mb-4`}
                        >
                            <div
                                className={`max-w-[70%] rounded-lg p-3 ${
                                    message.sender === 'dealer'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary text-secondary-foreground'
                                }`}
                            >
                                <p>{message.content}</p>
                                <div className="flex items-center justify-end gap-1 mt-1 text-xs opacity-70">
                                    <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    {message.sender === 'dealer' && (
                                        <CheckCircle2 className={`h-3 w-3 ${message.status === 'read' ? 'text-green-500' : ''}`} />
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex-shrink-0">
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleSendMessage()
                    }}
                    className="flex w-full items-center space-x-2"
                >
                    <Input
                        type="text"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="flex-grow"
                        disabled={customerName === 'Select a chat'}
                    />
                    <Button className={"bg-primary"} type="submit" size="icon" disabled={customerName === 'Select a chat'}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send message</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}