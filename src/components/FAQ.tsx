"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FAQ = () => {
  const [activeTab, setActiveTab] = useState(0); // Start with first question
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState('next'); // 'next' or 'prev' for animation direction
  
  // Handle tab change with animation
  const handleTabChange = (index: number) => {
    if (index === activeTab || animating) return;
    
    // Determine direction for animation
    setDirection(index > activeTab ? 'next' : 'prev');
    setAnimating(true);
    
    setTimeout(() => {
      setActiveTab(index);
      setTimeout(() => {
        setAnimating(false);
      }, 300);
    }, 300);
  };
  
  const faqItems = [
    {
      id: 1,
      title: "What is Roamyo and how does it work?",
      content: (
        <>
          <p className="mb-3">Roamyo is your go-to trip planning sidekick — handling everything from "where should I go?" to "what's for dinner?" 🏝️✈️</p>
          <p className="mb-3">Start from scratch or dive straight into the details — Roamyo helps you explore destinations, create tailored day-by-day itineraries, and adjusts everything to fit your budget. 💸</p>
          <p className="mb-3">But wait, there's more! Roamyo's got your back even when you hit the road — packing checklists, visa and entry requirements, insider tips, and notes for every activity so you're always prepared (and never stressed).
          </p>
          <p>And the best part? It all works like a charm on both mobile and desktop websites — no downloads, no drama, just seamless planning magic.
          </p>
        </>
      )
    },
    {
      id: 2,
      title: "Is Roamyo.ai free to use?", 
      content: (
        <>
          <p className="mb-3">Lucky you! The first 200 subscribers get all of Roamyo free for 6 months! 🎉 After that, we'll have a freemium model — so you can still access most of Roamyo's magic for free (with a sprinkle of ads to keep our lights on).</p>
          <p className="mb-3">Want to unlock Roamyo in beast mode? 💪 You can choose to pay per trip or snag a monthly or annual subscription for the full VIP experience — no ads, no limits, just smooth sailing. 🌍✨</p>
        </>
      )
    },
    {
      id: 3,
      title: "Do I need to download an app, or can I use it in my browser?",
      content: (
        <>
          <p className="mb-3">No downloads, no hassle — Roamyo works like a charm right from your browser on both mobile and desktop. 🌍✨ Just open, chat, plan, and go — easy as that. 😎
          </p>
        </>
      )
    },
    {
      id: 4,
      title: "How is Roamyo different from other trip planning tools?",
      content: (
        <>
          <p className="mb-3">First off — it's way more affordable than other AI trip planners. But that's just the beginning. 😉</p>
          <p className="mb-3">Roamyo doesn't just hand you a trip plan and wish you luck — it's with you every step of the way. ✅ Packing lists? Check. ✅ Visa requirements and formality checklists? Sorted. ✅ Daily tips and on-the-go updates? You got it.
          </p>
          <p>We're constantly expanding our destination coverage to include more detailed information about emerging travel spots and hidden gems around the globe.</p>
          <p>Worried about going over budget? Roamyo's got your back. It predicts as many expenses as possible upfront, so you're not hit with any nasty surprises. 💸</p>
          <p>But here's where Roamyo really shines; Roamyo isn't just about places: it's about YOU!. We've tried to learn the ins and outs of different travel styles and hobbies - whether it's scuba diving, snowboarding, sky diving, hiking, or just chilling by the beach - and serve up tailored recommendations for the best spots, activities and experiences based on your vibe. 🌍</p>
        </>
      )
    },
    {
      id: 5,
      title: "Can Roamyo handle last minute travel plans and changes?",
      content: (
        <>
          <p className="mb-3">You bet! You can tweak your trip plan right up to the last minute — even while you're on the trip. 🌍✨
          </p>
          <p className="mb-3">Of course, if you've already made bookings, any cancellations or rescheduling will depend on the platform's policies — but the itinerary itself? Totally flexible. Want to swap sightseeing for a beach day or switch dinner spots? No problem.
          </p>
          <p>And if you need help mid-trip, just chat with Roamyo. Got a last-minute craving for pizza or need a new activity? Roamyo's got you covered. 😎</p>
        </>
      )
    },
    {
      id: 6,
      title: "What kind of trips can Roamyo plan?",
      content: (
        <>
          <p className="mb-3">Pretty much anything! Solo escape? Group trip with the squad? Family vacation? Honeymoon? Wild adventure? Budget backpacking or luxury blowout? ✅Check, ✅Check and ✅Check! You name it — Roamyo's on it.
          </p>
          <p className="mb-3">Whether you're flying solo or rolling deep with a crew, Roamyo will craft the perfect plan. Just tell us the vibe — Roamyo will handle the rest. 😎
          </p>
        </>
      )
    },
    {
      id: 7,
      title: "What are the benefits of early access?",
      content: (
        <>
          <p className="mb-3">First off — the first 200 subscribers get all of Roamyo's features totally free for the first 6 months! 🎉</p>
          <p className="mb-3">But that's not all — you'll also get a weekly insider newsletter packed with hidden travel gems, packing hacks, trip-planning tips, and even a heads-up on festivals worth traveling for. 🌍</p>
          <p className="mb-3">You'll also have the chance to join our user research squad — get sneak peeks of upcoming features and share your unfiltered thoughts to help us make Roamyo even better. 😎</p>
          <p className="mb-3">And here's the kicker — you can join our affiliate program and earn a cut from every successful referral you make. ✨ Free trip plans, anyone?
          </p>
          <p className="mb-3">Sounds good? <Link href="/join" className="lst-Que">Join the Alpha Roamers now! 🚀
          </Link></p>
        </>
      )
    }
  ];

  // Calculate which questions go on which side based on active tab
  const calculateQuestionSides = () => {
    const leftQuestions = [];
    const rightQuestions = [];
    
    for (let i = 0; i < faqItems.length; i++) {
      // Current question and questions before go to the left
      if (i <= activeTab) {
        leftQuestions.push(i);
      } 
      // Questions after the current one go to the right
      else {
        rightQuestions.push(i);
      }
    }
    
    return { leftQuestions, rightQuestions };
  };
  
  // Use useMemo to prevent recalculation on every render
  const { leftQuestions, rightQuestions } = useMemo(() => {
    return calculateQuestionSides();
  }, [activeTab]); // Only recalculate when activeTab changes
  
  // Determine layout based on which tab is active
  const hasRightQuestions = rightQuestions.length > 0;
  const showLeftPanel = activeTab > 0; // Only show left panel if we're not on the first question

  // Get animation style based on state
  const getAnimationStyle = () => {
    if (!animating) return {};
    
    return {
      transform: direction === 'next' ? 'translateX(-100%)' : 'translateX(100%)',
      opacity: 0,
      transition: 'transform 300ms ease-in-out, opacity 300ms ease-in-out'
    };
  };

  return (
    <div className="bg-[#F6F7FF] py-16 md:py-56">
      <div className="faq-main-container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="faq-head">
          Lost? We've Got Answers!
        </h2>
        
        {/* FAQ Container */}
        <div className="bg-white rounded-xl overflow-hidden shadow-lg border-[#8EBAE3] border-[1px]">
          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col">
            {/* Content Section for Mobile */}
            <div className="w-full p-6 bg-white relative min-h-[400px] overflow-hidden">
              <div className="text-7xl font-extrabold text-[#13263E1A] mb-6">
                {activeTab + 1 < 10 ? `0${activeTab + 1}` : activeTab + 1}
              </div>
              
              <div style={getAnimationStyle()}>
                <h3 className="text-xl font-bold text-[#13263E] mb-4 max-w-[85%]">
                  {faqItems[activeTab].title}
                </h3>
                
                <div className="text-[#445C7B] text-sm space-y-3 max-w-[90%]">
                  {faqItems[activeTab].content}
                </div>
              </div>
              
              {/* Mascot image */}
              <div className="absolute top-4 right-0 w-20 h-20">
                <Image 
                  src="/images/faq-img.png" 
                  alt="Roamyo Mascot" 
                  width={130} 
                  height={130}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* All Questions at Bottom - Vertical */}
            <div className="w-full bg-[#A7CAED]">
              <div className="flex flex-col">
                {faqItems.map((item, index) => (
                  <div 
                    key={item.id}
                    className={`relative border-b border-[#8EBAE3] cursor-pointer overflow-hidden text-white hover:bg-[#88B5E1]/70 p-4 ${index === activeTab ? 'bg-[#88B5E1]' : ''}`}
                    onClick={() => handleTabChange(index)}
                  >
                    <div className="flex items-center">
                      {/* Number */}
                      <div className="opacity-40 text-2xl font-bold text-white mr-4 min-w-[30px]">
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </div>
                      
                      {/* Diamond indicator after number */}
                      <div className="mr-3">
                        <div className="w-2 h-2 bg-white transform rotate-45 opacity-70"></div>
                      </div>
                      
                      {/* Question text */}
                      <div className="flex-1 text-sm font-medium">
                        {item.title}
                      </div>
                      
                      {/* Plus sign */}
                      <div className="ml-2">
                        <span className="text-xl font-light">{index === activeTab ? '-' : '+'}</span>
                      </div>
                    </div>
                    
                    {/* Remove vertical indicator since we have the diamond now */}
                    {index === activeTab && (
                      <div className="absolute left-0 top-0 w-1 h-full bg-white opacity-20"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Desktop Layout - Unchanged */}
          <div className="hidden md:flex md:flex-row">
            {/* Left Side - Blue Panel with Tabs (only if not on first question) */}
            {showLeftPanel && (
              <div className="w-full md:w-auto bg-[#A7CAED] relative">
                <div className="h-full min-h-[300px] md:min-h-[700px] lg:min-h-[800px]">
                  <div className="flex flex-row h-full">
                    {leftQuestions.slice(0, leftQuestions.length - 1).map((index) => (
                      <div 
                        key={faqItems[index].id}
                        className="relative border-r border-[#8EBAE3] cursor-pointer overflow-hidden text-white hover:bg-[#88B5E1]/70 lg:w-[75px] sm:w-[50px] faq-width-set"
                        onClick={() => handleTabChange(index)}
                      >
                        {/* Plus sign at top */}
                        <div className="w-full flex justify-center pt-5 pb-3">
                          <span className="text-2xl md:text-3xl font-light">+</span>
                        </div>
                        
                        {/* Faded number in background */}
                        <div className="absolute pointer-events-none right-faded-num2">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        
                        {/* Vertical text */}
                        <div className="absolute w-full bottom-0" style={{ height: '50%' }}>
                          <div 
                            className="transform -rotate-90 origin-bottom-left right-title whitespace-normal absolute"
                            style={{
                              width: '500px',
                              maxWidth: '500px',
                              left: '65px',
                              bottom: '50px',
                            }}
                          >
                            {faqItems[index].title}
                          </div>
                        </div>
                        
                        {/* Diamond indicator */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-white transform rotate-45 opacity-70"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {/* Middle - FAQ Content - Fixed width */}
            <div className="w-full md:flex-1 p-6 md:p-10 bg-white relative overflow-hidden">
              <div className="faded-num1 text-[#13263E1A] mb-6 md:mb-8">
                {activeTab + 1 < 10 ? `0${activeTab + 1}` : activeTab + 1}
              </div>
              
              <div style={getAnimationStyle()}>
                <h3 className="active-faq-head mb-4 md:mb-6 max-w-[90%] mt-16">
                  {faqItems[activeTab].title}
                </h3>
                
                <div className="active-faq-content space-y-3 md:space-y-4 max-w-[90%]">
                  {faqItems[activeTab].content}
                </div>
              </div>
              
              {/* Mascot image */}
              <div className="absolute top-4 right-0 md:top-6  w-20 h-20 md:w-32 md:h-32">
                <Image 
                  src="/images/faq-img.png" 
                  alt="Roamyo Mascot" 
                  width={130} 
                  height={130}
                  className="object-contain"
                />
              </div>
            </div>
            
            {/* Right Side - Blue Panel with Tabs (only if there are questions to display) */}
            {hasRightQuestions && (
              <div className={`w-full md:w-auto bg-[#A7CAED] relative`}>
                <div className="h-full min-h-[300px] md:min-h-[700px] lg:min-h-[800px]">
                  <div className="flex flex-row h-full">
                    {rightQuestions.map((index) => (
                      <div 
                        key={faqItems[index].id}
                        className="relative border-r border-[#8EBAE3] cursor-pointer overflow-hidden text-white hover:bg-[#88B5E1]/70 w-[75px] faq-width-set"
                        onClick={() => handleTabChange(index)}
                      >
                        {/* Plus sign at top */}
                        <div className="w-full flex justify-center pt-5 pb-3">
                          <span className="text-2xl md:text-3xl font-light">+</span>
                        </div>
                        
                        {/* Faded number in background */}
                        <div className="absolute pointer-events-none right-faded-num2">
                          {index + 1 < 10 ? `0${index + 1}` : index + 1}
                        </div>
                        
                        {/* Vertical text */}
                        <div className="absolute w-full bottom-0" style={{ height: '50%' }}>
                          <div 
                            className="transform -rotate-90 origin-bottom-left right-title whitespace-normal absolute"
                            style={{
                              width: '500px',
                              maxWidth: '500px',
                              left: '65px',
                              bottom: '50px',
                            }}
                          >
                            {faqItems[index].title}
                          </div>
                        </div>
                        
                        {/* Diamond indicator */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-white transform rotate-45 opacity-70"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ; 