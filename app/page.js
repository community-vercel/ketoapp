'use client'
import React, { useState } from 'react';
import { Check, ChevronLeft, Mail, Lock, User, Shield, Star, TrendingUp, Award, Heart } from 'lucide-react';

const WellnessPath = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [inputValue, setInputValue] = useState('');

  const questions = [
    {
      id: 1,
      question: "What is your gender?",
      options: [
        { value: "female", label: "Female", emoji: "👩" },
        { value: "male", label: "Male", emoji: "👨" }
      ],
      hasImages: true
    },
    {
      id: 2,
      question: "What is your primary wellness goal?",
      options: [
        { value: "look_better", label: "Improve appearance and confidence", icon: "✨" },
        { value: "health", label: "Enhance overall health", icon: "❤️" },
        { value: "both", label: "Both equally important", icon: "🎯" }
      ]
    },
    {
      id: 3,
      question: "What is your current weight?",
      type: "input",
      inputType: "number",
      unit: "kg"
    },
    {
      id: 4,
      question: "What is your target weight?",
      type: "input",
      inputType: "number",
      unit: "kg"
    },
    {
      id: 5,
      question: "What is your height?",
      type: "input",
      inputType: "number",
      unit: "cm"
    },
    {
      id: 6,
      question: "What is your age?",
      type: "input",
      inputType: "number",
      unit: "years"
    },
    {
      id: 7,
      question: "What is your typical day like?",
      options: [
        { value: "sedentary", label: "Mostly sitting", sublabel: "Office work, desk-based roles" },
        { value: "light", label: "Light activity", sublabel: "Teaching, retail, light standing" },
        { value: "moderate", label: "Moderate activity", sublabel: "Nursing, service industry, delivery" },
        { value: "active", label: "Very active", sublabel: "Construction, athletics, manual labor" }
      ]
    },
    {
      id: 8,
      question: "How often do you exercise?",
      options: [
        { value: "never", label: "Rarely or never" },
        { value: "1-2", label: "1-2 times per week" },
        { value: "3-4", label: "3-4 times per week" },
        { value: "5+", label: "5+ times per week" }
      ]
    },
    {
      id: 9,
      question: "What type of exercise do you prefer?",
      options: [
        { value: "cardio", label: "Cardiovascular", sublabel: "Running, cycling, swimming" },
        { value: "strength", label: "Strength training", sublabel: "Weight lifting, resistance work" },
        { value: "mixed", label: "Mixed approach", sublabel: "Variety of exercise types" },
        { value: "none", label: "Currently inactive" }
      ]
    },
    {
      id: 10,
      question: "How would you describe your body type?",
      options: [
        { value: "ectomorph", label: "Naturally slim", sublabel: "Difficulty gaining weight" },
        { value: "mesomorph", label: "Athletic build", sublabel: "Naturally muscular" },
        { value: "endomorph", label: "Larger frame", sublabel: "Easier weight gain" }
      ]
    },
    {
      id: 11,
      question: "Where do you tend to store body fat?",
      options: [
        { value: "stomach", label: "Abdominal area" },
        { value: "hips", label: "Hips and thighs" },
        { value: "arms", label: "Arms and upper body" },
        { value: "overall", label: "Evenly distributed" }
      ]
    },
    {
      id: 12,
      question: "What is your preferred timeline?",
      options: [
        { value: "fast", label: "Rapid progress", sublabel: "Intensive approach" },
        { value: "moderate", label: "Steady progress", sublabel: "Balanced and sustainable" },
        { value: "slow", label: "Gradual transformation", sublabel: "Long-term lifestyle change" }
      ]
    },
    {
      id: 13,
      question: "Have you tried wellness programs before?",
      options: [
        { value: "never", label: "First time" },
        { value: "few", label: "A few attempts" },
        { value: "many", label: "Multiple attempts" }
      ]
    },
    {
      id: 14,
      question: "What's your biggest wellness challenge?",
      options: [
        { value: "cravings", label: "Managing cravings", sublabel: "Food temptations" },
        { value: "motivation", label: "Maintaining motivation", sublabel: "Staying consistent" },
        { value: "time", label: "Time constraints", sublabel: "Busy lifestyle" },
        { value: "knowledge", label: "Nutrition knowledge", sublabel: "Understanding what works" }
      ]
    },
    {
      id: 15,
      question: "How's your energy level throughout the day?",
      options: [
        { value: "low", label: "Often fatigued", sublabel: "Low energy, need stimulants" },
        { value: "moderate", label: "Variable energy", sublabel: "Some ups and downs" },
        { value: "high", label: "Consistently energetic", sublabel: "Feel great most days" }
      ]
    },
    {
      id: 16,
      question: "How many meals do you typically eat per day?",
      options: [
        { value: "1-2", label: "1-2 meals" },
        { value: "3", label: "3 meals" },
        { value: "4+", label: "4+ meals or frequent snacks" }
      ]
    },
    {
      id: 17,
      question: "Do you eat late at night?",
      options: [
        { value: "often", label: "Frequently", sublabel: "Regular evening snacking" },
        { value: "sometimes", label: "Occasionally", sublabel: "Sometimes late eating" },
        { value: "rarely", label: "Rarely or never", sublabel: "Stop eating early" }
      ]
    },
    {
      id: 18,
      question: "How much water do you drink daily?",
      options: [
        { value: "little", label: "Less than 4 glasses", sublabel: "Need improvement" },
        { value: "moderate", label: "4-6 glasses", sublabel: "Moderate hydration" },
        { value: "good", label: "7-8 glasses", sublabel: "Good hydration" },
        { value: "excellent", label: "8+ glasses", sublabel: "Excellent hydration" }
      ]
    },
    {
      id: 19,
      question: "How would you rate your sleep quality?",
      options: [
        { value: "poor", label: "Poor quality", sublabel: "Less than 5 hours" },
        { value: "fair", label: "Fair quality", sublabel: "5-6 hours" },
        { value: "good", label: "Good quality", sublabel: "7-8 hours" },
        { value: "excellent", label: "Excellent quality", sublabel: "8+ hours" }
      ]
    },
    {
      id: 20,
      question: "Do you have any dietary restrictions?",
      options: [
        { value: "none", label: "No restrictions" },
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "allergies", label: "Food allergies or sensitivities" }
      ]
    },
    {
      id: 21,
      question: "How often do you eat fast food?",
      options: [
        { value: "daily", label: "Daily" },
        { value: "few_week", label: "Several times weekly" },
        { value: "few_month", label: "Several times monthly" },
        { value: "rarely", label: "Rarely or never" }
      ]
    },
    {
      id: 22,
      question: "Do you consume alcohol?",
      options: [
        { value: "never", label: "Never" },
        { value: "occasionally", label: "Occasionally", sublabel: "Social events only" },
        { value: "weekly", label: "Weekly", sublabel: "1-2 times per week" },
        { value: "daily", label: "Daily consumption" }
      ]
    },
    {
      id: 23,
      question: "How would you rate your stress levels?",
      options: [
        { value: "low", label: "Low stress", sublabel: "Generally calm and relaxed" },
        { value: "moderate", label: "Moderate stress", sublabel: "Some daily pressure" },
        { value: "high", label: "High stress", sublabel: "Frequently stressed" }
      ]
    },
    {
      id: 24,
      question: "Do you prepare your own meals?",
      options: [
        { value: "always", label: "Always", sublabel: "Enjoy home cooking" },
        { value: "sometimes", label: "Sometimes", sublabel: "Mix of cooking and dining out" },
        { value: "rarely", label: "Rarely", sublabel: "Mostly eat out" },
        { value: "never", label: "Never", sublabel: "Don't cook" }
      ]
    },
    {
      id: 25,
      question: "What's your relationship with food?",
      options: [
        { value: "healthy", label: "Healthy and balanced", sublabel: "Positive relationship" },
        { value: "emotional", label: "Emotional eating", sublabel: "Eat when stressed" },
        { value: "restrictive", label: "Very restrictive", sublabel: "Strict food rules" },
        { value: "confused", label: "Uncertain", sublabel: "Unsure about healthy choices" }
      ]
    },
    {
      id: 26,
      question: "Do you have any medical conditions?",
      options: [
        { value: "none", label: "None" },
        { value: "diabetes", label: "Diabetes or pre-diabetes" },
        { value: "thyroid", label: "Thyroid conditions" },
        { value: "other", label: "Other medical condition" }
      ]
    },
    {
      id: 27,
      question: "Are you currently taking any medications?",
      options: [
        { value: "no", label: "No medications" },
        { value: "yes", label: "Yes, on medication" }
      ]
    },
    {
      id: 28,
      question: "How do you handle setbacks?",
      options: [
        { value: "give_up", label: "Struggle to continue", sublabel: "Difficult to restart" },
        { value: "struggle", label: "Take time to recover", sublabel: "Eventually get back on track" },
        { value: "recover", label: "Bounce back quickly", sublabel: "Stay resilient" }
      ]
    },
    {
      id: 29,
      question: "What motivates you most?",
      options: [
        { value: "health", label: "Better health", sublabel: "Longevity and wellness" },
        { value: "appearance", label: "Improved appearance", sublabel: "Look and feel better" },
        { value: "confidence", label: "More confidence", sublabel: "Self-esteem boost" },
        { value: "energy", label: "More energy", sublabel: "Enhanced vitality" }
      ]
    },
    {
      id: 30,
      question: "Do you have support from family and friends?",
      options: [
        { value: "yes", label: "Very supportive environment" },
        { value: "some", label: "Somewhat supportive" },
        { value: "no", label: "Limited support" }
      ]
    },
    {
      id: 31,
      question: "How committed are you to making a change?",
      options: [
        { value: "very", label: "Highly committed", sublabel: "Ready for transformation" },
        { value: "moderate", label: "Moderately committed", sublabel: "Willing to try" },
        { value: "unsure", label: "Exploring options", sublabel: "Still deciding" }
      ]
    },
    {
      id: 32,
      question: "When do you want to start?",
      options: [
        { value: "now", label: "Immediately", sublabel: "Ready to begin now" },
        { value: "week", label: "Within a week", sublabel: "Need time to prepare" },
        { value: "month", label: "Within a month", sublabel: "Planning ahead" }
      ]
    },
    {
      id: 33,
      question: "What's your primary health concern?",
      options: [
        { value: "weight", label: "Weight management" },
        { value: "energy", label: "Energy levels" },
        { value: "chronic", label: "Disease prevention" },
        { value: "mental", label: "Mental wellbeing" }
      ]
    },
    {
      id: 34,
      question: "How comfortable are you with technology?",
      options: [
        { value: "very", label: "Very comfortable", sublabel: "Tech-savvy user" },
        { value: "moderate", label: "Moderately comfortable", sublabel: "Can navigate apps" },
        { value: "basic", label: "Basic user", sublabel: "Prefer simplicity" }
      ]
    },
    {
      id: 35,
      question: "Do you track your food intake?",
      options: [
        { value: "always", label: "Always tracking", sublabel: "Detailed monitoring" },
        { value: "sometimes", label: "Sometimes", sublabel: "When focusing on goals" },
        { value: "never", label: "Never track", sublabel: "Prefer intuitive approach" }
      ]
    },
    {
      id: 36,
      question: "What's your preferred planning style?",
      options: [
        { value: "detailed", label: "Detailed plans", sublabel: "Specific meal plans and schedules" },
        { value: "flexible", label: "Flexible guidelines", sublabel: "Options and variety" },
        { value: "simple", label: "Simple approach", sublabel: "Easy to follow basics" }
      ]
    }
  ];

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
    
    if (step < 36) {
      setTimeout(() => {
        setStep(step + 1);
        setProgress(((step) / 36) * 100);
      }, 300);
    } else {
      setLoading(true);
      setProgress(0);
      
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        setProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep(37);
          }, 500);
        }
      }, 50);
    }
  };

  const handleInputSubmit = (questionId) => {
    if (inputValue && parseFloat(inputValue) > 0) {
      handleAnswer(questionId, inputValue);
      setInputValue('');
    }
  };

  const currentQuestion = questions[step - 1];

  // Loading Screen
  if (loading && step <= 36) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-900 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Analyzing Your Profile
            </h1>
            <p className="text-xl text-blue-200">Creating Your Personalized Wellness Plan</p>
          </div>
          
          <div className="relative w-64 h-64 mx-auto mb-12">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="20"
                fill="none"
              />
              <circle
                cx="128"
                cy="128"
                r="110"
                stroke="url(#gradient)"
                strokeWidth="20"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 110}`}
                strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`}
                className="transition-all duration-300"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-7 h-7 text-blue-600" />
              Your Profile Analysis
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-900 to-blue-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  Based on your profile, you're an excellent candidate for a structured wellness program with projected results within 8-12 weeks
                </p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  87% of users with similar profiles achieve their wellness goals within the projected timeline using our evidence-based approach
                </p>
              </div>
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                  <Check className="w-6 h-6 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed pt-1">
                  Your personalized nutrition and fitness plan is being optimized for your specific needs and lifestyle
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email Capture Screen
  if (step === 37) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl mb-8 animate-pulse">
              <Mail className="w-14 h-14 text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Get Your Personalized<br />Wellness Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-xl mx-auto">
              Receive your customized roadmap to reach your {answers[4] || '62'}kg goal
            </p>
          </div>

          <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-800 mb-3">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full px-6 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-2xl focus:bg-white focus:border-green-900 focus:outline-none transition-all"
                />
              </div>
              
              <div className="flex items-center gap-3 text-sm text-gray-600 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0" />
                <p className="leading-relaxed">Your privacy is our priority. All personal information is encrypted and securely stored.</p>
              </div>

              <button
                onClick={() => {
                  if (email) {
                    setStep(38);
                  }
                }}
                disabled={!email}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-2xl transition-all text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Get My Personalized Plan
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Payment Page
  if (step === 38) {
    const plans = [
      {
        id: 'basic',
        name: 'Basic',
        price: 29,
        color: 'from-gray-600 to-gray-700',
        borderColor: 'border-gray-300',
        features: [
          'Personalized meal plans',
          'Basic workout routines',
          'Progress tracking',
          'Email support'
        ]
      },
      {
        id: 'premium',
        name: 'Premium',
        price: 59,
        popular: true,
        color: 'from-blue-600 to-indigo-600',
        borderColor: 'border-blue-300',
        features: [
          'Everything in Basic',
          'Advanced workout programs',
          '1-on-1 nutritionist consultation',
          'Priority chat support',
          'Weekly progress reviews'
        ]
      },
      {
        id: 'elite',
        name: 'Elite',
        price: 99,
        color: 'from-purple-600 to-pink-600',
        borderColor: 'border-purple-300',
        features: [
          'Everything in Premium',
          'Personal trainer sessions',
          '24/7 dedicated support',
          'Custom supplement plans',
          'Monthly body composition analysis'
        ]
      }
    ];

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600">
              Invest in your health with the right support level
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative bg-white rounded-3xl p-8 shadow-xl border-4 transition-all cursor-pointer hover:scale-105 ${
                  selectedPlan === plan.id ? plan.borderColor + ' shadow-2xl scale-105' : 'border-transparent hover:border-gray-200'
                } ${plan.popular ? 'md:scale-110 z-10' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
                    <span className={`bg-gradient-to-r ${plan.color} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2`}>
                      <Star className="w-4 h-4 fill-current" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-lg text-gray-500">/month</span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Check className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {selectedPlan === plan.id && (
                  <div className={`w-full py-3 bg-gradient-to-r ${plan.color} text-white font-bold rounded-2xl text-center`}>
                    Selected
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Payment Form */}
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Lock className="w-8 h-8 text-blue-600" />
              Secure Payment
            </h2>
            
            <div className="space-y-6">
              {/* Card Payment */}
              <div className="border-3 border-green-900 rounded-2xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-7 h-7 rounded-full border-4 border-blue-600 bg-blue-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <span className="font-bold text-gray-900 text-lg">Credit / Debit Card</span>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                    <input 
                      type="text" 
                      placeholder="1234 5678 9012 3456" 
                      className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-green-900 focus:outline-none transition-all bg-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        placeholder="MM/YY" 
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-green-900 focus:outline-none transition-all bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                      <input 
                        type="text" 
                        placeholder="123" 
                        className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-green-900 focus:outline-none transition-all bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Alternative Payment Methods */}
              <div className="space-y-3">
                <div className="border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-400 cursor-pointer transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-900 transition-all"></div>
                    <span className="font-semibold text-gray-900 text-lg">PayPal</span>
                    <div className="ml-auto flex items-center">
                      <span className="text-2xl font-bold text-blue-600">Pay</span>
                      <span className="text-2xl font-bold text-cyan-600">Pal</span>
                    </div>
                  </div>
                </div>

                <div className="border-2 border-gray-200 rounded-2xl p-5 hover:border-blue-400 cursor-pointer transition-all group">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-green-900 transition-all"></div>
                    <span className="font-semibold text-gray-900 text-lg">Google Pay</span>
                    <div className="ml-auto">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-900 to-green-500 flex items-center justify-center text-white font-bold">
                        G
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  const planName = plans.find(p => p.id === selectedPlan)?.name;
                  alert(`🎉 Payment successful! Welcome to the ${planName} plan!\n\nYour personalized wellness journey begins now.`);
                }}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-bold py-5 px-6 rounded-2xl transition-all text-lg shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Complete Payment - ${plans.find(p => p.id === selectedPlan)?.price}/month
              </button>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">50K+</div>
              <div className="text-sm text-gray-600">Happy Members</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3 fill-current" />
              <div className="text-2xl font-bold text-gray-900">4.9/5</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-3" />
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-3 fill-current" />
              <div className="text-2xl font-bold text-gray-900">100%</div>
              <div className="text-sm text-gray-600">Money-Back</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Question Flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 via-emerald-800 to-green-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-900 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-lg shadow-lg relative z-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
              <Heart className="w-7 h-7 text-white" strokeWidth={2.5} />
            </div>
            <div>
              <span className="font-bold text-2xl text-gray-900">Wellness</span>
              <span className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Path</span>
            </div>
          </div>
          <button className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 transition-all flex items-center justify-center shadow-lg hover:shadow-xl">
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      {step <= 36 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 relative z-20">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(((step - 2) / 36) * 100);
                }}
                className="w-12 h-12 rounded-xl bg-white/95 backdrop-blur-lg shadow-xl flex items-center justify-center hover:bg-white transition-all hover:scale-110 active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 text-gray-700" strokeWidth={2.5} />
              </button>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-3">
                <span className="text-sm font-semibold text-white/90">Question {step} of 36</span>
                <span className="text-sm font-bold text-white bg-white/20 backdrop-blur px-4 py-1 rounded-full">{Math.round((step / 36) * 100)}%</span>
              </div>
              <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 transition-all duration-500 ease-out rounded-full shadow-lg"
                  style={{ width: `${(step / 36) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {step === 1 && (
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-full mb-8 border border-white/20">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-semibold">Evidence-Based Wellness Program</span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your Life<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">One Step at a Time</span>
            </h1>
            <p className="text-2xl text-blue-200 max-w-3xl mx-auto leading-relaxed">
              Personalized wellness journey tailored to your unique needs and goals
            </p>
          </div>
        )}

        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight px-4">
            {currentQuestion?.question}
          </h2>
        </div>

        {currentQuestion?.type === 'input' ? (
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-2xl border-4 border-blue-200">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-900 to-indigo-600 rounded-2xl mb-6 shadow-xl">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-4 mb-8">
                <input
                  type={currentQuestion.inputType}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="w-40 px-6 py-5 text-4xl font-bold border-3 border-gray-300 rounded-2xl focus:border-green-900 focus:outline-none text-center bg-gray-50 focus:bg-white transition-all shadow-inner"
                  placeholder="0"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleInputSubmit(currentQuestion.id);
                    }
                  }}
                  autoFocus
                />
                <span className="text-4xl font-bold text-gray-700">
                  {currentQuestion.unit}
                </span>
              </div>
              <button
                onClick={() => handleInputSubmit(currentQuestion.id)}
                disabled={!inputValue || parseFloat(inputValue) <= 0}
                className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-5 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] text-lg"
              >
                Continue
              </button>
            </div>
          </div>
        ) : currentQuestion?.hasImages && step <= 2 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="group bg-white hover:bg-gradient-to-br hover:from-white hover:to-blue-50 border-4 border-transparent hover:border-blue-400 rounded-3xl overflow-hidden shadow-2xl transition-all transform hover:scale-105 active:scale-95"
              >
                <div className={`h-80 ${idx === 0 ? 'bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100' : 'bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100'} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                  <div className="text-9xl relative z-10 transform group-hover:scale-110 transition-transform">
                    {option.emoji}
                  </div>
                </div>
                <div className="p-8 bg-white">
                  <div className="font-bold text-3xl text-gray-900 group-hover:text-blue-600 transition-colors">
                    {option.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {currentQuestion?.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="group bg-white/95 backdrop-blur-lg hover:bg-white border-3 border-transparent hover:border-blue-400 rounded-2xl p-7 shadow-xl transition-all transform hover:scale-105 active:scale-95 text-left"
              >
                {option.icon && (
                  <div className="text-4xl mb-3">{option.icon}</div>
                )}
                <div className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors">
                  {option.label}
                </div>
                {option.sublabel && (
                  <div className="text-gray-600 text-sm leading-relaxed">
                    {option.sublabel}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="text-center mt-20">
            <div className="inline-flex flex-col items-center gap-4">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <p className="text-white/90 text-sm font-medium">50,000+ Success Stories</p>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <p className="text-white/90 text-sm font-medium">4.9/5 Rating</p>
                </div>
              </div>
              <p className="text-blue-200 text-sm">Certified nutritionists & wellness experts</p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {step === 1 && (
        <footer className="bg-white/95 backdrop-blur-lg py-16 mt-24 relative z-10 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-10 shadow-xl mb-12 border-2 border-blue-100">
              <h3 className="font-bold text-gray-900 text-2xl mb-4 flex items-center gap-3">
                <Shield className="w-7 h-7 text-blue-600" />
                Important Information
              </h3>
              <p className="text-gray-700 leading-relaxed mb-5">
                Individual results may vary based on factors including starting condition, goals, commitment level, and accuracy of information provided. Typical users following our evidence-based wellness program can expect gradual, sustainable progress toward their health goals.
              </p>
              <p className="text-gray-700 leading-relaxed">
                The content provided is for informational purposes and should not replace professional medical advice. Always consult with a qualified healthcare provider regarding your health decisions and before starting any new wellness program.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border-2 border-blue-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">💬</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xl">Expert Support</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Our certified nutrition and wellness team is available through your account dashboard. Professional guidance whenever you need it.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-8 border-2 border-indigo-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">📚</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xl">Resources & Help</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Access comprehensive guides, manage your program, or get answers to your questions through our support center.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 border-2 border-purple-200 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl">🔒</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-xl">Privacy First</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Your data is encrypted and protected. We never share your personal information with third parties.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 mb-8 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">Privacy Policy</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">Terms of Service</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">Cookie Preferences</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-semibold">Contact Us</a>
            </div>

            <div className="text-center border-t border-gray-200 pt-8">
              <p className="text-gray-600 font-semibold mb-2">
                © 2025 WellnessPath. All rights reserved.
              </p>
              <p className="text-gray-500">
                Evidence-based wellness programs designed by certified professionals
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default WellnessPath;