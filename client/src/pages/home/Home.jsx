import HeroSection from "../../components/home/HeroSection";
import Amenities from "../../components/home/Amenities";
import Testimonials from "../../components/home/Testimonials";

export default function Home() {
  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <HeroSection />
      <Amenities />
      <Testimonials />
    </div>
  );
}
