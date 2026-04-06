'use client';

import { useState } from 'react';
import { users } from '@/mock-data/users';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface ProjectChatProps {
  projectId: string;
  projectName: string;
}

export function ProjectChat({ projectId, projectName }: ProjectChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-1',
      senderId: 'user-2',
      text: `Обсуждение проекта "${projectName}". Какие вопросы есть?`,
      timestamp: new Date('2026-03-15T10:30:00'),
    },
    {
      id: 'msg-2',
      senderId: 'user-3',
      text: 'Нужно уточнить сроки поставки оборудования',
      timestamp: new Date('2026-03-15T10:35:00'),
    },
  ]);

  const currentUser = users[0]; // Текущий пользователь

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const getParticipant = (id: string) => {
    return users.find((u) => u.id === id);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="border-t border-slate-100 mt-3 pt-3">
      <div className="flex items-center gap-2 mb-3">
        <MessageSquare className="w-4 h-4 text-slate-500" />
        <span className="text-sm font-medium text-slate-700">Коммуникации ({messages.length})</span>
      </div>

      <div className="bg-slate-50 rounded-lg p-3">
        <ScrollArea className="h-40 mb-3">
          <div className="space-y-3">
            {messages.map((message) => {
              const sender = getParticipant(message.senderId);
              const isOwn = message.senderId === currentUser.id;

              return (
                <div
                  key={message.id}
                  className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] ${
                      isOwn
                        ? 'bg-blue-500 text-white'
                        : 'bg-white border border-slate-200'
                    } rounded-xl px-3 py-2`}
                  >
                    {!isOwn && (
                      <p className="text-xs font-medium text-blue-600 mb-1">
                        {sender?.name}
                      </p>
                    )}
                    <p className={`text-sm ${isOwn ? 'text-white' : 'text-slate-900'}`}>
                      {message.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        isOwn ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="flex items-center gap-2">
          <Input
            placeholder="Написать сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 h-8 text-sm"
          />
          <Button onClick={handleSendMessage} size="sm" className="h-8 px-3">
            <Send className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}