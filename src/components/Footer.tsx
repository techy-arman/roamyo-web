"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#E6F2FF] pt-16 sm:px-10 font-gilroy px-2">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row justify-between mb-16 gap-20">
          {/* Left side - Logo and subscribe */}
          <div className="w-1/2 mb-8 md:mb-0 footerCols">
            <div className="flex items-center lg:mb-0 md:mb-8 mt-4">
              <Link
                href="/"
                className="flex items-center hover:opacity-80 transition-opacity duration-300"
              >
                <Image
                  src="/images/roamyo-logo.png"
                  alt="Roamyo Logo"
                  width={300}
                  height={124}
                  className="md:w-[300px] sm:w-[300px] xs:w-[300px]"
                  priority
                />
              </Link>
            </div>

            <h3 className="text-[#13263E] footer-para">
              Where to Next? Let Roamyo Decide! ✈️
            </h3>
            <p className="footer-para-sec italic">
              Join The Alpha Roamers and get AI-powered travel <br  className="hidden"/> magic in
              your inbox!
            </p>

            <Link 
            href="/join"
            className="inline-flex items-center bg-[#ED552C] text-white hover:bg-[#D64A27] relative transition-all duration-300 transform hover:scale-105 group subscribe-btn-footer"
          >
            Subscribe to the &nbsp;<span className="subscribe-btn-footer2"> Newsletter</span>
            <span className='bg-[#13263E] sm:w-12 w-8 h-full absolute hero-span-svg2 flex items-center justify-center'><svg 
              className="hero-svg rounded-sm transform transition-transform duration-300 group-hover:translate-x-1" 
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
          <hr className="lg:hidden md:w-full border-[2px] border-[#13263E] sm:my-16 my-4" />
          {/* Right Side - Links and Tagline */}
          <div className="w-full flex-col gap-12">
            <div className="flex lg:justify-end md:justify-start mb-2">
              <h2 className="footer-header">
                Keep <span className="font-bold">Roaming</span>
                <span className="text-[#FF4D00] font-bold">.</span>
              </h2>
            </div>
            <div className="flex justify-end items-center mr-10">
              <div className="flex lg:flex-row md:flex-col md:gap-4 flex-wrap justify-between w-full lg:max-w-[79%] md:w-full footerMenuList">
                {/* First Column */}
                <div className="sm:w-1/2 md:w-auto mb-6 md:mb-0 footerCols">
                  <ul className="footerList">
                    <li>
                      <Link href="/Problem">Problem?</Link>
                    </li>
                    <li>
                      <Link href="/faq">Fixed</Link>
                    </li>
                    <li>
                      <Link href="/pricing">Simple As That</Link>
                    </li>
                    <li>
                      <Link href="/get-it">Get In!</Link>
                    </li>
                    <li>
                      <Link href="/got-questions">Got Questions?</Link>
                    </li>
                  </ul>
                </div>
                <hr className="lg:hidden w-full border-[1px] border-[#13263E] my-4" />
                {/* Second Column */}
                <div className="w-1/2 md:w-auto mb-6 md:mb-0 footerCols">
                  <ul className="footerList">
                    <li>
                      <Link href="/About">About</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link href="/terms">Terms Of Service</Link>
                    </li>
                    <li>
                      <Link href="/privacy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link href="/blog">Blog</Link>
                    </li>
                  </ul>
                </div>
                <hr className="lg:hidden w-full border-[1px] border-[#13263E] my-4" />
                {/* Third Column */}
                <div className="w-full md:w-auto flex items-start mt-4 md:mt-0">
                  <div className="flex flex-col space-y-1">
                    <Link
                      href="https://instagram.com"
                      className="flex items-center footerList"
                    >
                      <Image
                        src="/images/instagram.png"
                        alt="Instagram"
                        className="mr-1"
                        width={16}
                        height={16}
                      />
                      Instagram
                    </Link>
                    <Link
                      href="https://linkedin.com"
                      className="flex items-center footerList"
                    >
                      <Image
                        src="/images/linkedin.png"
                        alt="LinkedIn"
                        className="mr-1"
                        width={18}
                        height={18}
                      />
                      LinkedIn
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mr-10">
              <div className="flex flex-wrap justify-between w-full sm:max-w-[78%]">
                {/* Copyright */}
                <div className="text-start text-md font-medium text-[#E5320F]">
                  © Copyright 2025. All rights reserved by Roamyo.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Travel icons */}
        <div className="flex justify-start items-end md:space-x-12 space-x-6">
          <Image src="/images/globe.png" alt="Globe" width={79} height={100} className="footeImg1" />
          <Image src="/images/map.png" alt="Map" width={97} height={87} className="footeImg2" />
          <Image
            src="/images/Luggage.png"
            alt="Luggage"
            width={91}
            height={75}
            className="footeImg3"
          />
          <Image
            src="/images/palm-trees.png"
            alt="Palm Trees"
            width={110}
            height={95}
            className="footeImg4"
          />
          <Image
            src="/images/passport.png"
            alt="Passport"
            width={57}
            height={76}
            className="footeImg5"
          />
          <Image
            src="/images/suitcase.png"
            alt="Suitcase"
            width={52}
            height={113}
            className="footeImg6"
          />
          <Image
            src="/images/cocktail.png"
            alt="Cocktail"
            width={67}
            height={106}
            className="footeImg7"
          />
          <Image
            src="/images/bicycle.png"
            alt="Bicycle"
            width={145}
            height={88}
            className="footeImg8"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
