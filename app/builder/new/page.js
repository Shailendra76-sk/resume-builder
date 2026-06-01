"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResumeBuilder() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [formData, setFormData] = useState({
    fullName: "Rahul Sharma",
    jobTitle: "Senior Software Engineer",
    email: "rahul@example.com",
    phone: "+91 98765 43210",
    address: "Mumbai, India",
    summary: "Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and mentoring junior developers.",
    experience: [
      { company: "Tech Corp", position: "Senior Developer", year: "2022-Present", description: "Leading frontend team, building React applications" }
    ],
    education: [
      { degree: "B.Tech Computer Science", college: "IIT Bombay", year: "2018-2022", percentage: "8.9 CGPA" }
    ],
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"]
  });

  const templates = [
    { id: "modern", name: "Modern", icon: "🎨", color: "bg-blue-500" },
    { id: "classic", name: "Classic", icon: "📜", color: "bg-gray-700" },
    { id: "creative", name: "Creative", icon: "✨", color: "bg-purple-500" }
  ];

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { company: "", position: "", year: "", description: "" }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", college: "", year: "", percentage: "" }]
    });
  };

  const handleSave = () => {
    localStorage.setItem("currentResume", JSON.stringify({ template: selectedTemplate, data: formData }));
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">📄 ResumePro</h1>
          <div className="flex gap-3">
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              💾 Save Resume
            </button>
            <a href="/dashboard" className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left Side - Form */}
          <div className="space-y-6">
            {/* Template Selection */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-lg mb-3">📐 Choose Template</h3>
              <div className="flex gap-3">
                {templates.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`flex-1 p-3 rounded-lg border-2 transition ${selectedTemplate === t.id ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}
                  >
                    <div className="text-2xl">{t.icon}</div>
                    <div className="font-medium">{t.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Personal Info */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-lg mb-3">👤 Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <input type="text" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Full Name" />
                <input type="text" value={formData.jobTitle} onChange={(e) => setFormData({...formData, jobTitle: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Job Title" />
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Email" />
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="px-3 py-2 border rounded-lg" placeholder="Phone" />
                <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} className="px-3 py-2 border rounded-lg col-span-2" placeholder="Address" />
              </div>
              <textarea value={formData.summary} onChange={(e) => setFormData({...formData, summary: e.target.value})} className="w-full px-3 py-2 border rounded-lg mt-3" rows="3" placeholder="Professional Summary"></textarea>
            </div>

            {/* Experience */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-lg mb-3">💼 Work Experience</h3>
              {formData.experience.map((exp, idx) => (
                <div key={idx} className="mb-4 p-3 border rounded-lg">
                  <input type="text" value={exp.company} onChange={(e) => { const newExp = [...formData.experience]; newExp[idx].company = e.target.value; setFormData({...formData, experience: newExp}); }} className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Company Name" />
                  <input type="text" value={exp.position} onChange={(e) => { const newExp = [...formData.experience]; newExp[idx].position = e.target.value; setFormData({...formData, experience: newExp}); }} className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Position" />
                  <input type="text" value={exp.year} onChange={(e) => { const newExp = [...formData.experience]; newExp[idx].year = e.target.value; setFormData({...formData, experience: newExp}); }} className="w-full px-3 py-2 border rounded-lg mb-2" placeholder="Year (e.g., 2022-Present)" />
                  <textarea value={exp.description} onChange={(e) => { const newExp = [...formData.experience]; newExp[idx].description = e.target.value; setFormData({...formData, experience: newExp}); }} className="w-full px-3 py-2 border rounded-lg" rows="2" placeholder="Description"></textarea>
                </div>
              ))}
              <button onClick={addExperience} className="w-full py-2 border-2 border-dashed border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50">+ Add Experience</button>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-md p-5">
              <h3 className="font-bold text-lg mb-3">⚡ Skills</h3>
              <input type="text" value={formData.skills.join(", ")} onChange={(e) => setFormData({...formData, skills: e.target.value.split(",").map(s => s.trim())})} className="w-full px-3 py-2 border rounded-lg" placeholder="Skills (comma separated)" />
              <p className="text-xs text-gray-400 mt-1">Example: JavaScript, React, Python, SQL</p>
            </div>

            <button onClick={handleSave} className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">💾 Save & Continue</button>
          </div>

          {/* Right Side - Live Preview */}
          <div className="sticky top-20">
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold mb-3 flex justify-between">
                <span>📄 Live Preview</span>
                <span className="text-xs text-gray-400">Template: {selectedTemplate}</span>
              </h3>
              <div className="border rounded-lg p-4 max-h-[80vh] overflow-y-auto">
                <PreviewContent data={formData} template={selectedTemplate} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preview Component
function PreviewContent({ data, template }) {
  const styles = {
    modern: { font: "sans-serif", header: "bg-blue-600 text-white", card: "shadow-md" },
    classic: { font: "serif", header: "bg-gray-800 text-white", card: "border-2 border-gray-300" },
    creative: { font: "monospace", header: "bg-gradient-to-r from-purple-600 to-pink-600 text-white", card: "rounded-none shadow-lg" }
  };
  const style = styles[template] || styles.modern;

  return (
    <div className={`${style.font}`}>
      <div className={`${style.header} p-4 rounded-t-lg`}>
        <h2 className="text-xl font-bold">{data.fullName}</h2>
        <p className="text-sm opacity-90">{data.jobTitle}</p>
        <div className="text-xs mt-2 opacity-75">{data.email} | {data.phone} | {data.address}</div>
      </div>
      <div className="p-4 space-y-3">
        <div><h3 className="font-bold border-b pb-1">📝 Summary</h3><p className="text-sm mt-1">{data.summary}</p></div>
        <div><h3 className="font-bold border-b pb-1">💼 Experience</h3>{data.experience.map((exp, i) => (<div key={i} className="mt-2"><p className="font-semibold">{exp.position} @ {exp.company}</p><p className="text-xs text-gray-500">{exp.year}</p><p className="text-sm">{exp.description}</p></div>))}</div>
        <div><h3 className="font-bold border-b pb-1">⚡ Skills</h3><div className="flex flex-wrap gap-1 mt-1">{data.skills.map((s, i) => (<span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">{s}</span>))}</div></div>
      </div>
    </div>
  );
}
