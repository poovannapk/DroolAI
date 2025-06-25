import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  BarChart3, 
  MessageCircle, 
  Users, 
  Upload, 
  Brain, 
  Settings, 
  FileText,
  TrendingUp,
  Zap,
  Bot
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/app', icon: BarChart3 },
  { name: 'Live Chat', href: '/chat', icon: MessageCircle },
  { name: 'Analytics', href: '/analytics', icon: TrendingUp },
  { name: 'Agents', href: '/agents', icon: Users },
  { name: 'Knowledge Base', href: '/knowledge', icon: FileText },
  { name: 'File Upload', href: '/upload', icon: Upload },
  { name: 'AI Training', href: '/training', icon: Brain },
  { name: 'Automations', href: '/automations', icon: Zap },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export const Sidebar = () => {
  return (
    <div className="w-64 bg-card border-r flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Bot className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">DroolAI</h1>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                )
              }
            >
              <Icon className="h-4 w-4 mr-3" />
              {item.name}
            </NavLink>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-sm font-medium">Upgrade to Pro</p>
          <p className="text-xs text-muted-foreground">Unlock advanced features</p>
        </div>
      </div>
    </div>
  );
};
