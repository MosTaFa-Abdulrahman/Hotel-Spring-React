import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Traveler",
      text: "Amazing experience! The room was spotless and the service was exceptional. Will definitely book again.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Tourist",
      text: "Perfect location and beautiful views. The staff went above and beyond to make our stay memorable.",
      rating: 5,
    },
    {
      name: "Emma Williams",
      role: "Vacation Seeker",
      text: "Luxurious rooms with great amenities. The booking process was smooth and hassle-free.",
      rating: 5,
    },
  ];

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () =>
    setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const S = TestimonialStyles;

  return (
    <section style={{ padding: "80px 20px", background: "#fff" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "700",
            textAlign: "center",
            marginBottom: "10px",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          What Our Guests Say
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Real reviews from real guests
        </p>

        <S.Container>
          <S.NavButton onClick={prev}>
            <ChevronLeft size={24} />
          </S.NavButton>

          <S.Card>
            <S.Stars rating={testimonials[current].rating} />
            <S.Text>{testimonials[current].text}</S.Text>
            <S.Author
              name={testimonials[current].name}
              role={testimonials[current].role}
            />
          </S.Card>

          <S.NavButton onClick={next}>
            <ChevronRight size={24} />
          </S.NavButton>
        </S.Container>
      </div>
    </section>
  );
}

const TestimonialStyles = {
  Container: ({ children }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  ),
  Card: ({ children }) => (
    <div
      style={{
        background: "white",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
        flex: 1,
      }}
    >
      {children}
    </div>
  ),
  Stars: ({ rating }) => (
    <div
      style={{
        display: "flex",
        gap: "5px",
        marginBottom: "20px",
        justifyContent: "center",
      }}
    >
      {[...Array(rating)].map((_, i) => (
        <Star key={i} size={20} fill="#ffc107" color="#ffc107" />
      ))}
    </div>
  ),
  Text: ({ children }) => (
    <p
      style={{
        fontSize: "1.1rem",
        lineHeight: "1.8",
        color: "#555",
        marginBottom: "20px",
        fontStyle: "italic",
      }}
    >
      "{children}"
    </p>
  ),
  Author: ({ name, role }) => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        textAlign: "center",
      }}
    >
      <strong>{name}</strong>
      <span style={{ color: "#999", fontSize: "14px" }}>{role}</span>
    </div>
  ),
  NavButton: ({ onClick, children }) => {
    const [hover, setHover] = useState(false);
    return (
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          border: "none",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          cursor: "pointer",
          transition: "transform 0.2s ease",
          transform: hover ? "scale(1.1)" : "scale(1)",
        }}
      >
        {children}
      </button>
    );
  },
};
