import { useState } from 'react';
import { Send, Bot } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Привет! Я твой RAG-ассистент. Чем могу помочь?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Ты написал: "${currentInput}"\n\nПока мой Go-бэкенд не подключён, но интерфейс уже работает!`
      }]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-950 text-white">
      <div className="bg-zinc-900 border-b border-zinc-700 p-4 flex items-center gap-3">
        <Bot className="w-8 h-8 text-emerald-500" />
        <div>
          <h1 className="text-xl font-semibold">Go RAG Pipeline</h1>
          <p className="text-xs text-zinc-500">LLM Assistant</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] rounded-2xl px-5 py-3 ${
              msg.role === 'user' ? 'bg-emerald-600' : 'bg-zinc-800'
            }`}>
              <div className="text-sm leading-relaxed">
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && <div className="flex justify-start"><div className="bg-zinc-800 rounded-2xl px-5 py-3">Думаю...</div></div>}
      </div>

      <div className="p-4 border-t border-zinc-700 bg-zinc-900">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Напиши сообщение..."
            className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-500 px-6 rounded-2xl flex items-center justify-center disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;