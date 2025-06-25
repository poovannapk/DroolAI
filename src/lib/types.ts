export interface ChatMessage {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: string; // ISO string if from API
  language?: string;
  tone?: string;
}

export interface ChatHistoryResponse {
  messages: ChatMessage[];
}

export interface SendMessageResponse {
  message: ChatMessage;
}

export interface ApiError {
  message: string;
  code?: string | number;
}