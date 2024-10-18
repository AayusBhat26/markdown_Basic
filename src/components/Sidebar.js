import React from "react";

const Sidebar = ({ pages, newPage, deletePage, activePage, setActivePage }) => {
    const sortedPages = pages.sort((a,b)=>b.lastModified-a.lastModified);
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1>Pages</h1>
        <button onClick={newPage}>Add</button>
      </div>
      {/* list of markdown pages */}
      <div className="sidebar-pages ">
        {sortedPages.map((page) => (
          <div className={`sidebar-page ${page.id === activePage && "active"}`} onClick={()=>setActivePage(page.id)}>
            <div className="sidebar-page-title">
              <strong>{page.title}</strong>
              <button onClick={()=>deletePage(page.id)} >Delete</button>
            </div>

            <p>{page.body  && page.body.substr(0,25) + "....."}</p>

            <small className="page-meta">last modified {new Date(page.lastModified).toLocaleDateString("en-GB",{
                hour:'numeric', minute:'numeric'
            })}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
