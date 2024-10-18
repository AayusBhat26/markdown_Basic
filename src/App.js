import { useEffect, useState } from "react";
import uuid from "react-uuid";
import "./App.css";
import MainSection from "./MainSection";
import Sidebar from "./Sidebar";

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

  return (
    <div className={`App ${showSidebar ? 'sidebar-visible' : 'sidebar-hidden'}`}>
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
      
    </div>
  );
}

export default App;
