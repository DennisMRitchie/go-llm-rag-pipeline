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
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#09090b', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ backgroundColor: '#18181b', borderBottom: '1px solid #3f3f46', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Bot style={{ width: 32, height: 32, color: '#10b981' }} />
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, margin: 0 }}>Go RAG Pipeline</h1>
          <p style={{ fontSize: '12px', color: '#71717a', margin: 0 }}>LLM Assistant</p>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{ maxWidth: '75%', borderRadius: '16px', padding: '12px 20px', backgroundColor: msg.role === 'user' ? '#059669' : '#27272a', fontSize: '14px', lineHeight: '1.6' }}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ backgroundColor: '#27272a', borderRadius: '16px', padding: '12px 20px' }}>Думаю...</div>
          </div>
        )}
      </div>
      <div style={{ padding: '16px', borderTop: '1px solid #3f3f46', backgroundColor: '#18181b' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Напиши сообщение..."
            style={{ flex: 1, backgroundColor: '#27272a', border: '1px solid #3f3f46', borderRadius: '16px', padding: '12px 20px', color: 'white', fontSize: '14px', outline: 'none' }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            style={{ backgroundColor: '#059669', border: 'none', borderRadius: '16px', padding: '12px 24px', cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}
          >
            <Send style={{ width: 20, height: 20, color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
