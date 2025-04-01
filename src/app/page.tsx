import Hero from '@/components/Hero';
import Planning from '@/components/Planning';
import Introducing from '@/components/Introducing';
import FeatureSlider from '@/components/FeatureSlider';
import FeaturesGrid from '@/components/FeaturesGrid';
import JoinClub from '@/components/JoinClub';
import FAQ from '@/components/FAQ';
import Floating from '@/components/Floating';
export default function Home() {
  return (
    <main>
      <Hero />
      <Planning />
      <Introducing />
      <FeatureSlider />
      <Floating />
      <FeaturesGrid />
      <JoinClub />
      <FAQ />
    </main>
  );
} 