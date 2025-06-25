
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  MessageCircle, 
  Clock, 
  Star, 
  TrendingUp,
  Settings,
  Plus,
  MoreHorizontal
} from 'lucide-react';

const AgentManagement = () => {
  const agents = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      status: 'online',
      activeChats: 3,
      totalChats: 127,
      avgResponse: '45s',
      quality: 9.2,
      languages: ['English', 'Spanish'],
      specialization: 'Technical Support'
    },
    {
      id: 2,
      name: 'Raj Patel',
      email: 'raj.p@company.com',
      status: 'online',
      activeChats: 5,
      totalChats: 203,
      avgResponse: '32s',
      quality: 8.9,
      languages: ['Hindi', 'English', 'Gujarati'],
      specialization: 'Billing & Orders'
    },
    {
      id: 3,
      name: 'Maria Garcia',
      email: 'maria.g@company.com',
      status: 'busy',
      activeChats: 7,
      totalChats: 156,
      avgResponse: '28s',
      quality: 9.1,
      languages: ['Spanish', 'English'],
      specialization: 'Customer Care'
    },
    {
      id: 4,
      name: 'David Chen',
      email: 'david.c@company.com',
      status: 'away',
      activeChats: 0,
      totalChats: 89,
      avgResponse: '51s',
      quality: 8.7,
      languages: ['English', 'Mandarin'],
      specialization: 'Technical Support'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'busy': return 'bg-yellow-500';
      case 'away': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'online': return 'default';
      case 'busy': return 'secondary';
      case 'away': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Agent Management</h3>
          <p className="text-muted-foreground">Monitor and manage your support team</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Agent
          </Button>
        </div>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">18 online</span>, 6 offline
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Chats</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              Across all agents
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38s</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-12%</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Quality</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.9/10</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.2</span> this week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Agent List */}
      <Card>
        <CardHeader>
          <CardTitle>Active Agents</CardTitle>
          <CardDescription>Real-time agent status and performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={`/placeholder-avatar-${agent.id}.jpg`} />
                      <AvatarFallback>
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background ${getStatusColor(agent.status)}`} />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{agent.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={getStatusVariant(agent.status)} className="text-xs">
                        {agent.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {agent.specialization}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-lg font-bold">{agent.activeChats}</div>
                    <div className="text-xs text-muted-foreground">Active</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{agent.totalChats}</div>
                    <div className="text-xs text-muted-foreground">Total Today</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{agent.avgResponse}</div>
                    <div className="text-xs text-muted-foreground">Avg Response</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {agent.quality}
                    </div>
                    <div className="text-xs text-muted-foreground">Quality Score</div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="text-sm font-medium">Languages</div>
                    <div className="flex gap-1 mt-1">
                      {agent.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Agent Performance</CardTitle>
            <CardDescription>Top performers this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {agents.slice(0, 3).map((agent, index) => (
                <div key={agent.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{agent.name}</div>
                      <div className="text-sm text-muted-foreground">{agent.specialization}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress value={agent.quality * 10} className="h-2 w-20" />
                    <Badge variant="outline">{agent.quality}/10</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Coaching Insights</CardTitle>
            <CardDescription>Automated recommendations for team improvement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium">Response Time Improvement</div>
                  <div className="text-sm text-muted-foreground">
                    3 agents showed 15% faster responses this week
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <div className="font-medium">Quality Score Trends</div>
                  <div className="text-sm text-muted-foreground">
                    Team average increased by 0.3 points
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <div className="font-medium">Language Coverage</div>
                  <div className="text-sm text-muted-foreground">
                    Hindi support requests up 25%
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { AgentManagement };
