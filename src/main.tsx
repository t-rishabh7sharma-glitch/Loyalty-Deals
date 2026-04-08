import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { assertAdminDealAnalyticsConsistency, adminKpis } from "./data/loaders";
import { validateMppsDataset } from "./data/mpps";

validateMppsDataset();
assertAdminDealAnalyticsConsistency(adminKpis);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
