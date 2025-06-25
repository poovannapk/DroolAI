import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  Globe, 
  Mic,
  FileText,
  ExternalLink
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage, ChatHistoryResponse, SendMessageResponse, ApiError } from '@/lib/apiTypes';

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const ws = useRef<WebSocket | null>(null);

  // Fetch chat history on mount
  useEffect(() => {
    setLoading(true);
    fetch('/api/chat/history')
      .then(res => res.json())
      .then((data: ChatHistoryResponse) => {
        setMessages(data.messages);
        setError(null);
      })
      .catch(() => setError('Failed to load chat history.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    ws.current = new WebSocket('wss://your-api/chat');
    ws.current.onmessage = (event) => {
      const data: ChatMessage = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };
    ws.current.onerror = () => setError('WebSocket error.');
    return () => ws.current?.close();
  }, []);

  // Send message handler
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    setSending(true);
    fetch('/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMessage }),
    })
      .then(res => res.json())
      .then((data: SendMessageResponse) => {
        setMessages(prev => [...prev, data.message]);
        setNewMessage('');
        setError(null);
      })
      .catch(() => setError('Failed to send message.'))
      .finally(() => setSending(false));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Active Chats List */}
      <div className="lg:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Active Conversations</CardTitle>
            <CardDescription>Real-time chat monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="p-3 border rounded-lg cursor-pointer hover:bg-accent">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">User #{i}23{i}</span>
                      <Badge variant={i <= 2 ? 'default' : 'secondary'} className="text-xs">
                        {i <= 2 ? 'AI' : 'Agent'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      Last message: Need help with order status...
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="outline" className="text-xs">
                        <Globe className="h-3 w-3 mr-1" />
                        {i % 2 === 0 ? 'Hindi' : 'English'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">2m ago</span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-3">
        <Card className="h-[600px] flex flex-col">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat Session #12345
                </CardTitle>
                <CardDescription>AI-powered multilingual support</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  <Globe className="h-3 w-3 mr-1" />
                  Auto-detect
                </Badge>
                <Badge variant="secondary">
                  <Bot className="h-3 w-3 mr-1" />
                  AI Active
                </Badge>
                <Button variant="outline" size="sm">
                  Transfer to Agent
                </Button>
              </div>
            </div>
          </CardHeader>

          <Separator />

          {/* Messages Area */}
          <CardContent className="flex-1 p-0">
            {loading ? (
              <div className="flex items-center justify-center h-full">Loading...</div>
            ) : error ? (
              <div className="flex items-center justify-center h-full text-red-500">{error}</div>
            ) : (
              <ScrollArea className="h-full p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[70%] rounded-lg p-3 ${
                        message.type === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : message.type === 'bot'
                          ? 'bg-muted'
                          : 'bg-blue-100 text-blue-900'
                      }`}>
                        <div className="flex items-center gap-2 mb-1">
                          {message.type === 'user' ? (
                            <User className="h-4 w-4" />
                          ) : message.type === 'bot' ? (
                            <Bot className="h-4 w-4" />
                          ) : (
                            <MessageCircle className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.type === 'user' ? 'User' : message.type === 'bot' ? 'AI Assistant' : 'Agent'}
                          </span>
                          {message.language && (
                            <Badge variant="outline" className="text-xs">
                              {message.language}
                            </Badge>
                          )}
                          {message.tone && (
                            <Badge variant="secondary" className="text-xs">
                              {message.tone}
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </CardContent>

          <Separator />

          {/* Input Area */}
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Button variant="outline" size="sm">
                <Mic className="h-4 w-4 mr-1" />
                Voice
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-1" />
                PDF
              </Button>
              <Button variant="outline" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                Web
              </Button>
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
                disabled={sending}
              />
              <Button onClick={handleSendMessage} disabled={sending || !newMessage.trim()}>
                {sending ? 'Sending...' : <Send className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export { ChatInterface };
