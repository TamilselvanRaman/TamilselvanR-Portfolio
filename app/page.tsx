import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import TechStack from "@/components/TechStack";
import Experience from "@/components/Experience";
import CodingStats from "@/components/CodingStats";
import SelectedWorks from "@/components/SelectedWorks";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";
import { getGitHubStats } from '@/lib/github';
import Footer from "@/components/Footer";

export default function Home() {
  const githubStatsPromise = getGitHubStats();
  
  return (
    <main>
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <TechStack />
      <Experience />
      <CodingStats githubStatsPromise={githubStatsPromise} />
      <SelectedWorks />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </main>
  );
}
