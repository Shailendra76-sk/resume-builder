"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TemplateModern from "../../../components/TemplateModern";

const emptyExperience = { company: "", position: "", year: "", description: "" };

const blankResume = {
  fullName: "",
  jobTitle: "",
  email: "",
  phone: "",
  address: "",
  summary: "",
  experience: [{ ...emptyExperience }],
  skills: [""],
};

export default function NewResumePage() {
  const router = useRouter();
  const [selectedTemplate] = useState("modern");
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState(blankResume);

  useEffect(() => {
    const current = localStorage.getItem("currentResume");
    if (!current) return;
    try {
      const parsed = JSON.parse(current);
      if (parsed && parsed.data) {
        setFormData({ ...blankResume, ...parsed.data });
        setEditId(parsed.id ?? null);
      }
    } catch {
      /* ignore malformed saved data */
    }
  }, []);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateExperience = (index, field, value) => {
    setFormData((prev) => {
      const experience = prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      );
      return { ...prev, experience };
    });
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { ...emptyExperience }],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const updateSkill = (index, value) => {
    setFormData((prev) => {
      const skills = prev.skills.map((skill, i) => (i === index ? value : skill));
      return { ...prev, skills };
    });
  };

  const addSkill = () => {
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, ""] }));
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    const savedResumes = localStorage.getItem("savedResumes");
    const resumes = savedResumes ? JSON.parse(savedResumes) : [];

    const id = editId ?? Date.now();
    const entry = {
      id,
      name: (formData.jobTitle || formData.fullName || "Untitled") + " Resume",
      date: new Date().toISOString().split("T")[0],
      template: selectedTemplate,
      data: formData,
    };

    const existingIndex = resumes.findIndex((r) => r.id === id);
    if (existingIndex >= 0) {
      resumes[existingIndex] = entry;
    } else {
      resumes.push(entry);
    }

    localStorage.setItem("savedResumes", JSON.stringify(resumes));
    localStorage.setItem(
      "currentResume",
      JSON.stringify({ id, template: selectedTemplate, data: formData })
    );

    router.push("/dashboard");
  };

  const inputClass =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent";

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-blue-600">
            📄 ResumePro
          </a>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-gray-600 hover:text-blue-600">
              Dashboard
            </a>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save Resume
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Personal Details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  className={inputClass}
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Job Title
                </label>
                <input
                  className={inputClass}
                  value={formData.jobTitle}
                  onChange={(e) => updateField("jobTitle", e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className={inputClass}
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="jane@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  className={inputClass}
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="+1 555 000 1234"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  className={inputClass}
                  value={formData.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Professional Summary</h2>
            <textarea
              className={inputClass}
              rows={4}
              value={formData.summary}
              onChange={(e) => updateField("summary", e.target.value)}
              placeholder="A short summary highlighting your experience and strengths."
            />
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Work Experience</h2>
              <button
                onClick={addExperience}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      className={inputClass}
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                      placeholder="Position"
                    />
                    <input
                      className={inputClass}
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                      placeholder="Company"
                    />
                  </div>
                  <input
                    className={inputClass}
                    value={exp.year}
                    onChange={(e) => updateExperience(index, "year", e.target.value)}
                    placeholder="2022 - Present"
                  />
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    placeholder="Describe your responsibilities and achievements."
                  />
                  {formData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Skills</h2>
              <button
                onClick={addSkill}
                className="text-sm text-blue-600 font-medium hover:underline"
              >
                + Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.skills.map((skill, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    className={inputClass}
                    value={skill}
                    onChange={(e) => updateSkill(index, e.target.value)}
                    placeholder="e.g. JavaScript"
                  />
                  {formData.skills.length > 1 && (
                    <button
                      onClick={() => removeSkill(index)}
                      className="px-3 text-red-500 hover:text-red-700"
                      aria-label="Remove skill"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-8 self-start">
          <h2 className="text-lg font-bold mb-4">Live Preview</h2>
          <TemplateModern data={formData} />
        </div>
      </main>
    </div>
  );
}
