
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import ChatHistoryPage from "./pages/ChatHistoryPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import BottomNav from "./components/BottomNav";

// Create React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background font-sans text-foreground flex flex-col transition-colors duration-300">
        <Toaster />
        <BrowserRouter>
          <div className="flex-1 flex flex-col pb-16 md:pb-0">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chat" element={<ChatHistoryPage />} />
              <Route path="/chat/:id" element={<ChatPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <div className="md:hidden z-50">
            <BottomNav />
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
