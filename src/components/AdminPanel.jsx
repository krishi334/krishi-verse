import { useState } from "react";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { X, Plus, Edit2, Trash2, Save, LogOut } from "lucide-react";
import "./AdminPanel.css";

const ADMIN_PASSWORD = "admin123";

export function AdminPanel({ isOpen, onClose }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState("profile");
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({});

  const {
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
  } = usePortfolioData();

  if (loading) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setPassword("");
    } else {
      alert("Invalid password");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setEditingIndex(null);
    setFormData({});
    onClose();
  };

  const handleProfileChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    updateProfile(formData);
    setFormData({});
    setEditingIndex(null);
  };

  // Experience handlers
  const handleAddExperience = () => {
    setEditingIndex("new");
    setFormData({
      company: "",
      role: "",
      period: "",
      points: [""],
    });
  };

  const handleSaveExperience = () => {
    if (editingIndex === "new") {
      addExperience(formData);
    } else {
      updateExperience(editingIndex, formData);
    }
    setEditingIndex(null);
    setFormData({});
  };

  const handleEditExperience = (index) => {
    setEditingIndex(index);
    setFormData({ ...data.experience[index] });
  };

  // Project handlers
  const handleAddProject = () => {
    setEditingIndex("new");
    setFormData({
      title: "",
      description: "",
      technologies: [""],
      image: "",
      githubUrl: "",
      demoUrl: "",
      accent: "#c6a77d",
      glow: "rgba(198, 167, 125, 0.34)",
      backdrop: "",
    });
  };

  const handleSaveProject = () => {
    if (editingIndex === "new") {
      addProject(formData);
    } else {
      updateProject(editingIndex, formData);
    }
    setEditingIndex(null);
    setFormData({});
  };

  const handleEditProject = (index) => {
    setEditingIndex(index);
    setFormData({ ...data.projects[index] });
  };

  if (!isOpen) return null;

  return (
    <div className="admin-panel-overlay" onClick={onClose}>
      <div className="admin-panel" onClick={(e) => e.stopPropagation()}>
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button className="close-btn" onClick={handleLogout}>
            <X size={24} />
          </button>
        </div>

        {!authenticated ? (
          <div className="admin-login">
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <button type="submit">Login</button>
            </form>
          </div>
        ) : (
          <>
            <div className="admin-tabs">
              <button
                className={`tab ${activeTab === "profile" ? "active" : ""}`}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </button>
              <button
                className={`tab ${activeTab === "experience" ? "active" : ""}`}
                onClick={() => setActiveTab("experience")}
              >
                Experience
              </button>
              <button
                className={`tab ${activeTab === "projects" ? "active" : ""}`}
                onClick={() => setActiveTab("projects")}
              >
                Projects
              </button>
              <button
                className={`tab ${activeTab === "settings" ? "active" : ""}`}
                onClick={() => setActiveTab("settings")}
              >
                Settings
              </button>
            </div>

            <div className="admin-content">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="admin-section">
                  <h2>Profile Information</h2>
                  {editingIndex === null ? (
                    <>
                      <div className="profile-display">
                        <p>
                          <strong>Name:</strong> {data.profile.name}
                        </p>
                        <p>
                          <strong>Title:</strong> {data.profile.title}
                        </p>
                        <p>
                          <strong>Email:</strong> {data.profile.email}
                        </p>
                        <p>
                          <strong>Phone:</strong> {data.profile.phone}
                        </p>
                        <p>
                          <strong>Location:</strong> {data.profile.location}
                        </p>
                      </div>
                      <button
                        className="btn-primary"
                        onClick={() => {
                          setEditingIndex("editing");
                          setFormData(data.profile);
                        }}
                      >
                        <Edit2 size={16} /> Edit Profile
                      </button>
                    </>
                  ) : (
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Name"
                        value={formData.name || ""}
                        onChange={(e) =>
                          handleProfileChange("name", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Title"
                        value={formData.title || ""}
                        onChange={(e) =>
                          handleProfileChange("title", e.target.value)
                        }
                      />
                      <input
                        type="email"
                        placeholder="Email"
                        value={formData.email || ""}
                        onChange={(e) =>
                          handleProfileChange("email", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Phone"
                        value={formData.phone || ""}
                        onChange={(e) =>
                          handleProfileChange("phone", e.target.value)
                        }
                      />
                      <input
                        type="text"
                        placeholder="Location"
                        value={formData.location || ""}
                        onChange={(e) =>
                          handleProfileChange("location", e.target.value)
                        }
                      />
                      <textarea
                        placeholder="Objective"
                        value={formData.objective || ""}
                        onChange={(e) =>
                          handleProfileChange("objective", e.target.value)
                        }
                      />
                      <div className="form-actions">
                        <button className="btn-primary" onClick={handleSaveProfile}>
                          <Save size={16} /> Save
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            setEditingIndex(null);
                            setFormData({});
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Experience Tab */}
              {activeTab === "experience" && (
                <div className="admin-section">
                  <h2>Experience</h2>
                  {editingIndex === null ? (
                    <>
                      <div className="items-list">
                        {data.experience.map((exp, index) => (
                          <div key={index} className="item-card">
                            <h3>{exp.company}</h3>
                            <p>
                              <strong>{exp.role}</strong> • {exp.period}
                            </p>
                            <div className="item-actions">
                              <button
                                className="btn-icon"
                                onClick={() => handleEditExperience(index)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="btn-icon btn-danger"
                                onClick={() => deleteExperience(index)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="btn-primary" onClick={handleAddExperience}>
                        <Plus size={16} /> Add Experience
                      </button>
                    </>
                  ) : (
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Company"
                        value={formData.company || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            company: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="Role"
                        value={formData.role || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            role: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="Period"
                        value={formData.period || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            period: e.target.value,
                          }))
                        }
                      />
                      <div className="points-section">
                        <label>Key Points:</label>
                        {(formData.points || []).map((point, i) => (
                          <input
                            key={i}
                            type="text"
                            placeholder={`Point ${i + 1}`}
                            value={point}
                            onChange={(e) => {
                              const newPoints = [...formData.points];
                              newPoints[i] = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                points: newPoints,
                              }));
                            }}
                          />
                        ))}
                        <button
                          type="button"
                          className="btn-secondary btn-sm"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              points: [...(prev.points || []), ""],
                            }));
                          }}
                        >
                          Add Point
                        </button>
                      </div>
                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleSaveExperience}
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            setEditingIndex(null);
                            setFormData({});
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="admin-section">
                  <h2>Projects</h2>
                  {editingIndex === null ? (
                    <>
                      <div className="items-list">
                        {data.projects.map((proj, index) => (
                          <div key={index} className="item-card">
                            <h3>{proj.title}</h3>
                            <p>{proj.description.substring(0, 100)}...</p>
                            <div className="item-actions">
                              <button
                                className="btn-icon"
                                onClick={() => handleEditProject(index)}
                              >
                                <Edit2 size={16} />
                              </button>
                              <button
                                className="btn-icon btn-danger"
                                onClick={() => deleteProject(index)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button className="btn-primary" onClick={handleAddProject}>
                        <Plus size={16} /> Add Project
                      </button>
                    </>
                  ) : (
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Project Title"
                        value={formData.title || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                      />
                      <textarea
                        placeholder="Description"
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="Technologies (comma separated)"
                        value={(formData.technologies || []).join(", ")}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            technologies: e.target.value
                              .split(",")
                              .map((t) => t.trim()),
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={formData.image || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            image: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="GitHub URL"
                        value={formData.githubUrl || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            githubUrl: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="text"
                        placeholder="Demo URL"
                        value={formData.demoUrl || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            demoUrl: e.target.value,
                          }))
                        }
                      />
                      <div className="form-actions">
                        <button
                          className="btn-primary"
                          onClick={handleSaveProject}
                        >
                          <Save size={16} /> Save
                        </button>
                        <button
                          className="btn-secondary"
                          onClick={() => {
                            setEditingIndex(null);
                            setFormData({});
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="admin-section">
                  <h2>Settings</h2>
                  <div className="settings-group">
                    <p>⚠️ Danger Zone</p>
                    <button
                      className="btn-danger"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure? This will reset all data to defaults."
                          )
                        ) {
                          resetData();
                          alert("Data reset to defaults");
                        }
                      }}
                    >
                      Reset All Data
                    </button>
                  </div>
                  <div className="settings-group">
                    <p>
                      <strong>Note:</strong> All changes are saved automatically
                      to your browser's local storage.
                    </p>
                  </div>
                </div>
              )}

              <button className="logout-btn" onClick={handleLogout}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
