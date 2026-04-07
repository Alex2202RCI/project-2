'use client';

import { useState } from 'react';
import { Ministry, MinistryAgreement } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Send,
  MessageSquare,
  FileText,
  Paperclip,
  X,
  File,
  Download,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  attachments?: string[];
}

interface MinistryChatProps {
  ministry: Ministry;
  agreements: MinistryAgreement[];
  onClose: () => void;
}

// Шаблоны писем
const letterTemplates = [
  { id: 'template-1', name: 'Запрос на получение лицензии', file: 'license_request_template.pdf' },
  { id: 'template-2', name: 'Запрос на разрешение', file: 'permit_request_template.pdf' },
  { id: 'template-3', name: 'Официальное письмо', file: 'official_letter_template.pdf' },
  { id: 'template-4', name: 'Запрос на встречу', file: 'meeting_request_template.pdf' },
  { id: 'template-5', name: 'Благодарственное письмо', file: 'thank_you_letter_template.pdf' },
];

export function MinistryChat({ ministry, agreements, onClose }: MinistryChatProps) {
  const [newMessage, setNewMessage] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      senderId: 'ministry',
      senderName: ministry.name,
      text: `Добро пожаловать в чат с ${ministry.name}. Чем мы можем вам помочь?`,
      timestamp: new Date('2024-03-01T09:00:00'),
    },
    {
      id: 'msg-2',
      senderId: 'user',
      senderName: 'Иванов И.И.',
      text: `Здравствуйте! Хотели бы обсудить вопросы сотрудничества по проекту.`,
      timestamp: new Date('2024-03-01T10:30:00'),
    },
    {
      id: 'msg-3',
      senderId: 'ministry',
      senderName: ministry.ministerName || ministry.name,
      text: 'Спасибо за обращение. Пожалуйста, направьте официальный запрос через систему, и мы рассмотрим его в кратчайшие сроки.',
      timestamp: new Date('2024-03-01T11:00:00'),
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      senderName: 'Иванов И.И.',
      text: newMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center" onClick={onClose}>
      <Card className="w-[480px] h-[calc(100vh-120px)] shadow-2xl border border-slate-200 flex flex-col" onClick={(e) => e.stopPropagation()}>
      {/* Заголовок */}
      <CardHeader className="pb-3 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-base">{ministry.name}</CardTitle>
              <p className="text-xs text-slate-500">
                {ministry.ministerName && ministry.ministerName !== 'Не назначен' && (
                  <span>Министр: {ministry.ministerName}</span>
                )}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      {/* Вкладки */}
      <Tabs defaultValue="chat" className="flex-1 flex flex-col min-h-0">
        <TabsList className="grid w-full grid-cols-3 flex-shrink-0 mx-4 mt-3">
          <TabsTrigger value="chat" className="text-xs">Чат</TabsTrigger>
          <TabsTrigger value="documents" className="text-xs">Документы</TabsTrigger>
          <TabsTrigger value="templates" className="text-xs">Шаблоны</TabsTrigger>
        </TabsList>

        {/* Чат */}
        <TabsContent value="chat" className="flex-1 flex flex-col min-h-0 m-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwn = message.senderId === 'user';

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
                          {message.senderName}
                        </p>
                      )}
                      <p className={`text-sm ${isOwn ? 'text-white' : 'text-slate-900'}`}>
                        {message.text}
                      </p>
                      {message.attachments && message.attachments.length > 0 && (
                        <div className="mt-2 space-y-1">
                          {message.attachments.map((file, idx) => (
                            <div
                              key={idx}
                              className={`flex items-center gap-2 text-xs ${
                                isOwn ? 'text-blue-100' : 'text-slate-500'
                              }`}
                            >
                              <File className="w-3 h-3" />
                              <span>{file}</span>
                              <Download className="w-3 h-3 cursor-pointer hover:opacity-70" />
                            </div>
                          ))}
                        </div>
                      )}
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

          {/* Ввод сообщения */}
          <div className="p-3 border-t border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Написать сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-9 text-sm"
              />
              <Button onClick={handleSendMessage} size="sm" className="h-8 px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Быстрые шаблоны */}
            {showTemplates && (
              <div className="mt-2 bg-slate-50 rounded-lg p-2">
                <p className="text-xs text-slate-500 mb-2">Шаблоны писем:</p>
                <div className="space-y-1">
                  {letterTemplates.map((template) => (
                    <button
                      key={template.id}
                      className="w-full text-left text-xs p-2 hover:bg-slate-100 rounded flex items-center gap-2"
                      onClick={() => {
                        setNewMessage(`Прошу рассмотреть запрос по шаблону: ${template.name}`);
                        setShowTemplates(false);
                      }}
                    >
                      <FileText className="w-3 h-3 text-slate-400" />
                      {template.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Документы */}
        <TabsContent value="documents" className="flex-1 overflow-y-auto p-4 m-0">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Соглашения и документы</h4>
            {agreements.map((agr) => (
              <div
                key={agr.id}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-medium text-slate-900">{agr.title}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{agr.description}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        style={{
                          backgroundColor:
                            agr.status === 'Действует'
                              ? '#22c55e20'
                              : agr.status === 'На подписании'
                              ? '#3b82f620'
                              : '#64748b20',
                          color:
                            agr.status === 'Действует'
                              ? '#22c55e'
                              : agr.status === 'На подписании'
                              ? '#3b82f6'
                              : '#64748b',
                        }}
                      >
                        {agr.status}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        с {new Date(agr.effectiveDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  {agr.documentUrl && (
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {agreements.length === 0 && (
              <div className="text-center py-8 text-sm text-slate-500">
                Нет документов от данного министерства
              </div>
            )}
          </div>
        </TabsContent>

        {/* Шаблоны */}
        <TabsContent value="templates" className="flex-1 overflow-y-auto p-4 m-0">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-900 mb-3">Шаблоны писем (PDF)</h4>
            {letterTemplates.map((template) => (
              <div
                key={template.id}
                className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <File className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{template.name}</p>
                    <p className="text-xs text-slate-500">{template.file}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setNewMessage(`Прошу рассмотреть запрос по шаблону: ${template.name}`);
                    }}
                  >
                    Использовать
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
    </div>
  );
}
