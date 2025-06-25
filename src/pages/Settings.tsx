
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Globe, 
  Shield, 
  Zap, 
  Palette,
  Key,
  Bell,
  Database
} from 'lucide-react';

export default function Settings() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    agentAlerts: true
  });

  const [aiSettings, setAiSettings] = useState({
    autoResponse: true,
    handoffThreshold: 85,
    multilingual: true,
    toneAdaptation: true
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and system preferences
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="ai">AI & Chat</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" defaultValue="john@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" defaultValue="Acme Corp" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Input id="role" defaultValue="Administrator" />
                </div>
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Language & Region
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Primary Language</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Time Zone</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>UTC+05:30 (India Standard Time)</option>
                    <option>UTC+00:00 (GMT)</option>
                    <option>UTC-05:00 (Eastern Time)</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                AI Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Response</p>
                  <p className="text-sm text-muted-foreground">
                    Enable AI to respond automatically to queries
                  </p>
                </div>
                <Switch
                  checked={aiSettings.autoResponse}
                  onCheckedChange={(checked) => 
                    setAiSettings(prev => ({ ...prev, autoResponse: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Multilingual Support</p>
                  <p className="text-sm text-muted-foreground">
                    Detect and respond in multiple languages
                  </p>
                </div>
                <Switch
                  checked={aiSettings.multilingual}
                  onCheckedChange={(checked) => 
                    setAiSettings(prev => ({ ...prev, multilingual: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Tone Adaptation</p>
                  <p className="text-sm text-muted-foreground">
                    Adapt AI personality based on context
                  </p>
                </div>
                <Switch
                  checked={aiSettings.toneAdaptation}
                  onCheckedChange={(checked) => 
                    setAiSettings(prev => ({ ...prev, toneAdaptation: checked }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Human Handoff Threshold ({aiSettings.handoffThreshold}%)</Label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={aiSettings.handoffThreshold}
                  onChange={(e) => 
                    setAiSettings(prev => ({ ...prev, handoffThreshold: parseInt(e.target.value) }))
                  }
                  className="w-full"
                />
                <p className="text-sm text-muted-foreground">
                  Confidence threshold for escalating to human agents
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Personalities</CardTitle>
              <CardDescription>Manage available AI conversation tones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Professional', 'Friendly', 'Empathetic', 'Technical', 'Casual', 'Formal'].map((tone) => (
                  <Badge key={tone} variant="outline" className="p-2 justify-center">
                    {tone}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys & Integrations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">WhatsApp Business API</p>
                    <p className="text-sm text-muted-foreground">Connected</p>
                  </div>
                  <Badge variant="default">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Slack Integration</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Microsoft Teams</p>
                    <p className="text-sm text-muted-foreground">Not connected</p>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security
                  </p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Data Retention</h4>
                <div className="space-y-2">
                  <Label>Chat History Retention (days)</Label>
                  <Input defaultValue="90" type="number" />
                </div>
                <div className="space-y-2">
                  <Label>Analytics Data Retention (days)</Label>
                  <Input defaultValue="365" type="number" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-medium">Privacy Controls</h4>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Anonymize user data</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Enable GDPR compliance</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Switch
                  checked={notifications.email}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, email: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">
                    Browser push notifications
                  </p>
                </div>
                <Switch
                  checked={notifications.push}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, push: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Critical alerts via SMS
                  </p>
                </div>
                <Switch
                  checked={notifications.sms}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, sms: checked }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Agent Alerts</p>
                  <p className="text-sm text-muted-foreground">
                    Notifications for agent activities
                  </p>
                </div>
                <Switch
                  checked={notifications.agentAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications(prev => ({ ...prev, agentAlerts: checked }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Billing & Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Current Plan</h4>
                  <p className="text-2xl font-bold mt-2">Enterprise</p>
                  <p className="text-sm text-muted-foreground">$299/month</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Messages Used</h4>
                  <p className="text-2xl font-bold mt-2">47K</p>
                  <p className="text-sm text-muted-foreground">of 100K limit</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium">Next Billing</h4>
                  <p className="text-2xl font-bold mt-2">Dec 15</p>
                  <p className="text-sm text-muted-foreground">2024</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Payment Method</h4>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 12/25</p>
                  </div>
                  <Button variant="outline">Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
