
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  Users, 
  Globe,
  Bot,
  Star
} from 'lucide-react';

const MetricsOverview = () => {
  const metrics = [
    {
      title: "Active Conversations",
      value: "1,247",
      change: "+12%",
      changeType: "positive",
      icon: MessageCircle,
      description: "Across all channels"
    },
    {
      title: "Response Time",
      value: "1.3s",
      change: "-23%",
      changeType: "positive",
      icon: Clock,
      description: "Average AI response"
    },
    {
      title: "Resolution Rate",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: CheckCircle,
      description: "Auto-resolved queries"
    },
    {
      title: "Quality Score",
      value: "9.2/10",
      change: "+0.3",
      changeType: "positive",
      icon: Star,
      description: "AI interaction quality"
    },
    {
      title: "Active Agents",
      value: "24",
      change: "2 online",
      changeType: "neutral",
      icon: Users,
      description: "Human agents available"
    },
    {
      title: "Languages",
      value: "12",
      change: "+2 new",
      changeType: "positive",
      icon: Globe,
      description: "Supported languages"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <Card key={metric.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center space-x-2 mt-2">
                <Badge 
                  variant={metric.changeType === 'positive' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {metric.changeType === 'positive' && <TrendingUp className="h-3 w-3 mr-1" />}
                  {metric.change}
                </Badge>
                <p className="text-xs text-muted-foreground">
                  {metric.description}
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export { MetricsOverview };
