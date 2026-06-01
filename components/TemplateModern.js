"use client";

export default function TemplateModern({ data }) {
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-4xl font-bold">{data.fullName || "Your Name"}</h1>
        <p className="text-xl text-blue-100 mt-2">{data.jobTitle || "Professional Title"}</p>
        <div className="flex flex-wrap gap-4 mt-4 text-sm text-blue-100">
          {data.email && <span>📧 {data.email}</span>}
          {data.phone && <span>📞 {data.phone}</span>}
          {data.address && <span>📍 {data.address}</span>}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        {/* Summary */}
        {data.summary && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {data.experience && data.experience.length > 0 && data.experience[0].company && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Work Experience</h2>
            <div className="space-y-4">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start flex-wrap">
                    <div>
                      <h3 className="font-bold text-lg">{exp.position}</h3>
                      <p className="text-blue-600 font-medium">{exp.company}</p>
                    </div>
                    <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">{exp.year}</span>
                  </div>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && data.education[0].degree && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Education</h2>
            <div className="space-y-3">
              {data.education.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start flex-wrap border-l-4 border-blue-600 pl-4">
                  <div>
                    <h3 className="font-bold">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.college}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">{edu.year}</span>
                    {edu.percentage && <p className="text-sm text-blue-600">{edu.percentage}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {data.skills && data.skills.length > 0 && data.skills[0] && (
          <div>
            <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Technical Skills</h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, idx) => (
                <span key={idx} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Download Button */}
      <div className="p-4 bg-gray-100 text-center">
        <button 
          onClick={handleDownload}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🖨️ Download PDF
        </button>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          button {
            display: none;
          }
          body {
            print-color-adjust: exact;
          }
        }
      `}</style>
    </div>
  );
}
