const [isPro, setIsPro] = useState(false);

useEffect(() => {
  const proStatus = localStorage.getItem("isPro");
  setIsPro(proStatus === "true");
  // ... rest of your code
}, []);
{/* Upgrade to Pro Section */}
{!isPro && (
  <div className="mt-8 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white text-center">
    <h3 className="text-xl font-bold mb-2">🚀 Want more templates & features?</h3>
    <p className="mb-4">Upgrade to Pro and unlock 20+ professional designs, AI suggestions & more!</p>
    <a
      href="/pricing"
      className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 inline-block"
    >
      Upgrade Now - ₹499/year →
    </a>
  </div>
)}
