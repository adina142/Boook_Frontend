import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Standards from "../pages/Standards/Standards";
import Comparisons from "../pages/Comparisons/Comparisons";
import Process from "../pages/Process/Process";
import ProcessBuilder from "../pages/ProcessBuilder/ProcessBuilder";
import ProcessTemplates from "../pages/ProcessTemplates/ProcessTemplates";
import ProcessRecommendations from "../pages/ProcessRecommendations/ProcessRecommendations";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Standard feature pages */}
      <Route path="/standards" element={<Standards />} />
      <Route path="/standards/:standardSlug" element={<Standards />} />
      <Route path="/standards/:standardSlug/section/:sectionId" element={<Standards />} />
      
      <Route path="/comparisons" element={<Comparisons />} />
      
      {/* Process routes */}
      <Route path="/process" element={<Process />}>
        <Route index element={<Navigate to="builder" replace />} />
        <Route path="builder" element={<ProcessBuilder />} />
        <Route path="templates" element={<ProcessTemplates />} />
        <Route path="recommendations" element={<ProcessRecommendations />} />
      </Route>

      {/* Alternative approach: If you prefer nested routes without layout */}
      {/* 
      <Route path="/process" element={<Process />} />
      <Route path="/process/builder" element={<ProcessBuilder />} />
      <Route path="/process/templates" element={<ProcessTemplates />} />
      <Route path="/process/recommendations" element={<ProcessRecommendations />} />
      */}

      {/* Redirect from singular to plural */}
      <Route path="/comparison" element={<Navigate to="/comparisons" replace />} />
      
      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
