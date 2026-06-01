"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
    
    // Load saved resumes
    const savedResumes = localStorage.getItem("savedResumes");
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    } else {
      // Demo data
      setResumes([
        { id: 1, name: "Frontend Developer Resume", date: "2024-01-15", template: "Modern" },
        { id: 2, name: "Full Stack Resume", date: "2024-01-20", template: "Modern" },
      ]);
    }
  }, []);

  const deleteResume = (id) => {
    const newResumes = resumes.filter(r => r.id !== id);
    setResumes(newResumes);
    localStorage.setItem("savedResumes", JSON.stringify(newResumes));
  };

  const editResume = (id) => {
    localStorage.setItem("editResumeId", id);
    router.push("/builder/new");
  };

  const downloadResume = (resume) => {
    alert("Download feature coming soon! For now, use Print option from the builder.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">📄 ResumePro</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">👋 Hi, {user?.name || user?.email || "User"}</span>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">My Resumes</h2>
            <p className="text-gray-600">Create and manage your professional resumes</p>
          </div>
          <a
            href="/builder/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create New Resume
          </a>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">No resumes yet. Create your first resume!</p>
            <a href="/builder/new" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg">Create Resume</a>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
                <div className="flex justify-between items-start mb-3">
                  <div className="text-3xl">📄</div>
                  <div className="relative group">
                    <button className="text-gray-400 hover:text-gray-600">⋮</button>
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-lg hidden group-hover:block">
                      <button onClick={() => editResume(resume.id)} className="w-full text-left px-4 py-2 hover:bg-gray-100">✏️ Edit</button>
                      <button onClick={() => deleteResume(resume.id)} className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">🗑️ Delete</button>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-1">{resume.name}</h3>
                <p className="text-sm text-gray-500">Template: {resume.template}</p>
                <p className="text-xs text-gray-400 mt-2">Updated: {resume.date}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => editResume(resume.id)} className="flex-1 px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
                    Edit
                  </button>
                  <button onClick={() => downloadResume(resume)} className="flex-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade to Pro Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white text-center">
          <h3 className="text-xl font-bold mb-2">🚀 Want more templates & features?</h3>
          <p className="mb-4">Upgrade to Pro and unlock 20+ professional designs, AI suggestions & more!</p>
          <button 
            onClick={() => alert("Payment integration coming soon! For now, enjoy free features.")}
            className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100"
          >
            Upgrade Now - ₹499/year →
          </button>
        </div>
      </main>
    </div>
  );
}
