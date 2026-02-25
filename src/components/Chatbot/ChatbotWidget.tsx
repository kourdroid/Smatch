'use client'

import { useRef, useEffect, useState } from 'react'
import { ChatCircle, X, PaperPlaneTilt, Robot, CircleNotch } from '@phosphor-icons/react'
import { cn } from '@/utilities/ui'
import { useChatbot } from './ChatbotContext'
import type { Locale } from '@/utilities/i18n'
import './chatbot.css'

interface Message {
    id: string
    content: string
    sender: 'bot' | 'user'
    timestamp: Date
}

// Welcome messages by locale
const WELCOME_MESSAGES: Record<string, string> = {
    fr: "Bonjour! 👋 Je suis l'assistant Smatch. Comment puis-je vous aider aujourd'hui?",
    en: "Hello! 👋 I'm the Smatch assistant. How can I help you today?",
}

function getWelcomeMessage(locale: string): Message {
    return {
        id: 'welcome',
        content: WELCOME_MESSAGES[locale] || WELCOME_MESSAGES.fr,
        sender: 'bot',
        timestamp: new Date(),
    }
}

// Localized UI strings
const CHATBOT_STRINGS: Record<string, {
    assistantName: string
    online: string
    responding: string
    thinking: string
    placeholder: string
    send: string
    openChat: string
    closeChat: string
    fallbackMessage: string
}> = {
    fr: {
        assistantName: 'Assistant Smatch',
        online: 'En ligne',
        responding: 'En train de répondre...',
        thinking: 'En train de réfléchir...',
        placeholder: 'Écrivez votre message...',
        send: 'Envoyer',
        openChat: 'Ouvrir le chat',
        closeChat: 'Fermer le chat',
        fallbackMessage: 'Merci pour votre message! Un expert Smatch vous contactera bientôt.',
    },
    en: {
        assistantName: 'Smatch Assistant',
        online: 'Online',
        responding: 'Responding...',
        thinking: 'Thinking...',
        placeholder: 'Type your message...',
        send: 'Send',
        openChat: 'Open chat',
        closeChat: 'Close chat',
        fallbackMessage: 'Thank you for your message! A Smatch expert will contact you soon.',
    },
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

export function ChatbotWidget({ locale }: { locale: Locale }) {
    const { isOpen, openChat, closeChat, sendMessage, isLoading, sessionId } = useChatbot()
    const [messages, setMessages] = useState<Message[]>([getWelcomeMessage(locale)])
    const strings = CHATBOT_STRINGS[locale] || CHATBOT_STRINGS.fr
    const [inputValue, setInputValue] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    // Auto-focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            // Small delay to ensure the element is visible
            setTimeout(() => inputRef.current?.focus(), 100)
        }
    }, [isOpen])

    // Auto-scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return

        const userMessageContent = inputValue.trim()

        // Add user message immediately for responsive UI
        const userMessage: Message = {
            id: Date.now().toString(),
            content: userMessageContent,
            sender: 'user',
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, userMessage])
        setInputValue('')

        // Focus immediately after clearing input to maintain focus
        setTimeout(() => inputRef.current?.focus(), 0)

        // Send to webhook via API route
        const botReply = await sendMessage(userMessageContent, locale)

        // Add bot response
        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: botReply || strings.fallbackMessage,
            sender: 'bot',
            timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])

        // Re-focus input after sending
        setTimeout(() => inputRef.current?.focus(), 0)
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
                    'chatbot-fab fixed bottom-6 right-6 z-[10001] hidden size-16 items-center justify-center rounded-full bg-smatch-gold text-smatch-black shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-glow-lg md:flex',
                    isOpen && 'pointer-events-none opacity-0',
                )}
                aria-label={strings.openChat}
                aria-expanded={isOpen}
                aria-controls="chatbot-window"
            >
                <ChatCircle className="size-7" weight="fill" />
                <span className="chatbot-fab-pulse" />
            </button>


            {/* Chat Window */}
            <div
                id="chatbot-window"
                role="dialog"
                aria-modal="false"
                aria-labelledby="chatbot-title"
                className={cn(
                    'chatbot-window fixed z-[10001] flex flex-col overflow-hidden rounded-2xl border border-smatch-border bg-smatch-charcoal/95 shadow-2xl backdrop-blur-xl transition-all duration-300',
                    // Mobile: positioned above the navbar dock (bottom-20 = ~80px) | Desktop: fixed dimensions
                    'bottom-20 right-4 left-4 h-[60vh] max-h-[500px] md:bottom-6 md:right-6 md:left-auto md:h-[600px] md:w-[400px]',
                    isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0 invisible',
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-smatch-border bg-smatch-black/50 px-5 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-smatch-gold">
                            <Robot className="size-5" weight="fill" />
                        </div>
                        <div>
                            <h3 id="chatbot-title" className="font-heading text-lg font-semibold tracking-wide text-white">
                                {strings.assistantName}
                            </h3>
                            <p className="text-xs text-smatch-text-secondary">
                                {isLoading ? strings.responding : strings.online}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={closeChat}
                        className="flex size-9 items-center justify-center rounded-full text-smatch-text-secondary transition-colors hover:bg-white/10 hover:text-white"
                        aria-label={strings.closeChat}
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="chatbot-messages flex-1 overflow-y-auto p-5" role="log" aria-live="polite">
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

                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="flex items-start">
                                <div className="flex items-center gap-2 rounded-2xl bg-smatch-surface px-4 py-3 text-sm text-white">
                                    <CircleNotch className="size-4 animate-spin" />
                                    <span>{strings.thinking}</span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <div className="border-t border-smatch-border bg-smatch-black/50 p-4">
                    <div className="flex items-center gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={strings.placeholder}
                            disabled={isLoading}
                            className="flex-1 rounded-xl border border-white/10 bg-smatch-surface px-4 py-3 text-sm text-white placeholder:text-smatch-text-muted focus:border-smatch-gold focus:outline-none focus:ring-1 focus:ring-smatch-gold disabled:opacity-50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            className="flex size-12 items-center justify-center rounded-xl bg-smatch-gold text-smatch-black transition-all hover:bg-smatch-gold-light disabled:cursor-not-allowed disabled:opacity-50"
                            aria-label={strings.send}
                        >
                            {isLoading ? (
                                <CircleNotch className="size-5 animate-spin" />
                            ) : (
                                <PaperPlaneTilt className="size-5" weight="fill" />
                            )}
                        </button>
                    </div>

                    {/* Session ID indicator (dev only) */}
                    {process.env.NODE_ENV === 'development' && sessionId && (
                        <p className="mt-2 text-center font-mono text-[9px] text-smatch-text-muted/50">
                            Session: {sessionId.slice(0, 20)}...
                        </p>
                    )}
                </div>
            </div>
        </>
    )
}
