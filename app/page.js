export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-600">📄 ResumePro</h1>
        <div className="space-x-4">
          <a href="/login" className="px-4 py-2 text-gray-700 hover:text-blue-600">Login</a>
          <a href="/builder/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Start Free →</a>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto text-center py-20 px-4">
        <h2 className="text-5xl font-bold mb-6">
          Create a Professional Resume 
          <span className="text-blue-600"> in 5 Minutes</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Free templates • ATS-friendly • Download as PDF
        </p>
        <a href="/builder/new" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700">
          Build My Resume Now →
        </a>
        
        <div className="mt-20 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-lg">Professional Templates</h3>
            <p className="text-gray-600 text-sm">Designs that recruiters love</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="font-bold text-lg">AI-Powered</h3>
            <p className="text-gray-600 text-sm">Smart content suggestions</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-4xl mb-3">💾</div>
            <h3 className="font-bold text-lg">Cloud Storage</h3>
            <p className="text-gray-600 text-sm">Save & edit anytime</p>
          </div>
        </div>
      </main>
    </div>
  )
}
