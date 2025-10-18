import SearchBox from "./SearchBox";

export default function HeroSection() {
  const { HeroSection, HeroContent, Title, Subtitle } = HeroStyles;

  return (
    <HeroSection>
      <HeroContent>
        <Title>Find Your Perfect Stay</Title>
        <Subtitle>
          Book elbasha rooms and apartments at the best prices
        </Subtitle>
        <SearchBox />
      </HeroContent>
    </HeroSection>
  );
}

const HeroStyles = {
  HeroSection: ({ children }) => (
    <section
      style={{
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "20px",
      }}
    >
      {children}
    </section>
  ),
  HeroContent: ({ children }) => (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        width: "100%",
        textAlign: "center",
      }}
    >
      {children}
    </div>
  ),
  Title: ({ children }) => (
    <h1
      style={{
        fontSize: "clamp(2.5rem, 5vw, 4rem)",
        fontWeight: "800",
        color: "white",
        marginBottom: "20px",
        textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
        animation: "fadeInUp 0.8s ease",
      }}
    >
      {children}
    </h1>
  ),
  Subtitle: ({ children }) => (
    <p
      style={{
        fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
        color: "rgba(255,255,255,0.95)",
        marginBottom: "50px",
        fontWeight: "300",
      }}
    >
      {children}
    </p>
  ),
};
