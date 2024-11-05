import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Guestbook from "./views/Guestbook";
import Craft from "./views/Craft";
import Contact from "./views/Contact";
import Menubar from "./components/Menubar";
import Container from "./components/static/Container";
import Error from "./views/Error";
import Blog from "./views/Blog";
import BlogPost from "./views/BlogPost";
import GradientGenerator from "./views/GradientGenerator";

import AppSidebar from "./components/AppSidebar";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { SidebarProvider } from "./context/SidebarContext";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SidebarProvider>
          <Routes>
            <Route
              path="/tools/gradient-generator"
              element={<GradientGenerator />}
            />
            <Route
              path="*"
              element={
                <Container>
                  <Menubar />
                  <AppSidebar />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/guestbook" element={<Guestbook />} />
                    <Route path="/craft" element={<Craft />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:slug" element={<BlogPost />} />
                    <Route path="*" element={<Error />} />
                  </Routes>
                </Container>
              }
            />
          </Routes>
        </SidebarProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
