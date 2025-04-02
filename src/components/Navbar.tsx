'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/problem', text: 'Problem?' },
    { href: '/fixed', text: 'Fixed!' },
    { href: '/simple', text: 'Simple As That' },
    { href: '/get-in', text: 'Get In!' },
    { href: '/questions', text: 'Got Questions?' },
    { href: '/blog', text: 'Blog' },
  ];

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'navbar-scrolled backdrop-blur-xl bg-white' : 'bg-white'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[84px] items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center hover:opacity-80 transition-opacity duration-300">
              <Image
                src="/images/roamyo-logo.png"
                alt="Roamyo Logo"
                width={173.68}
                height={44.23}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#ED552C] relative group"
              >
                <span className="relative inline-block menu-text transition-transform duration-500 ease-out hover:scale-110">
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#ED552C] transition-all duration-500 ease-out group-hover:w-full"></span>
                </span>
              </Link>
            ))}
          </div>

          {/* Get In Touch Button */}
          <div className="hidden xl:flex items-center">
            <Link
              href="/contact"
              className="relative hover:bg-transparent bg-[#ED552C] border-2 border-[#ED552C] text-[#FFFFFF] hover:text-[#ED552C] transition-all duration-500 ease-out hover:shadow-lg hover:scale-105 overflow-hidden group nav-text text-center"
            >
              <span className="relative z-10">Get In Touch</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#ED552C] hover:scale-110 focus:outline-none transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6 transition-transform duration-500 ease-out"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{
                  transform: isMobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${
            isMobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t rounded-lg">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-[#ED552C] hover:bg-orange-50 rounded-lg transition-all duration-500 ease-out transform hover:translate-x-2"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transform: isMobileMenuOpen 
                    ? 'translateX(0)' 
                    : 'translateX(-100%)',
                }}
              >
                {link.text}
              </Link>
            ))}
            <Link
              href="/contact"
              className="relative block px-3 py-1.5 text-sm text-center border-2 border-[#ED552C] text-[#ED552C] rounded-full transition-all duration-500 ease-out hover:text-white hover:shadow-lg hover:scale-105 mx-3 transform sm:w-40 sm:mx-auto overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                transitionDelay: `${navLinks.length * 50}ms`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen 
                  ? 'translateX(0)' 
                  : 'translateX(-100%)',
              }}
            >
              <span className="relative z-10">Get In Touch</span>
              <div className="absolute inset-0 bg-[#ED552C] transform -translate-x-full transition-transform duration-500 ease-out group-hover:translate-x-0"></div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 