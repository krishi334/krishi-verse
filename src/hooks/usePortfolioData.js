import { useEffect, useRef, useState } from "react";
import { profile, experience, projects, skillPlanets } from "../data";
import {
  fetchCloudPortfolioData,
  isCloudSyncEnabled,
  saveCloudPortfolioData,
  subscribeCloudPortfolioData,
} from "../services/cloudSync";

const STORAGE_KEY = "portfolio_data";
const STORAGE_UPDATED_AT_KEY = "portfolio_data_updated_at";
const SYNC_KEY = import.meta.env.VITE_PORTFOLIO_SYNC_KEY || "krishi-shah-main";

function slugifyProjectTitle(title = "") {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const canonicalProjects = projects.map((item, index) => ({
  ...item,
  projectId: item.projectId || `project-${index + 1}`,
}));

const projectDefaultsById = new Map(canonicalProjects.map((item) => [item.projectId, item]));
const projectDefaultsByTitleSlug = new Map(canonicalProjects.map((item) => [slugifyProjectTitle(item.title), item]));
const projectDefaultsByImage = new Map(canonicalProjects.map((item) => [item.image, item]));

function resolveDefaultProject(projectItem, index) {
  if (projectItem?.projectId && projectDefaultsById.has(projectItem.projectId)) {
    return projectDefaultsById.get(projectItem.projectId);
  }

  const titleSlug = slugifyProjectTitle(projectItem?.title || "");
  if (titleSlug && projectDefaultsByTitleSlug.has(titleSlug)) {
    return projectDefaultsByTitleSlug.get(titleSlug);
  }

  if (projectItem?.image && projectDefaultsByImage.has(projectItem.image)) {
    return projectDefaultsByImage.get(projectItem.image);
  }

  if (index >= 0 && index < canonicalProjects.length) {
    return canonicalProjects[index];
  }

  return null;
}

function normalizeProject(projectItem, index) {
  const defaults = resolveDefaultProject(projectItem, index);
  const hasStableId = Boolean(projectItem?.projectId && projectDefaultsById.has(projectItem.projectId));

  if (!defaults) {
    return projectItem;
  }

  return {
    ...projectItem,
    projectId: defaults.projectId,
    title: projectItem?.title || defaults.title,
    image: hasStableId ? projectItem?.image || defaults.image : defaults.image,
    imageAlt: projectItem?.imageAlt || defaults.imageAlt,
    accent: defaults.accent,
    glow: defaults.glow,
    backdrop: defaults.backdrop,
    overview: projectItem?.overview || defaults.overview,
    whyBuilt: projectItem?.whyBuilt || defaults.whyBuilt,
    whatItUses: projectItem?.whatItUses || defaults.whatItUses,
    highlights: Array.isArray(projectItem?.highlights) && projectItem.highlights.length > 0 ? projectItem.highlights : defaults.highlights,
    blog: {
      heading: projectItem?.blog?.heading || defaults.blog?.heading,
      intro:
        Array.isArray(projectItem?.blog?.intro) && projectItem.blog.intro.length > 0
          ? projectItem.blog.intro
          : defaults.blog?.intro,
      keyFeatures:
        Array.isArray(projectItem?.blog?.keyFeatures) && projectItem.blog.keyFeatures.length > 0
          ? projectItem.blog.keyFeatures
          : defaults.blog?.keyFeatures,
      tools: projectItem?.blog?.tools || defaults.blog?.tools,
    },
    technologies:
      Array.isArray(projectItem?.technologies) && projectItem.technologies.length > 0
        ? projectItem.technologies
        : defaults.technologies,
  };
}

function normalizeData(rawData) {
  return {
    profile: { ...profile, ...(rawData?.profile || {}), cvUrl: rawData?.profile?.cvUrl || profile.cvUrl },
    experience: Array.isArray(rawData?.experience) ? rawData.experience : experience,
    skillPlanets: Array.isArray(rawData?.skillPlanets) ? rawData.skillPlanets : skillPlanets,
    projects: Array.isArray(rawData?.projects) ? rawData.projects.map((item, index) => normalizeProject(item, index)) : canonicalProjects,
  };
}

export function usePortfolioData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const lastUpdatedAtRef = useRef(0);
  const skipCloudPushRef = useRef(false);
  const cloudSyncEnabled = isCloudSyncEnabled();

  useEffect(() => {
    const initialize = async () => {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedUpdatedAt = Number(localStorage.getItem(STORAGE_UPDATED_AT_KEY) || 0);
      let localData = normalizeData({ profile, experience, projects, skillPlanets });

      if (stored) {
        try {
          localData = normalizeData(JSON.parse(stored));
        } catch {
          localData = normalizeData({ profile, experience, projects, skillPlanets });
        }
      }

      let nextData = localData;
      let nextUpdatedAt = storedUpdatedAt;

      if (cloudSyncEnabled) {
        try {
          const cloudRecord = await fetchCloudPortfolioData(SYNC_KEY);
          const cloudUpdatedAt = Number(cloudRecord?.updatedAt || 0);

          if (cloudRecord?.payload && cloudUpdatedAt >= storedUpdatedAt) {
            nextData = normalizeData(cloudRecord.payload);
            nextUpdatedAt = cloudUpdatedAt;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
            localStorage.setItem(STORAGE_UPDATED_AT_KEY, String(nextUpdatedAt));
          }
        } catch {
          // Keep local data when cloud fetch fails.
        }
      }

      lastUpdatedAtRef.current = nextUpdatedAt;
      setData(nextData);
      setLoading(false);
    };

    initialize();
  }, [cloudSyncEnabled]);

  useEffect(() => {
    if (loading || !cloudSyncEnabled) {
      return undefined;
    }

    const unsubscribe = subscribeCloudPortfolioData(SYNC_KEY, (cloudRecord) => {
      const incomingUpdatedAt = Number(cloudRecord?.updatedAt || 0);

      if (!cloudRecord?.payload || incomingUpdatedAt <= lastUpdatedAtRef.current) {
        return;
      }

      const normalizedIncoming = normalizeData(cloudRecord.payload);
      skipCloudPushRef.current = true;
      lastUpdatedAtRef.current = incomingUpdatedAt;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedIncoming));
      localStorage.setItem(STORAGE_UPDATED_AT_KEY, String(incomingUpdatedAt));
      setData(normalizedIncoming);
    });

    return () => unsubscribe();
  }, [loading, cloudSyncEnabled]);

  useEffect(() => {
    if (!data || loading) {
      return;
    }

    if (skipCloudPushRef.current) {
      skipCloudPushRef.current = false;
      return;
    }

    const updatedAt = Date.now();
    lastUpdatedAtRef.current = updatedAt;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem(STORAGE_UPDATED_AT_KEY, String(updatedAt));

    if (cloudSyncEnabled) {
      saveCloudPortfolioData(SYNC_KEY, {
        updatedAt,
        payload: data,
      }).catch(() => {
        // Local save succeeded; ignore cloud errors.
      });
    }
  }, [data, loading, cloudSyncEnabled]);

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
    localStorage.removeItem(STORAGE_UPDATED_AT_KEY);
    setData(normalizeData({ profile, experience, projects, skillPlanets }));
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
