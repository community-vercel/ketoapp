'use client'
import React, { useState } from 'react';
import { Check, ChevronLeft, Mail, Lock, User, Shield } from 'lucide-react';

const WellnessPath = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const questions = [
    {
      id: 1,
      question: "What is your gender?",
      options: [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" }
      ],
      hasImages: true
    },
    {
      id: 2,
      question: "What is your primary wellness goal?",
      options: [
        { value: "look_better", label: "Improve appearance and confidence" },
        { value: "health", label: "Enhance overall health" },
        { value: "both", label: "Both equally important" }
      ],
      hasImages: true
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

  const handleInputSubmit = (questionId, value) => {
    if (value) {
      handleAnswer(questionId, value);
    }
  };

  const currentQuestion = questions[step - 1];

  // Loading Screen
  if (loading && step <= 36) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-2xl w-full relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-16 leading-tight">
            Analyzing Your Profile<br/>Creating Your Personalized Plan
          </h1>
          
          <div className="relative w-56 h-56 mx-auto mb-16">
            <svg className="transform -rotate-90 w-56 h-56">
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="16"
                fill="none"
              />
              <circle
                cx="112"
                cy="112"
                r="100"
                stroke="url(#gradient)"
                strokeWidth="16"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 100}`}
                strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
                className="transition-all duration-300"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#A78BFA" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-5xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Your Profile Analysis
            </h2>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Based on your profile, you're an excellent candidate for a structured wellness program with projected results within 8-12 weeks
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed">
                  87% of users with similar profiles achieve their wellness goals within the projected timeline using our evidence-based approach
                </p>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
                <p className="text-gray-700 leading-relaxed">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-6">
              <Mail className="w-12 h-12 text-white" strokeWidth={2} />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight px-4">
              Receive Your Personalized Wellness Plan
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Get your customized roadmap to reach your {answers[4] || '62'}kg goal delivered to your inbox
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl border border-gray-100">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full px-6 py-4 text-lg bg-gray-50 border-2 border-gray-200 rounded-xl focus:bg-white focus:border-blue-500 focus:outline-none mb-4 transition-all"
            />
            
            <div className="flex items-start gap-3 text-sm text-gray-600 mb-6 p-4 bg-blue-50 rounded-xl">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">Your privacy is our priority. All personal information is encrypted and securely stored.</p>
            </div>

            <button
              onClick={() => {
                if (email) {
                  alert('Thank you! Your personalized wellness plan is being prepared.');
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all text-lg shadow-lg hover:shadow-xl"
            >
              Get My Personalized Plan
            </button>

            <p className="text-xs text-gray-500 text-center mt-6 leading-relaxed">
              By continuing, you acknowledge that you have read and agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main Question Flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur shadow-sm relative z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-xl font-bold text-white">W</span>
            </div>
            <span className="font-bold text-xl sm:text-2xl text-gray-900">Wellness<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Path</span></span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Progress Bar */}
      {step <= 36 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 relative z-20">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button
                onClick={() => {
                  setStep(step - 1);
                  setProgress(((step - 2) / 36) * 100);
                }}
                className="w-11 h-11 rounded-xl bg-white/95 backdrop-blur shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" strokeWidth={2.5} />
              </button>
            )}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-white/90">Progress</span>
                <span className="text-sm font-semibold text-white">{step} of 36</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500 ease-out rounded-full"
                  style={{ width: `${(step / 36) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 relative z-10">
        {step === 1 && (
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Journey to Better Health<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Starts Here</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Evidence-based wellness program tailored to your unique needs
            </p>
          </div>
        )}

        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight px-4">
            {currentQuestion?.question}
          </h2>
        </div>

        {currentQuestion?.type === 'input' ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 shadow-2xl border border-white/20">
              <div className="flex items-center justify-center gap-4 mb-6">
                <input
                  type={currentQuestion.inputType}
                  className="w-32 px-6 py-4 text-3xl font-bold border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-center bg-gray-50 focus:bg-white transition-all"
                  placeholder="00"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleInputSubmit(currentQuestion.id, e.target.value);
                    }
                  }}
                  autoFocus
                />
                <span className="text-3xl font-bold text-gray-700">
                  {currentQuestion.unit}
                </span>
              </div>
              <button
                onClick={(e) => {
                  const input = e.target.parentElement.parentElement.querySelector('input');
                  handleInputSubmit(currentQuestion.id, input.value);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                Continue
              </button>
            </div>
          </div>
        ) : currentQuestion?.hasImages && step <= 2 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {currentQuestion?.options.map((option, idx) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="group bg-white/95 backdrop-blur hover:bg-white border-3 border-transparent hover:border-blue-500 rounded-2xl overflow-hidden shadow-xl transition-all transform hover:scale-105"
              >
                <div className={`h-64 ${idx === 0 ? 'bg-gradient-to-br from-purple-100 to-pink-100' : 'bg-gradient-to-br from-blue-100 to-cyan-100'} flex items-center justify-center`}>
                  <div className="text-7xl">
                    {idx === 0 ? '👩' : '👨'}
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <div className="font-bold text-2xl text-gray-900">
                    {option.label}
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {currentQuestion?.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(currentQuestion.id, option.value)}
                className="group bg-white/95 backdrop-blur hover:bg-white border-2 border-transparent hover:border-blue-500 rounded-xl p-6 shadow-lg transition-all transform hover:scale-105 text-left"
              >
                <div className="font-semibold text-gray-900 text-lg mb-1">
                  {option.label}
                </div>
                {option.sublabel && (
                  <div className="text-gray-500 text-sm">
                    {option.sublabel}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <p className="text-white/90 text-sm font-medium">
                Certified nutritionists and wellness experts
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      {step === 1 && (
        <footer className="bg-white/95 backdrop-blur py-12 mt-20 relative z-10 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-sm mb-8 border border-blue-100">
              <h3 className="font-bold text-gray-900 text-xl mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Important Information
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                Individual results may vary based on factors including starting condition, goals, commitment level, and accuracy of information provided. Typical users following our evidence-based wellness program can expect gradual, sustainable progress toward their health goals.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                The content provided is for informational purposes and should not replace professional medical advice. Always consult with a qualified healthcare provider regarding your health decisions and before starting any new wellness program.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl">💬</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Expert Support</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Our certified nutrition and wellness team is available through your account dashboard. Professional guidance whenever you need it.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h4 className="font-bold text-gray-900 text-lg">Resources & Help</h4>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Access comprehensive guides, manage your program, or get answers to your questions through our support center.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 mb-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Privacy Policy</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Terms of Service</a>
              <span className="text-gray-300">•</span>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">Cookie Preferences</a>
            </div>

            <div className="text-center border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 font-medium">
                © 2025 WellnessPath. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-2">
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