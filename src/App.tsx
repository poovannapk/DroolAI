import { Toaster } from "@/components/ui/toaster";
// spell-checker: disable-next-line
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Training from "./pages/Training";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import NotFound from "./pages/NotFound";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { AnalyticsDashboard } from "@/components/analytics/AnalyticsDashboard";
import { AgentManagement } from "@/components/agents/AgentManagement";
import Settings from "./pages/Settings";
import LandingPage from "./pages/LandingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
            <Sonner />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="chat" element={<ChatInterface />} />
              <Route path="analytics" element={<AnalyticsDashboard />} />
              <Route path="agents" element={<AgentManagement />} />
              <Route path="upload" element={<Upload />} />
              <Route path="training" element={<Training />} />
                            <Route path="automations" element={<div className="p-6"><h1 className="text-2xl font-bold">Automations</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="knowledge" element={<div className="p-6"><h1 className="text-2xl font-bold">Knowledge Base</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
              <Route path="automations" element={<div className="p-6"><h1 className="text-2xl font-bold">Automations</h1><p className="text-muted-foreground">Coming soon...</p></div>} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
