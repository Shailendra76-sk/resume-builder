"use client";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function TemplateModern({ data }) {
  const resumeRef = useRef(null);

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;
    
    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: '#ffffff',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      });
      
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    } catch (error) {
      console.error('PDF generation error:', error);
      alert('Could not generate the PDF. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Resume Content - Printable */}
      <div ref={resumeRef} className="bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
          <h1 className="text-4xl font-bold">{data.fullName || "Your Name"}</h1>
          <p className="text-xl text-blue-100 mt-2">{data.jobTitle || "Professional Title"}</p>
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-blue-100">
            {data.email && <span>📧 {data.email}</span>}
            {data.phone && <span>📞 {data.phone}</span>}
            {data.address && <span>📍 {data.address}</span>}
          </div>
        </div>

        <div className="p-8">
          {data.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-blue-600 border-b-2 border-blue-200 pb-2 mb-3">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed">{data.summary}</p>
            </div>
          )}

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
      </div>

      <div className="p-4 bg-gray-100 text-center">
        <button 
          onClick={downloadPDF}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          📥 Download PDF
        </button>
      </div>

      <style jsx global>{`
        @media print {
          button {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
