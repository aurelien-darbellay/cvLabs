import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CvViewerPage from "./pages/CvViewerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cv/:cvId" element={<CvViewerPage />} />
    </Routes>
  );
}
