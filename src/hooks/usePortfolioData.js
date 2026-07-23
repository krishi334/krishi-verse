import { useState, useEffect } from "react";
import { profile, experience, projects, skillPlanets } from "../data";

const STORAGE_KEY = "portfolio_data";

export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize data from localStorage or use defaults
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch {
        setData({ profile, experience, projects, skillPlanets });
      }
    } else {
      setData({ profile, experience, projects, skillPlanets });
    }
    setLoading(false);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (data && !loading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [data, loading]);

  const updateProfile = (updates) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, ...updates },
    }));
  };

  const addExperience = (exp) => {
    setData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...exp, id: Date.now() }],
    }));
  };

  const updateExperience = (index, updates) => {
    setData((prev) => {
      const newExp = [...prev.experience];
      newExp[index] = { ...newExp[index], ...updates };
      return { ...prev, experience: newExp };
    });
  };

  const deleteExperience = (index) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const addProject = (proj) => {
    setData((prev) => ({
      ...prev,
      projects: [...prev.projects, { ...proj, id: Date.now() }],
    }));
  };

  const updateProject = (index, updates) => {
    setData((prev) => {
      const newProj = [...prev.projects];
      newProj[index] = { ...newProj[index], ...updates };
      return { ...prev, projects: newProj };
    });
  };

  const deleteProject = (index) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const resetData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData({ profile, experience, projects, skillPlanets });
  };

  return {
    data,
    loading,
    updateProfile,
    addExperience,
    updateExperience,
    deleteExperience,
    addProject,
    updateProject,
    deleteProject,
    resetData,
  };
}
