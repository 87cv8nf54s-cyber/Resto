"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { User } from "@/types/user";
import { FadeIn, FadeInUp } from "@/components/ui/motion";
import { Mail, MapPin, Phone, UtensilsCrossed, Instagram, Clock, Menu as MenuIcon, X, Globe, ChevronLeft, ChevronRight, FileText, Star, ChevronUp } from "lucide-react";
import jsPDF from 'jspdf';

interface ThaiTemplateProps {
  user: User;
}

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image?: string;
  badge?: string;
}

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

export function ThaiTemplate({ user }: ThaiTemplateProps) {
  const restaurantName = user.companyName || user.naam || "Thai Garden";
  const tagline = user.bio || "Authentieke Thaise smaken, vers bereid met passie";
  const logo = user.logo || "/Thai/LogoTHAI.png";

  const menuItems: MenuItem[] = (user.workExperiences || []).map((exp, idx) => ({
    id: exp.id || `menu-${idx}`,
    name: exp.company || "Thai Dish",
    price: exp.role || "€0.00",
    description: exp.description || "",
    category: exp.startDate || "Hoofdgerechten",
  }));

  const categories = (user.educations || []).map(edu => ({
    id: edu.id,
    name: edu.institution || "Category",
  }));

  const galleryImages: GalleryImage[] = [
    { id: "1", url: "/Thai/Food1thai.jpg", alt: "Thai Restaurant Gallery 1" },
    { id: "2", url: "/Thai/Food2thai.jpg", alt: "Thai Restaurant Gallery 2" },
    { id: "3", url: "/Thai/Food3thai.jpg", alt: "Thai Restaurant Gallery 3" },
  ];

  const address = user.address;
  const phone = user.phoneNumber;
  const email = user.companyEmail;
  const instagram = user.linkedinUrl;

  const openingHours = {
    monday: "11:00 - 22:00",
    tuesday: "11:00 - 22:00",
    wednesday: "11:00 - 22:00",
    thursday: "11:00 - 22:00",
    friday: "11:00 - 23:00",
    saturday: "11:00 - 23:00",
    sunday: "12:00 - 21:00",
  };

  // Hero slide (single background with video)
  const heroSlide = {
    id: "1",
    video: "/Thai/HeaderVid.mp4",
    subtitle: "Traditioneel & Vers",
    title: "Voor de liefde van\nheerlijk eten",
    text: "Kom met familie & voel de vreugde van smakelijk eten"
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showPDFView, setShowPDFView] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showOtherSections, setShowOtherSections] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      setTimeout(() => scrollToSection(hash, false), 100);
    }
  }, []);

  const scrollToSection = (id: string, updateHash: boolean = true) => {
    const element = document.getElementById(id);
    if (element) {
      if (updateHash) window.history.pushState(null, '', `#${id}`);
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const filteredMenuItems = selectedCategory
    ? menuItems.filter(item => item.category === selectedCategory)
    : menuItems;

  const generatePDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 25;
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
      console.log('=== STARTING PDF GENERATION ===');
      console.log('Generating PDF with menuItems:', menuItems);
      console.log('MenuItems count:', menuItems.length);
      
      // First page: Logo only
      if (logo) {
        try {
          const logoData = await loadImageAsBase64(logo);
          const logoWidth = 80;
          const logoHeight = logoWidth * 0.5;
          const logoX = (pageWidth - logoWidth) / 2;
          const logoY = (pageHeight - logoHeight) / 2;
          doc.addImage(logoData, 'PNG', logoX, logoY, logoWidth, logoHeight);
          console.log('Logo added to page 1');
        } catch (error) {
          console.error('Error loading logo:', error);
        }
      }

      // Add new page for menu content
      doc.addPage();
      console.log('Added page 2 for menu content');
      let yPosition = margin + 10;

      // Menu items grouped by category
      const itemsByCategory: Record<string, MenuItem[]> = {};
      menuItems.forEach(item => {
        const category = item.category || 'Overig';
        if (!itemsByCategory[category]) {
          itemsByCategory[category] = [];
        }
        itemsByCategory[category].push(item);
      });
      
      console.log('=== PDF Generation Debug ===');
      console.log('Total menuItems:', menuItems.length);
      console.log('Items by category:', itemsByCategory);
      console.log('Categories:', Object.keys(itemsByCategory));
      console.log('Categories count:', Object.keys(itemsByCategory).length);

      // Check if we have any menu items
      if (menuItems.length === 0) {
        console.warn('WARNING: No menu items found!');
        // Add a message on the second page
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.text('Geen menu items beschikbaar', pageWidth / 2, pageHeight / 2, { align: 'center' });
      } else {
        // Add menu items by category
        const categoryKeys = Object.keys(itemsByCategory);
        console.log(`Processing ${categoryKeys.length} categories`);
        
        categoryKeys.forEach((category, categoryIndex) => {
          const categoryItems = itemsByCategory[category];
          console.log(`[${categoryIndex + 1}/${categoryKeys.length}] Processing category: "${category}" with ${categoryItems.length} items`);
          
          // Check if we need a new page before adding category header
          if (yPosition > pageHeight - margin - 50) {
            console.log(`Adding new page before category "${category}" (yPosition: ${yPosition})`);
            doc.addPage();
            console.log(`Now on page ${doc.getCurrentPageInfo().pageNumber}`);
            yPosition = margin + 10;
          }

          // Category header
          yPosition += 12;
          doc.setFontSize(18);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(11, 213, 0); // Green color #0BD500
          const categoryWidth = doc.getTextWidth(category);
          const categoryX = (pageWidth - categoryWidth) / 2;
          doc.text(category, categoryX, yPosition);
          yPosition += 10;

          // Menu items
          categoryItems.forEach((item, itemIndex) => {
            console.log(`  [${itemIndex + 1}/${categoryItems.length}] Adding item: "${item.name}" - ${item.price} (yPosition: ${yPosition}, page: ${doc.getCurrentPageInfo().pageNumber})`);
            
            let spaceNeeded = 6;
            if (item.description) {
              doc.setFontSize(9);
              const descriptionWidth = maxWidth - 10;
              const splitDescription = doc.splitTextToSize(item.description, descriptionWidth);
              spaceNeeded += splitDescription.length * 4.5;
            }
            spaceNeeded += 4;

            // Check if we need a new page
            if (yPosition + spaceNeeded > pageHeight - margin - 10) {
              console.log(`    Adding new page for item "${item.name}" (yPosition: ${yPosition}, spaceNeeded: ${spaceNeeded})`);
              doc.addPage();
              console.log(`    Now on page ${doc.getCurrentPageInfo().pageNumber}`);
              yPosition = margin + 10;
            }

            // Item name and price
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
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
      }

      const totalPages = doc.getNumberOfPages();
      console.log(`=== PDF GENERATION SUMMARY ===`);
      console.log(`Total pages after adding menu items: ${totalPages}`);
      console.log(`Total menu items processed: ${menuItems.length}`);
      console.log(`Total categories: ${Object.keys(itemsByCategory).length}`);
      
      // Verify we have content
      if (totalPages < 2) {
        console.error('ERROR: PDF has less than 2 pages!');
      }
      
      // Check if we have menu items
      if (menuItems.length === 0) {
        // If no menu items, add a message on the second page
        doc.setPage(2);
        doc.setFontSize(14);
        doc.setTextColor(100, 100, 100);
        doc.text('Geen menu items beschikbaar', pageWidth / 2, pageHeight / 2, { align: 'center' });
      }
      
      // Footer on all pages (except first logo page)
      for (let i = 2; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Pagina ${i - 1} van ${totalPages - 1}`,
          pageWidth / 2,
          pageHeight - margin + 5,
          { align: 'center' }
        );
      }

      // Generate PDF blob
      const pdfBlob = doc.output('blob');
      
      // Revoke old URL if it exists to prevent memory leaks
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
      
      const generatedPdfUrl = URL.createObjectURL(pdfBlob);
      
      console.log(`=== PDF GENERATION COMPLETE ===`);
      console.log(`Total pages: ${totalPages}`);
      console.log(`Total menu items: ${menuItems.length}`);
      console.log(`Total categories: ${Object.keys(itemsByCategory).length}`);
      console.log(`PDF URL created: ${generatedPdfUrl.substring(0, 50)}...`);
      console.log(`PDF blob size: ${pdfBlob.size} bytes`);
      
      // Force PDF to be regenerated by clearing state first
      setShowPDFView(false);
      setPdfUrl(null);
      
      // Small delay to ensure state is cleared
      setTimeout(() => {
        setPdfUrl(generatedPdfUrl);
        setShowPDFView(true);
        console.log('PDF view opened');
      }, 100);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Er is een fout opgetreden bij het genereren van de PDF.');
    }
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden" style={{ maxWidth: '100vw', boxSizing: 'border-box' }}>
      {/* Topbar - Hidden on mobile when menu is focused */}
      <div className={`bg-gray-900 text-white py-2 text-sm fixed top-0 left-0 right-0 z-50 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {address && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{address.street}, {address.city}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Dagelijks: {openingHours.monday}</span>
            </div>
            {phone && (
              <a href={`tel:${phone}`} className="flex items-center gap-2 hover:text-[#0BD500] transition-colors">
                <Phone className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[#0BD500] transition-colors">
                <Mail className="w-4 h-4" />
                <span>{email}</span>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Header - Hidden on mobile when menu is focused */}
      <header className={`fixed left-0 right-0 z-40 transition-all duration-300 ${showOtherSections ? "" : "hidden md:block"} ${
        isScrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`} style={{ top: '40px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="flex items-center">
              {logo ? (
                <Image src={logo} alt={restaurantName} width={160} height={50} className="h-12 w-auto object-contain" />
              ) : (
                <span className={`text-2xl font-bold ${isScrolled ? "text-gray-900" : "text-white"}`}>
                  {restaurantName}
                </span>
              )}
            </a>

            <nav className={`hidden md:flex items-center space-x-8 ${isScrolled ? "text-gray-900" : "text-white"}`}>
              <button onClick={() => scrollToSection('home')} className="font-semibold hover:text-[#0BD500] transition-colors">
                Home
              </button>
              <button onClick={() => scrollToSection('menu')} className="font-semibold hover:text-[#0BD500] transition-colors">
                Menu
              </button>
              <button onClick={() => scrollToSection('about')} className="font-semibold hover:text-[#0BD500] transition-colors">
                Over Ons
              </button>
              <button onClick={() => scrollToSection('contact')} className="font-semibold hover:text-[#0BD500] transition-colors">
                Contact
              </button>
              {phone && (
                <a href={`tel:${phone}`} className="px-6 py-2 bg-[#0BD500] text-white rounded-full font-semibold text-sm hover:bg-[#0aa000] transition-all shadow-lg">
                  Reserveren
                </a>
              )}
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 ${isScrolled ? "text-gray-900" : "text-white"}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-6 pt-4 border-t border-gray-200 bg-white">
              <div className="flex flex-col space-y-4">
                <button onClick={() => scrollToSection('home')} className="text-left text-base font-semibold text-gray-900 hover:text-[#0BD500] transition-colors">
                  Home
                </button>
                <button onClick={() => scrollToSection('menu')} className="text-left text-base font-semibold text-gray-900 hover:text-[#0BD500] transition-colors">
                  Menu
                </button>
                <button onClick={() => scrollToSection('about')} className="text-left text-base font-semibold text-gray-900 hover:text-[#0BD500] transition-colors">
                  Over Ons
                </button>
                <button onClick={() => scrollToSection('contact')} className="text-left text-base font-semibold text-gray-900 hover:text-[#0BD500] transition-colors">
                  Contact
                </button>
                {phone && (
                  <a href={`tel:${phone}`} className="px-6 py-3 bg-[#0BD500] text-white rounded-full font-semibold text-center hover:bg-[#0aa000] transition-all shadow-lg">
                    Reserveren
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section - Video Background - Hidden on mobile when menu is focused */}
      <section id="home" className={`relative h-screen flex items-center justify-center overflow-hidden ${showOtherSections ? "" : "hidden md:block"}`} style={{ marginTop: '120px', paddingTop: '0' }}>
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroSlide.video} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-sm md:text-base mb-4 uppercase tracking-wider text-[#0BD500]">{heroSlide.subtitle}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight whitespace-pre-line">
              {heroSlide.title}
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
              {heroSlide.text}
            </p>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-10 py-4 bg-[#0BD500] text-white rounded-full font-bold text-lg hover:bg-[#0aa000] transition-all hover:scale-105 shadow-xl"
            >
              Bekijk Ons Menu
            </button>
          </FadeIn>
        </div>

        {/* Book A Table Button */}
        {phone && (
          <a
            href={`tel:${phone}`}
            className="absolute bottom-8 right-8 z-20 flex flex-col items-center gap-2 p-4 bg-[#0BD500] text-white rounded-full hover:bg-[#0aa000] transition-all shadow-xl hover:scale-110"
          >
            <Phone className="w-6 h-6" />
            <span className="text-xs font-semibold">Reserveren</span>
          </a>
        )}
      </section>

      {/* Service Section - Hidden on mobile when menu is focused */}
      <section className={`py-24 px-4 bg-gray-50 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-[#0BD500] mb-2">Smaak Voor Royalty</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Wij Bieden Top Kwaliteit</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry lorem Ipsum has been the industrys standard dummy text ever.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {categories.slice(0, 3).map((cat, idx) => (
              <div key={cat.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={galleryImages[idx]?.url || "/Thai/Food1thai.jpg"}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      scrollToSection('menu');
                    }}
                    className="text-[#0BD500] font-semibold hover:underline"
                  >
                    Bekijk Menu
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Hidden on mobile when menu is focused */}
      <section id="about" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-[#0BD500] mb-2">Ons Verhaal</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Elke Smaak Vertelt Een Verhaal</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {tagline}
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Bij {restaurantName} combineren we authentieke Thaise recepten met verse ingrediënten om uitzonderlijke culinaire ervaringen te creëren. Onze passie voor kwaliteit en aandacht voor detail komt terug in elk gerecht dat we serveren.
              </p>
              {phone && (
                <>
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Reserveren Via Telefoon</p>
                  <a href={`tel:${phone}`} className="text-2xl font-bold text-[#0BD500] hover:underline block mb-6">
                    {phone}
                  </a>
                </>
              )}
              <button
                onClick={() => scrollToSection('menu')}
                className="px-8 py-4 bg-[#0BD500] text-white rounded-full font-bold hover:bg-[#0aa000] transition-all shadow-lg"
              >
                Lees Meer
              </button>
            </div>
            <div className="relative">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <Image
                  src="/Thai/Food1thai.jpg"
                  alt="About"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Dish Section - Hidden on mobile when menu is focused */}
      <section className={`relative py-24 px-4 bg-gray-50 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-96 md:h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="/Thai/Food2thai.jpg"
              alt="Special Dish"
              fill
              className="object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <p className="text-sm uppercase tracking-wider text-[#0BD500] mb-2">Speciaal Gerecht</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Pad Thai Special</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Onze signature Pad Thai met verse garnalen, kip, taugé en pinda's. Een perfecte balans van zoet, zuur en pittig.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <span className="text-gray-400 line-through text-xl">€18.50</span>
              <span className="text-3xl font-bold text-[#0BD500]">€15.50</span>
            </div>
            <button
              onClick={() => scrollToSection('menu')}
              className="px-8 py-4 bg-[#0BD500] text-white rounded-full font-bold hover:bg-[#0aa000] transition-all shadow-lg"
            >
              Bekijk Volledige Menu
            </button>
          </div>
        </div>
      </section>

      {/* Menu Section - Bordered container on mobile */}
      {menuItems.length > 0 && (
        <section id="menu" className={`${showOtherSections ? "py-12 md:py-24" : "pt-4 pb-12 md:py-24"} px-4 bg-white ${showOtherSections ? "scroll-mt-20" : ""} ${!showOtherSections ? "min-h-screen md:min-h-0" : ""}`}>
          <div className={`max-w-7xl mx-auto ${!showOtherSections ? "md:max-w-7xl border-2 border-gray-200 rounded-3xl md:border-0 md:rounded-none bg-white shadow-lg md:shadow-none p-4 md:p-0" : ""}`}>
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-[#0BD500] mb-2">Speciale Selectie</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Heerlijk Menu</h2>
          </div>

            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    selectedCategory === null
                      ? 'bg-[#0BD500] text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Alle
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      selectedCategory === cat.name
                        ? 'bg-[#0BD500] text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredMenuItems.map((item) => (
                <div key={item.id} className="bg-white border-2 border-gray-100 rounded-2xl p-6 hover:border-[#0BD500] transition-all shadow-sm hover:shadow-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <span className="text-xl font-bold text-[#0BD500] ml-4">{item.price}</span>
                  </div>
                  {item.description && (
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Tijdens winter dagelijks van <span className="font-bold text-[#0BD500]">19:00</span> tot <span className="font-bold text-[#0BD500]">21:00</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => scrollToSection('menu')}
                  className="px-8 py-4 bg-[#0BD500] text-white rounded-full font-bold hover:bg-[#0aa000] transition-all shadow-lg"
                >
                  Bekijk Volledige Menu
                </button>
                <button
                  onClick={generatePDF}
                  className="px-8 py-4 border-2 border-[#0BD500] text-[#0BD500] rounded-full font-bold hover:bg-[#0BD500] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Download Menu PDF
                </button>
              </div>
            </div>
          </div>
          
          {/* Floating "Bekijk Meer Informatie" Button - Mobile only, bottom right */}
          {!showOtherSections && (
            <button
              onClick={() => {
                setShowOtherSections(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 bg-[#0BD500] text-white"
              style={{
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
              className="md:hidden fixed top-20 right-6 z-50 p-3 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 items-center justify-center bg-[#0BD500] text-white"
              style={{
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.2)',
                width: '48px',
                height: '48px',
              }}
              title="Bekijk Menu PDF"
            >
              <span className="text-xs font-bold">PDF</span>
            </button>
          )}
        </section>
      )}

      {/* Testimonials - Hidden on mobile when menu is focused */}
      <section className={`py-24 px-4 bg-gray-900 text-white relative ${showOtherSections ? "" : "hidden md:block"}`} style={{ backgroundImage: 'url(/Thai/Food3thai.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="text-6xl font-serif mb-6">"</div>
          <p className="text-2xl md:text-3xl font-light mb-8 italic">
            Ik wilde je bedanken voor de uitnodiging voor dat geweldige diner. Het eten was buitengewoon.
          </p>
          <div className="flex justify-center gap-2 mb-6">
            <div className="w-12 h-0.5 bg-white"></div>
            <div className="w-12 h-0.5 bg-white"></div>
            <div className="w-12 h-0.5 bg-white"></div>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white/20 mb-4 flex items-center justify-center">
              <Star className="w-10 h-10 text-yellow-400" />
            </div>
            <p className="font-semibold">Sarah Jansen</p>
          </div>
        </div>
      </section>

      {/* Contact/Reservation Section - Hidden on mobile when menu is focused */}
      <section id="contact" className={`py-24 px-4 bg-white scroll-mt-20 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Online Reservering</h2>
            <p className="text-gray-600">
              Reserveringsverzoek <a href={`tel:${phone}`} className="text-[#0BD500] font-semibold hover:underline">{phone}</a> of vul het formulier in
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Contacteer Ons</h3>
              {phone && (
                <div className="mb-6">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Reserveringsverzoek</p>
                  <a href={`tel:${phone}`} className="text-xl font-bold text-[#0BD500] hover:underline">
                    {phone}
                  </a>
                </div>
              )}
              {address && (
                <div className="mb-6">
                  <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Locatie</p>
                  <address className="text-gray-700 not-italic">
                    {address.street}<br />
                    {address.postalCode} {address.city}
                  </address>
                </div>
              )}
              <div className="mb-6">
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Lunch Tijd</p>
                <p className="text-gray-700">Maandag tot Zondag<br />11:00 - 14:30</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">Diner Tijd</p>
                <p className="text-gray-700">Maandag tot Zondag<br />17:00 - 22:00</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8">
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input type="text" placeholder="Uw Naam" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500] focus:ring-2 focus:ring-[#0BD500]/20 transition-all" />
                  <input type="tel" placeholder="Telefoonnummer" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500] focus:ring-2 focus:ring-[#0BD500]/20 transition-all" />
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500] focus:ring-2 focus:ring-[#0BD500]/20 transition-all">
                    <option>1 Persoon</option>
                    <option>2 Personen</option>
                    <option>3 Personen</option>
                    <option>4 Personen</option>
                    <option>5+ Personen</option>
                  </select>
                  <input type="date" className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500] focus:ring-2 focus:ring-[#0BD500]/20 transition-all" />
                  <select className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500] focus:ring-2 focus:ring-[#0BD500]/20 transition-all">
                    <option>18:00</option>
                    <option>19:00</option>
                    <option>20:00</option>
                    <option>21:00</option>
                  </select>
                </div>
                <textarea placeholder="Bericht" rows={4} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0BD500]"></textarea>
                <button type="submit" className="w-full px-8 py-4 bg-[#0BD500] text-white rounded-full font-bold hover:bg-[#0aa000] transition-all shadow-lg">
                  Reserveren
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Hidden on mobile when menu is focused */}
      <section className={`py-24 px-4 bg-gray-50 ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-wider text-[#0BD500] mb-2">Waarom Kiezen Voor Ons</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Onze Sterke Punten</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Hygienisch Eten", text: "Lorem Ipsum is simply dummy printing and typesetting." },
              { title: "Verse Omgeving", text: "Lorem Ipsum is simply dummy printing and typesetting." },
              { title: "Bekwame Chefs", text: "Lorem Ipsum is simply dummy printing and typesetting." },
              { title: "Evenementen & Feesten", text: "Lorem Ipsum is simply dummy printing and typesetting." }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-[#0BD500] rounded-full flex items-center justify-center shadow-lg">
                  <Star className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Hidden on mobile when menu is focused */}
      <footer className={`py-16 px-4 bg-[#0BD500] text-white relative ${showOtherSections ? "" : "hidden md:block"}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-lg font-bold mb-4">{restaurantName}</h3>
              {address && (
                <address className="text-sm text-white/70 not-italic mb-2">
                  {address.street}<br />
                  {address.postalCode} {address.city}
                </address>
              )}
              {email && (
                <a href={`mailto:${email}`} className="text-sm text-white/70 hover:text-white block mb-2">
                  {email}
                </a>
              )}
              {phone && (
                <p className="text-sm text-white/70">
                  Reservering: <a href={`tel:${phone}`} className="hover:text-white">{phone}</a>
                </p>
              )}
              <p className="text-sm text-white/70 mt-2">Open: 09:00 - 22:00</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Navigatie</h3>
              <ul className="space-y-2">
                <li><button onClick={() => scrollToSection('home')} className="text-sm text-white/70 hover:text-white">Home</button></li>
                <li><button onClick={() => scrollToSection('menu')} className="text-sm text-white/70 hover:text-white">Menu</button></li>
                <li><button onClick={() => scrollToSection('about')} className="text-sm text-white/70 hover:text-white">Over Ons</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-sm text-white/70 hover:text-white">Contact</button></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Volg Ons</h3>
              <ul className="space-y-2">
                {instagram && (
                  <li>
                    <a href={instagram} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white flex items-center gap-2">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Nieuwsbrief</h3>
              <p className="text-sm text-white/90 mb-4">
                Abonneer je & Krijg <span className="text-white font-bold">25% Korting</span>
              </p>
              <form className="flex gap-2">
                <input type="email" placeholder="Uw email" className="flex-1 px-4 py-2 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white/50 backdrop-blur-sm" />
                <button type="submit" className="px-6 py-2 bg-white text-[#0BD500] rounded-lg font-semibold hover:bg-gray-100 transition-all shadow-lg">
                  Abonneren
                </button>
              </form>
            </div>
          </div>

          <div className="border-t border-white/20 pt-6 text-center">
            <p className="text-sm text-white/50">
              © {new Date().getFullYear()} {restaurantName}. Alle rechten voorbehouden.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top - Desktop only */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hidden md:flex fixed bottom-8 right-8 z-50 p-4 bg-[#0BD500] text-white rounded-full shadow-xl hover:bg-[#0aa000] transition-all"
          aria-label="Back to top"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* PDF View - Mobile and Desktop */}
      {showPDFView && pdfUrl && (
        <div className="fixed inset-0 z-[100] bg-white">
          <iframe 
            src={`${pdfUrl}#toolbar=1&navpanes=1&scrollbar=1`} 
            className="w-full h-full" 
            title="Menu PDF"
            style={{ border: 'none' }}
          />
          <button
            onClick={() => {
              setShowPDFView(false);
              if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
                setPdfUrl(null);
              }
              scrollToSection("menu");
            }}
            className="fixed top-6 left-6 z-[101] p-3 rounded-full shadow-2xl transition-all active:scale-95 flex items-center gap-2 bg-[#0BD500] text-white hover:bg-[#0aa000]"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm font-semibold hidden md:inline">Terug</span>
          </button>
        </div>
      )}

      {/* Floating Menu Button - Mobile only, bottom right when on landing page */}
      {showOtherSections && (
        <button
          onClick={() => {
            setShowOtherSections(false);
            scrollToSection("menu");
          }}
          className="md:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all hover:scale-110 active:scale-95 bg-[#0BD500] text-white"
          style={{
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
