import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import MainSection from "./components/MainSection";
import Sidebar from "./components/Sidebar";
import Login  from "./auth/Login";
import Register from "./auth/Register"; // Import the Register component
import PrivateRoute from "./auth/PrivateRoute"; // Import PrivateRoute for route protection

function App() {
  const [pages, setPages] = useState(() => {
    const savedPages = localStorage.getItem("pages");
    return savedPages ? JSON.parse(savedPages) : [];
  });

  const [activePage, setActivePage] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);  // State for sidebar visibility

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  // Keyboard shortcut to toggle sidebar visibility
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.ctrlKey && event.key === 'b') {  // Example: Ctrl + B to toggle sidebar
        setShowSidebar((prevState) => !prevState);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const newPage = () => {
    const newNode = {
      id: uuid(),
      title: "Untitled Page",
      body: "",
      lastModified: Date.now(),
    };
    setPages([newNode, ...pages]);
  };

  const deletePage = (id) => {
    setPages(pages.filter((page) => page.id !== id));
  };

  const updatePage = (updatePage) => {
    const updatedPagesArray = pages.map((page) => {
      if (page.id === activePage) {
        return updatePage;
      }
      return page;
    });

    setPages(updatedPagesArray);
  };

  const getActivePage = () => {
    return pages.find((page) => page.id === activePage);
  };

  // Check if user is logged in
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Router>
      <div className={`App ${showSidebar ? 'sidebar-visible' : 'sidebar-hidden'}`}>
        <Routes>
          {/* Public Routes */}
      
        <Route path="/" element={<Login />}  />
        <Route path="/register" element={<Register />} />
      

          {/* Protected Route */}
          <Route 
            path="/main" 
            element={
              <PrivateRoute isLoggedIn={isLoggedIn}>
                <>
                  <MainSection activePage={getActivePage()} onUpdatePage={updatePage} />
                  {showSidebar && (
                    <Sidebar
                      pages={pages}
                      newPage={newPage}
                      deletePage={deletePage}
                      activePage={activePage}
                      setActivePage={setActivePage}
                    />
                  )}
                </>
              </PrivateRoute>
            } 
          />

          {/* Redirect root to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
