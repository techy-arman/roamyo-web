'use client';

import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden md:top-5 top-0 fst-cntain">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/background.png"
          alt="Travel Background"
          fill
          className="md:object-cover"
          priority
        />
      </div>

      {/* Overlay Image */}
      <div className="absolute inset-0 w-full h-full ovrlyImg">
        <Image
          src="/images/background-cover.png"
          alt="Travel Overlay"
          fill
          className="md:object-cover object-contain"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex items-start justify-center sm:mt-32 mt-20">
        <div className="text-center fstColsHd">
          <h1 className="relative text-[#13263E] hero-header">
            <sup className="text-[#ED552C] hero-hash"><img src="/images/hash.png" alt="" className='xl:w-20 xl:h-20' /></sup>Your Perfect
            <br />
            <span className="hero-travel relative">Travel</span> <span className='ml-8'>Partner</span>
          </h1>
          <p className="text-[#13263E] hero-subheadr relative">
            Roam Freely, Explore Smartly
          </p>
          <Link 
            href="/join"
            className="inline-flex items-center bg-[#ED552C] text-white hover:bg-[#D64A27] relative transition-all duration-300 transform hover:scale-105 group alpha-roamers-btn newBtn"
          >
            Join the &nbsp;<span className="alpha-roamers-btn2"> Alpha Roamers</span>
            <span className='bg-[#13263E] md:w-14 w-6 h-full absolute hero-span-svg flex items-center justify-center'><svg 
              className="hero-svg rounded-md transform transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="#FAF6F4"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="1" 
                d="M1 23.2179L21.953 1.21729M21.953 1.21729H4.74948M21.953 1.21729V17.3511" 
              />
            </svg></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero; 