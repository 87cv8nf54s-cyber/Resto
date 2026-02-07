"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, MapPin, Phone, UtensilsCrossed, Instagram, Clock, Star, Calendar, Menu as MenuIcon, X, Globe, ChevronDown, ChevronUp, ChevronLeft, FileText, Award, ChefHat, Video } from "lucide-react";
import jsPDF from 'jspdf';

interface SushiTemplateProps {
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

interface Award {
  id: string;
  title: string;
  subtitle: string;
}

export function SushiTemplate({ user }: SushiTemplateProps) {
  // Restaurant basic info
  const restaurantName = user.companyName || user.naam || "Zen Sushi";
  const tagline = user.bio || "Authentieke Japanse smaken, minimalistisch gepresenteerd";
  const logo = user.logo || "/Sushi/SUHI.png";

  // Mock menu items - using workExperiences as menu items
  const menuItems: MenuItem[] = (user.workExperiences || []).map((exp, idx) => ({
    id: exp.id || `menu-${idx}`,
    name: exp.company || "Sushi Roll",
    price: exp.role || "€0.00",
    description: exp.description || "",
    category: exp.startDate || "Nigiri", // Using startDate as category
  }));

  // Mock categories - using educations
  const categories = (user.educations || []).map(edu => ({
    id: edu.id,
    name: edu.institution || "Category",
  }));

  // Gallery images - using Sushi/Food1-5.jpg
  const galleryImages: GalleryImage[] = [
    { id: "1", url: "/Sushi/Food1.jpg", alt: "Sushi Gallery 1" },
    { id: "2", url: "/Sushi/Food2.jpg", alt: "Sushi Gallery 2" },
    { id: "3", url: "/Sushi/Food3.jpg", alt: "Sushi Gallery 3" },
    { id: "4", url: "/Sushi/Food4.jpg", alt: "Sushi Gallery 4" },
    { id: "5", url: "/Sushi/Food5.jpg", alt: "Sushi Gallery 5" },
  ];

  // Mock awards - using certifications
  const awards: Award[] = (user.certifications || []).slice(0, 4).map((cert, idx) => ({
    id: cert.id || `award-${idx}`,
    title: cert.name || "Award Title",
    subtitle: cert.issuer || "Recognition",
  }));

  // Contact info
  const address = user.address;
  const phone = user.phoneNumber;
  const email = user.companyEmail;
  const instagram = user.linkedinUrl; // Using linkedinUrl for Instagram

  // Opening hours
  const openingHours = {
    monday: "12:00 - 22:00",
    tuesday: "12:00 - 22:00",
    wednesday: "Gesloten",
    thursday: "12:00 - 22:00",
    friday: "12:00 - 23:00",
    saturday: "12:00 - 23:00",
    sunday: "13:00 - 21:00",
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

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => {
        scrollToSection(hash, false);
      }, 100);
    }
  }, []);

  const scrollToSection = (id: string, updateHash: boolean = true) => {
    const element = document.getElementById(id);
    if (element) {
      if (updateHash) {
        window.history.pushState(null, '', `#${id}`);
      }
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
      console.log('Generating PDF with menuItems:', menuItems);
      
      // First page: Logo only
      if (logo) {
        try {
          const logoData = await loadImageAsBase64(logo);
          const logoWidth = 80;
          const logoHeight = (logoWidth * 0.5);
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

      // Draw minimalist black frame
      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(1);
      doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
      doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
      doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
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
      
      console.log('Items by category:', itemsByCategory);
      console.log('Categories:', Object.keys(itemsByCategory));

      // Add menu items by category
      Object.keys(itemsByCategory).forEach(category => {
        console.log(`Processing category: ${category} with ${itemsByCategory[category].length} items`);
        
        if (yPosition > pageHeight - frameMargin - 30) {
          doc.addPage();
          yPosition = margin + 10;
          doc.setDrawColor(0, 0, 0);
          doc.setLineWidth(1);
          doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
          doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
          doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
          doc.line(pageWidth - frameMargin, frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
        }

        // Category header - minimalist styling
        yPosition += 12;
        doc.setFontSize(18);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        const categoryWidth = doc.getTextWidth(category);
        const categoryX = (pageWidth - categoryWidth) / 2;
        doc.text(category, categoryX, yPosition);
        yPosition += 10;

        // Minimalist line under category
        const lineY = yPosition - 3;
        const lineStartX = categoryX - 10;
        const lineEndX = categoryX + categoryWidth + 10;
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.line(lineStartX, lineY, lineEndX, lineY);
        yPosition += 8;

        // Menu items
        itemsByCategory[category].forEach(item => {
          console.log(`Adding item: ${item.name} - ${item.price}`);
          let spaceNeeded = 6;
          if (item.description) {
            doc.setFontSize(9);
            const descriptionWidth = maxWidth - 10;
            const splitDescription = doc.splitTextToSize(item.description, descriptionWidth);
            spaceNeeded += splitDescription.length * 4.5;
          }
          spaceNeeded += 4;

          if (yPosition + spaceNeeded > pageHeight - frameMargin - 10) {
            doc.addPage();
            yPosition = margin + 10;
            doc.setDrawColor(0, 0, 0);
            doc.setLineWidth(1);
            doc.line(frameMargin, frameMargin, pageWidth - frameMargin, frameMargin);
            doc.line(frameMargin, pageHeight - frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
            doc.line(frameMargin, frameMargin, frameMargin, pageHeight - frameMargin);
            doc.line(pageWidth - frameMargin, frameMargin, pageWidth - frameMargin, pageHeight - frameMargin);
          }

          // Item name and price
          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(0, 0, 0);
          const priceWidth = doc.getTextWidth(item.price);
          doc.text(item.name, margin + 5, yPosition);
          doc.text(item.price, pageWidth - margin - priceWidth - 5, yPosition);
          yPosition += 6;

          // Item description
          if (item.description && item.description.trim()) {
            doc.setFontSize(9);
            doc.setTextColor(100, 100, 100);
            const descriptionWidth = maxWidth - 10;
            const splitDescription = doc.splitTextToSize(item.description, descriptionWidth);
            doc.text(splitDescription, margin + 5, yPosition);
            yPosition += splitDescription.length * 4.5;
            doc.setTextColor(0, 0, 0);
          }
          yPosition += 4;
        });
      });

      console.log(`Total pages after adding menu items: ${doc.getNumberOfPages()}`);
      
      // Footer on all pages (except first logo page)
      const totalPages = doc.getNumberOfPages();
      console.log(`Total pages: ${totalPages}`);
      
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

      // Back button on first menu page (only if we have more than 1 page)
      if (totalPages > 1) {
        doc.setPage(2);
        const buttonRadius = 12;
        const buttonX = margin + 5;
        const buttonY = frameMargin - 5;
        const currentUrl = typeof window !== 'undefined' ? window.location.href.split('#')[0] + '#menu' : '#menu';
        
        doc.setFillColor(0, 0, 0);
        doc.circle(buttonX + buttonRadius, buttonY - buttonRadius, buttonRadius, 'F');
        doc.setDrawColor(0, 0, 0);
        doc.setLineWidth(0.5);
        doc.circle(buttonX + buttonRadius, buttonY - buttonRadius, buttonRadius, 'S');
        
        doc.setFontSize(14);
        doc.setTextColor(255, 255, 255);
        doc.setFont('helvetica', 'bold');
        const arrowText = '←';
        const arrowWidth = doc.getTextWidth(arrowText);
        doc.text(arrowText, buttonX + buttonRadius - (arrowWidth / 2), buttonY - buttonRadius + 2);
        
        doc.link(buttonX, buttonY - (buttonRadius * 2), buttonRadius * 2, buttonRadius * 2, {
          url: currentUrl
        });
      }

      // Open PDF in browser instead of downloading
      const pdfBlob = doc.output('blob');
      const generatedPdfUrl = URL.createObjectURL(pdfBlob);
      
      // On mobile, show PDF in view, on desktop also show in view
      setPdfUrl(generatedPdfUrl);
      setShowPDFView(true);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Er is een fout opgetreden bij het genereren van de PDF.');
    }
  };

  // Auto-scroll selected category into view
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
            ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-black/10"
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
                <span className={`text-2xl font-light tracking-wider ${isScrolled ? "text-black" : "text-white"}`} style={{ letterSpacing: '0.1em' }}>
                  {restaurantName}
                </span>
              )}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("about")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Over Ons
              </button>
              <button
                onClick={() => scrollToSection("menu")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Menu
              </button>
              <button
                onClick={() => scrollToSection("chef")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Chef
              </button>
              <button
                onClick={() => scrollToSection("awards")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Erkenningen
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Galerij
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`text-sm font-light tracking-wider transition-colors hover:opacity-80 uppercase ${
                  isScrolled ? "text-black" : "text-white"
                }`}
                style={{ letterSpacing: '0.15em' }}
              >
                Contact
              </button>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className={`px-6 py-2 border border-current text-xs font-light tracking-wider uppercase transition-all hover:bg-current hover:text-white ${
                    isScrolled ? "text-black border-black" : "text-white border-white"
                  }`}
                  style={{ letterSpacing: '0.2em' }}
                >
                  Reserveren
                </a>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2 ${isScrolled ? "text-black" : "text-white"}`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-6 pt-4 border-t border-black/20 bg-white/95 backdrop-blur-md">
              <div className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Over Ons
                </button>
                <button
                  onClick={() => scrollToSection("menu")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Menu
                </button>
                <button
                  onClick={() => scrollToSection("chef")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Chef
                </button>
                <button
                  onClick={() => scrollToSection("awards")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Erkenningen
                </button>
                <button
                  onClick={() => scrollToSection("gallery")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Galerij
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-left text-sm font-light tracking-wider text-black hover:opacity-80 uppercase"
                  style={{ letterSpacing: '0.15em' }}
                >
                  Contact
                </button>
                {phone && (
                  <a
                    href={`tel:${phone}`}
                    className="px-6 py-3 border border-black text-black text-xs font-light tracking-wider uppercase text-center transition-all hover:bg-black hover:text-white"
                    style={{ letterSpacing: '0.2em' }}
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
            <source src="/Sushi/HeaderVid.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/80"></div>
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light mb-6 tracking-wider text-white" style={{ letterSpacing: '0.05em', fontWeight: 300 }}>
              {restaurantName}
            </h1>
            <p className="text-base md:text-lg mb-10 text-white/70 max-w-2xl mx-auto font-light tracking-wide" style={{ letterSpacing: '0.05em' }}>
              {tagline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="px-10 py-4 border border-white text-white text-sm font-light tracking-wider uppercase hover:bg-white hover:text-black transition-all inline-flex items-center gap-3"
                  style={{ minWidth: '200px', justifyContent: 'center', letterSpacing: '0.2em' }}
                >
                  <Phone className="w-4 h-4" />
                  Reserveren
                </a>
              )}
              {email && (
                <a
                  href={`mailto:${email}`}
                  className="px-10 py-4 border border-white/50 text-white/80 text-sm font-light tracking-wider uppercase hover:border-white hover:text-white transition-all inline-flex items-center gap-3"
                  style={{ minWidth: '200px', justifyContent: 'center', letterSpacing: '0.2em' }}
                >
                  <Mail className="w-4 h-4" />
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
      <section id="about" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-5xl mx-auto">
          <FadeInUp delay={0.1}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black tracking-wider" style={{ letterSpacing: '0.05em', fontWeight: 300 }}>
                Over Ons
              </h2>
              <div className="w-24 h-px mx-auto mb-4 bg-black"></div>
            </div>
            
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-light mb-4 text-black tracking-wide" style={{ letterSpacing: '0.05em' }}>
                  Onze Geschiedenis
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  {tagline}
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light mb-4 text-black tracking-wide" style={{ letterSpacing: '0.05em' }}>
                  Onze Filosofie
                </h3>
                <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  Bij {restaurantName} combineren we traditionele Japanse technieken met verse ingrediënten om authentieke sushi te creëren. Onze passie voor perfectie en aandacht voor detail komt terug in elk gerecht dat we met zorg bereiden.
                </p>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Menu Section - Bordered container on mobile */}
      {menuItems.length > 0 && (
        <section id="menu" className={`${showOtherSections ? "py-12 md:py-24" : "pt-24 pb-12 md:py-24"} px-4 bg-white ${showOtherSections ? "scroll-mt-20" : ""} ${!showOtherSections ? "min-h-screen md:min-h-0" : ""}`}>
          <div className={`max-w-6xl mx-auto ${!showOtherSections ? "md:max-w-6xl border-2 border-gray-200 rounded-3xl md:border-0 md:rounded-none bg-white shadow-lg md:shadow-none p-4 md:p-0" : ""}`}>
            <FadeInUp delay={0.2}>
              <div className="text-center mb-16">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-light mb-6 text-black tracking-wider" style={{ letterSpacing: '0.1em', fontWeight: 300 }}>
                  MENU
                </h2>
                <div className="w-24 h-px mx-auto mb-4 bg-black"></div>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto font-light tracking-wide" style={{ letterSpacing: '0.05em' }}>
                  Ontdek onze selectie van authentieke sushi
                </p>
              </div>

              {/* Category Tabs */}
              {categories.length > 0 && (
                <>
                  {/* Mobile: Scrollable category bar */}
                  <div className="lg:hidden sticky z-40 mb-6 top-20">
                    <div className="relative">
                      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                      
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
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`relative flex items-center justify-center min-w-[80px] px-6 py-3.5 font-light text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 transform active:scale-95 uppercase border ${
                            selectedCategory === null 
                              ? 'bg-black text-white border-black' 
                              : 'bg-white text-black border-black/20 hover:border-black'
                          }`}
                          style={{
                            scrollSnapAlign: 'start',
                            letterSpacing: '0.1em',
                          }}
                        >
                          Alle
                        </button>

                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`relative flex items-center justify-center min-w-[100px] px-6 py-3.5 font-light text-xs whitespace-nowrap flex-shrink-0 transition-all duration-300 transform active:scale-95 uppercase border ${
                              selectedCategory === cat.name 
                                ? 'bg-black text-white border-black' 
                                : 'bg-white text-black border-black/20 hover:border-black'
                            }`}
                            style={{
                              scrollSnapAlign: 'start',
                              letterSpacing: '0.1em',
                            }}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Desktop: Centered category tabs */}
                  <div className="hidden lg:block mb-12">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1"></div>
                      <div className="flex flex-wrap justify-center gap-4">
                        <button
                          onClick={() => setSelectedCategory(null)}
                          className={`px-8 py-3 border border-black text-xs font-light tracking-wider uppercase transition-all hover:bg-black hover:text-white ${
                            selectedCategory === null ? 'bg-black text-white' : 'bg-white text-black'
                          }`}
                          style={{ letterSpacing: '0.15em' }}
                        >
                          Alle
                        </button>
                        {categories.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.name)}
                            className={`px-8 py-3 border border-black text-xs font-light tracking-wider uppercase transition-all hover:bg-black hover:text-white ${
                              selectedCategory === cat.name ? 'bg-black text-white' : 'bg-white text-black'
                            }`}
                            style={{ letterSpacing: '0.15em' }}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>
                      {/* PDF Button */}
                      <div className="flex-1 flex justify-end">
                        <button
                          onClick={generatePDF}
                          className="px-4 py-2 border border-black text-xs font-light tracking-wider uppercase transition-all hover:bg-black hover:text-white bg-white text-black flex items-center gap-2"
                          style={{ letterSpacing: '0.15em' }}
                          title="Download Menu PDF"
                        >
                          <span>PDF</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Menu Items Grid */}
              {filteredMenuItems.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                  {filteredMenuItems.map((item) => {
                    const isExpanded = expandedMenuItem === item.id;
                    const itemNameTrimmed = item.name?.trim() || '';
                    // Test menu item image logic with "Maguro Nigiri"
                    const isMaguroNigiri = itemNameTrimmed.toLowerCase() === "maguro nigiri" || itemNameTrimmed === "Maguro Nigiri";
                    const hasImage = isMaguroNigiri;
                    
                    return (
                      <div
                        key={item.id}
                        className={`bg-white overflow-hidden transition-all duration-300 border border-black/10 hover:border-black/30 ${
                          isExpanded ? 'border-black/50' : ''
                        }`}
                      >
                        <div className={`p-4 md:p-8 transition-all duration-300 ${isExpanded ? 'pb-2' : ''}`}>
                          <div className="flex justify-between items-start mb-2 md:mb-4 border-b border-black/10 pb-2">
                            <h3 className="text-base md:text-xl lg:text-2xl font-light text-black pr-2 md:pr-4 flex-1 tracking-wide" style={{ letterSpacing: '0.05em', fontWeight: 300 }}>
                              {item.name}
                            </h3>
                            <span
                              className="text-base md:text-xl lg:text-2xl font-light whitespace-nowrap flex-shrink-0 ml-2 text-black tracking-wide"
                              style={{ letterSpacing: '0.05em', fontWeight: 300 }}
                            >
                              {item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed mb-3 font-light tracking-wide mt-2" style={{ letterSpacing: '0.02em' }}>
                              {item.description}
                            </p>
                          )}
                          
                          {hasImage && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const newState = isExpanded ? null : item.id;
                                setExpandedMenuItem(newState);
                              }}
                              className="flex items-center gap-2 text-xs font-light tracking-wider uppercase transition-all hover:opacity-80 mt-2 text-black border-b border-black/20 hover:border-black"
                              style={{ letterSpacing: '0.1em' }}
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp className="w-3 h-3" />
                                  <span>Verberg</span>
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-3 h-3" />
                                  <span>Bekijk</span>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                        
                        {hasImage && (
                          <div
                            className={`overflow-hidden transition-all duration-500 ease-in-out ${
                              isExpanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                            }`}
                          >
                            <div className="px-4 md:px-8 pb-4 md:pb-8">
                              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-200" style={{ minHeight: '200px' }}>
                                <Image
                                  src="/Sushi/MenuItem1.jpg"
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, 50vw"
                                  priority={isExpanded}
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
          
          {/* Mobile PDF Button */}
          {!showPDFView && !showOtherSections && (
            <button
              onClick={generatePDF}
              className="md:hidden fixed top-20 right-6 z-50 p-3 border border-black bg-white text-black text-xs font-light tracking-wider uppercase transition-all hover:bg-black hover:text-white active:scale-95 items-center justify-center"
              style={{
                width: '48px',
                height: '48px',
                letterSpacing: '0.1em',
              }}
              title="Bekijk Menu PDF"
            >
              <span>PDF</span>
            </button>
          )}
        </section>
      )}

      {/* PDF View - Mobile and Desktop */}
      {showPDFView && pdfUrl && (
        <div className="fixed inset-0 z-[100] bg-white">
          <iframe
            src={pdfUrl}
            className="w-full h-full"
            title="Menu PDF"
          />
          {/* Back button with round design */}
          <button
            onClick={() => {
              setShowPDFView(false);
              if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }
              scrollToSection("menu");
            }}
            className="fixed top-6 left-6 z-[101] p-3 rounded-full shadow-2xl transition-all active:scale-95 flex items-center gap-2 bg-black text-white hover:bg-gray-800"
            style={{
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
            }}
            title="Terug naar interactieve versie"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-light tracking-wider uppercase hidden md:inline" style={{ letterSpacing: '0.1em' }}>Terug</span>
          </button>
        </div>
      )}

      {/* Floating "Bekijk Meer Informatie" Button - Mobile only, bottom right */}
      {!showOtherSections && !showPDFView && (
        <button
          onClick={() => {
            setShowOtherSections(true);
            scrollToSection("about");
          }}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 bg-black text-white"
          style={{
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
          }}
          title="Bekijk meer informatie"
        >
          <Globe className="w-6 h-6" />
        </button>
      )}

      {/* Floating Menu Button - Mobile only, bottom right when on landing page */}
      {showOtherSections && !showPDFView && (
        <button
          onClick={() => {
            setShowOtherSections(false);
            scrollToSection("menu");
          }}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 bg-black text-white"
          style={{
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
          }}
          title="Terug naar Menu"
        >
          <UtensilsCrossed className="w-6 h-6" />
        </button>
      )}

      {/* Chef Section - Hidden on mobile when menu is focused */}
      <section id="chef" className={`py-24 px-4 bg-black text-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.3}>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <ChefHat className="w-12 h-12" />
                  <h2 className="text-4xl md:text-5xl font-light tracking-wider" style={{ letterSpacing: '0.1em', fontWeight: 300 }}>
                    CHEF'S WOORD
                  </h2>
                </div>
                <div className="w-24 h-px mb-6 bg-white"></div>
                <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light tracking-wide mb-6" style={{ letterSpacing: '0.02em' }}>
                  "Bij {restaurantName} geloven we in de kunst van sushi. Elke rol wordt met precisie en passie bereid, met respect voor de traditionele Japanse technieken."
                </p>
                <p className="text-base md:text-lg text-white/70 leading-relaxed font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  — Chef {restaurantName}
                </p>
              </div>
              <div className="relative aspect-square">
                <Image
                  src="/Sushi/Food1.jpg"
                  alt="Chef"
                  fill
                  className="object-cover grayscale"
                />
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Video Intro Section - Hidden on mobile when menu is focused */}
      <section id="intro" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.4}>
            <div className="text-center mb-12">
              <Video className="w-16 h-16 mx-auto mb-6 text-black" />
              <h2 className="text-4xl md:text-5xl font-light mb-6 text-black tracking-wider" style={{ letterSpacing: '0.1em', fontWeight: 300 }}>
                VIDEO INTRO
              </h2>
              <div className="w-24 h-px mx-auto mb-4 bg-black"></div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-black/10">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/Sushi/HeaderVid.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Awards Section - Hidden on mobile when menu is focused */}
      {awards.length > 0 && (
        <section id="awards" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
          <div className="max-w-6xl mx-auto">
            <FadeInUp delay={0.5}>
              <div className="text-center mb-16">
                <Award className="w-16 h-16 mx-auto mb-6 text-black" />
                <h2 className="text-4xl md:text-5xl font-light mb-6 text-black tracking-wider" style={{ letterSpacing: '0.1em', fontWeight: 300 }}>
                  ERKENNINGEN
                </h2>
                <div className="w-24 h-px mx-auto mb-4 bg-black"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {awards.map((award) => (
                  <div
                    key={award.id}
                    className="text-center border border-black/10 p-6 hover:border-black/30 transition-all"
                  >
                    <Award className="w-12 h-12 mx-auto mb-4 text-black" />
                    <h3 className="text-lg font-light mb-2 text-black tracking-wide" style={{ letterSpacing: '0.05em' }}>
                      {award.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                      {award.subtitle}
                    </p>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {/* Gallery Section - Hidden on mobile when menu is focused */}
      {galleryImages.length > 0 && (
        <section id="gallery" className={`py-24 px-4 bg-black scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
          <div className="max-w-7xl mx-auto">
            <FadeInUp delay={0.6}>
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-white tracking-wider" style={{ letterSpacing: '0.05em', fontWeight: 300 }}>
                  GALERIJ
                </h2>
                <div className="w-24 h-px mx-auto mb-4 bg-white"></div>
                <p className="text-sm text-white/60 max-w-2xl mx-auto font-light tracking-wide" style={{ letterSpacing: '0.02em' }}>
                  Ontdek de kunst en passie achter onze sushi
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="relative aspect-square overflow-hidden group cursor-pointer border border-white/10"
                  >
                    <Image
                      src={img.url}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Instagram className="w-8 h-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </FadeInUp>
          </div>
        </section>
      )}

      {/* Contact Section - Hidden on mobile when menu is focused */}
      <section id="contact" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto">
          <FadeInUp delay={0.7}>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-black tracking-wider" style={{ letterSpacing: '0.05em', fontWeight: 300 }}>
                CONTACT
              </h2>
              <div className="w-24 h-px mx-auto mb-4 bg-black"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                {address && (
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-light tracking-wider uppercase mb-2 text-black" style={{ letterSpacing: '0.15em' }}>
                        Adres
                      </h3>
                      <div className="text-gray-700 space-y-1 text-sm font-light">
                        {address.street && <p>{address.street}</p>}
                        {(address.postalCode || address.city) && (
                          <p>{[address.postalCode, address.city].filter(Boolean).join(" ")}</p>
                        )}
                        {address.country && <p>{address.country}</p>}
                      </div>
                    </div>
                  </div>
                )}

                {phone && (
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-light tracking-wider uppercase mb-2 text-black" style={{ letterSpacing: '0.15em' }}>
                        Telefoon
                      </h3>
                      <a href={`tel:${phone}`} className="text-gray-700 text-sm font-light hover:opacity-80">
                        {phone}
                      </a>
                    </div>
                  </div>
                )}

                {email && (
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-sm font-light tracking-wider uppercase mb-2 text-black" style={{ letterSpacing: '0.15em' }}>
                        Email
                      </h3>
                      <a href={`mailto:${email}`} className="text-gray-700 text-sm font-light break-all hover:opacity-80">
                        {email}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-black flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-sm font-light tracking-wider uppercase mb-2 text-black" style={{ letterSpacing: '0.15em' }}>
                      Openingstijden
                    </h3>
                    <div className="text-gray-700 space-y-1 text-xs font-light">
                      <div className="flex justify-between">
                        <span>Ma - Do:</span>
                        <span>{openingHours.monday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Vr - Za:</span>
                        <span>{openingHours.friday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Zo:</span>
                        <span>{openingHours.sunday}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative aspect-square bg-gray-200 border border-black/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-gray-400" />
                </div>
              </div>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Footer - Hidden on mobile when menu is focused */}
      <footer className={`py-12 px-4 bg-black text-white ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Contact */}
            <div>
              <h3 className="text-sm font-light tracking-wider uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
                Contact
              </h3>
              {address && (
                <p className="text-xs text-white/70 font-light mb-2">{address.street}</p>
              )}
              {phone && (
                <p className="text-xs text-white/70 font-light mb-2">{phone}</p>
              )}
              {email && (
                <p className="text-xs text-white/70 font-light">{email}</p>
              )}
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="text-sm font-light tracking-wider uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
                Openingstijden
              </h3>
              <div className="text-xs text-white/70 space-y-1 font-light">
                <p>Ma - Do: {openingHours.monday}</p>
                <p>Vr - Za: {openingHours.friday}</p>
                <p>Zo: {openingHours.sunday}</p>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-sm font-light tracking-wider uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
                Volg Ons
              </h3>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/70 font-light hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              )}
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-sm font-light tracking-wider uppercase mb-4" style={{ letterSpacing: '0.15em' }}>
                Nieuwsbrief
              </h3>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 text-white text-xs placeholder-white/50 focus:outline-none focus:border-white/50 font-light"
                  style={{ letterSpacing: '0.02em' }}
                />
                <button className="px-4 py-2 border border-white text-white text-xs font-light tracking-wider uppercase hover:bg-white hover:text-black transition-all" style={{ letterSpacing: '0.1em' }}>
                  Abonneren
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-xs text-white/50 font-light tracking-wide" style={{ letterSpacing: '0.05em' }}>
              © {new Date().getFullYear()} {restaurantName}. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
