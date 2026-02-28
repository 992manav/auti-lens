/**
 * Application entry point
 * Initializes React root and renders the application with error boundary
 */

// Prevent clickjacking
import "./utils/frameBuster.js";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./main.css";

try {
  console.log("Starting React app initialization...");
  const root = ReactDOM.createRoot(document.getElementById("root"));
  console.log("React root created");
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
  console.log("React app rendered successfully");
} catch (error) {
  console.error("Fatal error during app initialization:", error);
  document.getElementById("root").innerHTML = `
    <div style="padding: 20px; font-family: system-ui; color: red;">
      <h2>Error Loading Application</h2>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}
