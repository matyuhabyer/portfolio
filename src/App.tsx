import { Navigate, Route, Routes, useParams } from "react-router-dom";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { HomePage } from "@/pages/HomePage";

function LegacyProjectRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/?project=${encodeURIComponent(slug ?? "")}#projects`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/projects" element={<Navigate to="/#projects" replace />} />
        <Route path="/experience" element={<Navigate to="/#experience" replace />} />
        <Route path="/tech-stack" element={<Navigate to="/#skills" replace />} />
        <Route path="/certifications" element={<Navigate to="/#certifications" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
