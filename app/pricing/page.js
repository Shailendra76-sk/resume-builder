"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");
  const [message, setMessage] = useState("");
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const proStatus = localStorage.getItem("isPro");
    if (proStatus === "true") {
      setIsPro(true);
    }
  }, []);

  const plans = [
    {
      name: "Free",
      price: "₹0",
      period: "forever",
      features: [
        "1 Resume Template",
        "Basic Formatting",
        "Download as PDF",
        "Cloud Storage (6 Resume)"
      ],
      button: "Current Plan",
      popular: false
    },
    {
      name: "Pro",
      price: "₹499",
      period: "year",
      features: [
        "20+ Professional Templates",
        "AI Content Suggestions",
        "Unlimited Downloads",
        "Unlimited Cloud Storage",
        "Priority Support",
        "ATS-Friendly Templates"
      ],
      button: "Upgrade to Pro",
      popular: true
    }
  ];

  const applyCoupon = () => {
    if (couponCode === "WELCOME") {
      localStorage.setItem("isPro", "true");
      localStorage.setItem("proExpiry", "2026-12-31");
      setIsPro(true);
      setMessage("Coupon applied successfully! You now have Pro access.");
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      setMessage("Invalid coupon code. Please check and try again.");
    }
  };

  const handleSubscribe = (planName) => {
    if (planName === "Pro") {
      const wantsPayment = confirm(
        "Pro subscription: ₹499/year\n\nOnline payment is coming soon. Continue with a demo upgrade?"
      );

      if (wantsPayment) {
        localStorage.setItem("isPro", "true");
        localStorage.setItem("proExpiry", "2026-12-31");
        setIsPro(true);
        router.push("/dashboard");
      }
    }
  };

  if (isPro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-green-600 mb-2">You are a Pro Member!</h1>
          <p className="text-gray-600 mb-4">Enjoy all premium features including 20+ templates.</p>
          <button onClick={() => router.push("/dashboard")} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">📄 ResumePro</h1>
          <a href="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</a>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that's right for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className={`bg-white rounded-2xl shadow-xl overflow-hidden ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}>
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-1 text-sm">Most Popular</div>
              )}
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-500">/{plan.period}</span>
                </div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-green-500">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={plan.name === "Free"}
                  className={`w-full py-2 rounded-lg font-semibold transition ${
                    plan.name === "Free" 
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  }`}
                >
                  {plan.button}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Coupon Section */}
        <div className="max-w-md mx-auto mt-12 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-center mb-4">🎁 Have a Coupon Code?</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              placeholder="Enter coupon code"
              className="flex-1 px-4 py-2 border rounded-lg"
            />
            <button
              onClick={applyCoupon}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Apply
            </button>
          </div>
          {message && (
            <p className="mt-3 text-center text-sm font-medium">{message}</p>
          )}
          <p className="mt-4 text-xs text-gray-500 text-center">
            Have a launch code? Enter it above to unlock Pro.
          </p>
        </div>
      </main>
    </div>
  );
}
