'use client'

import { useRef, useEffect, useState } from 'react'
import { ChatCircle, X, PaperPlaneTilt, Robot } from '@phosphor-icons/react'
import { cn } from '@/utilities/ui'
import { useChatbot } from './ChatbotContext'
import './chatbot.css'

interface Message {
    id: string
    content: string
    sender: 'bot' | 'user'
    timestamp: Date
}

// Mock messages for UI demonstration
const MOCK_MESSAGES: Message[] = [
    {
        id: '1',
        content: "Bonjour! 👋 Je suis l'assistant Smatch. Comment puis-je vous aider aujourd'hui?",
        sender: 'bot',
        timestamp: new Date(Date.now() - 120000),
    },
    {
        id: '2',
        content: 'Je cherche une solution WMS pour mon entrepôt',
        sender: 'user',
        timestamp: new Date(Date.now() - 60000),
    },
    {
        id: '3',
        content:
            'Excellent choix! Smatch propose des solutions WMS modulaire adaptées à vos besoins logistiques. Voulez-vous planifier une démo personnalisée?',
        sender: 'bot',
        timestamp: new Date(),
    },
]

function formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function ChatbotWidget() {
    const { isOpen, openChat, closeChat } = useChatbot()
    const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = () => {
        if (!inputValue.trim()) return

        // Add user message (mock only - no backend)
        const userMessage: Message = {
            id: Date.now().toString(),
            content: inputValue,
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setInputValue('')

        // Simulate bot response after a short delay
        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                content:
                    "Merci pour votre message! Un expert Smatch vous contactera bientôt. En attendant, n'hésitez pas à explorer nos solutions sur le site.",
                sender: 'bot',
                timestamp: new Date(),
            }
            setMessages((prev) => [...prev, botResponse])
        }, 1000)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    return (
        <>
            {/* Floating Action Button - Desktop Only */}
            <button
                onClick={openChat}
                className={cn(
                    'chatbot-fab fixed bottom-6 right-6 z-[10001] hidden h-16 w-16 items-center justify-center rounded-full bg-smatch-gold text-smatch-black shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-glow-lg md:flex',
                    isOpen && 'pointer-events-none opacity-0',
                )}
                aria-label="Ouvrir le chat"
            >
                <ChatCircle className="h-7 w-7" weight="fill" />
                <span className="chatbot-fab-pulse" />
            </button>


            {/* Chat Window */}
            <div
                className={cn(
                    'chatbot-window fixed z-[10001] flex flex-col overflow-hidden rounded-2xl border border-smatch-border bg-smatch-charcoal/95 shadow-2xl backdrop-blur-xl transition-all duration-300',
                    // Mobile: positioned above the navbar dock (bottom-20 = ~80px) | Desktop: fixed dimensions
                    'bottom-20 right-4 left-4 h-[60vh] max-h-[500px] md:bottom-6 md:right-6 md:left-auto md:h-[600px] md:w-[400px]',
                    isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-smatch-border bg-smatch-black/50 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-smatch-gold">
                            <Robot className="h-5 w-5" weight="fill" />
                        </div>
                        <div>
                            <h3 className="font-heading text-lg font-semibold tracking-wide text-white">
                                Assistant Smatch
                            </h3>
                            <p className="text-xs text-smatch-text-secondary">En ligne</p>
                        </div>
                    </div>
                    <button
                        onClick={closeChat}
                        className="flex h-9 w-9 items-center justify-center rounded-full text-smatch-text-secondary transition-colors hover:bg-white/10 hover:text-white"
                        aria-label="Fermer le chat"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div
                    className="chatbot-messages flex-1 overflow-y-auto p-5"
                    role="log"
                    aria-live="polite"
                    aria-label="Historique de discussion"
                >
                    <div className="flex flex-col gap-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={cn('flex flex-col gap-1', message.sender === 'user' ? 'items-end' : 'items-start')}
                            >
                                <div
                                    className={cn(
                                        'max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed',
                                        message.sender === 'user'
                                            ? 'chatbot-message-user bg-gold-gradient text-smatch-black'
                                            : 'chatbot-message-bot bg-smatch-surface text-white',
                                    )}
                                >
                                    {message.content}
                                </div>
                                <span className="px-2 font-mono text-[10px] text-smatch-text-muted">
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-smatch-border bg-smatch-black/50 p-4">
                    <div className="flex items-center gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Écrivez votre message..."
                            aria-label="Écrivez votre message"
                            className="flex-1 rounded-xl border border-white/10 bg-smatch-surface px-4 py-3 text-sm text-white placeholder:text-smatch-text-muted focus:border-smatch-gold focus:outline-none focus:ring-1 focus:ring-smatch-gold"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim()}
                            className="flex h-12 w-12 items-center justify-center rounded-xl bg-smatch-gold text-smatch-black transition-all hover:bg-smatch-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label="Envoyer"
                        >
                            <PaperPlaneTilt className="h-5 w-5" weight="fill" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
