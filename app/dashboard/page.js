'use client'
import React, { useState } from 'react';
import { Calendar, Crown, MessageCircle, ShoppingCart, User, ChevronLeft, ChevronRight, Send, Edit, Phone, Globe, Mail, Activity, Target, BookOpen, Clock } from 'lucide-react';

const NutritionApp = () => {
  const [activeTab, setActiveTab] = useState('calendar');
  const [chatInput, setChatInput] = useState('');
  const [selectedDay, setSelectedDay] = useState('20-NOV');

  const days = [
    { date: '18-NOV', day: 'Tuesday' },
    { date: '19-NOV', day: 'Wednesday' },
    { date: '20-NOV', day: 'Thursday' },
    { date: '21-NOV', day: 'Friday' },
    { date: '22-NOV', day: 'Saturday' },
    { date: '23-NOV', day: 'Sunday' },
  ];

  const meals = [
    {
      id: 1,
      time: 'Breakfast (10min)',
      title: 'Fresh pancakes with poppy seeds',
      tags: ['Antioxidants', 'Heart', 'Blood composition', 'Immunity'],
      image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&h=600&fit=crop'
    },
    {
      id: 2,
      time: 'Workout (30min)',
      title: 'Workout of the day',
      tags: ['Energy', 'Metabolism', 'Muscles'],
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      note: "Don't have an effective workout in mind? Try your personal Home workout plan!"
    },
    {
      id: 3,
      time: 'Lunch (20min)',
      title: 'Noodles with Vegetables and Egg',
      tags: ['Antioxidants', 'Satiety', 'Metabolism'],
      image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop'
    },
    {
      id: 4,
      time: 'Dinner (15min)',
      title: 'Salmon with Stewed Spinach',
      tags: ['Heart', 'Satiety', 'Antioxidants', 'Blood composition'],
      image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&h=600&fit=crop'
    },
    {
      id: 5,
      time: 'Snack (10min)',
      title: 'Golden Milk Ice Cream',
      tags: ['Blood composition', 'Heart', 'Bones', 'Immunity'],
      image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop'
    },
    {
      id: 6,
      time: 'Trick',
      title: '150 minutes of moving',
      tags: ['Wellness', 'Longer life', 'Muscles', 'Heart', 'Immunity'],
      image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop'
    }
  ];

  const shoppingList = [
    'Avocado 22g', 'Tomatoes 120g', 'Olive oil 5ml', 'Ground beef 102g',
    'Cauliflower 200g', 'Almond milk 130ml', 'Strawberries 80g', 'Spring onions 10g',
    'Red onion 30g', 'Chia seeds 97g', 'Cocoa powder 15g', 'Raspberry 60g',
    'Milk 120ml', 'Greek yoghurt 73g', 'Mushrooms 50g', 'Peanut butter 53g', 'Bacon 125g'
  ];

  return (
    <div className="min-h-screen ">
      {/* Navigation */}
      <nav className="bg-gradient-to-br from-teal-800 via-teal-600 to-yellow-400 shadow-lg sticky top-0 z-50" >
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-around items-center" style={{ padding: '6px 0' }}>
            {[
              { tab: 'calendar', icon: Calendar },
              { tab: 'premium', icon: Crown },
              { tab: 'chat', icon: MessageCircle },
              { tab: 'shopping', icon: ShoppingCart },
              { tab: 'profile', icon: User }
            ].map(({ tab, icon: Icon }) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center transition-all ${
                  activeTab === tab ? 'text-white' : 'text-teal-300 hover:text-white'
                }`}
                style={{ width: '56px', height: '56px' }}
              >
                <Icon size={26} strokeWidth={2} />
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-3xl mx-auto py-4">
        
        {/* CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-none shadow-lg">
            <div className="px-3 pt-3 pb-2">
              <div className="flex items-center justify-between mb-3">
                <button className="p-1.5">
                  <ChevronLeft size={22} className="text-gray-700" />
                </button>
                
                <div className="flex gap-1.5 flex-1 mx-2 justify-center overflow-x-auto">
                  {days.map((day) => (
                    <button
                      key={day.date}
                      onClick={() => setSelectedDay(day.date)}
                      className={`px-2.5 py-1.5 rounded text-center min-w-[75px] ${
                        selectedDay === day.date
                          ? 'text-white shadow-sm'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                      style={{
                        backgroundColor: selectedDay === day.date ? '#3b8686' : '#f3f4f6',
                        fontSize: '11px'
                      }}
                    >
                      <div className="font-medium leading-tight">{day.day}</div>
                      <div className="mt-0.5 leading-tight">{day.date}</div>
                      <div className="flex gap-0.5 justify-center mt-1.5">
                        {[1,2,3,4,5].map(i => (
                          <div 
                            key={i} 
                            className="rounded-full"
                            style={{
                              width: '5px',
                              height: '5px',
                              backgroundColor: selectedDay === day.date ? '#ffffff' : '#3b8686'
                            }}
                          />
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
                
                <button className="p-1.5">
                  <ChevronRight size={22} className="text-gray-700" />
                </button>
              </div>

              <div className="flex gap-6 justify-center py-3 border-b border-gray-200">
                {[
                  { val: '0g', label: 'TO LOSE' },
                  { val: '80cal', label: 'GOAL' },
                  { val: '80cal', label: 'WEIGHT' }
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="font-bold text-gray-900" style={{ fontSize: '22px' }}>{item.val}</div>
                    <div className="text-gray-500 uppercase" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-3 pb-3 space-y-3">
              {meals.map((meal) => (
                <div key={meal.id} className="border border-gray-200 rounded overflow-hidden">
                  <div className="p-3">
                    <div className="flex gap-2.5">
                      <div 
                        className="text-white rounded flex items-center justify-center font-bold flex-shrink-0"
                        style={{
                          width: '44px',
                          height: '44px',
                          backgroundColor: '#4db8b8',
                          fontSize: '19px'
                        }}
                      >
                        {meal.id}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-500 mb-0.5" style={{ fontSize: '11px' }}>{meal.time}</div>
                        <h3 className="font-semibold text-gray-900 mb-1.5" style={{ fontSize: '15px' }}>{meal.title}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {meal.tags.map((tag, i) => (
                            <span 
                              key={i} 
                              className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full"
                              style={{ fontSize: '11px' }}
                            >
                              <span className="rounded-full" style={{ width: '5px', height: '5px', backgroundColor: '#4db8b8' }}></span>
                              {tag}
                            </span>
                          ))}
                        </div>
                        {meal.note && (
                          <p className="text-gray-600 bg-gray-50 p-2 rounded mt-2" style={{ fontSize: '12px' }}>
                            {meal.note}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ height: '180px' }}>
                    <img src={meal.image} alt={meal.title} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PREMIUM */}
        {activeTab === 'premium' && (
          <div className="bg-white rounded-none shadow-lg">
            <div className="p-4 max-h-[750px] overflow-y-auto">
              <div className="text-center">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face"
                  alt="Specialist"
                  className="rounded-full mx-auto mb-2 object-cover border-2 border-gray-200"
                  style={{ width: '80px', height: '80px' }}
                />
                <p className="text-gray-600 mb-3" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  A Certified Nutrition<br/>Specialist
                </p>
                
                <div className="border-2 rounded p-3 mb-4 mx-auto" style={{ maxWidth: '420px', borderColor: '#b8dfe0', backgroundColor: '#f0f9f9' }}>
                  <p className="text-gray-800 italic" style={{ fontSize: '13px', lineHeight: '1.5' }}>
                    "Yeah, with the smartest Premium Plan, you can keep healthy and improve your appearance. You will achieve your goal!"
                  </p>
                </div>

                <button 
                  className="w-full mx-auto text-white rounded font-medium mb-3"
                  style={{
                    maxWidth: '420px',
                    padding: '11px',
                    backgroundColor: '#4db8b8',
                    fontSize: '12px',
                    letterSpacing: '0.5px'
                  }}
                >
                  GET PREMIUM ACCESS
                </button>

                <p className="text-gray-600 mb-4" style={{ fontSize: '12px', lineHeight: '1.4' }}>
                  What do other users have to say<br/>about Premium? <span className="text-teal-600 underline cursor-pointer">Click here to see</span>
                </p>

                <div className="flex gap-3 justify-center mb-3">
                  {[
                    { src: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=240&h=320&fit=crop', label: 'Before (82) lbs+ 170kg' },
                    { src: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=240&h=320&fit=crop', label: 'After (70kg)' }
                  ].map((img, i) => (
                    <div key={i} className="text-center">
                      <img 
                        src={img.src}
                        alt={img.label}
                        className="rounded shadow-md object-cover mb-1.5"
                        style={{ width: '110px', height: '155px' }}
                      />
                      <p className="font-semibold text-gray-700" style={{ fontSize: '11px' }}>{img.label}</p>
                    </div>
                  ))}
                </div>

                <p className="text-gray-700 mb-4 mx-auto" style={{ fontSize: '12px', lineHeight: '1.5', maxWidth: '420px' }}>
                  The plan has helped me to realize what I was doing wrong before and how much easier could be a weight loss journey when you eat regularly...
                </p>

                <img 
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                  alt="Activity"
                  className="rounded shadow-md mx-auto mb-4"
                  style={{ width: '100%', maxWidth: '360px', height: '200px', objectFit: 'cover' }}
                />

                <h3 className="font-bold text-gray-900 mb-4" style={{ fontSize: '17px', lineHeight: '1.3' }}>
                  What's included in Premium that<br/>Helps? Less:
                </h3>
              </div>

              <div className="space-y-2.5 mb-4">
                {[
                  { icon: '💪', title: 'Home workouts', badge: 'NEW', desc: 'Access complete home workout plans tailored to your fitness level and goals.' },
                  { icon: '📖', title: '4 real success stories', desc: 'Get inspired by real transformations from people just like you.' },
                  { icon: '📊', title: 'Before & After', desc: 'Track your progress with photo comparisons to see your amazing transformation.' },
                  { icon: '🍽️', title: 'Every meal', desc: 'Access all premium recipes with detailed nutritional information and cooking tips.' },
                  { icon: '🎯', title: 'Goal tracking', desc: 'Set and monitor your weight loss goals with advanced analytics.' },
                  { icon: '🏃', title: 'Activity monitor', desc: 'Track your daily activities and calories burned automatically.' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 p-2.5 bg-gray-50 rounded">
                    <div className="rounded-full flex items-center justify-center flex-shrink-0" style={{ width: '44px', height: '44px', backgroundColor: '#fef3c7', fontSize: '20px' }}>
                      {feature.icon}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h4 className="font-semibold text-gray-900" style={{ fontSize: '13px' }}>{feature.title}</h4>
                        {feature.badge && (
                          <span className="px-1.5 py-0.5 text-white rounded-full font-bold uppercase" style={{ backgroundColor: '#4db8b8', fontSize: '9px' }}>
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600" style={{ fontSize: '11px', lineHeight: '1.4' }}>{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                className="w-full text-white rounded font-medium"
                style={{
                  padding: '11px',
                  backgroundColor: '#4db8b8',
                  fontSize: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                GET PREMIUM ACCESS NOW
              </button>
            </div>
          </div>
        )}

        {/* CHAT */}
        {activeTab === 'chat' && (
          <div className="bg-white rounded-none shadow-lg flex flex-col" style={{ height: '700px' }}>
            <div className="text-white p-3 text-center" style={{ backgroundColor: '#3b8686' }}>
              <h2 className="font-medium" style={{ fontSize: '16px' }}>My Online Nutrition Specialist</h2>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4" style={{ backgroundColor: '#f9fafb' }}>
              <div className="flex flex-col items-center justify-center h-full">
                <p className="text-gray-600 mb-6" style={{ fontSize: '12px' }}>This is your first time chatting</p>
                
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face"
                  alt="Elina"
                  className="rounded-full object-cover border-4 border-white shadow-lg mb-3"
                  style={{ width: '120px', height: '120px' }}
                />
                
                <h3 className="font-semibold text-gray-900 mb-1" style={{ fontSize: '18px' }}>Message Elina</h3>
                <p className="text-gray-600" style={{ fontSize: '13px' }}>Your dedicated Nutrition Specialist</p>
              </div>
            </div>

            <div className="border-t border-gray-200 bg-white p-3">
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Start typing..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:border-transparent"
                  style={{ fontSize: '13px', borderRadius: '6px', focusRingColor: '#4db8b8' }}
                />
                <button 
                  onClick={() => setChatInput('')}
                  className="p-2 text-white rounded"
                  style={{ backgroundColor: '#4db8b8' }}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* SHOPPING */}
        {activeTab === 'shopping' && (
          <div className="bg-white rounded-none shadow-lg">
            <div className="p-4">
              <h2 className="font-semibold text-center text-gray-900 mb-1" style={{ fontSize: '20px' }}>Your shopping list</h2>
              <p className="text-center text-gray-500 mb-5" style={{ fontSize: '12px' }}>For a time period from 20-Nov-2025 to 20-Nov-2025</p>
              
              <div className="space-y-1.5 mb-5">
                {shoppingList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-2 hover:bg-gray-50 rounded">
                    <div className="rounded flex items-center justify-center flex-shrink-0" style={{ width: '32px', height: '32px', backgroundColor: '#3b8686' }}>
                      <ShoppingCart size={15} className="text-white" />
                    </div>
                    <span className="text-gray-800" style={{ fontSize: '14px' }}>{item}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-5">
                <p className="text-gray-900 font-medium mb-2" style={{ fontSize: '14px' }}>You may consider adding these products as well</p>
                <p className="text-gray-700" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Black pepper, Garlic, Stevia, Garlic powder, Lemon juice, Rucola, Vanilla extract, Greek yoghurt, Mustard
                </p>
              </div>

              <div className="space-y-2.5">
                <button 
                  className="w-full text-white rounded font-medium uppercase"
                  style={{
                    padding: '11px',
                    backgroundColor: '#4db8b8',
                    fontSize: '11px',
                    letterSpacing: '1px'
                  }}
                >
                  Create New
                </button>
                <button 
                  className="w-full rounded font-medium uppercase"
                  style={{
                    padding: '11px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    fontSize: '11px',
                    letterSpacing: '1px'
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PROFILE */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-none shadow-lg">
            <div className="p-4 max-h-[750px] overflow-y-auto">
              <h2 className="font-semibold text-center text-gray-900 mb-5" style={{ fontSize: '20px' }}>Your weight loss profile</h2>
              
              <div className="space-y-2.5 mb-4">
                {[
                  { icon: User, label: 'NAME', value: 'Hugo Souza' },
                  { icon: Calendar, label: 'AGE', value: '56 years' },
                  { icon: User, label: 'GENDER', value: 'Male' },
                  { icon: Activity, label: 'INITIAL WEIGHT', value: '82kg' },
                  { icon: Activity, label: 'CURRENT WEIGHT', value: '80kg' },
                  { icon: Edit, label: 'HEIGHT', value: '180cm' },
                  { icon: Phone, label: 'PHONE NUMBER', value: '+44 7563902355' },
                  { icon: Globe, label: 'COUNTRY', value: 'United Kingdom' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded">
                      <Icon size={18} className="text-gray-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-gray-500 uppercase font-medium" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>{item.label}</div>
                        <div className="text-gray-900" style={{ fontSize: '13px' }}>{item.value}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                className="w-full text-white rounded font-medium mb-5"
                style={{
                  padding: '10px',
                  backgroundColor: '#4db8b8',
                  fontSize: '12px',
                  letterSpacing: '0.5px'
                }}
              >
                EDIT
              </button>

              <div className="space-y-4">
                {[
                  { title: 'Your Premium', icon: Crown, desc: 'Your premium weight loss is not activated. Thus why you are now only at 25% of the maximum weight loss efficiency. Activate your Premium weight loss app and lose weight 4x faster!' },
                  { title: 'Home workouts', badge: 'NEW', desc: 'Home workouts are not currently available. Without workouts, it will be much harder to lose weight (up to 50% less). Keep the home workout up!' },
                  { title: 'Your Shopping list', desc: 'Save time and money by using shopping list to plan your meals for a week ahead.' },
                  { title: 'Personal Nutritionist Chat', desc: 'Your Personal Nutritionist Chat is not activated. As a result, you might have unanswered questions and struggle to be more efficient in your weight loss journey.' },
                  { title: 'Your Geasons', badge: 'NEW', desc: "You're one step away from your own personalized weight loss plan is our faith: tailored to decrease your longevity, focus, sleep and overall health." }
                ].map((section, i) => (
                  <div key={i} className="border-t border-gray-200 pt-4">
                    <div className="flex items-center gap-1.5 mb-2">
                      <h3 className="font-semibold text-gray-900" style={{ fontSize: '15px' }}>{section.title}</h3>
                      {section.icon && <section.icon size={16} className="text-yellow-500" />}
                      {section.badge && (
                        <span className="px-1.5 py-0.5 text-white rounded-full font-bold uppercase" style={{ backgroundColor: '#4db8b8', fontSize: '9px' }}>
                          {section.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-3" style={{ fontSize: '12px', lineHeight: '1.5' }}>{section.desc}</p>
                    <button 
                      className="w-full text-white rounded font-medium"
                      style={{
                        padding: '9px',
                        backgroundColor: '#4db8b8',
                        fontSize: '11px',
                        letterSpacing: '0.5px'
                      }}
                    >
                      LEARN MORE
                    </button>
                  </div>
                ))}

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-900 mb-3" style={{ fontSize: '15px' }}>Weight loss account</h3>
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded">
                      <Mail size={18} className="text-gray-600 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-gray-500 uppercase font-medium" style={{ fontSize: '10px' }}>EMAIL</div>
                        <div className="text-gray-900" style={{ fontSize: '12px' }}>hugobsouzas@gmail.com</div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="w-full text-white rounded font-medium mb-2"
                    style={{
                      padding: '9px',
                      backgroundColor: '#4db8b8',
                      fontSize: '11px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    EDIT
                  </button>
                  
                  <button 
                    className="w-full rounded font-medium mb-4"
                    style={{
                      padding: '9px',
                      backgroundColor: '#e5e7eb',
                      color: '#374151',
                      fontSize: '11px',
                      letterSpacing: '0.5px'
                    }}
                  >
                    LOGOUT
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <select 
                    className="w-full px-3 py-2.5 border-2 border-gray-300 rounded text-gray-700 bg-white"
                    style={{ fontSize: '13px' }}
                  >
                    <option>🇬🇧 English</option>
                    <option>🇪🇸 Español</option>
                    <option>🇫🇷 Français</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-4 pb-2">
                  <div className="space-y-2 text-center">
                    {['SUPPORT', 'TERMS OF SERVICE AND POLICIES', 'SERVICE SUBSCRIPTION RULES'].map((text, i) => (
                      <button 
                        key={i}
                        className="w-full py-1.5 font-medium uppercase"
                        style={{
                          color: '#3b8686',
                          fontSize: '11px',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionApp;