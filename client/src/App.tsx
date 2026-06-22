import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import BookService from "./pages/BookService";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Reviews from "./pages/Reviews";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import { useLocation } from "wouter";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function Router() {
  const [location] = useLocation();
  const isAdminRoute = location.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Switch>
        <Route path={"/admin/login"} component={AdminLogin} />
        <Route path={"/admin"} component={AdminDashboard} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        <Switch>
          <Route path={"/"} component={Home} />
          <Route path={"/services"} component={Services} />
          <Route path={"/services/:slug"} component={ServiceDetail} />
          <Route path={"/gallery"} component={Gallery} />
          <Route path={"/about"} component={About} />
          <Route path={"/book-service"} component={BookService} />
          <Route path={"/contact"} component={Contact} />
          <Route path={"/reviews"} component={Reviews} />
          <Route path={"/privacy"} component={Privacy} />
          <Route path={"/terms"} component={Terms} />
          <Route path={"/404"} component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
