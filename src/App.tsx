// Import UI components for notifications and tooltips
import { Toaster } from "@/components/ui/toaster";      // Shadcn/ui toaster for toast notifications
import { Toaster as Sonner } from "@/components/ui/sonner"; // Alternative notification component
import { TooltipProvider } from "@/components/ui/tooltip";  // Provider for tooltip functionality

// Import React Query for state management and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import routing components from React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import page components
import Index from "./pages/Index";       // Home page component
import NotFound from "./pages/NotFound"; // 404 error page component

// Create a single instance of QueryClient for the entire app
const queryClient = new QueryClient();

// Main App component - sets up providers and routing for the application
const App = () => (
  // React Query provider - enables data fetching, caching, and synchronization
  <QueryClientProvider client={queryClient}>
    {/* Tooltip provider - enables tooltip functionality throughout the app */}
    <TooltipProvider>
      {/* Toast notification component - displays temporary messages to the user */}
      <Toaster />
      {/* Alternative notification component */}
      <Sonner />
      {/* Browser router - handles client-side routing */}
      <BrowserRouter>
        {/* Routes container - holds all the route definitions */}
        <Routes>
          {/* Home route - renders the Index component when path is "/" */}
          <Route path="/" element={<Index />} />
          {/* Catch-all route - renders NotFound component for any unmatched paths */}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

// Export the App component as default for use in main.tsx
export default App;
