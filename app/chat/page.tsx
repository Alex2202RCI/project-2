'use client';

import { useState } from 'react';
import { users } from '@/mock-data/users';
import { projects } from '@/mock-data/projects';
import { tasks } from '@/mock-data/tasks';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Send,
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Smile,
  FolderKanban,
  CheckSquare,
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

interface Chat {
  id: string;
  participantIds: string[];
  messages: Message[];
  lastMessage?: Message;
}

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [chats, setChats] = useState<Chat[]>([
    {
      id: 'chat-1',
      participantIds: ['user-1', 'user-2'],
      messages: [
        {
          id: 'msg-1',
          senderId: 'user-2',
          text: 'Добрый день! Как продвигается проект по строительству завода?',
          timestamp: new Date('2026-03-15T10:30:00'),
        },
        {
          id: 'msg-2',
          senderId: 'user-1',
          text: 'Привет! Все идет по плану. Получили все разрешения, оборудование заказано.',
          timestamp: new Date('2026-03-15T10:35:00'),
        },
        {
          id: 'msg-3',
          senderId: 'user-2',
          text: 'Отлично! Когда планируете запуск?',
          timestamp: new Date('2026-03-15T10:40:00'),
        },
      ],
    },
    {
      id: 'chat-2',
      participantIds: ['user-1', 'user-4'],
      messages: [
        {
          id: 'msg-4',
          senderId: 'user-4',
          text: 'Артемий, нужна ваша помощь по проекту геологоразведки',
          timestamp: new Date('2026-03-14T14:20:00'),
        },
      ],
    },
    {
      id: 'chat-3',
      participantIds: ['user-1', 'user-3', 'user-5'],
      messages: [
        {
          id: 'msg-5',
          senderId: 'user-3',
          text: 'Подготовила документы для MIC',
          timestamp: new Date('2026-03-13T09:15:00'),
        },
      ],
    },
  ]);

  const getParticipantNames = (participantIds: string[]) => {
    return participantIds
      .filter((id) => id !== 'user-1')
      .map((id) => {
        const user = users.find((u) => u.id === id);
        return user?.name || id;
      })
      .join(', ');
  };

  const getParticipant = (id: string) => {
    return users.find((u) => u.id === id);
  };

  const currentChat = chats.find((c) => c.id === selectedChat);
  const currentUser = users[0]; // Шатиров Сергей как текущий пользователь

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      text: newMessage,
      timestamp: new Date(),
    };

    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, message],
            lastMessage: message,
          };
        }
        return chat;
      })
    );

    setNewMessage('');
  };

  const filteredChats = chats.filter((chat) => {
    const participantNames = getParticipantNames(chat.participantIds).toLowerCase();
    return participantNames.includes(searchQuery.toLowerCase());
  });

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-50">
      {/* Список чатов */}
      <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Чаты</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Поиск чатов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredChats.map((chat) => {
              const lastMsg = chat.messages[chat.messages.length - 1];
              const isSelected = selectedChat === chat.id;

              return (
                <button
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors mb-1 ${
                    isSelected
                      ? 'bg-blue-50 border border-blue-200'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-blue-100 text-blue-700">
                        {chat.participantIds.length > 2 ? (
                          <span className="text-xs">Группа</span>
                        ) : (
                          getParticipantNames(chat.participantIds).charAt(0)
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 truncate">
                          {getParticipantNames(chat.participantIds)}
                        </span>
                        {lastMsg && (
                          <span className="text-xs text-slate-500">
                            {formatDate(lastMsg.timestamp)}
                          </span>
                        )}
                      </div>
                      {lastMsg && (
                        <p className="text-sm text-slate-500 truncate mt-1">
                          {lastMsg.senderId === currentUser.id ? 'Вы: ' : ''}
                          {lastMsg.text}
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      </div>

      {/* Область чата */}
      {selectedChat && currentChat ? (
        <div className="flex-1 flex flex-col">
          {/* Заголовок чата */}
          <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-blue-100 text-blue-700">
                  {getParticipantNames(currentChat.participantIds).charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-slate-900">
                  {getParticipantNames(currentChat.participantIds)}
                </h3>
                <p className="text-sm text-slate-500">
                  {currentChat.participantIds.length > 2 ? 'Групповой чат' : 'В сети'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Phone className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Сообщения */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {currentChat.messages.map((message) => {
                const sender = getParticipant(message.senderId);
                const isOwn = message.senderId === currentUser.id;

                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] ${
                        isOwn
                          ? 'bg-blue-500 text-white'
                          : 'bg-white border border-slate-200'
                      } rounded-2xl px-4 py-3`}
                    >
                      {!isOwn && (
                        <p className="text-xs font-medium text-blue-600 mb-1">
                          {sender?.name}
                        </p>
                      )}
                      <p className={isOwn ? 'text-white' : 'text-slate-900'}>
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

          {/* Ввод сообщения */}
          <div className="bg-white border-t border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon">
                <Paperclip className="w-5 h-5" />
              </Button>
              <Input
                placeholder="Введите сообщение..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Smile className="w-5 h-5" />
              </Button>
              <Button onClick={handleSendMessage}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              Выберите чат
            </h3>
            <p className="text-slate-500">
              Выберите чат из списка слева для начала общения
            </p>
          </div>
        </div>
      )}

      {/* Панель связанных элементов */}
      {selectedChat && (
        <div className="w-72 bg-white border-l border-slate-200 flex flex-col">
          <div className="p-4 border-b border-slate-200">
            <h3 className="font-semibold text-slate-900">Связанные элементы</h3>
          </div>
          <ScrollArea className="flex-1 p-4">
            {/* Связанные проекты */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <FolderKanban className="w-4 h-4 text-slate-500" />
                <h4 className="text-sm font-medium text-slate-700">Проекты</h4>
              </div>
              <div className="space-y-2">
                {projects.slice(0, 3).map((project) => (
                  <div
                    key={project.id}
                    className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {project.name}
                    </p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {project.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Связанные задачи */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <CheckSquare className="w-4 h-4 text-slate-500" />
                <h4 className="text-sm font-medium text-slate-700">Задачи</h4>
              </div>
              <div className="space-y-2">
                {tasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    className="p-3 bg-slate-50 rounded-lg hover:bg-slate-100 cursor-pointer"
                  >
                    <p className="text-sm font-medium text-slate-900">
                      {task.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}