import React, { useState, useEffect, useRef } from 'react';
import { CreateWebWorkerMLCEngine, InitProgressReport } from '@mlc-ai/web-llm';
import { MessageCircle, X, Send, Bot, Loader2, Maximize2, Minimize2 } from 'lucide-react';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [progressText, setProgressText] = useState('');
    const [engine, setEngine] = useState<any>(null);
    const [isInitializing, setIsInitializing] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const modelId = "Llama-3.2-1B-Instruct-q4f16_1-MLC";

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleOpenEvent = () => {
            setIsOpen(true);
            if (!engine) {
                initEngine();
            }
        };

        window.addEventListener('open-local-chat', handleOpenEvent);
        return () => window.removeEventListener('open-local-chat', handleOpenEvent);
    }, [engine]);

    const initEngine = async () => {
        if (engine || isInitializing) return;
        setIsInitializing(true);

        try {
            const initProgressCallback = (report: InitProgressReport) => {
                setProgressText(report.text);
            };

            // We use the prebuilt AppConfig to get standard models
            const newEngine = await CreateWebWorkerMLCEngine(
                new Worker(new URL('./llm-worker.ts', import.meta.url), { type: 'module' }),
                modelId,
                { initProgressCallback }
            );

            setEngine(newEngine);
            setProgressText('');
            setMessages([{
                role: 'assistant',
                content: "Hi there! I'm here 24/7 to listen and support you. How are you feeling today? Anything you share with me stays completely private on your device."
            }]);
        } catch (err) {
            console.error("Failed to initialize engine:", err);
            setProgressText("Failed to load AI model. Please ensure your browser supports WebGPU.");
        } finally {
            setIsInitializing(false);
        }
    };

    const handleOpen = () => {
        setIsOpen(true);
        if (!engine) {
            initEngine();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || !engine || isLoading) return;

        const userMsg = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setIsLoading(true);

        try {
            const chunks = await engine.chat.completions.create({
                messages: [
                    { role: 'system', content: 'You are a compassionate, empathetic, and supportive mental health friend. Keep your responses concise, warm, and helpful. You are a local AI running completely privately, so assure the user their data is secure.' },
                    ...messages,
                    { role: 'user', content: userMsg }
                ],
                stream: true,
            });

            // Add an empty assistant message that we will stream into
            setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
            setIsLoading(false); // Stop loading animation since response started

            let fullMessage = '';
            for await (const chunk of chunks) {
                const text = chunk.choices[0]?.delta?.content || "";
                fullMessage += text;

                // Update the very last message (the one we just added) with the new text chunk
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1] = {
                        role: 'assistant',
                        content: fullMessage
                    };
                    return newMessages;
                });
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I'm having trouble processing that right now."
            }]);
            setIsLoading(false);
        }
    };

    if (!isOpen) {
        return (
            <button
                onClick={handleOpen}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-105 z-50 flex items-center gap-2 group"
            >
                <MessageCircle size={24} />
                <span className="hidden group-hover:block font-medium">Chat with me</span>
            </button>
        );
    }

    return (
        <div className={`fixed z-50 bg-white shadow-2xl border border-blue-100 flex flex-col overflow-hidden transform transition-all duration-300 ease-in-out ${isMaximized
            ? 'inset-0 w-full h-full rounded-none'
            : 'bottom-6 right-6 w-80 sm:w-96 rounded-2xl h-[500px] max-h-[80vh]'
            }`}>
            {/* Header */}
            <div className={`bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-sm ${isMaximized ? '' : 'rounded-t-2xl'
                }`}>
                <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
                        <Bot size={20} />
                    </div>
                    <div>
                        <h3 className="font-semibold text-[15px] leading-tight">MindCare Friend</h3>
                        <p className="text-blue-100 text-xs mt-0.5">100% Private & Local</p>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsMaximized(!isMaximized)}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                        title={isMaximized ? "Restore down" : "Maximize"}
                    >
                        {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-colors"
                        title="Close"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 scroll-smooth">
                {progressText && (
                    <div className="bg-blue-50 border border-blue-200 text-blue-700 text-xs p-3 rounded-lg shadow-sm flex items-start gap-2">
                        <Loader2 size={16} className="animate-spin mt-0.5 flex-shrink-0" />
                        <span className="leading-snug">
                            {progressText.includes('Downloading') ? 'Downloading local brain (first time only)... ' : ''}{progressText}
                        </span>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        style={{ animation: 'fadeIn 0.3s ease-out' }}
                    >
                        <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${message.role === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                            }`}>
                            <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-3 shadow-sm flex items-center gap-1.5 h-[42px]">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={engine ? "Type your message..." : "Initializing model..."}
                        disabled={!engine || isLoading}
                        className="w-full pl-4 pr-12 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-full text-sm transition-all shadow-sm outline-none disabled:opacity-50"
                    />
                    <button
                        type="submit"
                        disabled={!engine || isLoading || !input.trim()}
                        className="absolute right-1.5 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
                    >
                        <Send size={16} className={isLoading ? 'opacity-0' : ''} />
                        {isLoading && <Loader2 size={16} className="absolute top-2 left-2 animate-spin" />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Chatbot;
