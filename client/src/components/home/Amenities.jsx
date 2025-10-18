import { useState } from "react";
import { Car, Clock, Coffee, Dumbbell, Users, Wifi } from "lucide-react";

export default function Amenities() {
  const amenities = [
    { Icon: Wifi, name: "Free WiFi", desc: "High-speed internet" },
    { Icon: Coffee, name: "Breakfast", desc: "Complimentary" },
    { Icon: Car, name: "Parking", desc: "Free parking" },
    { Icon: Dumbbell, name: "Gym", desc: "24/7 access" },
    { Icon: Clock, name: "Check-in", desc: "Flexible timing" },
    { Icon: Users, name: "Concierge", desc: "24/7 service" },
  ];

  const S = AmenitiesStyles;

  return (
    <S.Section>
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
          Premium Amenities
        </h2>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Everything you need for a comfortable stay
        </p>

        <S.Grid>
          {amenities.map((amenity, idx) => (
            <S.Card key={idx}>
              <S.Icon>
                <amenity.Icon size={32} />
              </S.Icon>
              <S.Name>{amenity.name}</S.Name>
              <S.Description>{amenity.desc}</S.Description>
            </S.Card>
          ))}
        </S.Grid>
      </div>
    </S.Section>
  );
}

const AmenitiesStyles = {
  Section: ({ children }) => (
    <section
      style={{
        padding: "80px 20px",
        background:
          "linear-gradient(135deg, rgba(240, 147, 251, 0.05) 0%, rgba(245, 87, 108, 0.05) 100%)",
      }}
    >
      {children}
    </section>
  ),
  Grid: ({ children }) => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "30px",
      }}
    >
      {children}
    </div>
  ),
  Card: ({ children }) => {
    const [hover, setHover] = useState(false);
    return (
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "15px",
          textAlign: "center",
          boxShadow: hover
            ? "0 10px 25px rgba(0,0,0,0.12)"
            : "0 5px 15px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          transform: hover ? "translateY(-5px)" : "translateY(0)",
        }}
      >
        {children}
      </div>
    );
  },
  Icon: ({ children }) => (
    <div
      style={{
        width: "70px",
        height: "70px",
        margin: "0 auto 20px",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
      }}
    >
      {children}
    </div>
  ),
  Name: ({ children }) => (
    <h3
      style={{
        fontSize: "1.2rem",
        fontWeight: "600",
        marginBottom: "10px",
        color: "#333",
      }}
    >
      {children}
    </h3>
  ),
  Description: ({ children }) => (
    <p
      style={{
        color: "#666",
        fontSize: "14px",
        margin: 0,
      }}
    >
      {children}
    </p>
  ),
};
