"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const FeatureSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = 6;

  const goToSlide = useCallback(
    (index: number) => {
      if (animating || index === activeSlide) return;
      pauseAutoPlay();
      setAnimating(true);
      const normalizedIndex = index % totalSlides;
      setActiveSlide(normalizedIndex);
      setTimeout(() => {
        setAnimating(false);
        resumeAutoPlay();
      }, 500);
    },
    [animating, activeSlide, totalSlides]
  );

  const getNextSlide = useCallback(
    (current: number) => {
      return (current + 1) % totalSlides;
    },
    [totalSlides]
  );

  const goToNextSlide = useCallback(() => {
    const nextIndex = getNextSlide(activeSlide);
    goToSlide(nextIndex);
  }, [getNextSlide, activeSlide, goToSlide]);

  const pauseAutoPlay = useCallback(() => {
    setAutoPlay(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const resumeAutoPlay = useCallback(() => {
    setAutoPlay(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    // Calculate position only when needed
    const updateSliderPosition = () => {
      const windowWidth = window.innerWidth;
      const slideWidth =
        windowWidth > 1300
          ? 1100
          : windowWidth > 1200
          ? 800
          : windowWidth > 1000
          ? 850
          : windowWidth > 768
          ? 600
          : windowWidth > 480
          ? 400
          : windowWidth > 300
          ? 270
          : 250;
      setSliderPosition(-activeSlide * slideWidth);
    };

    // Initial calculation
    updateSliderPosition();

    // Add resize listener
    const handleResize = () => {
      updateSliderPosition();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSlide]);

  // useEffect(() => {
  //   // Only set up autoplay when autoPlay is true and we're not already animating
  //   if (!autoPlay || animating) return;

  //   const timer = setInterval(() => {
  //     goToNextSlide();
  //   }, 3000);

  //   autoPlayRef.current = timer;

  //   // Cleanup
  //   return () => {
  //     if (timer) {
  //       clearInterval(timer);
  //       autoPlayRef.current = null;
  //     }
  //   };
  // }, [autoPlay, animating, goToNextSlide]);

  const handleMouseEnter = useCallback(() => pauseAutoPlay(), [pauseAutoPlay]);
  const handleMouseLeave = useCallback(
    () => resumeAutoPlay(),
    [resumeAutoPlay]
  );

  const getSlideStyle = useCallback(
    (index: number) => {
      const isActive = index === activeSlide;
      const isPrevious =
        index === activeSlide - 1 ||
        (activeSlide === 0 && index === totalSlides - 1);
      const isNext =
        index === activeSlide + 1 ||
        (activeSlide === totalSlides - 1 && index === 0);

      let baseClasses =
        "slide bg-white rounded-2xl shadow-sm transition-all duration-500 ease-in-out ";

      if (isActive) {
        return `${baseClasses} opacity-100 scale-100 z-20 min-w-[calc(100%-150px)] md:min-w-[calc(100%-250px)]`;
      } else if (isPrevious) {
        return `${baseClasses} opacity-90 scale-95 z-10 translate-x-[-5%] min-w-[calc(100%-300px)] md:min-w-[calc(100%-700px)]`;
      } else if (isNext) {
        return `${baseClasses} opacity-90 scale-95 z-10 translate-x-[5%] min-w-[calc(100%-300px)] md:min-w-[calc(100%-700px)]`;
      } else {
        return `${baseClasses} opacity-0 scale-90 z-0 min-w-[calc(100%-300px)] md:min-w-[calc(100%-700px)]`;
      }
    },
    [activeSlide, totalSlides]
  );

  // Memoize pagination buttons to prevent rerenders
  const paginationButtons = useMemo(() => {
    return Array.from({ length: totalSlides }).map((_, index) => (
      <button
        key={index}
        onClick={() => goToSlide(index)}
        className={`rounded-full transition-all duration-300 ${
          index === activeSlide
            ? "bg-[#ED552C] md:w-8 md:h-3 w-4 h-2"
            : "bg-[#FFFFFF] md:w-3 md:h-3 w-2 h-2"
        }`}
        disabled={animating}
        aria-label={`Go to slide ${index + 1}`}
      />
    ));
  }, [activeSlide, animating, goToSlide, totalSlides]);

  return (
    <div className="bg-[#F6F7FF] section-4 overflow-hidden relative">
      <div className="max-w-full mx-auto">
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={containerRef}
            className="flex transition-transform duration-500 ease-in-out overflow-visible"
            style={{ transform: `translateX(${sliderPosition}px)` }}
          >
            {/* Slide 1 - Chat with Roamyo */}
            <div
              className={`slide ${
                activeSlide === 0 ? "active-slide" : ""
              } w-[320px] min-w-[320px] md:w-[500px] md:min-w-[500px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 lg:ml-40 md:ml-20 ml-20 sliderSlides`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 items-center h-full">
                <div className="lg:py-24 py-0 px-8 flex justify-center padSlide">
                  <div className="relative lg:w-[400px] lg:h-[360px] md:w-[250px] md:h-[200px] w-[200px] h-[100px]">
                    <Image
                      src="/images/Laptop.gif"
                      alt="Chat with Roamyo"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-[350px] flex flex-col justify-center ml-20 crnt-slide">
                  <h3 className="slide-heading text-[#13263E]">
                    Chat With Roamyo And Plan Your Trip In Minutes &nbsp;
                    <span className="slide-span">(Seriously!)</span>
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline"
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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

            {/* Slide 2 - Day by Day Plans */}
            <div
              className={`slide ${
                activeSlide === 1 ? "active-slide" : ""
              } w-[320px] min-w-[320px] md:w-[600px] md:min-w-[600px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 sliderSlides`}
            >
              <div className="flex sm:flex-row flex-col w-full justify-center items-center h-full sld2">
                <div className="py-24 xl:px-8 md:px-4 flex justify-center pdng-rdc">
                  <div className="relative lg:w-[500px] lg:h-[420px] md:w-[300px] md:h-[150px] w-[200px] h-[80px] scale-140 md:scale-100 slide-img-2">
                    <Image
                      src="/images/reporter.gif"
                      alt="Day by Day Plans"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-[400px] flex flex-col justify-center cntnt-1">
                  <h3 className="slide-heading text-[#13263E]">
                    Get day-by-day plans tailored to you — budget, style, vibe,
                    all covered.
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline"
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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

            {/* Slide 3 - Save Hours of Research */}
            <div
              className={`slide ${
                activeSlide === 2 ? "active-slide" : "not-active-slide"
              } w-[320px] min-w-[320px] md:w-[500px] md:min-w-[500px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 sliderSlides`}
            >
              <div className="flex sm:flex-row flex-col w-full justify-center items-center h-full sld3">
                <div className="py-24 xl:px-8 md:px-4 flex justify-center pdng-rdc">
                  <div className="relative lg:w-[500px] lg:h-[420px] md:w-[200px] md:h-[150px] w-[150px] h-[100px] slide-img-3">
                    <Image
                      src="/images/reporter.gif"
                      alt="Save Hours of Research"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-[400px] flex flex-col justify-center cntnt-1">
                  <h3 className="slide-heading text-[#13263E]">
                    Save hours of research Roamyo's got the deets!
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline   "
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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

            {/* Slide 4 - Local Insights */}
            <div
              className={`slide ${
                activeSlide === 3 ? "active-slide" : ""
              } w-[320px] min-w-[320px] md:w-[500px] md:min-w-[500px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 sliderSlides`}
            >
              <div className="flex sm:flex-row flex-col w-full justify-start items-center h-full">
                <div className="sm:py-24 py-6 xl:px-8 md:px-4 flex justify-center relative">
                  <div className="relative lg:w-[750px] lg:h-[620px] md:w-[350px] md:h-[250px] w-[200px] h-[100px] slide-img-4">
                    <Image
                      src="/images/hiking.gif"
                      alt="Local Insights"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="w-[300px] flex flex-col items-start sm:absolute sld4 supportClass md:w-[360px]">
                  <h3 className="slide-heading text-[#13263E]">
                    Find hidden gems and cool local spots without the FOMO.
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline"
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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

            {/* Slide 5 - 24/7 Support */}
            <div
              className={`slide ${
                activeSlide === 4 ? "active-slide" : ""
              } w-[320px] min-w-[320px] md:w-[500px] md:min-w-[500px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 sliderSlides`}
            >
              <div className="flex sm:flex-row flex-col w-full justify-start items-center h-full">
                <div className="sm:py-24 py-6 xl:px-8 md:px-4 flex justify-center relative">
                  <div className="relative lg:w-[750px] lg:h-[620px] md:w-[350px] md:h-[250px] w-[200px] h-[100px] slide-img-4">
                    <Image
                      src="/images/hiking.gif"
                      alt="24/7 Support"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col items-start sm:absolute supportClass newSupport md:w-[400px]">
                  <h3 className="slide-heading text-[#13263E]">
                    Tweak and adjust on the go - Roamyo’s chill like that.
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline"
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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
            {/* Slide 6 - Save Hours of Research */}
            <div
              className={`slide ${
                activeSlide === 5 ? "active-slide" : "not-active-slide"
              } w-[320px] min-w-[320px] md:w-[500px] md:min-w-[500px] xl:w-[1100px] xl:min-w-[1100px] bg-white rounded-xl shadow-md mx-2 md:mx-4 sliderSlides`}
            >
              <div className="flex sm:flex-row flex-col w-full justify-center items-center h-full sld6">
                <div className="py-24 xl:px-8 md:px-4 flex justify-center pdng-rdc">
                  <div className="relative lg:w-[450px] lg:h-[420px] md:w-[220px] md:h-[150px] w-[150px] h-[100px] slide-img-6">
                    <Image
                      src="/images/Suitcase.gif"
                      alt="Save Hours of Research"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className=" flex flex-col items-start w-[400px] sm:ml-10 ml:0 cntnt-6">
                  <h3 className="slide-heading text-[#13263E]">
                    Packing lists? Live updates? Cultural tips? Done and done!
                  </h3>
                  <Link
                    href="/join"
                    className="group-2 flex items-center gap-1 underline"
                  >
                    Become An Alpha Roamer, Now
                    <div className="h-[20px] w-[20px] border-[1px] border-[#ED552C] rounded-full flex justify-center items-center">
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

          {/* Pagination Dots */}
          <div className="flex justify-center md:py-6 py-4 relative">
            <div className="flex space-x-4 bg-[#FDCCC0] border-[1px] border-[#ed562c92] md:py-4 md:px-6 py-2 px-4 rounded-full slideDots">
              {paginationButtons}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .slide {
          transition: all 0.5s ease-in-out;
          position: relative;
        }

        .active-slide {
          z-index: 20;
        }

        .slide:not(.active-slide) {
          opacity: 0.85;
        }

        @media (max-width: 768px) {
          .grid.grid-cols-2 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default FeatureSlider;
