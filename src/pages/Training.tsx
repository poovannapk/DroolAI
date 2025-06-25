
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Users, 
  MessageCircle,
  Star,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

export default function Training() {
  const [isTraining, setIsTraining] = useState(false);

  const trainingSessions = [
    {
      id: '1',
      name: 'Multilingual Response Quality',
      status: 'completed',
      accuracy: 94.2,
      languages: ['Hindi', 'English', 'Tamil'],
      completedAt: '2 hours ago'
    },
    {
      id: '2',
      name: 'Tone Adaptation Training',
      status: 'running',
      accuracy: 87.8,
      languages: ['English', 'Bengali'],
      completedAt: 'In progress'
    },
    {
      id: '3',
      name: 'Technical Support Scenarios',
      status: 'scheduled',
      accuracy: 0,
      languages: ['English', 'Hindi'],
      completedAt: 'Starting in 1 hour'
    }
  ];

  const modelMetrics = [
    { name: 'Intent Recognition', current: 96.2, target: 98.0, trend: 'up' },
    { name: 'Response Relevance', current: 91.8, target: 95.0, trend: 'up' },
    { name: 'Language Detection', current: 98.5, target: 99.0, trend: 'stable' },
    { name: 'Tone Consistency', current: 89.3, target: 92.0, trend: 'up' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Training Center</h1>
        <p className="text-muted-foreground">
          Monitor and optimize your AI model performance
        </p>
      </div>

      {/* Training Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Accuracy</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.2%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Training Sessions</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 active, 9 completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Languages Trained</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              Hindi, English, Tamil +5 more
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Improvement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15%</div>
            <p className="text-xs text-muted-foreground">
              Response quality this month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="sessions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sessions">Training Sessions</TabsTrigger>
          <TabsTrigger value="metrics">Model Metrics</TabsTrigger>
          <TabsTrigger value="datasets">Training Data</TabsTrigger>
          <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
        </TabsList>

        <TabsContent value="sessions" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Training Sessions</h3>
            <Button>
              <Brain className="h-4 w-4 mr-2" />
              Start New Training
            </Button>
          </div>

          <div className="space-y-4">
            {trainingSessions.map((session) => (
              <Card key={session.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-semibold">{session.name}</h4>
                      <p className="text-sm text-muted-foreground">{session.completedAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          session.status === 'completed' ? 'default' :
                          session.status === 'running' ? 'secondary' : 'outline'
                        }
                      >
                        {session.status}
                      </Badge>
                      {session.status === 'running' && (
                        <Button size="sm" variant="outline">
                          <Pause className="h-4 w-4" />
                        </Button>
                      )}
                      {session.status === 'completed' && (
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Accuracy</span>
                      <span className="font-medium">{session.accuracy}%</span>
                    </div>
                    <Progress value={session.accuracy} className="h-2" />
                  </div>

                  <div className="flex items-center gap-2 mt-4">
                    <span className="text-sm text-muted-foreground">Languages:</span>
                    {session.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Performance Metrics</CardTitle>
              <CardDescription>
                Track key performance indicators for your AI model
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {modelMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {metric.current}% / {metric.target}%
                        </span>
                        <TrendingUp className={`h-4 w-4 ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-muted-foreground'
                        }`} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={metric.current} className="flex-1 h-2" />
                      <Progress value={metric.target} className="w-16 h-2 opacity-50" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="datasets" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Datasets</CardTitle>
              <CardDescription>
                Manage your training data and conversation logs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Conversation Logs</h4>
                    <p className="text-2xl font-bold mt-2">2.4M</p>
                    <p className="text-sm text-muted-foreground">Messages processed</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Knowledge Base</h4>
                    <p className="text-2xl font-bold mt-2">15.2K</p>
                    <p className="text-sm text-muted-foreground">Documents indexed</p>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium">Voice Transcripts</h4>
                    <p className="text-2xl font-bold mt-2">8.7K</p>
                    <p className="text-sm text-muted-foreground">Hours transcribed</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evaluation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Evaluation</CardTitle>
              <CardDescription>
                Real-time evaluation and quality scoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Quality Scores</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Overall Quality</span>
                        <Badge variant="outline">9.2/10</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Helpfulness</span>
                        <Badge variant="outline">8.9/10</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Accuracy</span>
                        <Badge variant="outline">9.4/10</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Tone Consistency</span>
                        <Badge variant="outline">8.7/10</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Recent Evaluations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Hindi responses improved 12%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Technical accuracy up 8%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Response time reduced 15%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Button className="w-full">
                  Run Full Evaluation
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
