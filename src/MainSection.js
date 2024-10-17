import React from 'react';
import ReactMarkdown from "react-markdown";
import { marked } from 'marked';  // Importing the marked library

const MainSection = ({ activePage, onUpdatePage }) => {
  const field = (key, value) => {
    onUpdatePage({
      ...activePage,
      [key]: value,
      lastModified: Date.now(),
    });
  };

  const clearFields = () => {
    field("title", "");
    field("body", "");
  };

  const downloadAsHTML = () => {
    // Convert the markdown body to HTML using marked
    const markdownBodyHTML = marked(activePage.body);

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head><title>${activePage.title}</title></head>
      <body>
        <h1>${activePage.title}</h1>
        ${markdownBodyHTML}
      </body>
      </html>
    `;
    const blob = new Blob([htmlContent], { type: "text/html" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${activePage.title}.html`;
    link.click();
  };

  if (!activePage)
    return (
      <div className="no-active-page-wrapper">
        <div className="napw-child1"> ❌</div>
        <div className="napw-child2">Create or select a note</div>
      </div>
    );

  return (
    <div className="main">
      <div className="main-page-edit">
        <input
          type="text"
          id="title"
          value={activePage.title}
          autoFocus
          onChange={(e) => field("title", e.target.value)}
        />
        <textarea
          id="body"
          placeholder="Page is empty, nothing to convert"
          value={activePage.body}
          onChange={(e) => field("body", e.target.value)}
        />
        <div className="buttons">
          <button onClick={clearFields}>Clear</button>
          <button onClick={downloadAsHTML}>Download as HTML</button>
        </div>
      </div>
      <div className="main-page-preview">
        <h1 className="preview-title">{activePage.title}</h1>
        <ReactMarkdown className="markdown-preview">{activePage.body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default MainSection;
