"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, MapPin, Phone, UtensilsCrossed, Instagram, Clock, Star, Calendar, Menu as MenuIcon, X, Info, Globe, ChevronDown, ChevronUp, FileText } from "lucide-react";
import jsPDF from 'jspdf';

interface RestoTemplateProps {
  user: User;
}

// Mock restaurant data structure
interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export function RestoTemplate({ user }: RestoTemplateProps) {
  // Restaurant basic info
  const restaurantName = user.companyName || user.naam || "Restaurant";
  const tagline = user.bio || "Authentieke smaken, onvergetelijke ervaringen";
  const logo = "/LogoRIAD.png";

  // Mock menu items - using workExperiences as menu items
  const menuItems: MenuItem[] = (user.workExperiences || []).map((exp, idx) => ({
    id: exp.id || `menu-${idx}`,
    name: exp.company || "Dish Name",
    price: exp.role || "€0.00",
    description: exp.description || "",
    category: exp.startDate || "Hoofdgerechten", // Using startDate as category temporarily
  }));


  // Mock categories - using educations
  const categories = (user.educations || []).map(edu => ({
    id: edu.id,
    name: edu.institution || "Category",
  }));

  // Gallery images - using Resto1-5.jpg
  const galleryImages: GalleryImage[] = [
    { id: "1", url: "/Resto1.jpg", alt: "Restaurant Gallery 1" },
    { id: "2", url: "/Resto2.jpg", alt: "Restaurant Gallery 2" },
    { id: "3", url: "/Resto3.jpg", alt: "Restaurant Gallery 3" },
    { id: "4", url: "/Resto4.jpg", alt: "Restaurant Gallery 4" },
    { id: "5", url: "/Resto5.jpg", alt: "Restaurant Gallery 5" },
  ];

  // Contact info
  const address = user.address;
  const phone = user.phoneNumber;
  const email = user.companyEmail;
  const instagram = user.linkedinUrl; // Using linkedinUrl for Instagram

  // Opening hours mockup
  const openingHours = {
    monday: "11:00 - 22:00",
    tuesday: "11:00 - 22:00",
    wednesday: "11:00 - 22:00",
    thursday: "11:00 - 22:00",
    friday: "11:00 - 23:00",
    saturday: "11:00 - 23:00",
    sunday: "12:00 - 21:00",
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOtherSections, setShowOtherSections] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [expandedMenuItem, setExpandedMenuItem] = useState<string | null>(null);
  const [showPDFView, setShowPDFView] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const categoryScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsAtTop(window.scrollY < 100);
      
      // Close expanded menu item when scrolling (but only if user actually scrolled significantly)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollDelta = Math.abs(window.scrollY - lastScrollY);
        if (expandedMenuItem && scrollDelta > 50) {
          setExpandedMenuItem(null);
        }
        lastScrollY = window.scrollY;
      }, 150);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [expandedMenuItem]);

  // Handle hash navigation on page load (for QR codes)
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure page is rendered
      setTimeout(() => {
        scrollToSection(hash, false);
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string, updateHash: boolean = true) => {
    const element = document.getElementById(id);
    if (element) {
      // Update URL hash without triggering scroll
      if (updateHash) {
        window.history.pushState(null, '', `#${id}`);
      }
      
      // Calculate offset for fixed header
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      setMobileMenuOpen(false);
    }
  };

  // Filter menu items by selected category
  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  // Generate PDF function
  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 25;
    const frameMargin = 15;
    const maxWidth = pageWidth - (margin * 2);
    const frameWidth = pageWidth - (frameMargin * 2);
    const frameHeight = pageHeight - (frameMargin * 2);

    // Helper function to load image as base64
    const loadImageAsBase64 = (src: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
          }
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          try {
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          } catch (e) {
            reject(e);
          }
        };
        img.onerror = reject;
        img.src = src;
      });
    };

    try {
      // First page: Logo only
      if (logo) {
        try {
          const logoData = await loadImageAsBase64(logo);
          const logoWidth = 80;
          const logoHeight = (logoWidth * 0.5); // Maintain aspect ratio
          const logoX = (pageWidth - logoWidth) / 2;
          const logoY = (pageHeight - logoHeight) / 2;
          
          doc.addImage(logoData, 'PNG', logoX, logoY, logoWidth, logoHeight);
        } catch (error) {
          console.error('Error loading logo:', error);
        }
      }

      // Add new page for menu content
      doc.addPage();
      let yPosition = margin + 10;

      // Draw decorative frame around menu
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.5);
      // Top border
      doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
      // Bottom border
      doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
      // Left border
      doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
      // Right border
      doc.line(pageWidth - frameMargin, frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);

      // Menu items grouped by category
      const itemsByCategory: Record<string, MenuItem[]> = {};
      menuItems.forEach(item => {
        const category = item.category || 'Overig';
        if (!itemsByCategory[category]) {
          itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
      });

      // Add menu items by category
      Object.keys(itemsByCategory).forEach(category => {
        // Check if we need a new page
        if (yPosition > pageHeight - frameMargin - 30) {
          doc.addPage();
          yPosition = margin + 10;
          
          // Draw frame on new page
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.5);
          doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
          doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
          doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
          doc.line(pageWidth - frameMargin, frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
        }

        // Category header with elegant styling
        yPosition += 12;
        doc.setFontSize(20);
        doc.setFont('times', 'italic'); // Elegant italic font for categories
        doc.setTextColor(60, 60, 60);
        
        // Center the category name
        const categoryWidth = doc.getTextWidth(category);
        const categoryX = (pageWidth - categoryWidth) / 2;
        doc.text(category, categoryX, yPosition);
        yPosition += 10;

        // Decorative line under category
        const lineY = yPosition - 3;
        const lineStartX = categoryX - 10;
        const lineEndX = categoryX + categoryWidth + 10;
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.3);
        doc.line(lineStartX, lineY, lineEndX, lineY);
        yPosition += 8;

        // Menu items in this category
        itemsByCategory[category].forEach(item => {
          // Calculate space needed for this item (name + price + description + spacing)
          let spaceNeeded = 6; // Name and price line
          if (item.description) {
            doc.setFontSize(9);
            const descriptionWidth = maxWidth - 10;
            const splitDescription = doc.splitTextToSize(item.description, descriptionWidth);
            spaceNeeded += splitDescription.length * 4.5;
          }
          spaceNeeded += 4; // Bottom spacing

          // Check if we need a new page BEFORE adding the item
          if (yPosition + spaceNeeded > pageHeight - frameMargin - 10) {
            doc.addPage();
            yPosition = margin + 10;
            
            // Draw frame on new page
            doc.setDrawColor(200, 200, 200);
            doc.setLineWidth(0.5);
            doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
            doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
            doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
            doc.line(pageWidth - frameMargin, frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
          }

          // Item name and price
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          const itemName = item.name;
          const itemPrice = item.price;
          
          // Calculate text width to position price on the right
          const priceWidth = doc.getTextWidth(itemPrice);
          
          doc.text(itemName, margin + 5, yPosition);
          doc.text(itemPrice, pageWidth - margin - priceWidth - 5, yPosition);
          yPosition += 6;

          // Item description
          if (item.description && item.description.trim()) {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(100, 100, 100);
            
            // Split description into lines if too long
            const descriptionWidth = maxWidth - 10;
            const splitDescription = doc.splitTextToSize(item.description, descriptionWidth);
            doc.text(splitDescription, margin + 5, yPosition);
            yPosition += splitDescription.length * 4.5;
            doc.setTextColor(0, 0, 0);
          }
          
          yPosition += 4;
        });
      });

      // Footer on all pages (except first logo page)
      const totalPages = doc.getNumberOfPages();
      for (let i = 2; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Pagina ${i - 1} van ${totalPages - 1}`,
          pageWidth / 2,
          pageHeight - frameMargin + 5,
          { align: 'center' }
        );
      }

      // Open PDF in browser instead of downloading
      const pdfBlob = doc.output('blob');
      const generatedPdfUrl = URL.createObjectURL(pdfBlob);
      
      // On mobile, show PDF in view, on desktop open in new tab
      if (window.innerWidth < 768) {
        // Mobile: show PDF in view
        setPdfUrl(generatedPdfUrl);
        setShowPDFView(true);
      } else {
        // Desktop: open in new tab
        window.open(generatedPdfUrl, '_blank');
        // Clean up the URL after opening
        setTimeout(() => {
          URL.revokeObjectURL(generatedPdfUrl);
        }, 100);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Er is een fout opgetreden bij het genereren van de PDF.');
    }
  };

  // Auto-scroll selected category into view on mobile
  useEffect(() => {
    if (categoryScrollRef.current && selectedCategory !== null) {
      const buttons = categoryScrollRef.current.querySelectorAll('button');
      const selectedButton = Array.from(buttons).find((btn) => 
        btn.textContent?.trim() === selectedCategory
      );
      
      if (selectedButton) {
        selectedButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    } else if (categoryScrollRef.current && selectedCategory === null) {
      // Scroll "Alle" button into view
      const firstButton = categoryScrollRef.current.querySelector('button');
      if (firstButton) {
        firstButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start'
        });
      }
    }
  }, [selectedCategory]);

  // Close expanded menu item when category changes (separate effect)
  const prevCategoryRef = useRef(selectedCategory);
  useEffect(() => {
      if (prevCategoryRef.current !== selectedCategory) {
        if (expandedMenuItem) {
          setExpandedMenuItem(null);
        }
        prevCategoryRef.current = selectedCategory;
      }
  }, [selectedCategory]);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden" style={{ maxWidth: '100vw', boxSizing: 'border-box' }}>
      {/* Navigation Header - Hidden on mobile when scrolled, only visible at top */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        } ${
          !isAtTop ? "md:block hidden" : ""
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              {logo ? (
                <Image
                  src={logo}
                  alt={restaurantName}
                  width={120}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              ) : (
                <span className={`text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  {restaurantName}
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("over-ons")}
                className={`text-base font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Over Ons
              </button>
              <button
                onClick={() => scrollToSection("impressie")}
                className={`text-base font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Impressie
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className={`text-base font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-base font-medium transition-colors hover:opacity-80 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Contact
              </button>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="px-6 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: isScrolled ? "var(--color-accent)" : "white",
                    color: isScrolled ? "white" : "var(--color-accent)",
                  }}
                >
                  Reserveren
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 pt-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("over-ons")}
                  className="text-left text-base font-medium text-gray-900 hover:opacity-80"
                >
                  Over Ons
                </button>
                <button
                  onClick={() => scrollToSection("impressie")}
                  className="text-left text-base font-medium text-gray-900 hover:opacity-80"
                >
                  Impressie
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-left text-base font-medium text-gray-900 hover:opacity-80"
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-base font-medium text-gray-900 hover:opacity-80"
                >
                  Contact
                </button>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="px-6 py-3 rounded-full font-semibold text-center transition-all"
                    style={{ backgroundColor: "var(--color-accent)", color: "white" }}
                  >
                    Reserveren
                  </a>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Hero Section - Hidden on mobile when menu is focused */}
      <section className={`relative h-screen flex items-center justify-center pt-20 overflow-hidden ${showOtherSections ? "" : "hidden md:flex"}`}>
        <div className="absolute inset-0">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/Videoresto.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          {logo && (
            <div className="mb-8 animate-fade-in">
              <Image
                src={logo}
                alt="Logo"
                width={180}
                height={90}
                className="h-20 w-auto mx-auto object-contain"
              />
            </div>
          )}
          
          <FadeIn>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
              {restaurantName}
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto">
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="px-10 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-xl inline-flex items-center gap-3"
                  style={{ minWidth: '200px', justifyContent: 'center' }}
                >
                  <Phone className="w-5 h-5" />
                  Reserveren
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="px-10 py-4 border-3 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all hover:scale-105 inline-flex items-center gap-3"
                  style={{ minWidth: '200px', justifyContent: 'center' }}
                >
                  <Mail className="w-5 h-5" />
                  Contact
                </a>
              )}
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section - Hidden on mobile when menu is focused */}
      <section id="over-ons" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-5xl mx-auto">
          <FadeInUp delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
                Over Ons
              </h2>
              <div className="w-24 h-1.5 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
                {tagline}
              </p>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed text-center mt-6">
                Bij {restaurantName} combineren we traditionele recepten met moderne technieken om uitzonderlijke culinaire ervaringen te creëren. Onze passie voor kwaliteit en aandacht voor detail komt terug in elk gerecht dat we serveren.
              </p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Gallery Section - Hidden on mobile when menu is focused */}
      {galleryImages.length > 0 && (
        <section id="impressie" className={`py-24 px-4 bg-gray-50 scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
          <div className="max-w-7xl mx-auto">
            <FadeInUp delay={0.15}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
                  Impressie
                </h2>
                <div className="w-24 h-1.5 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Ontdek de sfeer en passie achter onze gerechten
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {/* Menu Section - Bordered container on mobile */}
      {menuItems.length > 0 && (
        <section id="menu" className={`${showOtherSections ? "py-12 md:py-24" : "pt-24 pb-12 md:py-24"} px-4 bg-white ${showOtherSections ? "scroll-mt-20" : ""} ${!showOtherSections ? "min-h-screen md:min-h-0" : ""}`}>
          <div className={`max-w-6xl mx-auto ${!showOtherSections ? "md:max-w-6xl border-2 border-gray-200 rounded-3xl md:border-0 md:rounded-none bg-white shadow-lg md:shadow-none p-4 md:p-0" : ""}`}>
            <FadeInUp delay={0.2}>
              {/* Mobile Header */}
              <div className="md:hidden text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <UtensilsCrossed className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  <h2 className="text-3xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    Menu
                  </h2>
                </div>
                <div className="w-16 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
              </div>

              {/* Desktop Header */}
              <div className="hidden lg:block text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <UtensilsCrossed className="w-10 h-10 md:w-12 md:h-12" style={{ color: 'var(--color-accent)' }} />
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold" style={{ color: 'var(--color-accent)' }}>
                    Menu
                  </h2>
                </div>
                <div className="w-24 h-1.5 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Ontdek onze uitgebreide selectie van heerlijke gerechten
                </p>
              </div>

              {/* Category Tabs - Modern Mobile Design */}
              {categories.length > 0 && (
                <>
                  {/* Mobile: Modern floating category bar */}
                  <div className={`lg:hidden sticky z-40 mb-6 ${showOtherSections ? "top-20" : "top-4"}`}>
                    {/* Floating container with backdrop blur */}
                    <div className="relative">
                      {/* Gradient fade edges for better scroll indication */}
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                      
                      {/* Scrollable category container */}
                      <div 
                        ref={categoryScrollRef}
                        className="flex gap-3 overflow-x-auto scrollbar-hide px-4 py-3"
                        style={{ 
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          scrollSnapType: 'x mandatory',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        {/* All Categories Button */}
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`relative flex items-center justify-center min-w-[80px] px-6 py-3.5 rounded-2xl font-bold text-base whitespace-nowrap flex-shrink-0 transition-all duration-300 transform active:scale-95 ${
                            selectedCategory === null 
                              ? 'scale-105 shadow-lg' 
                              : 'shadow-md hover:shadow-lg'
                          }`}
                          style={{
                            scrollSnapAlign: 'start',
                            backgroundColor: selectedCategory === null 
                              ? 'var(--color-accent)' 
                              : 'white',
                            color: selectedCategory === null 
                              ? 'white' 
                              : 'var(--color-accent)',
                            border: selectedCategory === null 
                              ? 'none' 
                              : '2px solid rgba(0,0,0,0.08)',
                            boxShadow: selectedCategory === null
                              ? '0 10px 25px -5px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1)'
                              : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                          }}
                        >
                          {selectedCategory === null && (
                            <span 
                              className="absolute inset-0 rounded-2xl opacity-20"
                              style={{ 
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)'
                              }}
                            ></span>
                          )}
                          <span className="relative z-10">Alle</span>
                        </button>

                        {/* Category Buttons */}
                        {categories.map((cat, index) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`relative flex items-center justify-center min-w-[100px] px-6 py-3.5 rounded-2xl font-bold text-base whitespace-nowrap flex-shrink-0 transition-all duration-300 transform active:scale-95 ${
                              selectedCategory === cat.name 
                                ? 'scale-105 shadow-lg' 
                                : 'shadow-md hover:shadow-lg'
                            }`}
                            style={{
                              scrollSnapAlign: 'start',
                              backgroundColor: selectedCategory === cat.name 
                                ? 'var(--color-accent)' 
                                : 'white',
                              color: selectedCategory === cat.name 
                                ? 'white' 
                                : 'var(--color-accent)',
                              border: selectedCategory === cat.name 
                                ? 'none' 
                                : '2px solid rgba(0,0,0,0.08)',
                              boxShadow: selectedCategory === cat.name
                                ? '0 10px 25px -5px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1)'
                                : '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)',
                            }}
                          >
                            {selectedCategory === cat.name && (
                              <span 
                                className="absolute inset-0 rounded-2xl opacity-20"
                                style={{ 
                                  background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)'
                                }}
                              ></span>
                            )}
                            <span className="relative z-10">{cat.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Centered category tabs with PDF button */}
                  <div className="hidden lg:block mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1"></div>
                      <div className="flex flex-wrap justify-center gap-4">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`px-8 py-3 rounded-full border-2 font-semibold text-base transition-all hover:scale-105 hover:shadow-lg ${
                            selectedCategory === null ? 'text-white' : ''
                          }`}
                          style={{
                            borderColor: 'var(--color-accent)',
                            color: selectedCategory === null ? 'white' : 'var(--color-accent)',
                            backgroundColor: selectedCategory === null ? 'var(--color-accent)' : 'transparent',
                          }}
                        >
                          Alle
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-8 py-3 rounded-full border-2 font-semibold text-base transition-all hover:scale-105 hover:shadow-lg ${
                              selectedCategory === cat.name ? 'text-white' : ''
                            }`}
                            style={{
                              borderColor: 'var(--color-accent)',
                              color: selectedCategory === cat.name ? 'white' : 'var(--color-accent)',
                              backgroundColor: selectedCategory === cat.name ? 'var(--color-accent)' : 'transparent',
                            }}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                      {/* PDF Download Button - Desktop, top right of categories */}
                      <div className="flex-1 flex justify-end">
                        <button
                          onClick={generatePDF}
                          className="px-4 py-2 rounded-full font-semibold text-sm transition-all hover:scale-105 hover:shadow-lg flex items-center gap-2"
                          style={{
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                          }}
                          title="Download Menu PDF"
                        >
                          <span className="font-bold">PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Menu Items Grid */}
              {filteredMenuItems.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4 md:gap-8" onClick={(e) => e.stopPropagation()}>
                  {filteredMenuItems.map((item) => {
                    const isExpanded = expandedMenuItem === item.id;
                    // Check for Bruschetta Classica - trim whitespace and compare (case insensitive)
                    const itemNameTrimmed = item.name?.trim() || '';
                    const isBruschetta = itemNameTrimmed.toLowerCase() === "bruschetta classica" || itemNameTrimmed === "Bruschetta Classica";
                    const hasImage = isBruschetta;
                    
                    return (
                      <div
                        key={item.id}
                        className={`bg-gray-50 rounded-xl md:rounded-2xl overflow-hidden transition-all duration-300 border border-gray-100 md:border-2 md:border-transparent hover:border-gray-200 ${
                          isExpanded ? 'shadow-2xl' : 'hover:shadow-xl md:hover:shadow-2xl'
                        }`}
                      >
                        <div
                          className={`p-4 md:p-8 transition-all duration-300 ${
                            isExpanded ? 'pb-2' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-2 md:mb-4">
                            <h3 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 pr-2 md:pr-4 flex-1">
                              {item.name}
                            </h3>
                            <span
                              className="text-lg md:text-2xl lg:text-3xl font-bold whitespace-nowrap flex-shrink-0 ml-2"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-3">
                              {item.description}
                            </p>
                          )}
                          
                          {/* Expand/Collapse Button - Only for items with images */}
                          {hasImage && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const newState = isExpanded ? null : item.id;
                                setExpandedMenuItem(newState);
                              }}
                              className="flex items-center gap-2 text-sm font-semibold transition-all hover:opacity-80 mt-2"
                              style={{ color: 'var(--color-accent)' }}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-4 h-4" />
                                  <span>Verberg foto</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-4 h-4" />
                                  <span>Bekijk foto</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        {/* Expandable Image Section - Only for Bruschetta Classica */}
                        {hasImage && (
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-4 md:px-8 pb-4 md:pb-8">
                              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200" style={{ minHeight: '200px' }}>
                                <Image
                                  src="/Food1.jpg"
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  priority={isExpanded}
                                  onError={(e) => console.error('Error loading Food1.jpg:', e)}
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8 md:py-12">
                  <p className="text-base md:text-lg text-gray-500">Geen gerechten gevonden in deze categorie.</p>
                </div>
              )}
            </FadeInUp>
          </div>
          
          {/* Floating "Bekijk Meer Informatie" Button - Mobile only, bottom right */}
          {!showOtherSections && (
            <button
              onClick={() => {
                setShowOtherSections(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
              }}
              title="Bekijk Meer Informatie"
            >
              <Globe className="w-6 h-6" />
            </button>
          )}
          
          {/* Floating PDF Download Button - Mobile only, top right when menu is focused */}
          {!showOtherSections && !showPDFView && (
            <button
              onClick={generatePDF}
              className="md:hidden fixed top-20 right-6 z-50 p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 items-center justify-center"
              style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
                width: '48px',
                height: '48px',
              }}
              title="Bekijk Menu PDF"
            >
              <span className="text-xs font-bold">PDF</span>
            </button>
          )}
          
          {/* PDF View - Mobile only */}
          {showPDFView && pdfUrl && (
            <div className="md:hidden fixed inset-0 z-50 bg-white">
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                title="Menu PDF"
              />
              {/* Back button with Globe icon */}
              <button
                onClick={() => {
                  setShowPDFView(false);
                  if (pdfUrl) {
                    URL.revokeObjectURL(pdfUrl);
                    setPdfUrl(null);
                  }
                  scrollToSection("menu");
                }}
                className="fixed top-6 left-6 z-50 p-3 rounded-full shadow-2xl transition-all active:scale-95 flex items-center gap-2"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: 'white',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
                }}
                title="Terug naar interactieve versie"
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm font-semibold">Terug</span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* Contact & Info Section - Hidden on mobile when menu is focused */}
      <section id="contact" className={`py-24 px-4 bg-gray-50 scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.25}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6" style={{ color: 'var(--color-accent)' }}>
                Contact & Openingstijden
              </h2>
              <div className="w-24 h-1.5 mx-auto rounded-full mb-4" style={{ backgroundColor: 'var(--color-accent)' }}></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Address Card */}
              {address && (
                <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <MapPin className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Adres</h3>
                  <div className="text-gray-700 space-y-1">
                    {address.street && <p className="font-semibold">{address.street}</p>}
                    {(address.postalCode || address.city) && (
                      <p>{[address.postalCode, address.city].filter(Boolean).join(" ")}</p>
                    )}
                    {address.country && <p>{address.country}</p>}
                  </div>
                </div>
              )}

              {/* Phone Card */}
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Phone className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Telefoon</h3>
                  <p className="text-gray-700 font-medium">{phone}</p>
                </a>
              )}

              {/* Email Card */}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Mail className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Email</h3>
                  <p className="text-gray-700 font-medium break-all text-sm">{email}</p>
                </a>
              )}

              {/* Opening Hours Card */}
              <div className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                  <Clock className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                </div>
                <h3 className="text-xl font-bold mb-6 text-gray-900">Openingstijden</h3>
                <div className="text-gray-700 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Ma - Do:</span>
                    <span className="font-semibold">{openingHours.monday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Vr - Za:</span>
                    <span className="font-semibold">{openingHours.friday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Zo:</span>
                    <span className="font-semibold">{openingHours.sunday}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-light)' }}>
                    <Instagram className="w-8 h-8" style={{ color: 'var(--color-accent)' }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Volg Ons</h3>
                  <p className="text-gray-700 font-medium">Instagram</p>
                </a>
              )}

              {/* Reservation CTA Card */}
              <div className="bg-gradient-to-br rounded-3xl p-8 text-center hover:shadow-xl transition-all hover:scale-105" style={{ backgroundColor: 'var(--color-accent)', color: 'white' }}>
                <Calendar className="w-12 h-12 mx-auto mb-6" />
                <h3 className="text-xl font-bold mb-4">Reserveren</h3>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="inline-block px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100 transition-colors"
                  >
                    Bel Nu
                  </a>
                )}
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer - Hidden on mobile when menu is focused */}
      <footer className={`py-12 px-4 bg-gray-900 text-white ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">{restaurantName}</h3>
          <p className="text-gray-400 mb-6">
            {tagline}
          </p>
          <div className="flex justify-center gap-6 mb-6">
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
            )}
          </div>
          <div className="border-t border-white/10 pt-6">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} {restaurantName}. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Menu Button - Mobile only, bottom right when on landing page */}
      {showOtherSections && (
        <button
          onClick={() => {
            setShowOtherSections(false);
            scrollToSection("menu");
          }}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95"
          style={{
            backgroundColor: 'var(--color-accent)',
            color: 'white',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
          }}
          title="Terug naar Menu"
        >
          <UtensilsCrossed className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
