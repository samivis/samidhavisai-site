import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { CvPage } from "./components/CvPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CvPage />
  </StrictMode>
);
