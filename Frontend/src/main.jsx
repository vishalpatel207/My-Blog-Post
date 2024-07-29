import React, { createContext, useState } from "react";
import ReactDOM from 'react-dom/client';
import App from "./App.jsx";

// Create context for user authentication and other states
export const Context = createContext({
  isAuthenticated: false,
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);
  const [mode, setMode] = useState("dark");

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        blogs,
        setBlogs,
        mode,
        setMode,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      <App />
    </Context.Provider>
  );
};

// Ensure that createRoot is only called once
const container = document.getElementById('root');

// Use a global variable or a property on the container element to keep track
if (!container.__root) {
  container.__root = ReactDOM.createRoot(container);
}

const root = container.__root;

// Render the AppWrapper inside the root
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
