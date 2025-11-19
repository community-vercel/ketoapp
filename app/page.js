'use client'
import React, { useState, useRef } from 'react';
import { Check, ChevronLeft, Mail, Lock, User } from 'lucide-react';

const KetoGoClone = () => {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef(null);

  const questions = [
    { id: 1, question: "What is your gender?", options: [
        { value: "female", label: "Female", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/OQ1Px6a5aW-734.webp" },
        { value: "male", label: "Male", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/vJM_MMkFXV-734.webp" }
      ], hasImages: true, layout: "grid-cols-2" },
    { id: 2, question: "Adjust your weight loss plan to your age", options: [
        { value: "18-26", label: "18-26", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/KADQVlZKpN-734.webp" },
        { value: "27-38", label: "27-38", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/uNSYjeFXBk-734.webp" },
        { value: "39-50", label: "39-50", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/1tZaeIRJIA-734.webp" },
        { value: "50+", label: "50+", image: "https://v3.ketogo.app/ww-en/k-33m-usd-metric-default/img/LEFWuLuLHG-480.webp" }
      ], hasImages: true, layout: "grid-cols-4" },
    { id: 3, question: "What is your weight loss goal?", options: [
        { value: "look_better", label: "Look and feel better", image: "👩", bgColor: "#E8D5C4" },
        { value: "health", label: "Improve my health", image: "👨", bgColor: "#D4C5C5" },
        { value: "both", label: "Both", image: "👩", bgColor: "#E8D5C4" }
      ], hasImages: true, layout: "grid-cols-1", imageRight: true },
    { id: 4, question: "Keto diet is a low-carb, high-fat diet for fast weight loss", type: "info", description: "On Keto diet you burn fat for energy instead of carbohydrates and as a result can lose 2–5 kg per week", hasChart: true, info: [
        { label: "FATS", value: "70-80%", color: "#1B7A6B" },
        { label: "PROTEIN", value: "25-30%", color: "#E8D5C4" },
        { label: "CARBS", value: "5-10%", color: "#D4AF37" }
      ] },
    { id: 5, question: "What is your current weight?", type: "input", inputType: "number", unit: "kg" },
    { id: 6, question: "What is your target weight?", type: "input", inputType: "number", unit: "kg" },
    { id: 7, question: "What is your height?", type: "input", inputType: "number", unit: "cm" },
    { id: 8, question: "What is your age?", type: "input", inputType: "number", unit: "years" },
    { id: 9, question: "What is your typical day like?", options: [
        { value: "sedentary", label: "Mostly sitting", sublabel: "Office work, desk job" },
        { value: "light", label: "Light activity", sublabel: "Teacher, retail worker" },
        { value: "moderate", label: "Moderate activity", sublabel: "Nurse, server, mailman" },
        { value: "active", label: "Very active", sublabel: "Construction, athlete" }
      ] },
    { id: 10, question: "How often do you exercise?", options: [
        { value: "never", label: "Never" },
        { value: "1-2", label: "1-2 times per week" },
        { value: "3-4", label: "3-4 times per week" },
        { value: "5+", label: "5+ times per week" }
      ] },
    { id: 11, question: "What type of exercise do you prefer?", options: [
        { value: "cardio", label: "Cardio", sublabel: "Running, cycling, swimming" },
        { value: "strength", label: "Strength training", sublabel: "Weight lifting, resistance" },
        { value: "mixed", label: "Mixed workouts", sublabel: "Variety of exercises" },
        { value: "none", label: "I don't exercise" }
      ] },
    { id: 12, question: "How would you describe your body type?", options: [
        { value: "ectomorph", label: "Slim build", sublabel: "Hard to gain weight" },
        { value: "mesomorph", label: "Athletic build", sublabel: "Naturally muscular" },
        { value: "endomorph", label: "Larger build", sublabel: "Gains weight easily" }
      ] },
    { id: 13, question: "Where do you tend to store fat?", options: [
        { value: "stomach", label: "Stomach area" },
        { value: "hips", label: "Hips and thighs" },
        { value: "arms", label: "Arms and back" },
        { value: "overall", label: "Overall body" }
      ] },
    { id: 14, question: "How quickly do you want to lose weight?", options: [
        { value: "fast", label: "As fast as possible", sublabel: "Aggressive approach" },
        { value: "moderate", label: "At a moderate pace", sublabel: "Balanced approach" },
        { value: "slow", label: "Slowly but surely", sublabel: "Gradual lifestyle change" }
      ] },
    { id: 15, question: "Have you tried diets before?", options: [
        { value: "never", label: "Never tried" },
        { value: "few", label: "Tried a few times" },
        { value: "many", label: "Tried many times" }
      ] },
    { id: 16, question: "What's your biggest challenge with weight loss?", options: [
        { value: "cravings", label: "Food cravings", sublabel: "Sweet & salty temptations" },
        { value: "motivation", label: "Staying motivated", sublabel: "Keeping momentum" },
        { value: "time", label: "Finding time", sublabel: "Busy schedule" },
        { value: "knowledge", label: "Knowing what to eat", sublabel: "Nutrition confusion" }
      ] },
    { id: 17, question: "How's your energy level throughout the day?", options: [
        { value: "low", label: "Often tired", sublabel: "Low energy, need coffee" },
        { value: "moderate", label: "Moderate energy", sublabel: "Ups and downs" },
        { value: "high", label: "High energy", sublabel: "Feel great most days" }
      ] },
    { id: 18, question: "How many meals do you typically eat per day?", options: [
        { value: "1-2", label: "1-2 meals" },
        { value: "3", label: "3 meals" },
        { value: "4+", label: "4+ meals/snacks" }
      ] },
    { id: 19, question: "Do you eat late at night?", options: [
        { value: "often", label: "Often", sublabel: "Regular night snacking" },
        { value: "sometimes", label: "Sometimes", sublabel: "Occasional late eating" },
        { value: "rarely", label: "Rarely/Never", sublabel: "Stop eating early" }
      ] },
    { id: 20, question: "How much water do you drink daily?", options: [
        { value: "little", label: "Less than 4 glasses", sublabel: "Need to drink more" },
        { value: "moderate", label: "4-6 glasses", sublabel: "Decent hydration" },
        { value: "good", label: "7-8 glasses", sublabel: "Good hydration" },
        { value: "excellent", label: "More than 8 glasses", sublabel: "Excellent hydration" }
      ] },
    { id: 21, question: "How would you rate your sleep quality?", options: [
        { value: "poor", label: "Poor", sublabel: "Less than 5 hours" },
        { value: "fair", label: "Fair", sublabel: "5-6 hours" },
        { value: "good", label: "Good", sublabel: "7-8 hours" },
        { value: "excellent", label: "Excellent", sublabel: "8+ hours" }
      ] },
    { id: 22, question: "Do you have any dietary restrictions?", options: [
        { value: "none", label: "None" },
        { value: "vegetarian", label: "Vegetarian" },
        { value: "vegan", label: "Vegan" },
        { value: "allergies", label: "Food allergies" }
      ] },
    { id: 23, question: "How often do you eat fast food?", options: [
        { value: "daily", label: "Daily" },
        { value: "few_week", label: "Few times a week" },
        { value: "few_month", label: "Few times a month" },
        { value: "rarely", label: "Rarely/Never" }
      ] },
    { id: 24, question: "Do you drink alcohol?", options: [
        { value: "never", label: "Never" },
        { value: "occasionally", label: "Occasionally", sublabel: "Social events only" },
        { value: "weekly", label: "Weekly", sublabel: "1-2 times per week" },
        { value: "daily", label: "Daily" }
      ] },
    { id: 25, question: "How stressed are you typically?", options: [
        { value: "low", label: "Low stress", sublabel: "Generally calm" },
        { value: "moderate", label: "Moderate stress", sublabel: "Some pressure" },
        { value: "high", label: "High stress", sublabel: "Constantly stressed" }
      ] },
    { id: 26, question: "Do you cook your own meals?", options: [
        { value: "always", label: "Always", sublabel: "Love cooking at home" },
        { value: "sometimes", label: "Sometimes", sublabel: "Mix of cooking & eating out" },
        { value: "rarely", label: "Rarely", sublabel: "Mostly eat out" },
        { value: "never", label: "Never", sublabel: "Don't cook at all" }
      ] },
    { id: 27, question: "What's your relationship with food?", options: [
        { value: "healthy", label: "Healthy & balanced", sublabel: "Good relationship with food" },
        { value: "emotional", label: "Emotional eating", sublabel: "Eat when stressed/sad" },
        { value: "restrictive", label: "Very restrictive", sublabel: "Strict rules about food" },
        { value: "confused", label: "Confused", sublabel: "Unsure what's healthy" }
      ] },
    { id: 28, question: "Do you have any medical conditions?", options: [
        { value: "none", label: "None" },
        { value: "diabetes", label: "Diabetes" },
        { value: "thyroid", label: "Thyroid issues" },
        { value: "other", label: "Other condition" }
      ] },
    { id: 29, question: "Are you currently on any medications?", options: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" }
      ] },
    { id: 30, question: "How do you handle setbacks?", options: [
        { value: "give_up", label: "Usually give up", sublabel: "Hard to get back on track" },
        { value: "struggle", label: "Struggle to recover", sublabel: "Takes time to restart" },
        { value: "recover", label: "Bounce back quickly", sublabel: "Keep pushing forward" }
      ] },
    { id: 31, question: "What motivates you most?", options: [
        { value: "health", label: "Better health", sublabel: "Live longer, feel better" },
        { value: "appearance", label: "Look better", sublabel: "Improve appearance" },
        { value: "confidence", label: "More confidence", sublabel: "Feel good about myself" },
        { value: "energy", label: "More energy", sublabel: "Do more activities" }
      ] },
    { id: 32, question: "Do you have support from family/friends?", options: [
        { value: "yes", label: "Yes, very supportive" },
        { value: "some", label: "Somewhat supportive" },
        { value: "no", label: "Not really" }
      ] },
    { id: 33, question: "How committed are you to making a change?", options: [
        { value: "very", label: "Very committed", sublabel: "Ready to transform" },
        { value: "moderate", label: "Moderately committed", sublabel: "Willing to try" },
        { value: "unsure", label: "Unsure", sublabel: "Just exploring options" }
      ] },
    { id: 34, question: "When do you want to start?", options: [
        { value: "now", label: "Right now", sublabel: "Let's do this!" },
        { value: "week", label: "Within a week", sublabel: "Need a few days to prepare" },
        { value: "month", label: "Within a month", sublabel: "Just planning ahead" }
      ] },
    { id: 35, question: "What's your biggest health concern?", options: [
        { value: "weight", label: "Weight management" },
        { value: "energy", label: "Low energy levels" },
        { value: "chronic", label: "Chronic disease risk" },
        { value: "mental", label: "Mental wellbeing" }
      ] },
    { id: 36, question: "How tech-savvy are you?", options: [
        { value: "very", label: "Very comfortable", sublabel: "Love using apps" },
        { value: "moderate", label: "Moderately comfortable", sublabel: "Can figure things out" },
        { value: "basic", label: "Basic user", sublabel: "Keep it simple" }
      ] }
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
          setTimeout(() => setStep(37), 500);
        }
      }, 50);
    }
  };

  const currentQuestion = questions[step - 1];

  if (loading && step <= 36) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0D5A56] via-[#1B7A6B] to-[#0F4C3F] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-lg w-full relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-20 leading-tight">Preparing your plan. Please wait<br/>to see your results!</h1>
          <div className="relative w-64 h-64 mx-auto mb-20">
            <svg className="transform -rotate-90 w-64 h-64">
              <circle cx="128" cy="128" r="110" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="24" fill="none" />
              <circle cx="128" cy="128" r="110" stroke="#D4AF37" strokeWidth="24" fill="none" strokeDasharray={`${2 * Math.PI * 110}`} strokeDashoffset={`${2 * Math.PI * 110 * (1 - progress / 100)}`} className="transition-all duration-300" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-white">{Math.round(progress)}%</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <h2 className="text-lg font-bold text-gray-900 mb-5 leading-snug">You're in top 20% of candidates most fit for rapid weight loss</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FED7AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#D4AF37]" strokeWidth={4} />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">Based on your answers, you'll be able to lose 5kg within your first week with our weight loss plan</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FED7AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#D4AF37]" strokeWidth={4} />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">89% of users with very similar profile as yours have reached their weight goals within the projected timelines</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-[#FED7AA] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#D4AF37]" strokeWidth={4} />
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">Your weight and health profile is great for Keto diet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 37) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FFFBF0] via-[#FEF5E7] to-[#FEF3E2] flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="relative w-40 h-40 mx-auto mb-10">
              <div className="absolute inset-0 bg-white rounded-3xl shadow-2xl transform rotate-6 flex items-center justify-center">
                <Mail className="w-20 h-20 text-[#1B7A6B]" strokeWidth={1.5} />
              </div>
              <div className="absolute top-0 right-0 w-16 h-16 bg-white rounded-2xl shadow-xl transform -rotate-12 flex items-center justify-center">
                <Check className="w-10 h-10 text-[#1B7A6B]" strokeWidth={3} />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight px-4">Receive your weight loss program in your email to reach your {answers[6] || '62'}kg goal</h1>
          </div>
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="zuhooruddin055@gmail.com" className="w-full px-6 py-4 text-lg bg-[#F5F1ED] border-2 border-transparent rounded-2xl focus:bg-white focus:border-[#1B7A6B] focus:outline-none mb-6 transition-all" />
            <div className="flex items-center gap-3 text-sm text-gray-600 mb-8 px-2">
              <Lock className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
              <p className="leading-snug">We take your privacy very seriously! All your data is safe with us.</p>
            </div>
            <button onClick={() => { if (email) alert('Thank you! Your personalized plan is being prepared.'); }} className="w-full bg-[#1B7A6B] hover:bg-[#155A54] text-white font-bold py-5 px-6 rounded-2xl transition-all text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">Continue</button>
            <p className="text-xs text-gray-500 text-center mt-8 leading-relaxed">By clicking "Continue" below you acknowledge that you have read<br className="hidden sm:block"/> our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentQuestion?.type === 'info') {
    return (
      <div className="min-h-screen bg-[#F5F1ED] relative overflow-hidden">
        <header className="bg-white shadow-sm relative z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-[#1B7A6B] to-[#155A54] rounded-lg flex items-center justify-center text-2xl shadow-md">🥑</div>
              <span className="font-bold text-2xl">Keto<span className="text-[#1B7A6B]">GO</span>.app</span>
            </div>
            <button className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-6 py-6 relative z-20">
          <div className="flex items-center gap-4">
            <button onClick={() => { setStep(step - 1); setProgress(((step - 2) / 36) * 100); }} className="w-12 h-12 rounded-full bg-gray-800 text-white shadow-lg flex items-center justify-center hover:bg-gray-900 transition-all">
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>
            <div className="flex-1">
              <div className="flex justify-end items-center mb-2">
                <span className="text-sm font-semibold text-gray-800">{step}/36</span>
              </div>
              <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
                <div className="h-full bg-[#1B7A6B] transition-all duration-500 ease-out rounded-full" style={{ width: `${(step / 36) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
        <main className="max-w-5xl mx-auto px-6 py-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">{currentQuestion?.question}</h2>
            <p className="text-gray-700 mt-6 text-lg">{currentQuestion?.description}</p>
          </div>
          <div className="flex justify-center">
            <div className="relative w-80 h-80">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="150" fill="none" stroke="#E8D5C4" strokeWidth="60" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="#1B7A6B" strokeWidth="60" strokeDasharray="314 628" transform="rotate(-90 200 200)" />
                <circle cx="200" cy="200" r="150" fill="none" stroke="#E8D5C4" strokeWidth="60" strokeDasharray="47 628" strokeDashoffset="-314" transform="rotate(-90 200 200)" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-gray-900">70-80%</div>
                  <div className="text-gray-700 font-semibold">FATS</div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {currentQuestion?.info?.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-lg font-bold text-gray-900 mb-2">{item.value}</div>
                <div className="text-gray-700">{item.label}</div>
              </div>
            ))}
          </div>
          <button onClick={() => handleAnswer(currentQuestion.id, 'continue')} className="mt-12 mx-auto block bg-[#1B7A6B] hover:bg-[#155A54] text-white font-bold py-4 px-12 rounded-2xl transition-all text-lg">Next</button>
        </main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative overflow-hidden ${step === 1 ? 'bg-gradient-to-br from-[#0F4C3F] via-[#1B7A6B] to-[#0D5A56] text-white' : 'bg-[#F5F1ED] text-gray-900'}`}>
      <header className={`shadow-sm relative z-20 ${step === 1 ? 'bg-white/10 backdrop-blur' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-gradient-to-br from-[#1B7A6B] to-[#155A54] rounded-lg flex items-center justify-center text-2xl shadow-md">🥑</div>
            <span className="font-bold text-2xl">Keto<span className="text-[#1B7A6B]">GO</span>.app</span>
          </div>
          <button className="w-11 h-11 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </header>
      <div className="max-w-4xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4">
          {step > 1 && (
            <button onClick={() => { setStep(step - 1); setProgress(((step - 2) / 36) * 100); }} className="w-12 h-12 rounded-full bg-gray-800 text-white shadow-lg flex items-center justify-center hover:bg-gray-900 transition-all">
              <ChevronLeft className="w-6 h-6" strokeWidth={3} />
            </button>
          )}
          <div className="flex-1">
            <div className="flex justify-end items-center mb-2">
              <span className={`text-sm font-semibold ${step === 1 ? 'text-white/80' : 'text-gray-800'}`}>{step}/36</span>
            </div>
            <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ease-out rounded-full ${step === 1 ? 'bg-white' : 'bg-[#1B7A6B]'}`} style={{ width: `${(step / 36) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
      <main className="max-w-5xl mx-auto px-6 py-12">
        {step === 1 && (
          <div className="text-center mb-16">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
              Life changing results with<br />
              KetoGo <span className="text-[#D4AF37]">once and for all!</span>
            </h1>
          </div>
        )}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight px-4">{currentQuestion?.question}</h2>
        </div>
        {currentQuestion?.type === 'input' ? (
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-3xl p-10 shadow-2xl">
              <div className="flex items-center justify-center gap-4 mb-8">
                <input ref={inputRef} type={currentQuestion.inputType} className="w-32 px-6 py-4 text-4xl font-bold border-2 border-gray-300 rounded-2xl focus:border-[#1B7A6B] focus:outline-none text-center bg-gray-50 focus:bg-white transition-all" placeholder="00" onKeyPress={(e) => e.key === 'Enter' && handleAnswer(currentQuestion.id, e.currentTarget.value)} />
                <span className="text-4xl font-bold text-gray-700">{currentQuestion.unit}</span>
              </div>
              <button onClick={() => handleAnswer(currentQuestion.id, inputRef.current?.value || '')} className="w-full bg-[#1B7A6B] hover:bg-[#155A54] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg hover:shadow-xl">Continue</button>
            </div>
          </div>
        ) : currentQuestion?.layout === 'grid-cols-2' ? (
          <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
            {currentQuestion.options.map((option) => (
              <button key={option.value} onClick={() => handleAnswer(currentQuestion.id, option.value)} className="group bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                <img src={option.image} alt={option.label} className="w-full h-96 object-cover" />
                <div className="p-8 bg-white">
                  <div className="font-bold text-3xl text-center">{option.label}</div>
                </div>
              </button>
            ))}
          </div>
        ) : currentQuestion?.layout === 'grid-cols-4' ? (
          <div className="grid grid-cols-4 gap-6 max-w-5xl mx-auto">
            {currentQuestion.options.map((option) => (
              <button key={option.value} onClick={() => handleAnswer(currentQuestion.id, option.value)} className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                <img src={option.image} alt={option.label} className="w-full h-48 object-cover" />
                <div className="p-6 bg-white text-center">
                  <div className="font-bold text-xl">{option.label}</div>
                </div>
              </button>
            ))}
          </div>
        ) : currentQuestion?.imageRight ? (
          <div className="space-y-6 max-w-3xl mx-auto">
            {currentQuestion.options.map((opt) => (
              <button key={opt.value} onClick={() => handleAnswer(currentQuestion.id, opt.value)} className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex items-center justify-between group hover:scale-105">
                <div className="text-left">
                  <div className="font-bold text-2xl">{opt.label}</div>
                </div>
                <div className="w-28 h-28 rounded-xl flex items-center justify-center text-6xl" style={{ backgroundColor: opt.bgColor || '#E8D5C4' }}>
                  {opt.image}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {currentQuestion?.options?.map((option) => (
              <button key={option.value} onClick={() => handleAnswer(currentQuestion.id, option.value)} className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 text-left">
                <div className="font-bold text-2xl mb-2">{option.label}</div>
                {option.sublabel && <div className="text-gray-600">{option.sublabel}</div>}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default KetoGoClone;