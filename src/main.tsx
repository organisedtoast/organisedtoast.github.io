// Import the createRoot function from React DOM - used to render React components to the DOM
import { createRoot } from "react-dom/client";

// Import the main App component that contains the entire application
import App from "./App.tsx";

// Import global CSS styles that apply to the entire application
import "./index.css";

// Find the root element in the HTML document (defined in index.html)
// Create a React root instance and render the App component inside it
// The ! operator tells TypeScript that getElementById will definitely return an element
createRoot(document.getElementById("root")!).render(<App />);
