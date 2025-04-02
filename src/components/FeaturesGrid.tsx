"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";

const FeaturesGrid = memo(() => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [prevActiveSlide, setPrevActiveSlide] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef<number | null>(null);
  const autoplayTimerRef = useRef<number>(0);

  // Main features that will be shown
  const features = useMemo(
    () => [
      {
        id: 0,
        image: "/images/Flight.gif",
        title: "Live Updates, Smart Suggestions",
        subtitle: "All In Your Pocket",
        link: "/join-the-club",
      },
      {
        id: 1,
        image: "/images/Wine.gif",
        title: "Blend In Like A Local",
        subtitle: "Roamyo's Got The Cultural Cheat Sheet",
        link: "/join-the-club",
      },
      {
        id: 2,
        image: "/images/Shareit.Gif",
        title: "Share It With Your Friends",
        subtitle: "Because Trips Are More Fun When Everyone's In On The Plan.",
        link: "/join-the-club",
      },
      {
        id: 3,
        image: "/images/Rain.gif",
        title: 'Forget The "Oops, I Forgot" Moments',
        subtitle: "Roamyo's List Has It All. Pack Like A Pro",
        link: "/join-the-club",
      },
    ],
    []
  );

  // Track previous active slide to determine animation direction
  useEffect(() => {
    setPrevActiveSlide(activeSlide);
  }, []);

  // Setup autoplay functionality using requestAnimationFrame instead of setInterval
  // useEffect(() => {
  //   if (isAnimating || isPaused) return;

  //   const animate = (timestamp: number) => {
  //     if (!autoplayTimerRef.current) {
  //       autoplayTimerRef.current = timestamp;
  //     }

  //     const elapsed = timestamp - autoplayTimerRef.current;

  //     if (elapsed >= 3000) {
  //       // 3 seconds
  //       if (!isPaused && !isAnimating) {
  //         goToSlide(activeSlide + 1);
  //       }
  //       autoplayTimerRef.current = timestamp;
  //     }

  //     autoplayIntervalRef.current = requestAnimationFrame(animate);
  //   };

  //   autoplayIntervalRef.current = requestAnimationFrame(animate);

  //   // Cleanup on component unmount
  //   return () => {
  //     if (autoplayIntervalRef.current) {
  //       cancelAnimationFrame(autoplayIntervalRef.current);
  //       autoplayIntervalRef.current = null;
  //     }
  //   };
  // }, [activeSlide, isPaused, isAnimating]);

  const pauseAutoplay = useCallback(() => setIsPaused(true), []);
  const resumeAutoplay = useCallback(() => setIsPaused(false), []);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating || index === activeSlide) return;

      setIsAnimating(true);
      setPrevActiveSlide(activeSlide);

      // Determine direction of animation
      setDirection(index > activeSlide ? 1 : -1);

      // Handle circular navigation
      const totalSlides = features.length;
      let targetIndex = index;

      // Ensure circular rotation
      if (targetIndex >= totalSlides) {
        targetIndex = 0;
        setDirection(1);
      } else if (targetIndex < 0) {
        targetIndex = totalSlides - 1;
        setDirection(-1);
      }
      // Special case for jumping from last to first or first to last
      else if (activeSlide === totalSlides - 1 && targetIndex === 0) {
        setDirection(1);
      } else if (activeSlide === 0 && targetIndex === totalSlides - 1) {
        setDirection(-1);
      }

      setActiveSlide(targetIndex);

      // Release animation lock after transition
      setTimeout(() => {
        setIsAnimating(false);
      }, 600);
    },
    [activeSlide, isAnimating, features.length]
  );

  // Get visible cards based on active slide - memoized
  const visibleCardIndexes = useMemo(() => {
    const totalCards = features.length;

    // Show active card and one on each side for both mobile and desktop
    let leftIndex = (activeSlide - 1 + totalCards) % totalCards;
    let rightIndex = (activeSlide + 1) % totalCards;
    return [leftIndex, activeSlide, rightIndex];
  }, [activeSlide, features.length]);

  // Add a window resize effect to update visibleCardIndexes when screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Force a re-render when screen size changes
      setPrevActiveSlide(activeSlide);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSlide]);

  // Get animation class based on position and direction - memoized
  const getAnimationClass = useCallback(
    (position: number) => {
      if (isAnimating) {
        // On desktop and mobile, we have three slides
        if (direction > 0) {
          // Moving right
          if (position === 0) return "animate-slide-in-left";
          if (position === 1) return "animate-slide-from-right";
          if (position === 2) return "animate-slide-out-right";
        } else {
          // Moving left
          if (position === 0) return "animate-slide-out-left";
          if (position === 1) return "animate-slide-from-left";
          if (position === 2) return "animate-slide-in-right";
        }
      }
      return "";
    },
    [isAnimating, direction]
  );

  // Memoize the dot indicators to prevent unnecessary rerenders
  const dotIndicators = useMemo(
    () => (
      <div className="flex items-center space-x-4 bg-[#FDCCC0] border-[1px] border-[#ed562c92] py-3 px-6 rounded-full overflow-x-hidden">
        {features.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === activeSlide
                ? "bg-[#FF4D00] w-8 h-2"
                : "bg-white w-2 h-2"
            }`}
            aria-label={`Go to feature ${index + 1}`}
            disabled={isAnimating}
          />
        ))}
      </div>
    ),
    [activeSlide, isAnimating, goToSlide, features]
  );

  // Memoize the visible cards to prevent unnecessary rerenders
  const visibleCards = useMemo(
    () =>
      visibleCardIndexes.map((index, position) => {
        const feature = features[index];
        const isActive = index === activeSlide;
        const animationClass = getAnimationClass(position);

        return (
          <div
            key={`${feature.id}-${position}`}
            className={`transition-all duration-500 ease-out featuresGrid-card ${
              isActive
                ? "z-10 scale-105 shadow-lg rounded-xl"
                : "scale-95 opacity-95"
            } ${animationClass}`}
            style={{
              width: position === 1 ? "400px" : "400px",
              transformOrigin: "center center",
              // On mobile, show just a glimpse of adjacent cards
              ...(typeof window !== "undefined" &&
                window.innerWidth < 768 &&
                !isActive && {
                  maxWidth: "60px",
                  overflow: "hidden",
                }),
            }}
          >
            <div
              className={`bg-white rounded-2xl shadow-sm h-full flex flex-col featuresGrid-card ${
                isActive ? "border-[1px] border-[#ed562c]" : ""
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="p-8 flex flex-col h-full">
                <div className="flex-1 flex items-center justify-center featuresGrid-card">
                  <div className="relative w-[100%] h-full overflow-x-hidden">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="text-center cntr-card">
                  <h3 className="crd-ttl">{feature.title}</h3>
                  <p className="crd-desc">{feature.subtitle}</p>

                  <Link
                    href={feature.link}
                    className="flex w-full justify-start items-start text-[#FF4D00] joinClub"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Join The Club
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center ml-1">
                      <svg
                        width="8"
                        height="8"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.69298 0.345972C8.8678 0.346775 9.03523 0.416577 9.15885 0.540194C9.28246 0.66381 9.35226 0.831239 9.35307 1.00606L9.35307 7.23328C9.3562 7.32192 9.34144 7.41029 9.30968 7.4931C9.27791 7.57592 9.22979 7.65149 9.16819 7.71531C9.10659 7.77912 9.03276 7.82988 8.95112 7.86454C8.86947 7.89921 8.78168 7.91707 8.69298 7.91707C8.60428 7.91707 8.51649 7.89921 8.43485 7.86454C8.3532 7.82988 8.27938 7.77913 8.21777 7.71531C8.15617 7.65149 8.10805 7.57592 8.07629 7.4931C8.04452 7.41029 8.02977 7.32192 8.0329 7.23328L8.0329 2.60023L1.68736 8.94576C1.56349 9.06963 1.39549 9.13922 1.22032 9.13922C1.04514 9.13922 0.877143 9.06963 0.753276 8.94576C0.629409 8.8219 0.559821 8.6539 0.559821 8.47872C0.559821 8.30355 0.629409 8.13555 0.753276 8.01168L7.09881 1.66614L2.46576 1.66614C2.29473 1.66011 2.13271 1.58792 2.01385 1.46479C1.89499 1.34166 1.82856 1.1772 1.82857 1.00606C1.82856 0.834917 1.89499 0.670457 2.01385 0.547327C2.13271 0.424196 2.29473 0.352009 2.46576 0.345972L8.69298 0.345972Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      }),
    [visibleCardIndexes, activeSlide, getAnimationClass, goToSlide, features]
  );

  // Memoize the entire component rendering to prevent unnecessary rerenders
  return useMemo(
    () => (
      <div className="bg-[#F7F8FC] pb-6 font-gilroy relative overflow-x-hidden overflow-y-visible featuresGrid-container">
        {/* Vertical line for center alignment reference */}

        <div className="max-w-7xl mx-auto md:px-8 px-0 featuresGrid-container">
          <h2 className="grid-head">Roamyo Makes It Stupid <br className="sm:hidden block" /> Easy!</h2>

          <div
            className="relative sm:mb-10 mb-2 featuresGrid-container"
            onMouseEnter={pauseAutoplay}
            onMouseLeave={resumeAutoplay}
            onTouchStart={pauseAutoplay}
            onTouchEnd={resumeAutoplay}
          >
            {/* Card Container */}
            <div className="flex justify-between items-stretch md:justify-center md:gap-6 mx-auto relative h-auto min-h-[450px] md:py-8 py-0 main-container featuresGrid-container">
              {/* For desktop view - centered with equal gaps */}
              <div className="hidden md:flex justify-center items-stretch gap-6 w-full">
                {visibleCards}
              </div>

              {/* For mobile view - edges of screen layout */}
              <div className="flex md:hidden w-full justify-between items-center">
                {/* Left card glimpse */}
                <div className="w-[20%]">
                  {visibleCardIndexes[0] !== undefined && (
                    <div
                      className="bg-white rounded-r-2xl shadow-sm opacity-90 scale-95 cursor-pointer border-r border-[#f0f0f0]"
                      onClick={() => goToSlide(visibleCardIndexes[0])}
                    >
                      <div className="p-2 pr-4 flex flex-col">
                        <div className="flex items-center justify-center">
                          <div className="relative w-full h-[120px]">
                            <Image
                              src={features[visibleCardIndexes[0]].image}
                              alt={features[visibleCardIndexes[0]].title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="text-center pt-2">
                          <h3 className="font-bold text-xs text-[#13263E] truncate">
                            {features[visibleCardIndexes[0]].title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Active card in center */}
                <div className="w-[54%] mx-3 z-10 scale-105 shadow-lg rounded-xl">
                  <div
                    className="bg-white rounded-2xl shadow-sm h-full flex flex-col border-[1px] border-[#ed562c]"
                    onClick={() => goToSlide(activeSlide)}
                  >
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex-1 flex items-center justify-center">
                        <div className="relative md:w-[80%] md:h-full w-[100px] h-[70px] overflow-x-hidden">
                          <Image
                            src={features[activeSlide].image}
                            alt={features[activeSlide].title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>

                      <div className="text-center pt-4">
                        <h3 className="font-bold text-lg text-[#13263E] mb-1">
                          {features[activeSlide].title}
                        </h3>
                        <p className="text-[#13263E] text-xs mb-3">
                          {features[activeSlide].subtitle}
                        </p>

                        <Link
                          href={features[activeSlide].link}
                          className="inline-flex items-center text-[#FF4D00] font-semibold text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Join The Club
                          <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center ml-1">
                            <svg
                              width="8"
                              height="8"
                              viewBox="0 0 10 10"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M8.69298 0.345972C8.8678 0.346775 9.03523 0.416577 9.15885 0.540194C9.28246 0.66381 9.35226 0.831239 9.35307 1.00606L9.35307 7.23328C9.3562 7.32192 9.34144 7.41029 9.30968 7.4931C9.27791 7.57592 9.22979 7.65149 9.16819 7.71531C9.10659 7.77912 9.03276 7.82988 8.95112 7.86454C8.86947 7.89921 8.78168 7.91707 8.69298 7.91707C8.60428 7.91707 8.51649 7.89921 8.43485 7.86454C8.3532 7.82988 8.27938 7.77913 8.21777 7.71531C8.15617 7.65149 8.10805 7.57592 8.07629 7.4931C8.04452 7.41029 8.02977 7.32192 8.0329 7.23328L8.0329 2.60023L1.68736 8.94576C1.56349 9.06963 1.39549 9.13922 1.22032 9.13922C1.04514 9.13922 0.877143 9.06963 0.753276 8.94576C0.629409 8.8219 0.559821 8.6539 0.559821 8.47872C0.559821 8.30355 0.629409 8.13555 0.753276 8.01168L7.09881 1.66614L2.46576 1.66614C2.29473 1.66011 2.13271 1.58792 2.01385 1.46479C1.89499 1.34166 1.82856 1.1772 1.82857 1.00606C1.82856 0.834917 1.89499 0.670457 2.01385 0.547327C2.13271 0.424196 2.29473 0.352009 2.46576 0.345972L8.69298 0.345972Z"
                                fill="black"
                              />
                            </svg>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right card glimpse */}
                <div className="w-[20%]">
                  {visibleCardIndexes[2] !== undefined && (
                    <div
                      className="bg-white rounded-l-2xl shadow-sm opacity-90 scale-95 cursor-pointer border-l border-[#f0f0f0]"
                      onClick={() => goToSlide(visibleCardIndexes[2])}
                    >
                      <div className="p-2 pl-4 flex flex-col">
                        <div className="flex items-center justify-center">
                          <div className="relative w-full h-[120px]">
                            <Image
                              src={features[visibleCardIndexes[2]].image}
                              alt={features[visibleCardIndexes[2]].title}
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="text-center pt-2">
                          <h3 className="font-bold text-xs text-[#13263E] truncate">
                            {features[visibleCardIndexes[2]].title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center mt-0 md:mt-10 overflow-x-hidden">
              {dotIndicators}
            </div>
          </div>
        </div>

        {/* Custom Animation Styles */}
        <style jsx global>{`
          @keyframes slideInLeft {
            from {
              transform: translateX(-100%) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translateX(0) scale(0.95);
              opacity: 0.95;
            }
          }

          @keyframes slideInRight {
            from {
              transform: translateX(100%) scale(0.95);
              opacity: 0;
            }
            to {
              transform: translateX(0) scale(0.95);
              opacity: 0.95;
            }
          }

          @keyframes slideOutLeft {
            from {
              transform: translateX(0) scale(0.95);
              opacity: 0.95;
            }
            to {
              transform: translateX(-100%) scale(0.95);
              opacity: 0;
            }
          }

          @keyframes slideOutRight {
            from {
              transform: translateX(0) scale(0.95);
              opacity: 0.95;
            }
            to {
              transform: translateX(100%) scale(0.95);
              opacity: 0;
            }
          }

          @keyframes slideFromLeft {
            from {
              transform: translateX(-30%) scale(0.95);
              opacity: 0.95;
            }
            to {
              transform: translateX(0) scale(1.05);
              opacity: 1;
            }
          }

          @keyframes slideFromRight {
            from {
              transform: translateX(30%) scale(0.95);
              opacity: 0.95;
            }
            to {
              transform: translateX(0) scale(1.05);
              opacity: 1;
            }
          }

          .animate-slide-in-left {
            animation: slideInLeft 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }

          .animate-slide-in-right {
            animation: slideInRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }

          .animate-slide-out-left {
            animation: slideOutLeft 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }

          .animate-slide-out-right {
            animation: slideOutRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }

          .animate-slide-from-left {
            animation: slideFromLeft 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }

          .animate-slide-from-right {
            animation: slideFromRight 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
            will-change: transform, opacity;
          }
        `}</style>
      </div>
    ),
    [visibleCards, dotIndicators, pauseAutoplay, resumeAutoplay]
  );
});

// Add display name for debugging
FeaturesGrid.displayName = "FeaturesGrid";

export default FeaturesGrid;
