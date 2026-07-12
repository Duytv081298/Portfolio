'use client';

import dynamic from 'next/dynamic';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import HeroSection from '@/components/sections/HeroSection';
import PlayableAdsSection from '@/components/sections/PlayableAdsSection';
import FeaturedGamesSection from '@/components/sections/FeaturedGamesSection';
import TechStackSection from '@/components/sections/TechStackSection';
import PerformanceSection from '@/components/sections/PerformanceSection';
import TimelineSection from '@/components/sections/TimelineSection';
import ContactSection from '@/components/sections/ContactSection';
import GridBackground from '@/components/effects/GridBackground';
import MouseSpotlight from '@/components/effects/MouseSpotlight';

// Dynamic import for Three.js (client-only, no SSR)
const ParticleField = dynamic(
  () => import('@/components/effects/ParticleField'),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <LoadingScreen />

      {/* Background Effects */}
      <GridBackground />
      <ParticleField />
      <MouseSpotlight />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <PlayableAdsSection />
        <FeaturedGamesSection />
        <TechStackSection />
        <PerformanceSection />
        <TimelineSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
}
