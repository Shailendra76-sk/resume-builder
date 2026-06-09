"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [resumes, setResumes] = useState([]);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const proStatus = localStorage.getItem("isPro");
    setIsPro(proStatus === "true");

    const saved = localStorage.getItem("savedResumes");
    setResumes(saved ? JSON.parse(saved) : []);
  }, []);

  const deleteResume = (id) => {
    const updated = resumes.filter((resume) => resume.id !== id);
    setResumes(updated);
    localStorage.setItem("savedResumes", JSON.stringify(updated));
  };

  const openResume = (resume) => {
    localStorage.setItem(
      "currentResume",
      JSON.stringify({ id: resume.id, template: resume.template, data: resume.data })
    );
    router.push("/builder/new");
  };

  const createResume = () => {
    localStorage.removeItem("currentResume");
    router.push("/builder/new");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-blue-600">
            📄 ResumePro
          </a>
          <div className="flex items-center gap-4">
            <a href="/pricing" className="text-gray-600 hover:text-blue-600">
              Pricing
            </a>
            <button
              onClick={createResume}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + New Resume
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Resumes</h1>
            <p className="text-gray-600 mt-1">
              {isPro ? "Pro member" : "Free plan"} • {resumes.length} saved
            </p>
          </div>
        </div>

        {resumes.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="text-5xl mb-4">📝</div>
            <h2 className="text-xl font-bold mb-2">No resumes yet</h2>
            <p className="text-gray-600 mb-6">
              Create your first professional resume in minutes.
            </p>
            <button
              onClick={createResume}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 inline-block transition"
            >
              Create Resume →
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div key={resume.id} className="bg-white rounded-xl shadow-sm p-6 flex flex-col">
                <h3 className="font-bold text-lg mb-1">{resume.name}</h3>
                <p className="text-sm text-gray-500 mb-4">Last edited {resume.date}</p>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => openResume(resume)}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => deleteResume(resume.id)}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isPro && (
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white text-center">
            <h3 className="text-xl font-bold mb-2">🚀 Want more templates & features?</h3>
            <p className="mb-4">
              Upgrade to Pro and unlock 20+ professional designs, AI suggestions &amp; more!
            </p>
            <a
              href="/pricing"
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 inline-block"
            >
              View Plans →
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
