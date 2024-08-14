import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
// import reportWebVitals from './reportWebVitals';
const PUBLISHABLE_KEY = "pk_test_a2luZC1naG9zdC01MC5jbGVyay5hY2NvdW50cy5kZXYk";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <App />
      </ClerkProvider>
    </Router>
  </React.StrictMode>
);
// reportWebVital/s();
