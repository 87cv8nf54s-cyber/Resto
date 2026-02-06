'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { BusinessTemplate } from '@/components/templates/BusinessTemplate';
import { CreativeTemplate } from '@/components/templates/CreativeTemplate';
import { HeroTemplate } from '@/components/templates/HeroTemplate';
import { MinimalistTemplate } from '@/components/templates/MinimalistTemplate';
import { PortfolioTemplate } from '@/components/templates/PortfolioTemplate';
import { RestoTemplate } from '@/components/templates/RestoTemplate';
import { mockUser } from '../data/mockUser';
import { getThemeCSSVariables } from '@/lib/themes';

type TemplateType = 'creative' | 'minimalist' | 'business' | 'hero' | 'portfolio' | 'resto';

export default function TemplatesPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('creative');
  const screenRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const mobileScreenRef = useRef<HTMLDivElement>(null);
  const mobileContentWrapperRef = useRef<HTMLDivElement>(null);

  const themeVariables = getThemeCSSVariables('beige');
  const style = Object.entries(themeVariables).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {} as React.CSSProperties
  );

  const renderTemplate = () => {
    switch (activeTemplate) {
      case 'creative':
        return (
          <div className="template-creative" style={style}>
            <CreativeTemplate user={mockUser} />
          </div>
        );
      case 'minimalist':
        return (
          <div className="template-minimalist" style={style}>
            <MinimalistTemplate user={mockUser} />
          </div>
        );
      case 'business':
        return (
          <div className="template-business" style={style}>
            <BusinessTemplate user={mockUser} />
          </div>
        );
      case 'hero':
        return (
          <div className="template-hero" style={style}>
            <HeroTemplate user={mockUser} />
          </div>
        );
      case 'portfolio':
        return (
          <div className="template-portfolio" style={style}>
            <PortfolioTemplate user={mockUser} />
          </div>
        );
      case 'resto':
        return (
          <div className="template-resto" style={style}>
            <RestoTemplate user={mockUser} />
          </div>
        );
      default:
        return (
          <div className="template-creative" style={style}>
            <CreativeTemplate user={mockUser} />
          </div>
        );
    }
  };

  const renderMobileTemplate = () => {
    // Render template with forced mobile view
    // CSS in globals.css forces mobile sections to show
    return (
      <div className="template-mobile-wrapper" style={style}>
        {renderTemplate()}
      </div>
    );
  };

  // Reset scroll position and adjust content height when template changes
  useEffect(() => {
    const screenElement = screenRef.current;
    const contentWrapper = contentWrapperRef.current;
    
    if (screenElement && contentWrapper) {
      // Reset scroll to top when template changes
      screenElement.scrollTop = 0;
      screenElement.style.scrollBehavior = 'smooth';
      
      // Reset height constraints
      contentWrapper.style.height = 'auto';
      contentWrapper.style.minHeight = 'auto';
      
      // Wait for content to render, then measure and set exact height
      const adjustContentHeight = () => {
        // Find the main template element
        const templateMain = contentWrapper.querySelector('main');
        
        if (templateMain) {
          // Reset to auto first to get accurate measurements
          contentWrapper.style.height = 'auto';
          
          // Wait a frame for the reset to take effect
          requestAnimationFrame(() => {
            // Get all children of main to find the last content element
            const mainChildren = Array.from(templateMain.children);
            
            if (mainChildren.length > 0) {
              // Find the last visible element (usually the contact/footer section)
              const lastElement = mainChildren[mainChildren.length - 1];
              
              // Get the bounding rectangles
              const lastElementRect = lastElement.getBoundingClientRect();
              const templateMainRect = templateMain.getBoundingClientRect();
              
              // Calculate the bottom position of the last element relative to templateMain
              // This gives us where the content actually ends
              const lastElementBottom = lastElementRect.bottom - templateMainRect.top;
              
              // Add a small buffer for any bottom padding/margin
              const contentEndHeight = lastElementBottom + 10;
              
              // Get the container height to check if content is shorter
              const containerHeight = screenElement.clientHeight;
              
              // Since content is scaled to 0.75, the visual height is different
              // But scrollHeight already accounts for the actual DOM height
              // We want to set the wrapper height to exactly match where content ends
              // This prevents any white space when scrolling
              if (contentEndHeight > containerHeight) {
                // Content is taller than container - use the actual content end height
                contentWrapper.style.height = `${contentEndHeight}px`;
              } else {
                // Content is shorter - set to container height to prevent white space
                contentWrapper.style.height = `${containerHeight / 0.75}px`;
              }
            } else {
              // Fallback: use scrollHeight if we can't find children
              const templateHeight = templateMain.scrollHeight;
              const containerHeight = screenElement.clientHeight;
              
              if (templateHeight > containerHeight) {
                contentWrapper.style.height = `${templateHeight}px`;
              } else {
                contentWrapper.style.height = `${containerHeight / 0.75}px`;
              }
            }
          });
        }
      };
      
      // Use multiple timeouts to ensure content is fully rendered
      setTimeout(adjustContentHeight, 50);
      setTimeout(adjustContentHeight, 200);
      setTimeout(adjustContentHeight, 500);
    }
  }, [activeTemplate]);

  // Adjust mobile content height
  useEffect(() => {
    const mobileScreenElement = mobileScreenRef.current;
    const mobileContentWrapper = mobileContentWrapperRef.current;
    
    if (mobileScreenElement && mobileContentWrapper) {
      mobileScreenElement.scrollTop = 0;
      mobileScreenElement.style.scrollBehavior = 'smooth';
      
      mobileContentWrapper.style.height = 'auto';
      mobileContentWrapper.style.minHeight = 'auto';
      
      const adjustMobileContentHeight = () => {
        const templateMain = mobileContentWrapper.querySelector('main');
        
        if (templateMain) {
          const templateHeight = templateMain.scrollHeight;
          mobileContentWrapper.style.height = `${templateHeight}px`;
        }
      };
      
      setTimeout(adjustMobileContentHeight, 50);
      setTimeout(adjustMobileContentHeight, 200);
      setTimeout(adjustMobileContentHeight, 500);
    }
  }, [activeTemplate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <Navigation />

      <div className="flex-1 flex flex-col items-center justify-center pt-12 pb-5 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Bekijk Templates
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kies een template en bekijk hoe jouw website eruit zal zien
          </p>
        </div>

        {/* Template Selection Buttons */}
        <div className="w-full max-w-4xl px-4 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-foreground mb-4 text-center">
              Kies een Template
            </h2>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setActiveTemplate('creative')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'creative'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'creative'}
              >
                Creatief
              </button>
              <button
                onClick={() => setActiveTemplate('minimalist')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'minimalist'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'minimalist'}
              >
                Minimalist
              </button>
              <button
                onClick={() => setActiveTemplate('business')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'business'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'business'}
              >
                Zakelijk
              </button>
              <button
                onClick={() => setActiveTemplate('hero')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'hero'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'hero'}
              >
                Hero
              </button>
              <button
                onClick={() => setActiveTemplate('portfolio')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'portfolio'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'portfolio'}
              >
                Portfolio
              </button>
              <button
                onClick={() => setActiveTemplate('resto')}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                  activeTemplate === 'resto'
                    ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
                aria-pressed={activeTemplate === 'resto'}
              >
                Resto Landingspage
              </button>
            </div>
          </div>
        </div>

        {/* MacBook Mockup - Desktop Only */}
        <div className="hidden lg:block relative w-full max-w-6xl mb-2" style={{ transform: 'scale(0.8)', transformOrigin: 'top center' }}>
          {/* MacBook Container */}
          <div className="relative mx-auto" style={{ width: '100%', maxWidth: '1400px' }}>
            {/* MacBook Screen */}
            <div className="relative mx-auto" style={{ width: '100%', paddingTop: '63.5%' }}>
              {/* Screen Bezel with Shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-t-[3%] shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                {/* Inner Bezel */}
                <div className="absolute inset-[0.5%] bg-gray-900 rounded-t-[2.5%]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-7 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                    <div className="w-12 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Screen Content Area */}
                  <div 
                    ref={screenRef}
                    className="absolute inset-x-[0.8%] top-7 bottom-[0.5%] bg-white rounded-b-[2%] overflow-y-auto overflow-x-hidden laptop-scrollbar"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#cbd5e1 #f1f5f9',
                    }}
                  >
                    {/* Template Content - Scaled to fit */}
                    <div ref={contentWrapperRef} className="w-full" style={{ transform: 'scale(0.75)', transformOrigin: 'top center' }}>
                      {renderTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MacBook Base */}
            <div className="relative mx-auto" style={{ width: '100%', paddingBottom: '4%' }}>
              <div className="absolute top-0 bottom-0 bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-b-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)]" style={{ width: '121.38%', left: '-10.69%', right: 0 }}>
                {/* Keyboard Area Indicator */}
                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-3/4 h-1 bg-gray-600 rounded-full opacity-30"></div>
              </div>
            </div>
          </div>
        </div>

        {/* iPhone Mockup - Mobile Only */}
        <div className="block lg:hidden relative w-full max-w-sm mx-auto mb-12">
          <div className="relative mx-auto" style={{ width: '100%', maxWidth: '375px' }}>
            {/* iPhone Frame */}
            <div className="relative mx-auto" style={{ width: '100%', paddingTop: '207%' }}>
              {/* Outer Frame with Shadow */}
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-gray-800 rounded-[8%] shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                {/* Inner Bezel */}
                <div className="absolute inset-[1.5%] bg-gray-900 rounded-[6.5%]">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-2xl z-10 flex items-center justify-center">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full"></div>
                  </div>
                  
                  {/* Screen Content Area */}
                  <div 
                    ref={mobileScreenRef}
                    className="absolute inset-x-[2%] top-8 bottom-[2%] bg-white rounded-[5%] overflow-y-auto overflow-x-hidden"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: '#cbd5e1 #f1f5f9',
                    }}
                  >
                    {/* Mobile Template Content */}
                    <div ref={mobileContentWrapperRef} className="w-full" style={{ transform: 'scale(1)', transformOrigin: 'top center' }}>
                      {renderMobileTemplate()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Klaar om te beginnen Section */}
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-8 mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Klaar om te beginnen?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Maak binnen minuten je professionele website en ontdek hoe eenvoudig het is.
          </p>
          <div className="mb-8">
            <Link href="/pricing" className="inline-flex flex-col items-center justify-center rounded-md bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <span className="text-lg font-semibold mb-1">Start gratis proefperiode</span>
              <span className="text-sm font-normal opacity-90">3 dagen gratis, daarna €7,99/maand</span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="#" className="inline-flex items-center justify-center rounded-md bg-background border border-input px-8 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto sm:flex-1 sm:max-w-xs">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download voor iOS
            </a>
            <a href="#" className="inline-flex items-center justify-center rounded-md bg-background border border-input px-8 py-3 text-base font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-full sm:w-auto sm:flex-1 sm:max-w-xs">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.19,15.45L14.54,12.85L17.19,10.25L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
              </svg>
              Download voor Android
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
