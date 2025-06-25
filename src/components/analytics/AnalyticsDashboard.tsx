
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  Globe, 
  Clock, 
  Users, 
  MessageCircle,
  Star,
  Target
} from 'lucide-react';

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Interactions</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45,231</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+20.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.9/10</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+0.5</span> improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3m</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">-15%</span> faster
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agent Efficiency</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> increase
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="languages">Languages</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Trends</CardTitle>
                <CardDescription>Average response times over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Responses</span>
                    <span className="text-sm font-medium">1.2s avg</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Human Handoff</span>
                    <span className="text-sm font-medium">28s avg</span>
                  </div>
                  <Progress value={70} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Resolution Time</span>
                    <span className="text-sm font-medium">2.3m avg</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interaction Volume</CardTitle>
                <CardDescription>Daily conversation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, index) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="text-sm">{day}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={[85, 92, 78, 96, 88][index]} className="h-2 w-24" />
                        <span className="text-sm font-medium w-12 text-right">
                          {[1247, 1356, 1142, 1408, 1289][index]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="languages" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Language Distribution</CardTitle>
              <CardDescription>Usage across supported languages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { lang: 'English', usage: 45, conversations: '20,354' },
                  { lang: 'Hindi', usage: 25, conversations: '11,308' },
                  { lang: 'Tamil', usage: 12, conversations: '5,428' },
                  { lang: 'Telugu', usage: 8, conversations: '3,618' },
                  { lang: 'Bengali', usage: 6, conversations: '2,714' },
                  { lang: 'Others', usage: 4, conversations: '1,809' }
                ].map((item) => (
                  <div key={item.lang} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{item.lang}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <Progress value={item.usage} className="h-2 w-32" />
                      <span className="text-sm text-muted-foreground w-16 text-right">
                        {item.conversations}
                      </span>
                      <Badge variant="outline" className="w-12 justify-center">
                        {item.usage}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Web Chat
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18,562</div>
                <p className="text-xs text-muted-foreground">41% of total</p>
                <Progress value={85} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15,428</div>
                <p className="text-xs text-muted-foreground">34% of total</p>
                <Progress value={70} className="h-2 mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  API/SDK
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">11,241</div>
                <p className="text-xs text-muted-foreground">25% of total</p>
                <Progress value={55} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Quality Metrics</CardTitle>
              <CardDescription>Automated quality assessment across interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Quality Scores by Category</h4>
                  {[
                    { category: 'Intent Recognition', score: 9.2 },
                    { category: 'Response Accuracy', score: 8.8 },
                    { category: 'Language Quality', score: 9.1 },
                    { category: 'Tone Consistency', score: 8.6 },
                    { category: 'Context Awareness', score: 8.9 }
                  ].map((item) => (
                    <div key={item.category} className="flex items-center justify-between">
                      <span className="text-sm">{item.category}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={item.score * 10} className="h-2 w-24" />
                        <Badge variant="outline" className="w-12 justify-center">
                          {item.score}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Improvement Trends</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">+12% accuracy improvement</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">-23% response time reduction</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="text-sm">+8% customer satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { AnalyticsDashboard };
