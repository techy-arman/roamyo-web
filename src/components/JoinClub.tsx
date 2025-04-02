"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const JoinClub = () => {
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const toggleOption = (optionId: number) => {
    if (selectedOptions.includes(optionId)) {
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
    } else {

      setSelectedOptions([...selectedOptions, optionId]);
    }
  };

  return (
    <div className="bg-[#0F1B2B] section-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-[#F7F8FC] section-7-head  ">
          Join the Club, Roam Like a Pro!
        </h2>
        <p className="section-7-para">
          Snag Early Access, Don't Miss Out!
        </p>

        {/* Option Pills */}
        
        <div className="flex gap-4 justify-center items-center mr-28">
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full  ">Weekly tips on cool places that cost less
          </p>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full   hidden lg:block">Be the first to explore Roamyo’s beta
          </p>
          <div className="rounded-full bg-[#2891FECC]   sm:h-[41px] sm:w-[65px] h-[35px] w-[50px]"></div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-4 sm:ml-28 ml-4">
          <div className="rounded-full bg-[#FFFFFFA6]   sm:h-[41px] sm:w-[65px] h-[35px] w-[50px]"></div>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full   hidden lg:block">6 months free membership? Yes, please.
          </p>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full  ">Test it out, tell us what you love (or hate 👀)

          </p>
        </div>
        <div className="flex gap-4 justify-center items-center mr-8 lg:hidden mt-4 lg:hover:">
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full">Weekly tips on cool places that cost less
          </p>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full   hidden lg:block">6 months free membership? Yes, please.
          </p>
          <div className="rounded-full bg-[#2891FECC]   sm:h-[41px] sm:w-[65px] h-[35px] w-[50px]"></div>
        </div>
        <div className="flex gap-4 justify-center items-center mt-4 sm:ml-28 ml-4 lg:hidden">
          <div className="rounded-full bg-[#FFFFFFA6]   sm:h-[41px] sm:w-[65px] h-[35px] w-[50px]"></div>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full hidden lg:block">Test it out, tell us what you love (or hate 👀)
          </p>
          <p className="text-[#F7F8FC] section-7-para-2 bg-[#2891FE78] rounded-full">Be the first to explore Roamyo’s beta
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-12">
        <Link 
            href="/join"
            className="inline-flex items-center bg-[#ED552C] text-white hover:bg-[#D64A27] relative transition-all duration-300 transform hover:scale-105 group alpha-roamers-btn"
          >
            Join the &nbsp;<span className="alpha-roamers-btn2"> Alpha Roamers</span>
            <span className='bg-[#13263E] sm:w-14 w-12 h-full absolute hero-span-svg flex items-center justify-center'><svg 
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
        <div className="flex w-full justify-center items-center clubImg">
          <Image src="/images/seats-left.png" alt="Roamyo Mascots" width={755} height={450} />
        </div>
      </div>
    </div>
  );
};

export default JoinClub;
