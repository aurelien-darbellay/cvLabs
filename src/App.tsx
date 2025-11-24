import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CvViewerPage from "./pages/CvViewerPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cv/:cvId" element={<CvViewerPage />} />
    </Routes>
  );
}
