import { Route, Routes } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { AboutPage } from "@/pages/AboutPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { ProjectDetailPage } from "@/pages/ProjectDetailPage";
import { ProjectsPage } from "@/pages/ProjectsPage";

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
